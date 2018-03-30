var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

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
})

function ajouter_recherche() {
	var val = $("#zone_saisie").val();
	if(recherches.indexOf(val) == -1) {
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
  localStorage.recherches = JSON.stringify(recherches);
  //$.removeCookie("recherches");
  //$.cookie("recherches", JSON.stringify(recherches), { expires: 1000});
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

function get_nouvelle(e) {
  if(typeof(e) == typeof("hey")) {    //si e est un objet JSON qui a été stringify
    var obj = JSON.parse(e);
  }
  else {                             //sinon e est un DOM element
    var e = $(e);
  	var obj = { titre:e.parent().children(".titre_news").html(),
                date:e.parent().children(".date_news").html(),
                url:e.parent().children(".titre_news").attr("href") };
  }

  return obj;                        //renvoie la nouvelle sous forme d'objet js
}


function sauver_nouvelle(e) {

  $(e).find("img").attr("src", "disk15.jpg");
	$(e).attr("onclick", "supprimer_nouvelle(this)");

  var obj = get_nouvelle(e);

  if(recherche_courante_news.indexOf(obj) == -1) {
    recherche_courante_news.push(obj);
    localStorage.recherche_courante_news = JSON.stringify(recherche_courante_news);
    //$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
  }
}

function supprimer_nouvelle(e) {
	$(e).find("img").attr('src', 'horloge15.jpg');
	$(e).attr('onclick', 'sauver_nouvelle(this)');

	var obj = get_nouvelle(e);
  obj = JSON.stringify(obj);


	var index = recherche_courante_news.indexOf(obj);
	if (index != -1) {
		recherche_courante_news.splice(index, 1);
    localStorage.recherche_courante_news = recherche_courante_news;
    //$.cookie($("#zone_saisie").val(), JSON.stringify(recherche_courante_news), { expires:1000 } );
	}
}
