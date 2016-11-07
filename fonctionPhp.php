<?php
// require("config.php");

function majJson($bdd){
  $mus = $bdd->query('SELECT id,titre,album,artiste,chemin,duree,nbrdecoute,derniereLecture FROM musique');

  $donneeMusique = [];
  // $donneeVideo = [];
  while($donnee = $mus->fetch()){
    array_push($donneeMusique, $donnee);
  }

  $transmitMus = fopen('donneeMusique.json','w');
  $triMusique = [];
    $triage = function($value,$key){
        if(!(preg_match_all("/\d/",$key) === 1)){
          return $value;
        }
    };
  // tri des clé inutile des query SQL, retounant les valeur en double
  foreach ($donneeMusique as $key => $value) {
    array_push($triMusique,array_filter($value,$triage,ARRAY_FILTER_USE_BOTH));
  }

  // encodage et ecriture des donnée musique
  $tmp = json_encode($triMusique);
  $error = fputs($transmitMus, $tmp);
  fclose($transmitMus);
  echo "mise a jour terminer";
};

 ?>
