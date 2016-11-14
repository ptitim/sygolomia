<?php
require("../config.php");

if(isset($_POST['pseudo']) && isset($_POST['email']) && isset($_POST['password1']) && isset($_POST['password2'])){
  $pseudo = $_POST['pseudo'];
  $mail = $_POST['email'];
  $pass1 = $_POST['password1'];
  $pass2 = $_POST['password2'];
}
if($pass1 !== $pass2 OR strlen($pseudo) < 4 OR preg_match('/(.{4,})(=?@.+)(\..+)/',$mail) != 1){
  header("inscription.php?erreur=true");
  echo "Erreur, veuillez reesayer <br/>";
  echo "<a href='inscription.php'>retour acceuil</a>";

}else{
  echo "mail : " .$mail;
  echo " ";
  // var_dump(preg_match('/(.{4,})(=?@.+)(\..+)/',$mail) != 1);


  $req = $bdd->prepare('SELECT pseudo,email FROM utilisateur WHERE pseudo=:pseudo OR email=:email');
  $req->execute(array(
      'pseudo'=>$pseudo,
      'email'=>$mail
  ));
  $donnee = $req->fetch();

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
}

 ?>
