class Playlists{
  constructor(){
    this.container = this.containerPlaylist();
    this.buttonAddPlaylist = createDiv('addPlaylist','playlistButton','add');
    this.buttonAddPlaylist.addEventListener('click',this.createPlaylist.bind(this));
    this.container.appendChild(this.buttonAddPlaylist);
    this.tabPlaylists = [];
    this.playlistCounter = 0;
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
}

class Playlist{
  constructor(nom,id){
    this.nom = nom;
    this.idPlaylist = id;
    this.tabMus = [];
    this.htmlele = document.createElement('p');
    this.htmlele.id = nom;
    this.htmlele.className = "playlist";
    this.htmlele.innerText = nom;
  }
  createHtmlEle(playlists){
    let span = document.createElement('span');
    span.id = this.nom;
    span.innerText = this.nom;
    span.className = "playlists";
    // playlists.addPlaylist(this);
    playlists.container.appendChild(span);
    return span;
  }

}

class musique{
  constructor(idMusique){
    this.idMusique = idMusique;
  }
}
