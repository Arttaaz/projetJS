/**
 *
 */

var view = {};


view.supprimer_recherche = function(e) {
	$(e).parent().remove();
}

view.clearResults = function(index) {
	if (index != undefined) {
		$("#resultats").children()[index].remove();
	} else {
		$("#resultats").children().remove();
	}
}

view.loadResearches = function() {
	for (var i = 0; i < model.recherches.length; i++) {
		$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
			model.recherches[i] + "</label><img onclick=\"supprimer_recherche(this)\" src=\"" + view.icons.remove + "\" class=\"icone-croix\"/> </p>");
	}
}

view.icons = {
	def : 'horloge15.jpg',
	remove : "croix30.jpg",
	saved : "disk15.jpg"
}


view.setDisk = function(e) {
	$(e).find("img").attr("src", view.icons.saved);
	$(e).attr("onclick", "supprimer_nouvelle(this)");
}

view.setDefault = function(e) {
	$(e).find("img").attr('src', view.icons.def);
	$(e).attr('onclick', 'sauver_nouvelle(this)');
}

/**
 * add a result ligne
 * @date date formated !
 * @param img : right image for delete/save
 * @param onClick : function triggered when img is clicked
 */
view.addResult = function(url, titre, date, img, onClick) {
	$("#resultats").append('<p class="titre_result"><a class="titre_news" ' +
		'href="' + url + ' " target="_blank">'
		+ decodeEntities(titre) + '</a><span class="date_news">' +
		date + '</span>' +
		'<span class="action_news" onclick="' + onClick + '(this)">' +
		'<img src="' + img + '"/></span></p>');
}