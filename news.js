var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

$(function() {
  if (localStorage.recherches) {
		recherches = JSON.parse(localStorage.recherches);
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


}


function maj_resultats(res)
{


}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{
	/*
 <p class="titre_result">
		<a class="titre_news" href="url " target="_blank">titre</a>
		<span class="date_news">date</span>
		<span class="action_news" onclick="sauver_nouvelle(this)">
			< img src="horloge15.jpg"/>
		</span>
	</p>
	*/
	var p = $(e).parent();
	p.find("img").attr('img', 'horloge15.jpg');
	p.find(".action_nexs").attr('onclick', 'sauver_nouvelle(this)');

}
