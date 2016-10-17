<?php
  require("config.php");

  $p_mail = $_POST['email'];
  $p_pass = $_POST['password'];

  $tab_mail = $bdd->prepare('SELECT id,pseudo,droit from utilisateur WHERE password=:password AND (pseudo=:email OR email=:email)');
  $tab_mail->execute(array(
      'email'=>$p_mail,
      'password'=>md5($p_pass)
  ));
  $donnee = $tab_mail->fetch();

  if($donnee){
    session_start();
    $_SESSION['pseudo'] = $donnee['pseudo'];
    $_SESSION['droit'] = $donnee['droit'];
    $_SESSION['flag'] = true;
    header("location:principal/index.php");
  }else{
    header("location:index.php");
  }
 ?>
