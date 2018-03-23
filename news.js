var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{


	var recherche = document.getElementById("zone_saisie");
	recherches.push(recherche);
	localStorage.recherches = JSON.stringify(recherches);
}

function supprimer_recherche(e)
{
	


	var rechercheASuppr = $('.titre-recherche > label').text();

	for (var i = 0; i < recherches.length; i++) {
		if (recherches[i] == rechercheASuppr) {
			recherches.splice(i - 1, 1);
			localStorage.recherches = JSON.stringify(recherches);
		}
	}
}


function selectionner_recherche(e)
{

}


function init()
{
	if (localStorage.recherches) {
		recherches = JSON.parse(localStorage.recherches);
	}
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

}
