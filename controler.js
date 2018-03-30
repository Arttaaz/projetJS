/**
 *
 */

$(function() {

	if (localStorage.recherches) {
		model.recherches = JSON.parse(localStorage.recherches);
		view.loadResearches();
	//if ($.cookie("recherches") != undefined) {
	//	recherches = JSON.parse($.cookie("recherches"));
	}

	model.getZoneSaisie().keypress(function(event) {
		if (event.key == "Enter") {
			rechercher_nouvelles();
		}
	});
})

function sauver_nouvelle(e) {
	view.setDisk(e);

	var obj = model.get_nouvelle(e);

	model.saveNouvelle(obj);
}


function supprimer_nouvelle(e) {
	var obj = model.get_nouvelle(e);
	var index = model.findNouvelle(obj);

	if (model.researchSelected) {
		view.clearResults(index);
	} else {
		view.setDefault(e);
	}

	if (index != -1) {
		model.recherche_courante_news.splice(index, 1);
		localStorage[model.recherche_courante] = JSON.stringify(model.recherche_courante_news);
	//$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
	}
}


function rechercher_nouvelles() {
	model.researchSelected = false;
	view.clearResults();
	$("#wait").css("display", "block");
	var val = model.getZoneSaisie().val();
	model.recherche_courante = val;
	val = encodeURI(val);
	$.ajax("search.php?data=" + val, {
		success : model.maj_resultats,
		method : "GET"
	});
}

function ajouter_recherche(val) {
	if (val == undefined) {
		val = model.getZoneSaisie().val();
	}

	if (model.recherches.indexOf(val) == -1) {
		model.recherches.push(val);
		$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
			val + "</label><img onclick=\"supprimer_recherche(this)\" src=\"" + view.icons.remove + "\" class=\"icone-croix\"/> </p>");
		localStorage.recherches = JSON.stringify(model.recherches);
	//$.cookie("recherches", JSON.stringify(recherches), { expires: 1000});
	}
}

function supprimer_recherche(e) {
	var val = $(e).prev().html();
	var index = model.recherches.indexOf(val);
	model.recherches.splice(index, 1);
	model.recherche_courante_news = [];
	localStorage[val] = undefined;
	localStorage.recherches = JSON.stringify(model.recherches);
	view.supprimer_recherche(e);
//$.removeCookie("recherches");
//$.cookie("recherches", JSON.stringify(recherches), { expires: 1000});
}

function selectionner_recherche(e) {
	model.researchSelected = true;
	var text = $(e).html();
	model.getZoneSaisie().val(text);
	model.recherche_courante = text;

	view.clearResults();
	model.recherche_courante_news = JSON.parse(localStorage[model.recherche_courante]);
	for (var i = 0; i < model.recherche_courante_news.length; i++) {
		nouvTmp = model.recherche_courante_news[i];
		view.addResult(nouvTmp.url, nouvTmp.titre, nouvTmp.date, view.icons.remove, "supprimer_nouvelle");
	}
}
