class Playlists{
  constructor(){
    this.container = this.containerPlaylist();
    this.buttonAddPlaylist = createDiv('addPlaylist','playlistButton','add');
    this.buttonAddPlaylist.addEventListener('click',this.createPlaylist.bind(this));
    this.container.appendChild(this.buttonAddPlaylist);
    this.tabPlaylists = [];
    this.playlistCounter = 0;
    this.backButtonDisplayed = false;
    this.backButton = createDiv('buttonBack','playlistButton','retour');
    this.backButton.addEventListener('click',backHome);
    this.backButton.style.maxHeight = "0";
    this.container.appendChild(this.backButton);

  }
  containerPlaylist(){
    var div = createDiv('playlistContainer');
    return div;
  }
  displayContainer(ele){
    ele.appendChild(this.container);
  }
  createPlaylist(){
    console.log("make your playlist");
    this.afgFormulaire();
    this.playlistCounter++;
  }
  getPlaylists(){
    return this.tabPlaylists;
  }
  afgFormulaire(){
    this.divPrinc = createDiv('playtlistMaker');
    this.inputName = document.createElement('input');
    this.inputName.id = "inputName";
    this.inputName.type = "text";
    this.inputName.name = "name";
    this.buttonOk = document.createElement('button');
    this.buttonOk.innerText = "create";
    this.buttonOk.addEventListener('click',this.submit.bind(this));

    this.buttonCancel = document.createElement('button');
    this.buttonCancel.innerText = "cancel";
    this.buttonCancel.addEventListener('click',this.cancel.bind(this));
    this.divPrinc.appendChild(this.inputName);
    this.divPrinc.appendChild(this.buttonOk);
    this.divPrinc.appendChild(this.buttonCancel);


    document.body.appendChild(this.divPrinc);
    this.inputName.autofocus = "autofocus";
  }
  submit(){
      let input = document.getElementById('inputName');
      let name = input.value;
      let tmp = new Playlist(name,this.playlistCounter);
      this.tabPlaylists.push(tmp);
      document.body.removeChild(input.parentElement);
      this.container.appendChild(tmp.htmlele);
      let xhr = new XMLHttpRequest();
      xhr.open('POST','import.php?playlist=true');
      let dataplaylist = JSON.stringify(this);
      console.log("data : "+data);
      xhr.onloadend = function(){
        console.log("response : "+ xhr.responseText);
      }
      xhr.send(dataplaylist);
  }
  cancel(){
    document.body.removeChild(this.inputName.parentElement);
  }
  afficheBackButton(data){
    if(!this.backButtonDisplayed){
      this.backButton.style.maxHeight = "5vmin";
      this.backButtonDisplayed = true;
    }
  }
}

class Playlist{
  constructor(nom,id){
    this.nom = nom;
    this.idPlaylist = id;
    this.tabMus = [];
    this.htmlele = document.createElement('p');
    this.htmlele.id = nom;
    this.htmlele.dataset.idPlaylist = id;
    this.htmlele.dataset.namePlaylist = nom;
    this.htmlele.className = "playlist";
    this.htmlele.innerText = nom;
    // this.createHtmlEle();
  }
  createHtmlEle(playlists){
    // let span = document.createElement('span');
    // span.id = this.nom;
    // span.innerText = this.nom;
    // span.className = "playlists";
    // playlists.addPlaylist(this);
    playlists.container.appendChild(this.htmlele);
    // return span;
  }
  getHtmlEle(){
    return this.htmlele;
  }
}

function displayPlaylist(event){
  for (var i = 0; i < playlists.tabPlaylists.length; i++) {
    let tmp = playlists.tabPlaylists[i].htmlele.className;
    playlists.tabPlaylists[i].htmlele.className = tmp.replace(" selectedPlaylist","");
  }
  let idP = this.dataset.idPlaylist;
  this.className += " selectedPlaylist";

  ajax('POST','import.php?getPlaylist=true',handlePlaylist,'playlistid='+idP);
}

class musique{
  constructor(idMusique){
    this.idMusique = idMusique;
  }
}


class ContextMenu{
  constructor(){
    this.container = createDiv('containerCT','contextMenu');
    this.container.style.position = "absolute";
    this.container.style.display = "none";
    this.displayed = false;
    document.body.appendChild(this.container);
  }
  displayIt(x,y){
    this.container.style.pointerEvents = "all";
    this.container.style.left = x+"px";
    this.container.style.top = y+"px";
    this.container.style.display = "block";
    this.displayed = true;
  }
  hide(){
    if(this.displayed){
      this.container.style.display = "none";
      this.container.style.pointerEvents = "none";
      this.displayed = false;
    }
  }
}


class ContextMenuMusique extends ContextMenu{
  constructor(){
    super();
    this.play = createDiv('playCT','itemCT','play');
    this.addToPlaylist = createDiv('addCT','itemCT','add to :');
    this.addToPlaylist.addEventListener('mouseenter',this.showPlaylist.bind(this));
    this.addToPlaylist.addEventListener('mouseleave',this.hidePlaylist.bind(this));

    this.containerPlaylist = createDiv('containerPlaylistCT');
    this.containerPlaylist.style.display = "none";
    this.containerPlaylist.style.flexDirection = "column";
    this.containerPlaylist.addEventListener('mouseenter',this.showPlaylist.bind(this));
    this.containerPlaylist.addEventListener('mouseleave',this.hidePlaylist.bind(this));

    // this.container.appendChild(this.play);
    this.container.appendChild(this.containerPlaylist);
    this.container.appendChild(this.addToPlaylist);
  }
  setContainerPlaylist(tabPlaylists){
    tabPlaylists.forEach(function(ele){
      if(ele.hasOwnProperty('htmlele')){
        let tmp = ele.htmlele.cloneNode(true);
        tmp.addEventListener('click',addTo);
        this.containerPlaylist.appendChild(tmp);

      }
      else
        console.log('received object is invalid : missing property htmlele');
    }.bind(this));
  }

  showPlaylist(){
    this.containerPlaylist.style.display = "flex";
  }
  hidePlaylist(){
    this.containerPlaylist.style.display = "none";
  }
}

//
class ContextMenuPlaylist extends ContextMenu{
  constructor(){
      super();
      this.delete = createDiv('deletePlaylist','itemCT',"delete");
      this.delete.addEventListener('click',this.deletePlaylist.bind(this));
      this.container.appendChild(this.delete);
  }
  deletePlaylist(event){
    let _this = event.target;
    if (confirm("Etes vous sure ?")) {
      console.log("ye suis la");
      ajax('POST','import.php?deletePlaylist=true',function(){},'idPlaylist='+_this.dataset.idPlaylist);
      _this.parentElement.removeChild(_this);
    }
  }

}

//
// FIN DES CLASS
//
//

function contextMenuPlaylist(event){
  event.preventDefault();
  ctp.displayIt(event.clientX,event.clientY);
}

function backHome(event){
    //hide back button
    this.style.maxHeight = "0";

    for (var i = 0; i < playlists.tabPlaylists.length; i++) {
      let tmp = playlists.tabPlaylists[i].htmlele.className;
      playlists.tabPlaylists[i].htmlele.className = tmp.replace(" selectedPlaylist","");
    }
    playlists.backButtonDisplayed = false;
    var ancient = document.getElementById('listePrincipal');
    var newOne = ancient.cloneNode(false);
    var parent = ancient.parentElement;
    parent.removeChild(ancient);
    newOne = createListe(newOne);
    parent.appendChild(newOne);
}

function handlePlaylist(e){
  let response = JSON.parse(this.responseText);
  let playlistMus = data.filter(function(obj){
    for (var i = 0; i < response.length; i++) {
      if(obj['id'] == response[i]['idMusique']){
        return obj;
      }
    }

  });
  let liste = document.getElementById('listePrincipal');
  liste.parentElement.removeChild(liste);
  aficheTabmus(playlistMus);
  playlists.afficheBackButton();
}
