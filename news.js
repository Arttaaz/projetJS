var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{

}

function supprimer_recherche(e)
{


}


function selectionner_recherche(e)
{

}


function init()
{

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


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}












