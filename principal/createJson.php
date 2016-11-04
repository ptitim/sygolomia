<?php
session_start();
require_once("../config.php");
require_once("../fonctionPhp.php");

if(isset($_POST['playlists']) AND $_POST['playlists'] === "true"){
  returnPlaylists($bdd);
}

function returnPlaylists($bdd){
  $idUtilisateur = $_SESSION['id'];
  $req = $bdd->query('SELECT * FROM playlist WHERE idUtilisateur='.strval($idUtilisateur));
  $encode = [];
  while($donnee = $req->fetch()){
    array_push($encode,$donnee);
  }
  echo json_encode($encode);

}
 ?>
