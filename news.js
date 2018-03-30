var recherches = []; //tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante; // chaine de caracteres correspondant a la recherche courante
var recherche_courante_news = []; // tableau d'objets de type resultats (avec titre, date et url)
var researchSelected = false;

$(function() {

	if (localStorage.recherches) {
		recherches = JSON.parse(localStorage.recherches);
		//if ($.cookie("recherches") != undefined) {
		//	recherches = JSON.parse($.cookie("recherches"));
		for (var i = 0; i < recherches.length; i++) {
			$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
				recherches[i] + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
		}
	}

	$("#zone_saisie").keypress(function(event) {
		if (event.key == "Enter") {
			rechercher_nouvelles();
		}
	});
})

function ajouter_recherche() {
	var val = $("#zone_saisie").val();
	if (recherches.indexOf(val) == -1) {
		recherches.push(val);
		$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
			val + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
		localStorage.recherches = JSON.stringify(recherches);
	//$.cookie("recherches", JSON.stringify(recherches), { expires: 1000});
	}
}

function supprimer_recherche(e) {
	var val = $(e).prev().html();
	var index = recherches.indexOf(val);
	recherches.splice(index, 1);
	recherche_courante_news = [];
	localStorage[val] = undefined;
	localStorage.recherches = JSON.stringify(recherches);
	//$.removeCookie("recherches");
	//$.cookie("recherches", JSON.stringify(recherches), { expires: 1000});
	$(e).parent().remove();
}


function selectionner_recherche(e) {
	researchSelected = true;
	var text = $(e).html();
	$("#zone_saisie").val(text);
	recherche_courante = text;

	$("#resultats").children().remove();
	recherche_courante_news = JSON.parse(localStorage[recherche_courante]);
	for (var i = 0; i < recherche_courante_news.length; i++) {
		nouvTmp = recherche_courante_news[i];
		addResult(nouvTmp.url, nouvTmp.titre, nouvTmp.date, "croix30.jpg", "supprimer_nouvelle");
	}
}


function rechercher_nouvelles() {
	researchSelected = false;
	$("#resultats").children().remove();
	$("#wait").css("display", "block");
	var val = $("#zone_saisie").val();
	recherche_courante = val;
	val = encodeURI(val);
	$.ajax("search.php?data=" + val, {
		success : maj_resultats,
		method : "GET"
	});
}

/**
 * add a result ligne
 * @date date formated !
 * @param img : right image for delete/save
 * @param onClick : function triggered when img is clicked
 */
function addResult(url, titre, date, img, onClick) {
	$("#resultats").append('<p class="titre_result"><a class="titre_news" ' +
		'href="' + url + ' " target="_blank">'
		+ decodeEntities(titre) + '</a><span class="date_news">' +
		date + '</span>' +
		'<span class="action_news" onclick="' + onClick + '(this)">' +
		'<img src="' + img + '"/></span></p>');
}

function maj_resultats(res) {
	$("#wait").css("display", "none");
	res = $.parseJSON(res);

	recherche_courante_news = [];
	if (recherches.indexOf(recherche_courante) != -1) {
		recherche_courante_news = JSON.parse(localStorage[recherche_courante]);
	}

	for (var i = 0; i < res.length; i++) {
		var tmp = res[i];
		tmp.date = format(tmp.date);
		var indSaved = recherche_courante_news.findIndex(function(element, index, array) {
			return tmp.titre == element.titre && tmp.date == element.date;
		})
		if (indSaved == -1) {
			addResult(tmp.url, tmp.titre, tmp.date, "horloge15.jpg", "sauver_nouvelle");
		} else {
			addResult(tmp.url, tmp.titre, tmp.date, "disk15.jpg", "supprimer_nouvelle");
		}
	}
}

function get_nouvelle(e) {
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


function sauver_nouvelle(e) {
	$(e).find("img").attr("src", "disk15.jpg");
	$(e).attr("onclick", "supprimer_nouvelle(this)");

	var obj = get_nouvelle(e);

	if (recherche_courante_news.indexOf(obj) == -1) {
		recherche_courante_news.push(obj);
		localStorage[recherche_courante] = JSON.stringify(recherche_courante_news);
	//$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
	}
}

function supprimer_nouvelle(e) {
	var obj = get_nouvelle(e);
	var index = recherche_courante_news.findIndex(function(element, index, array) {
		return element.titre == obj.titre && element.date == obj.date;
	})

	if (researchSelected) {
		$("#resultats").children()[index].remove();
	} else {
		$(e).find("img").attr('src', 'horloge15.jpg');
		$(e).attr('onclick', 'sauver_nouvelle(this)');
	}

	if (index != -1) {
		recherche_courante_news.splice(index, 1);
		localStorage[recherche_courante] = JSON.stringify(recherche_courante_news);
	//$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
	}
}