<?php
session_start();
require("../config.php");
$req = $bdd->query('SELECT * FROM testM');

$donneeMusique = [];
while($donnee = $req->fetch()){
  array_push($donneeMusique, $donnee);
}
?>
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <?php include("../importCommun.php");?>
  </head>
  <body>
    <div class="principal">
      <?php if(isset($_SESSION['pseudo'])){
        echo "<p>Bienvenue ".$_SESSION['pseudo']."</p>";
      }else{
        echo "<h1>Vous n'avez pas etez authentifier correctement</h1>";
      }?>
        <div class="container">
            <div class="boutonAcces" id="accesVideo"></div>
            <div class="boutonAcces" id="accesMusique"></div>
      </div>
    </div>

    <script src="script.js" charset="utf-8"></script>
</body>
</html>
