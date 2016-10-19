<?php
require("config.php");

function majJson(){
  $mus = $bdd->query('SELECT titre,album,artiste,chemin,duree,nbrdecoute,derniereLecture FROM '.$tabMusique);
  $vid = $bdd->query('SELECT titre,duree,resolution,genre1,genre2,acteurPrincipal,realisateur,tags,derniereLecture,nbrDeVue FROM '.$tabVideo);

  $donneeMusique = [];
  $donneeVideo = [];
  while($donnee = $mus->fetch()){
    array_push($donneeMusique, $donnee);
  }
  while($donnee = $vid->fetch()){
    array_push($donneeVideo,$donnee);
  }

  $transmitMus = fopen('donneeMusique.json','r+');
  $transmitVid = fopen('donneeVideo.json','r+');
  $triMusique = [];
  $triVideo = [];
    $triage = function($value,$key){
        if(!(preg_match_all("/\d/",$key) === 1)){
          return $value;
        }
    };
  // tri des clé intile des query SQL, retounant les valeur en double
  foreach ($donneeMusique as $key => $value) {
    array_push($triMusique,array_filter($value,$triage,ARRAY_FILTER_USE_BOTH));
  }
  foreach($donneeVideo as $key => $value){
    array_push($triVideo ,array_filter($value,$triage,ARRAY_FILTER_USE_BOTH));
  }
  // encodage et ecriture des donnée musique
  $tmp = json_encode($triMusique);
  fputs($transmitMus, $tmp);
  // encodage et ecriture des donnee video
  $tmp = json_encode($triVideo);
  fputs($transmitVid, $tmp);

  fclose($transmitMus);
  fclose($transmitVid);
};

 ?>
