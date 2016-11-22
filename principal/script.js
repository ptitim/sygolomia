// varibles de devellopement
var activResearch = true;

//
// Variable Globales
//
var data = "";
var playlistData = "";
var body;
var principal;
var player;
var playlists;
var ctm;
var ctp;

var currentPlay = {
  num : "",
  titre : "",
  album : "",
  artiste : "",
  htmlele : ""
}
//
// FIN des Variable globales
//

//
// requete Ajax
//
function loadData(url){
    var xhr = new XMLHttpRequest();
    xhr.onloadend = function(){data = JSON.parse(xhr.responseText); return data};
    xhr.open("GET",url,false);
    xhr.onerror = function(){console.log("Erreur requete xhtml")};
    xhr.send(null);
}

function loadPlaylist(url){
  ajax('POST',url,function(){
    playlistData = JSON.parse(this.responseText);
    affichePlaylist();
    ctm.setContainerPlaylist(playlists.tabPlaylists);
  },"playlists=true");
}

function ajax(type,url,callback,send){
  let xhr = new XMLHttpRequest();
  let verif = true;
  if(type == "POST" && url!= ""){
    xhr.open(type,url,true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  }else if(type == "GET" && url != ""){
    xhr.open(type,url,true);
  }else {
    alert("Error ajax type is incorect");
    verif= false;
  }
  if(verif){
    xhr.onloadend = callback.bind(xhr);
    xhr.send(send);
  }
  return verif;
}
//
// FIN des requete ajax
//

function init(mode){
   body = document.getElementsByTagName('body')[0];
   principal = document.getElementById('principal');
   // add event listenr keypress on window
   addEventListenerKeybord();
   afficheListe('m');
   loadPlaylist("http://localhost/sygolomia/principal/createJson.php");
   ctm = new ContextMenuMusique();
   ctp = new ContextMenuPlaylist();
   window.addEventListener('click',link);
    // afficheAcceuil();
}

function createListe(listePrincipal){
  for (let i = 0; i < data.length; i++) {
    // let ligne = createDiv('','ligne');
    let ligne = document.createElement('tr');
    ligne.className = "ligne";

    ligne.draggable = 'true';
    ligne.dataset.chemin = data[i]['chemin'];
    ligne.dataset.idTrack = data[i]['id'];
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
          if(key != "id" && key != "htmlele"){
            var temp = document.createElement('td');
            temp.className = "bartri "+key;
            temp.innerText = data[i][key];
            // var temp = createDiv(data[i][key],"bartri musicElement",data[i][key]);
            ligne.appendChild(temp);
          }
        }
      // if(temp)
      //   ligne.appendChild(temp);
    }
    data[i]['htmlele'] = ligne;
    ligne.draggable = "true";
    ligne.addEventListener('dblclick',playThis);
    ligne.addEventListener('contextmenu',diplayContextMenuTrack);

    ligne.addEventListener('dragstart',dragStartTrack);
    ligne.addEventListener('dragend',dragEndTrack);

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
    let temp = new Playlist(playlistData[i].nom, playlistData[i].idPlaylist);
    playlists.tabPlaylists.push(temp);
    temp.createHtmlEle(playlists);
    temp.htmlele.addEventListener('click',displayPlaylist);
    temp.htmlele.style.order = i+3;
    temp.htmlele.addEventListener('contextmenu',contextMenuPlaylist);
    temp.htmlele.addEventListener('dragover',dragoverPlaylist);
    temp.htmlele.addEventListener('dragenter',dragenterPlaylist);
    temp.htmlele.addEventListener('dragleave',dragleavePlaylist);
    temp.htmlele.addEventListener('drop',dragdropPlaylist);
  }
  playlists.playlistCounter = playlistData[playlistData.length -1].idPlaylist;
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

function getTrack(chemin){
  for(let i = 0; i < data.length; i++){
    if(data[i].hasOwnProperty('chemin')){
      if(data[i].chemin == chemin){
        return data[i];
      }
    }
  }
}

//
// object
//
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
    this.goto = createDiv('goto','audioButton',"go to played");
    this.goto.addEventListener('click',this.gotoPlayed);
    // afficheur des information du titre jouer
    this.afficheur = createDiv('afficheur');

    this.titreDiv = createDiv('','afg');
    let tmp = document.createElement('span');
    tmp.id = "afgSpanTitre"; tmp.className = "afg";
    tmp.innerText = 'titre : ';
    this.titre = createDiv('afgTitre','afg');
    this.titreDiv.appendChild(tmp);
    this.titreDiv.appendChild(this.titre);

    this.albumDiv = createDiv('','afg');
    tmp = document.createElement('span');
    tmp.id = "afgSpanAlbum"; tmp.className = "afg";
    tmp.innerText = 'album : ';
    this.album = createDiv('afgAlbum','afg');
    this.albumDiv.appendChild(tmp);
    this.albumDiv.appendChild(this.album);

    this.afficheur.appendChild(this.titreDiv);
    this.afficheur.appendChild(this.albumDiv);

    this.container = createDiv('containerAudio');
    this.container.appendChild(this.player);
    this.container.appendChild(this.nexts);
    this.container.appendChild(this.goto);
    this.container.appendChild(this.previouss);
    this.container.appendChild(this.afficheur);
    if(activResearch == true)
      this.container.appendChild(this.displayResearch());
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
    this.titre.innerText = currentPlay.titre;
    this.album.innerText = currentPlay.album;
  }
  displayResearch(){
    this.containerResearch = createDiv('containerResearch');
    this.textResearch = createDiv ('textResearch','itemResearch','Rechercher :');
    this.inputResearch = document.createElement('input');
    this.inputResearch.id = 'inputResearch';
    this.inputResearch.className = 'itemResearch';
    this.inputResearch.type = "text";

    this.inputResearch.addEventListener('focus',removeEventListenerKeybord);
    this.inputResearch.addEventListener('blur',addEventListenerKeybord);
    this.inputResearch.addEventListener('keyup',research);

    this.containerResearch.appendChild(this.textResearch);
    this.containerResearch.appendChild(this.inputResearch);
    return this.containerResearch;
  }
  gotoPlayed(event){
    currentPlay.htmlele.scrollIntoView(currentPlay.htmlele.parentElement);
  }
}

//
// FIN des objet
//

//
// event listerner function
//
var timeoutStock;
function research(event){
  window.clearTimeout(timeoutStock);
  timeoutStock = window.setTimeout(testTruc,400);
}

function testTruc(){
  let textResearch = document.getElementById('inputResearch').value;
  if (textResearch == ""){
    backHome();
  }else {
    ajax('POST','research.php',handleResearch,'text='+textResearch);
  }
}


function handleResearch(){
  let response = JSON.parse(this.responseText);
  let playlistMus = data.filter(function(obj){
    for (var i = 0; i < response.length; i++) {
      if(obj['id'] == response[i]['id']){
        return obj;
      }
    }

  });
  let liste = document.getElementById('listePrincipal');
  aficheTabmus(playlistMus);
  liste.parentElement.removeChild(liste);
  playlists.afficheBackButton();
}

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
    console.log("Error incorect mode, function nextTrack");
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
    event.preventDefault();
    changeTrack('next');
    let next = document.getElementById('next');
    next.className += " hoverJs";
    setTimeout(function(){next.className = next.className.replace(" hoverJs","")},1000);
  }else if (event.key == "p" || event.key == "keyp" || event.key == "ArrowLeft") {
    changeTrack('previous');
    let previous = document.getElementById('previous');
    previous.className += " hoverJs";
    setTimeout(function(){previous.className = previous.className.replace(" hoverJs","")},1000);
    event.preventDefault();
  }else if (event.key == " ") {
    event.preventDefault();
    player.playPause();
  }else if (event.key == "m") {
    event.preventDefault();
    player.mute();
  }
}

function diplayContextMenuTrack(event){
  event.preventDefault();
  currentSelection.idTrack = this.dataset.idTrack;
  currentSelection.chemin = this.dataset.chemin;
  currentSelection.htmlele = this;
  let x = event.clientX; let y = event.clientY;
  ctm.displayIt(x,y);
  currentSelection.htmlele.id += "selected";
}

// hide the contexts menu
function link(){
  if(currentSelection.htmlele != ""){
    ctm.hide();
    currentSelection.htmlele.id = currentSelection.htmlele.id.replace("selected","");
  }
  ctp.hide();
}

var currentSelection = {
  idTrack : "",
  chemin : "",
  htmlele: ""
}
var a;
function addTo(event){
  a=this;
  let idP = this.dataset.namePlaylist;
  var htmlele = document.getElementById(idP);

  htmlele.className += " selectedPlaylist";
  setTimeout(function(){
    htmlele.className = htmlele.className.replace(" selectedPlaylist","");
  }, 800);
  let tmp = "idPlaylist="+this.dataset.idPlaylist+"&name="+this.dataset.namePlaylist+"&idTrack="+currentSelection.idTrack;
  ajax('POST','import.php?addTo=true',handleResponseAddTo,tmp);
}

function handleResponseAddTo(bool){
  if(this.responseText == "true"){
    currentSelection.htmlele.style.transition = "all 1s linear";
    currentSelection.htmlele.style.backgroundColor = "rgb(83, 177, 55)";
    setTimeout(function(){currentSelection.htmlele.style.backgroundColor = "transparent";},800);
    setTimeout(function(){currentSelection.htmlele.id = currentSelection.htmlele.id.replace('selected','');},1200);
  }
  else {
    alert("Error track not added");
  }
}

function aficheTabmus(tab){
  playlistTransition();
  setTimeout(function(){
    let tbody = document.createElement('tbody');
    let liste = document.getElementById('liste');
    tbody.id= "listePrincipal";
    for (var i = 0; i < tab.length; i++) {
      tbody.appendChild(tab[i].htmlele);
    }
    liste.appendChild(tbody);
  },400);

}

//drag function

function dragoverPlaylist(event){
  event.preventDefault();
}

function dragStartTrack(event){
  // event.preventDefault();

  currentSelection.idTrack = this.dataset.idTrack;
  currentSelection.chemin = this.dataset.chemin;
  currentSelection.htmlele = this;
  currentSelection.htmlele.id += "selected";
  event.dataTransfer.setData('selection',currentSelection);

}
function dragEndTrack(event){
  event.preventDefault();
  currentSelection.htmlele.id = currentSelection.htmlele.id.replace("selected","");
}

function dragenterPlaylist(event){
  event.preventDefault();

  this.className += " selectedPlaylist";
  currentPlaylistSelected.htmlele = this;
  currentPlaylistSelected.idPlaylist = this.dataset.idPlaylist;
  currentPlaylistSelected.playlistName = this.dataset.namePlaylist;
}

function dragleavePlaylist(event){
  event.preventDefault();

  this.style.border = "";

  this.className = this.className.replace("selectedPlaylist","");
  currentPlaylistSelected.htmlele = "";
  currentPlaylistSelected.idPlaylist = "";
  currentPlaylistSelected.playlistName = "";
}

function dragdropPlaylist(event){
  event.preventDefault();
  this.className = this.className.replace('selectedPlaylist','');

  let tmp = "idPlaylist="+this.dataset.idPlaylist+"&name="+this.dataset.namePlaylist+"&idTrack="+currentSelection.idTrack;
  ajax('POST','import.php?addTo=true',handleResponseAddTo,tmp);
}
// end of drag function
//

function playlistTransition(){
  let liste = document.getElementById('liste');
  let bartri = document.getElementById('bartri');
  liste.style.height = bartri.offsetHeight.toString()+"px";
  setTimeout(function(){
    liste.style.height = "100%"},600);
}
// FIN des event listener
//

//
// Gestion des ecoute clavier sur la fenetre
//
function removeEventListenerKeybord(){
  console.log('remove keyListener');
  window.removeEventListener('keypress',changeSongKeybord);
}
function addEventListenerKeybord(){
  console.log('add keyListener');
  window.addEventListener('keypress',changeSongKeybord);
}
