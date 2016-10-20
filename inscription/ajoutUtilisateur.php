<?php
require("../config.php");

$pseudo = $_POST['pseudo'];
$mail = $_POST['email'];
$pass1 = $_POST['password1'];
$pass2 = $_POST['password2'];

print_r(strlen($pseudo));
if($pass1 !== $pass2 OR strlen($pseudo) > 4){
  header("inscription.php");
}

$req = $bdd->prepare('SELECT pseudo,email FROM utilisateur WHERE pseudo=:pseudo OR email=:email');
$req->execute(array(
    'pseudo'=>$pseudo,
    'email'=>$mail
));
$donnee = $req->fetch();
(is_null($donnee) and print("is null<br/>")) or (!is_null($donnee) and print("is not null<br/>"));
print_r($donnee);
print(count($donnee));

if(count($donnee) <= 1){
  $prep = $bdd->prepare("INSERT INTO utilisateur (pseudo,email,password,droit) VALUES (:pseudo, :email,:password, :droit)");
  $prep->execute(array(
    'pseudo'=>$pseudo,
    'email'=>$mail,
    'password'=>md5($pass1),
    'droit'=>0
  ));
  echo "Inscription reussi, redirection.";
  // header("Refresh:5 ;http://localhost/sygolomia/index.php");
}else{
  echo "Erreur L'utilisateur existe deja";
  // header("Refresh: 5;inscription.php");
}

echo"<br/>";
echo "<a href='../index.php'>retour acceuil</a>";
echo"<br/>";
echo "bjour";
 ?>
