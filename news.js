var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)
$(function() {
  if (localStorage.recherches) {
		recherches = JSON.parse(localStorage.recherches);
		for (var i = 0; i < recherches.length; i++) {
			$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
			recherches[i] + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
		}
	}
})
function ajouter_recherche() {
	var val = $("#zone_saisie").val();
	if(recherches.indexOf(val) == -1) {
		recherches.push(val);
		$("#recherches-stockees").append("<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" +
		val + "</label><img onclick=\"supprimer_recherche(this)\" src=\"croix30.jpg\" class=\"icone-croix\"/> </p>");
    localStorage.recherches = JSON.stringify(recherches);
	}
}

function supprimer_recherche(e) {
	var val = $(e).prev().html();
	var index = recherches.indexOf(val);
	recherches.splice(index, 1);
  localStorage.recherches = JSON.stringify(recherches);
	$(e).parent().remove();
}


function selectionner_recherche(e) {
	var text = $(e).html();
	$("#zone_saisie").val(text);
	recherche_courante = text;
}


function rechercher_nouvelles()
{
	$("#resultats").children().remove();
	$("#wait").css("display", "block");
	var val = $("#zone_saisie").val();
	val = encodeURI(val);
	$.ajax("search.php?data="+val, {
		success:maj_resultats,
		method:"GET"
	});
}


function maj_resultats(res)
{
	$("#wait").css("display", "none");
	res = $.parseJSON(res);
	console.log(res);

	for (var i = 0; i < res.length; i++) {
		var tmp = res[i];
		$("#resultats").append('<p class="titre_result"><a class="titre_news" '+
				'href="' + tmp.url +' " target="_blank">'
				+ decodeEntities(tmp.titre)+ '</a><span class="date_news">' +
				format(tmp.date)+'</span>'+
				'<span class="action_news" onclick="sauver_nouvelle(this)">'+
				'<img src="horloge15.jpg"/></span></p>');
	}
}


function sauver_nouvelle(e) {
	var e = $(e);
	e.find("img").attr("src", "disk15.jpg");
	e.attr("onclick", "supprimer_nouvelle(this)");

	var obj = {"titre"= }
}


function supprimer_nouvelle(e)
{

}


