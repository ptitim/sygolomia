<?php
require("../config.php");
require_once('../../getid3/getid3.php');
require_once('../../getid3/getid3.lib.php');
// import module audio
require('../../getid3/module.audio.mp3.php');
require('../../getid3/module.audio.ogg.php');
// require('../../getid3/module.audio.flac.php');
require('../../getid3/module.audio.midi.php');
require('../../getid3/module.audio.wavpack.php');
// import module video
require('../../getid3/module.audio-video.flv.php');
require('../../getid3/module.audio-video.mpeg.php');

$getID3 = new getID3;
$getID3->encoding = 'UTF-8';

if($_POST['fileType'] === "musique"){
// file
  $fileError = $_FILES['upload']['error'];
  if($fileError === 0){
    $fileName = $_FILES['upload']['name'];
    $fileType = $_FILES['upload']['type'];
    $fileSize = $_FILES['upload']['size'];
    $filetmp_name = $_FILES['upload']['tmp_name'];
  // type
    $type = $_POST['type'];

    $fileInfo = $getID3->analyze($filetmp_name);
    $cheminTransfert = genereChemin($filetmp_name,$fileName, $type,$fileInfo);

    $meta = getMeta($fileInfo,$fileName,$type);
    $upload = $bdd->prepare('INSERT INTO musique (titre,album,artiste,genre,nbrdecoute,duree,type) VALUES (:titre,:album,:artiste,:genre,:nbrdecoute,:duree,:type)');
    $upload->execute($meta);
    echo "chemin ".$cheminTransfert;
    $resultat = move_uploaded_file($_FILES['upload']['tmp_name'], $cheminTransfert);
    if($resultat){
      echo "fichier importer";
    }else{
      echo "Erreur lors de l'upload";
    }
    // header("Refresh:5;URL=index.php");


  }else
    echo $fileError;
}


// genere le chemin de transfert et vrée les dossier si inexistant
function genereChemin($filetmp_dir,$fileName,$type,$fileInfo){
  $chemin = "../upload/";

  if(!is_dir($chemin))
    mkdir($chemin, 0777);

  $chemin .= $type."/";
  if(!is_dir($chemin))
    mkdir($chemin, 0777);


  $album = isset($fileInfo['tags_html']['id3v2']['album'][0]) ? $fileInfo['tags_html']['id3v2']['album'][0] : "inconnu";
  $artist = isset($fileInfo['tags_html']['id3v2']['artist'][0]) ? $fileInfo['tags_html']['id3v2']['artist'][0] : "inconnu";

  if($type === ARTIST OR $type === AUTRES){
    $chemin .= $artist."/";
    if(!is_dir($chemin))
    mkdir($chemin,0755);

    $chemin .= $album."/";
    if(!is_dir($chemin))
      mkdir($chemin, 0755);

  }elseif ($type === OST) {
    $chemin .= $album."/";
    if(!is_dir($chemin))
      mkdir($chemin, 0755);
  }else {
    throw new Exception("Type is incorrect", 1);
  }
  $chemin .= $fileName;
  return $chemin;
}

function getMeta($fileInfo,$fileName,$type){
      $album = isset($fileInfo['tags_html']['id3v2']['album'][0]) ? $fileInfo['tags_html']['id3v2']['album'][0] : "inconnu";
      $artist = isset($fileInfo['tags_html']['id3v2']['artist'][0]) ? $fileInfo['tags_html']['id3v2']['artist'][0] : "inconnu";
      $duree = isset($fileInfo['playtime_seconds'][0]) ? $fileInfo['playtime_seconds'][0] : "0";
      $genre = isset($fileInfo['tags_html']['id3v2']['genre'][0]) ? $fileInfo['tags_html']['id3v2']['genre'][0] : "" ;
      $titre = isset($fileInfo['tags_html']['id3v2']['title'][0]) ? $fileInfo['tags_html']['id3v2']['title'][0] : $fileName;
      return [
              'titre' => $titre,
              'album' => $album,
              'artiste' => $artist,
              'genre' => $genre,
              'nbrdecoute' => 0,
              'duree' => $duree,
              'type' => $type];
}
?>
