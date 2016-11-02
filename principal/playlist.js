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
  // addPlaylist(playlist,name){
  //   this.playlistCounter++;
  //   this.tabPlaylist.push({"name" : playlist});
  // }
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

    this.divPrinc.appendChild(this.inputName);
    this.divPrinc.appendChild(this.buttonOk);

    document.body.appendChild(this.divPrinc);
  }
  submit(){
      let input = document.getElementById('inputName');
      let name = input.value;
      let tmp = new Playlist(name,this.playlistCounter);
      this.tabPlaylists.push(tmp);
      document.body.removeChild(input.parentElement);
      this.container.appendChild(tmp.htmlele);
  }
}


function  afgFormulaire(){
    divPrinc = createDiv('playtlistMaker');
    inputName = document.createElement('input');
    inputName.id = "inputName";
    inputName.type = "text";
    inputName.name = "name";
    buttonOk = document.createElement('button');
    buttonOk.innerText = "create";
    buttonOk.addEventListener('click',playlists.submit);

    divPrinc.appendChild(this.inputName);
    divPrinc.appendChild(this.buttonOk);

    document.body.appendChild(this.divPrinc);
  }

function submit(playlists){
      let input = document.getElementById('inputName');
      let name = input.value;
      playlists.tabPlaylist.push(new Playlist(name,this.playlistCounter));
  }

class Playlist{
  constructor(nom,id){
    this.nom = nom;
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
