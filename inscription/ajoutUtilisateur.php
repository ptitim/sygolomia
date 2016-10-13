<?php
require("../config.php");

$pseudo = $_POST['pseudo'];
$mail = $_POST['email'];
$pass1 = $_POST['password1'];
$pass2 = $_POST['password2'];

if($pass1 !== $pass2 or strlen($pseudo) < 4){
  header("inscription.php");
}

$req = $bdd->prepare('SELECT pseudo,email FROM utilisateur WHERE pseudo=:pseudo OR email=:email');
$req->execute(array(
    'pseudo'=>$pseudo,
    'email'=>$mail
));

$donnee = $req->fetch();

if(!is_null($donnee)){
  $prep = $bdd->prepare("INSERT INTO utilisateur (pseudo,email,password,droit) VALUES (:pseudo, :email,:password, :droit)");
  $prep->execute(array(
    'pseudo'=>$pseudo,
    'email'=>$mail,
    'password'=>md5($pass1),
    'droit'=>0
  ));
  header("location: http://localhost/sygolomia/index.php");
}else{
  header("inscription.php");
}

echo"<br/>";
echo "<a href='../index.php'>retour acceuil</a>";
echo"<br/>";
echo "bjour";
 ?>
