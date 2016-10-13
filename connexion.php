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
  // while($donnee = $tab_mail->fetch()){
  //     if($donnee['email'] == $p_mail){
  //       $id = $donnee['id'];
  //       $mdp = $bdd->prepare('SELECT password,droit,pseudo FROM utilisateur WHERE id=:id');
  //       $mdp->execute(array('id'=>$id));
  //       $res = $mdp->fetch();
  //       if($res['password'] == md5($p_pass)){
  //           session_start();
  //           $_SESSION['pseudo'] = $res['pseudo'];
  //           $_SESSION['droit'] = $res['droit'];
  //           header("location: principal/index.php");
  //           exit;
  //           echo "identification terminer";
  //       }
  //     }
  //     header("location:index.php");
  // }
 ?>
