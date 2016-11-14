<?php
session_start();
require_once("../config.php");
require_once("../fonctionPhp.php");

// import de la librairie id3 pour la lecture des metadonnees
  require_once('../../getid3/getid3.php');
  require_once('../../getid3/getid3.lib.php');
  // import module audio
  require_once('../../getid3/module.audio.mp3.php');
  require_once('../../getid3/module.audio.ogg.php');
  require_once('../../getid3/module.audio.flac.php');
  require_once('../../getid3/module.audio.midi.php');
  require_once('../../getid3/module.audio.wavpack.php');
  // import module video
  require_once('../../getid3/module.audio-video.flv.php');
  require_once('../../getid3/module.audio-video.mpeg.php');

// var_dump($_GET);
if(isset($_GET['maj']) AND $_GET['maj'] === "true"){
    echo "appel";
    majJson($bdd);
    // header("location: index.php");
    echo "<br/>";
    echo "<a href='index.php>retour musiques</a>'";
}

$getID3 = new getID3;
$getID3->encoding = 'UTF-8';

if(isset($_POST['fileType']) && $_POST['fileType'] === "musique"){
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

    $meta = getMeta($fileInfo,$fileName,$type,$cheminTransfert);
    $upload = $bdd->prepare('INSERT INTO musique (titre,album,artiste,genre,nbrdecoute,duree,type,chemin) VALUES (:titre,:album,:artiste,:genre,:nbrdecoute,:duree,:type,:chemin)');

    echo "chemin ".$cheminTransfert;
    $resultat = move_uploaded_file($_FILES['upload']['tmp_name'], $cheminTransfert);

    if($resultat){
      $upload->execute($meta);
      majJson($bdd);
      echo "<br/>";
      echo "fichier importer";
    }else{
      echo "Erreur lors de l'upload";
    }
    // header("Refresh:5;URL=index.php");
    echo "<br/><a href='index.php'>retour</a>";
  }else
    echo $fileError;
}

if(isset($_POST['fileType']) && $_POST['fileType'] == "musiques"){
  if($_POST['type'] == "artiste" OR $_POST['type'] == "ost" OR $_POST['type'] == "autres"){
    $type = $_POST['type'];
    foreach ($_FILES['uploads']['tmp_name'] as $key => $value) {
      $fileName = $_FILES['uploads']['name'][$key];
      $filetmp_name = $value;
      $fileInfo = $getID3->analyze($filetmp_name);

      $cheminTransfert = genereChemin($filetmp_name,$fileName, $type,$fileInfo);
      echo $cheminTransfert."<br/>";

      $upload = $bdd->prepare('INSERT INTO musique (titre,album,artiste,genre,nbrdecoute,duree,type,chemin) VALUES (:titre,:album,:artiste,:genre,:nbrdecoute,:duree,:type,:chemin)');
      $resultat = move_uploaded_file($filetmp_name, $cheminTransfert);

      $meta = getMeta($fileInfo,$fileName,$type,$cheminTransfert);

      if($resultat){
        $upload->execute($meta);
        echo "<br/>";
        echo "fichier importer";
      }else{
        echo "Erreur lors de l'upload";
      }
      majJson($bdd);
    }

  }else {
    echo "Type incorect";
    echo "<br/>";
  }
  echo "<br/><a href='index.php'>retour</a>";
}


// genere le chemin de transfert et vrée les dossier si inexistant
function genereChemin($filetmp_dir,$fileName,$type,$fileInfo){
  $chemin = "../../upload/";

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

function getMeta($fileInfo,$fileName,$type,$chemin){
      $album = isset($fileInfo['tags_html']['id3v2']['album'][0]) ? $fileInfo['tags_html']['id3v2']['album'][0] : "inconnu";
      $artist = isset($fileInfo['tags_html']['id3v2']['artist'][0]) ? $fileInfo['tags_html']['id3v2']['artist'][0] : "inconnu";
      $duree = isset($fileInfo['playtime_seconds']) ? $fileInfo['playtime_seconds'] : "0";
      $genre = isset($fileInfo['tags_html']['id3v2']['genre'][0]) ? $fileInfo['tags_html']['id3v2']['genre'][0] : "" ;
      $titre = isset($fileInfo['tags_html']['id3v2']['title'][0]) ? $fileInfo['tags_html']['id3v2']['title'][0] : $fileName;
      return [
              'titre' => $titre,
              'album' => $album,
              'artiste' => $artist,
              'genre' => $genre,
              'nbrdecoute' => 0,
              'duree' => $duree,
              'type' => $type,
              'chemin'=> $chemin];
}

// renvoie les playlist pour l'utilisateur qui se connecte
if(isset($_GET['playlist']) && $_GET['playlist'] === "true"){
    $tmp = file_get_contents('php://input');
    $tmp = json_decode($tmp);
    $tab = $tmp->tabPlaylists;

    $index = count($tab)-1;
    $nom = $tab[$index]->nom;
    $id = $tab[$index]->idPlaylist;

    $insert = $bdd->prepare("INSERT INTO playlist (nom, idUtilisateur) VALUES (:nom,:idUtilisateur)");
    $insert->bindParam('nom',$nom,PDO::PARAM_STR);
    $insert->bindParam('idUtilisateur',$_SESSION['id'],PDO::PARAM_INT);
    $insert->execute();

    $allPlaylist = $bdd->query('SELECT * FROM playlist');
    $tab = [];
    $tmp = [];
    while($donnee = $allPlaylist->fetch()){
      array_push($tmp,$donnee);
    };
      $triage = function($value,$key){
          if(!(preg_match_all("/\d/",$key) === 1)){
            return $value;
          }
      };
    // tri des clé inutile des query SQL, retounant les valeur en double
    foreach ($tmp as $key => $value) {
      array_push($tab,array_filter($value,$triage,ARRAY_FILTER_USE_BOTH));
    }
    file_put_contents("playlist.json",json_encode($tab));
    // header('location: index.php?name='.$name);
}

// rajoute une musique a une playlist
//
if(isset($_GET['addTo']) && $_GET['addTo'] == "true"){
  // $tmp = file_get_contents('php://input');
  if(isset($_POST['idPlaylist']) || isset($_POST['name']) AND isset($_POST['idTrack'])){
    $req = $bdd->prepare('INSERT INTO playlistList(idMusique,idPlaylist) VALUES (:idMusique,:idPlaylist)');
    $idmus = intval($_POST['idTrack']);
    $idPla = intval($_POST['idPlaylist']);
    $req->bindParam('idMusique',$idmus,PDO::PARAM_INT);
    $req->bindParam('idPlaylist',$idPla,PDO::PARAM_INT);
    $test = $req->execute();

    if($test == true){
      echo "true";
    }else{
      echo "false";
    }
  }
}

//Renvoie les musiques d'une playlist lors de l'appel de cette playlist
if(isset($_GET['getPlaylist']) && $_GET['getPlaylist'] == "true"){
  if(isset($_POST['playlistid'])){
    $idValue = intval($_POST['playlistid']);
    $req = $bdd->prepare('SELECT * FROM playlistList WHERE idPlaylist=:idP');
    $req->bindParam('idP',$idValue,PDO::PARAM_INT);
    $req->execute();
    $tab = [];
    while($donnee = $req->fetch()){
      array_push($tab,$donnee);
    }
    echo json_encode($tab);
  }
}


// supression d'une playlist

if(isset($_GET['deletePlaylist']) && $_GET['deletePlaylist'] == 'true'){
  if(isset($_POST['idPlaylist'])){
    echo "voui";
    $idP = intval($_POST['idPlaylist']);
    $req = $bdd->query('DELETE FROM playlist WHERE idPlaylist='.$idP);
    $req = $bdd->query('DELETE FROM playlistList WHERE idPlaylist='.$idP);
  }
}

?>
