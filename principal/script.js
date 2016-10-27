var data = "";
function loadData(url){
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function(){data = JSON.parse(xhr.responseText);console.log(xhr.response); return data};

    xhr.open("GET",url,false);
    xhr.onerror = function(){console.log("Erreur requete xhtml")};
    xhr.send(null);
}
var body;
var principal;
var player;

function init(mode){
   body = document.getElementsByTagName('body')[0];
   afficheListe('m');
   player = new Player(principal);
    // afficheAcceuil();
}

function createListe(listePrincipal){
  for (let i = 1; i < data.length; i++) {
    let ligne = createDiv('','ligne');
    ligne.draggable = 'true';
    ligne.dataset.chemin = data[i]['chemin'];
    for (let key in data[i]) {
      if(key == "duree"){
          var duree = secToString(data[i][key]);
          var temp = createDiv(duree,key,duree);
      }else if(key == "chemin") {
          var chemin = data[i]['chemin'].replace("../../upload/","");
          var temp = createDiv(chemin,key,chemin);
      }else{
        var temp = createDiv(data[i][key],key,data[i][key]);
      }

      ligne.appendChild(temp);
    }
    ligne.addEventListener('click',playThis);
    listePrincipal.appendChild(ligne);
  }
  return listePrincipal;
}

function loadMusic(){
  let url = "http://localhost/sygolomia/principal/donneeMusique.json";
  loadData(url);
}

function loadVideo(){
  let url = "http://localhost/sygolomia/principal/donneeMusique.json";
  loadData(url);
}


function afficheMusique(){
  resetBody();
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
  console.log('liste: ',liste);
  return liste;
}

function afficheVideo(){
  resetBody();
}


function afficheListe(event){
  var element;
  let mode = "";
  if(typeof event == "string"){
    mode = event;
  }else if (typeof event == "object") {
    mode = event.target.dataset.mode;
  }
  if(mode === "m"){
    element = loadMusic();
    element = afficheMusique();
  }
  // else if (mode === "v"){
  //   element = loadVideo();
  //   element = afficheVideo();
  // }
  principal = createDiv('principal');
  body.appendChild(principal);
  console.log('element : ',element);
  principal.appendChild(element);
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

function secToString(time){
    var str = "";
    str += Math.floor(time/60);
    str += ":";
    if(time%60 < 10){
      str += "0";
    }
    str += time%60;
    return str;
}

function menuPlaylist(){
  let contain = createDiv('menuPlaylist');
  let biblio = createDiv('biblio','','biblio');
  let containerPlaylist = createDiv('containerPlaylist');
  let boutonCreePlaylist = document.createElement('button');

  boutonCreePlaylist.innerText = '+';
  contain.appendChild(biblio);
  contain.appendChild(containerPlaylist);
  contain.appendChild(boutonCreePlaylist);
}

class Player{
  constructor(div){
    this.player = document.createElement('audio');
    this.player.controls = "controls";
    this.container = createDiv('containerAudio');
    this.container.appendChild(this.player);
    div.appendChild(this.container);
    return this;
  }
  setSource(source){
    this.player.src = source;
  }
  getSource(){
    return this.player.src;
  }
  play(){
    this.player.play();
  }
  pause(){
    this.player.pause();
  }
}


function playThis(event){
  console.log(this);
  var source = this.dataset.chemin;
  player.setSource(source);
  player.play();
  console.log("playing : ", source);
}
