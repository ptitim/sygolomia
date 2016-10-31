class Playlists{
  constructor(){
    this.container = this.containerPlaylist();
    this.tabPlaylist = [];
    this.playlistCounter = 0;
  }
  containerPlaylist(){
    var div = createDiv('playlistContainer','','Je suis le container playlist');
    return div;
  }
  displayContainer(ele){
    ele.appendChild(this.container);
  }
  // addPlaylist(playlist,name){
  //   this.playlistCounter++;
  //   this.tabPlaylist.push({"name" : playlist});
  // }
  createPlaylist(name){
    this.playlistCounter++;
    this.tabPlaylist.push(new Playlist(name, this));
  }
  getPlaylists(){
    return this.tabPlaylist;
  }
}

class Playlist{
  constructor(nom,obj){
    this.nom = nom;
    this.tabMus = [];
    this.htmlele = this.createHtmlEle(obj);
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
