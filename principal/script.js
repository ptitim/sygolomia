var data = "";
function loadData(url){
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function(){data = JSON.parse(xhr.responseText); return data};
    xhr.onerror = function(){console.log("Erreur requete xhtml")};
    xhr.open("GET",url,false);
    xhr.send(null);
}

var body;
var principal;

function createListe(listePrincipal){
  for (let i = 0; i < data.length; i++) {
    let ligne = createDiv('','ligne');
    for (let key in data[i]) {
      console.log("log :", data[i][key]);
      let temp = createDiv(data[i][key],key,data[i][key]);
      ligne.appendChild(temp);
    }
    listePrincipal.appendChild(ligne);
  }
  return listePrincipal;
}


function afficheMusique(){
  resetBody();
  let url = "http://localhost/sygolomia/principal/donneeMusique.json";
  loadData();
  var key, value = '';
  var liste = createDiv('liste');
  var barTri = createDiv('barTri');
  var listePrincipal = createDiv('listePrincipal');
    //creation du menu de tri
    for(key in data[0]){
      let temp = createDiv(key,key,key);
      barTri.appendChild(temp);
    }
  listePrincipal = createListe(listePrincipal);
  liste.appendChild(barTri);
  liste.appendChild(listePrincipal);
  return liste;

}

function afficheVideo(){
  resetBody();
  let url = "http://localhost/sygolomia/principal/donneeMusique.json";
  loadData();
}


function afficheListe(event){
  var element;
  if(event.target.dataset.mode === "m" )
    element = afficheMusique();
  else if (event.target.dataset.mode == "v")
    element = afficheVideo();

  principal = createDiv('principal');
  principal.appendChild(element);
  body.appendChild(principal);
}



function createDiv(id,classe,texte){
    var div = document.createElement('div');
    if(typeof id == 'string')
      div.id = id;

    if(typeof classe == 'string')
      div.className = classe;

    if(typeof texte == 'string')
      div.innerText = texte;

    return div;
}

function init(){
   body = document.getElementsByTagName('body')[0];
   loadData();
}

function afficheAcceuil(){
    resetBody();
    principal = createDiv('principal');
    body.appendChild(principal);

    var container = createDiv('','container');
    //preparation bouton acces video
    var video = createDiv('accesVideo','boutonAcces');
    video.dataset.mode = "v";
    video.addEventListener("click", afficheListe);
    //preparation bouton d'acces musique
    var musique = createDiv('accesMusique','boutonAcces');
    musique.dataset.mode = "m";
    musique.addEventListener("click", afficheListe);
    // affichage des bouton de selection
    container.appendChild(video);
    container.appendChild(musique);
    principal.appendChild(container);
}


function resetBody(){
    principal = document.getElementById('principal');
    console.log(principal);
    if(principal)
    body.removeChild(principal);
}
