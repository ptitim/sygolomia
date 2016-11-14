<?php
require_once("../config.php");
require_once("../fonctionPhp.php");

if(isset($_POST['text'])){
  $text = $_POST['text'];
  echo $text;
  $req = $bdd->query('SELECT titre,album,artiste FROM musique WHERE titre LIKE %a%)');
$donnee = [];
while($tmp = $req->fetch()){
  array_push($donnee,$tmp);
}
echo json_encode($donnee);

}else{
  echo "false";
}

?>
