<script src="script.js" charset="utf-8"></script>
<script src="playlist.js" charset="utf-8"></script>

<div class="navbar">
    <span><?php echo $_SESSION['pseudo'] ?></span>
    <div class="menu">
      <a href="index.php"><span id="acceuil" class="hoverThing containedItems" onclick="afficheAcceuil()">Acceuil</span></a>
      <!-- <div id="menuVideo" class="hoverThing">
          Video
          <div class="containMenu" id="containVideo">
            <span id="accesVideo" class="hoverThing containedItems" onclick="afficheListe(event={target:this})" data-mode="v">acces Video</span>
            <span id="importVideo" class="hoverThing containedItems">importer une video</span>
            <span id="importsVideo" class="hoverThing containedItems">importer des videos</span>
          </div>
        </div> -->
        <div id="menuMusique" class="hoverThing">
          <!-- Musique -->
          Upload
          <div class="containMenu" id="containMusique">
              <!-- <span id="accesMusique" class="hoverThing containedItems" onclick="afficheListe(event={target:this})" data-mode="m">acces Musique</span> -->
              <a href="importMusique.php"><span id="importMusique" class="hoverThing containedItems">envoyer une musique</span></a>
              <span id="importsMusique" class="hoverThing containedItems">envoyer des musiques</span>
          </div>
        </div>
        <a href="deconexion.php" class="hoverThing" id="deconnexion">deconnexion</a>
    </div>
</div>
