<?php
session_start();
require("../config.php");
$req = $bdd->query('SELECT titre,album,artiste,chemin FROM testM');

$donneeMusique = [];
while($donnee = $req->fetch()){
  array_push($donneeMusique, $donnee);
}
$transmit = fopen('donneeMusique.json','r+');
// $tmp = "{\"DONNEMUSIQUE\":\n";
$test = [];
  $triage = function($value,$key){
      if(!(preg_match_all("/\d/",$key) === 1)){
        return $value;
      }
  };

foreach ($donneeMusique as $key => $value) {
  array_push($test,array_filter($value,$triage,ARRAY_FILTER_USE_BOTH));
}
$tmp = json_encode($test);

fputs($transmit, $tmp);


fclose($transmit);
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
