<div class="navbar">
    <div class="menu">
      <span id="acceuil" class="hoverThing"onclick="afficheAcceuil()">acceuil</span>
      <div id="menuVideo" class="hoverThing">
          Video
          <div class="containMenu" id="containVideo">
            <span id="accesVideo" class="hoverThing containedItems" onclick="afficheListe(event={target:this})" data-mode="v">acces Video</span>
            <span id="importVideo" class="hoverThing containedItems">importer une video</span>
            <span id="importsVideo" class="hoverThing containedItems">importer des videos</span>
          </div>
        </div>
        <div id="menuMusique" class="hoverThing">
          Musique
          <div class="containMenu" id="containMusique">
              <span id="accesMusique" class="hoverThing containedItems" onclick="afficheListe(event={target:this})" data-mode="m">acces Musique</span>
              <span id="importMusique" class="hoverThing containedItems">importer une musique</span>
              <span id="importsMusique" class="hoverThing containedItems">importer des musiques</span>
          </div>
        </div>
        <a href="deconexion.php" class="hoverThing" id="deconnexion">deconnexion</a>
    </div>
</div>
