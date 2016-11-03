var data = "";
var playlistData = "";
function loadData(url){
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function(){data = JSON.parse(xhr.responseText); return data};
    xhr.open("GET",url,false);
    xhr.onerror = function(){console.log("Erreur requete xhtml")};
    xhr.send(null);
}
function loadPlaylist(url){
  var requete = new XMLHttpRequest();
  requete.onloadend = function(){
    playlistData = JSON.parse(requete.responseText);
    console.log(requete.responseText);
    affichePlaylist();
    return playlistData;
  };
  requete.open('GET',url,true);
  requete.onerror = function(){console.log("Erreur chargment playlist")};
  requete.send(null);
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
   window.addEventListener('keypress',changeSongKeybord);
   afficheListe('m');
   loadPlaylist("http://localhost/sygolomia/principal/playlist.json");
    // afficheAcceuil();
}

function createListe(listePrincipal){
  for (let i = 0; i < data.length; i++) {
    // let ligne = createDiv('','ligne');
    let ligne = document.createElement('tr');
    ligne.className = "ligne";

    ligne.draggable = 'true';
    ligne.dataset.chemin = data[i]['chemin'];
    for (let key in data[i]) {
        if(key == "duree"){
            var duree = secToString(data[i][key]);
            var temp = document.createElement('td');
            temp.className = "duree";
            temp.innerText = duree;
            // var temp = createDiv(key,key,duree);
            ligne.appendChild(temp);
        }else if(key == "chemin") {
            var chemin = data[i]['chemin'].replace("../../upload/","");
            var temp = document.createElement('td');
            temp.className = "bartri chemin";
            temp.innerText = chemin;
            // var temp = createDiv(key,"bartri musicElement",chemin);
            ligne.appendChild(temp);
        }else{
          if(key != "id"){
            var temp = document.createElement('td');
            temp.className = "bartri";
            temp.innerText = data[i][key];
            // var temp = createDiv(data[i][key],"bartri musicElement",data[i][key]);
            ligne.appendChild(temp);
          }
        }

      // if(temp)
      //   ligne.appendChild(temp);
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

function affichePlaylist(){
  for(let i = 0; i < playlistData.length; i++){
    // TODO: finir la boucle d'affichage des playlist
  }
}


function afficheMusique(){
  resetBody();
  var key, value = '';
  var liste = document.createElement('table');
  liste.id="liste";
  var listePrincipal = document.createElement('tbody');
  listePrincipal.id="listePrincipal";
  var tete = document.createElement('thead');
  var barTri = document.createElement('tr');
  barTri.className = barTri.id = "bartri";
    //creation du menu de tri
    for(key in data[0]){
      if(key != "id"){
        // let temp = createDiv(key,"bartri " + key,key);
        let temp = document.createElement('th');
        temp.className += "bartri " + key;
        temp.innerText = key;
        barTri.appendChild(temp);
      }
    }
  tete.appendChild(barTri);
  listePrincipal = createListe(listePrincipal);
  liste.appendChild(tete);
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
    // controleur audio
    this.player = document.createElement('audio');
    this.player.id = "player";
    this.player.controls = "controls";
    this.player.addEventListener("ended", playnext);
    this.nexts = createDiv('next','audioButton','next');
    this.nexts.addEventListener("click",playnext);
    this.previouss = createDiv('previous','audioButton','previous');
    this.previouss.addEventListener('click',playprevious);
    // afficheur des information du titre jouer
    this.afficheur = createDiv('afficheur');
    this.titre = createDiv('afgTitre','afg','titre : ');
    this.album = createDiv('afgAlbum','afg','album : ');
    this.afficheur.appendChild(this.titre);
    this.afficheur.appendChild(this.album);

    this.container = createDiv('containerAudio');
    this.container.appendChild(this.player);
    this.container.appendChild(this.nexts);
    this.container.appendChild(this.previouss);
    this.container.appendChild(this.afficheur);
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
  playPause(){
    if(this.player.paused){
      if(this.player.src != "" && this.player.src != undefined)
        this.player.play();
    }else if (!this.player.paused) {
        this.player.pause();
    }
  }
  mute(){
    if(this.player.muted){
      this.player.muted = false;
    }else {
      this.player.muted = true;
    }
  }
  setAfficheur(){
    this.titre.innerText = 'titre : '+currentPlay.titre;
    this.album.innerText = 'album : '+currentPlay.album;
  }
}



// event listerner function
function playThis(event){
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
  player.setAfficheur();
}

function playnext(event){
  changeTrack('next');
}

function playprevious(event){
  changeTrack('previous');
}

function changeTrack(mode){
  if(mode == "next"){
    var next = currentPlay.htmlele.nextElementSibling;
    if(currentPlay.htmlele.nextElementSibling)
      currentPlay.htmlele = currentPlay.htmlele.nextElementSibling;
  }
  else if (mode == "previous"){
    var next = currentPlay.htmlele.previousElementSibling;
    if(currentPlay.htmlele.previousElementSibling)
      currentPlay.htmlele = currentPlay.htmlele.previousElementSibling;
  }
  else
    console.log("erreur mode incorect, function nextTrack");

  if(next){
    var source = next.dataset.chemin;
    player.setSource(source);
    player.play();
    console.log("playing : ", source);
    if(!findMus(source)){//findmus reécrit currentplay objet contenant les information du morceaux jouer
      console.log("Error : track not found, source : ",source);
    }
    var reset = document.getElementsByClassName('playing');
    if(reset != [] && reset != undefined);
    for (var i = 0; i < reset.length; i++) {
      reset[i].className = "ligne";
    }
    next.className += " playing";
    player.setAfficheur();
  }
}

function changeSongKeybord(event){
  if(event.key == "n" || event.key == "keyn" || event.key == "ArrowRight"){
    changeTrack('next');
  }else if (event.key == "p" || event.key == "keyp" || event.key == "ArrowLeft") {
    changeTrack('previous');
  }else if (event.key == " ") {
    player.playPause();
  }else if (event.key == "m") {
    player.mute();
  }
}
