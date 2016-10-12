<?php
  require("config.php");

  $p_mail = $_POST['email'];
  $p_pass = $_POST['password'];

  $tab_mail = $bdd->query('SELECT id,email from utilisateur');

  while($donnee = $tab_mail->fetch()){
      if($donnee['email'] == $p_mail){
        $id = $donnee['id'];
        $mdp = $bdd->prepare('SELECT password,droit,pseudo FROM utilisateur WHERE id=?');
        $mdp->execute(array($id));
        $res = $mdp->fetch();
        if(md5($res) == $p_pass){
            session_start();
            $_SESSION['pseudo'] = $res['truc'];
            $_SESSION['droit'] = $res['droit'];
            header("principal/index.php");
        }
      }
      header("index.php");
  }



 ?>
