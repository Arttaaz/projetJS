/**
 *
 */

var model = {};

model.recherches = []; //tableau contenant des chaines de caracteres correspondant aux recherches stockees
model.recherche_courante = ""; // chaine de caracteres correspondant a la recherche courante
model.recherche_courante_news = []; // tableau d'objets de type resultats (avec titre, date et url)
model.researchSelected = false;


model.saveNouvelle = function (obj) {
	if (model.recherche_courante_news.indexOf(obj) == -1) {
		model.recherche_courante_news.push(obj);
		localStorage[model.recherche_courante] = JSON.stringify(model.recherche_courante_news);
	//$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
	}
}

model.getZoneSaisie = function() {
	return $("#zone_saisie");
}


model.findNouvelle = function(nouvOther) {
	return model.recherche_courante_news.findIndex(function(element, index, array) {
		return nouvOther.titre == element.titre && nouvOther.date == element.date;
	})
}

model.maj_resultats = function(res) {
	$("#wait").css("display", "none");
	res = $.parseJSON(res);

	model.recherche_courante_news = [];
	if (model.recherches.indexOf(model.recherche_courante) != -1 && localStorage[model.recherche_courante] != undefined) {
		model.recherche_courante_news = JSON.parse(localStorage[model.recherche_courante]);
	}

	for (var i = 0; i < res.length; i++) {
		var tmp = res[i];
		tmp.date = format(tmp.date);
		var indSaved = model.findNouvelle(tmp);

		if (indSaved == -1) {
			view.addResult(tmp.url, tmp.titre, tmp.date, view.icons.def, "sauver_nouvelle");
		} else {
			view.addResult(tmp.url, tmp.titre, tmp.date, view.icons.saved, "supprimer_nouvelle");
		}
	}
}


model.get_nouvelle = function(e) {
	if (typeof (e) == typeof ("hey")) { //si e est un objet JSON qui a été stringify
		var obj = JSON.parse(e);
	} else { //sinon e est un DOM element
		var e = $(e);
		var obj = {
			titre : e.parent().children(".titre_news").html(),
			date : e.parent().children(".date_news").html(),
			url : e.parent().children(".titre_news").attr("href")
		};
	}

	return obj; //renvoie la nouvelle sous forme d'objet js
}