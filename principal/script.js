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
var playlists;

var currentPlay = {
  num : "",
  titre : "",
  album : "",
  artiste : "",
  htmlele : ""
}

function init(mode){
   body = document.getElementsByTagName('body')[0];
   principal = document.getElementById('principal');
   afficheListe('m');
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
            var temp = createDiv(key,"musicElement",duree);
        }else if(key == "chemin") {
            var chemin = data[i]['chemin'].replace("../../upload/","");
            var temp = createDiv(key,"musicElement",chemin);
        }else{
          // if(key != "id")
            var temp = createDiv(data[i][key],"musicElement",data[i][key]);
        }

      if(temp)
        ligne.appendChild(temp);
    }
    ligne.addEventListener('dblclick',playThis);
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
      if(key != "id"){
        let temp = createDiv(key,key,key);
        barTri.appendChild(temp);
      }
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
    player = new Player(principal);
    playlists = new Playlists();
    element = loadMusic();
    element = afficheMusique();
  }
  // else if (mode === "v"){
  //   element = loadVideo();
  //   element = afficheVideo();
  // }
  principal = createDiv('principal');
  var containerleft = createDiv('containerleft');
  principal.appendChild(containerleft);
  containerleft.appendChild(element);
  player.appendPlayer(containerleft);
  body.appendChild(principal);
  console.log('element : ',element);
  principal.appendChild(containerleft);
  playlists.displayContainer(principal);
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

function findMus(chemin){
  for(let i = 0; i < data.length; i++){
    if(data[i].hasOwnProperty('chemin')){
      if(data[i].chemin == chemin){
        currentPlay.num = data[i].id;
        currentPlay.titre = data[i].titre;
        currentPlay.album = data[i].album;
        currentPlay.artiste = data[i].artiste;
        return true;
      }
    }
  }
  return false;
}

// object
class Player{
  constructor(div){
    this.player = document.createElement('audio');
    this.player.controls = "controls";
    this.player.addEventListener("ended", playnext);
    this.container = createDiv('containerAudio');
    this.container.appendChild(this.player);
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
  appendPlayer(div){
    div.appendChild(this.container);
  }
}


// event listerner function
function playThis(event){
  console.log(this);
  var reset = document.getElementsByClassName('playing');
  if(reset != [] && reset != undefined);
  for (var i = 0; i < reset.length; i++) {
    reset[i].className = "ligne";
  }
  this.className += " playing";
  var source = this.dataset.chemin;
  if(!findMus(source)){
    console.log("Error : track not found, source : ",source);
  }
  currentPlay.htmlele = this;
  player.setSource(source);
  player.play();
  console.log("playing : ", source);
}

function playnext(event){
  console.log(event);
  var next = currentPlay.htmlele.nextElementSibling;
  console.log("next = ", next);
  if(next){
    var source = next.dataset.chemin;
    player.setSource(source);
    player.play();
    console.log("playing : ", source);
    if(!findMus(source)){
      console.log("Error : track not found, source : ",source);
    }
    currentPlay.htmlele = currentPlay.htmlele.nextElementSibling;
    var reset = document.getElementsByClassName('playing');
    if(reset != [] && reset != undefined);
    for (var i = 0; i < reset.length; i++) {
      reset[i].className = "ligne";
    }
    next.className += " playing";
  }


}
