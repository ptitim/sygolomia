<?php
require_once("../config.php");
require_once("../fonctionPhp.php");

if(isset($_POST['text'])){
  $text = $_POST['text'];
  // echo $text;
  // $textReq = 'SELECT titre,album,artiste FROM musique WHERE (titre LIKE \'%'.$text.'%\' OR album LIKE\'%'.$text.'%\' OR artiste LIKE \'%'.$text.'%\' )';
  // echo $textReq;
  $req = $bdd->query('SELECT * FROM musique WHERE titre LIKE \'%'.$text.'%\' OR album LIKE\'%'.$text.'%\' OR artiste LIKE \'%'.$text.'%\'');
$donnee = [];
while($tmp = $req->fetch()){
  array_push($donnee,$tmp);
}
echo json_encode($donnee);

}else{
  echo "false";
}

?>
