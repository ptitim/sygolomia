<?php
  session_start();
  if(isset($_SESSION['elie']) && $_SESSION['elie']){
    $rater = true;
    $mail = $_SESSION['mail'];
  }
  if(isset($_SESSION['flag'])){
    session_destroy();
  }

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Sygolomia</title>
    <link rel="stylesheet" href="style.css">
    <?php include("importCommun.php"); ?>
  </head>

  <body>
    <div class="container">
      <p id="titre">Sygolomia</p>
      <?php if(isset($rater)) echo "<span id='rater'> Mot de passe ou identifiant incorrect </span>" ?>
    <form action="connexion.php" method="post">
      <fieldset class="form-group">
        <label for="emailInput">Email address : </label>
        <input type="email" placeholder="Enter email" name="email" id="emailInput" <?php if(isset($mail)){ echo "value = ".$mail;} ?>>
      </fieldset>
      <fieldset class="form-group">
        <label for="passwordInput">Password : </label>
        <input type="password" placeholder="Password" name="password" id="passwordInput">
      </fieldset>
      <button type="submit" id="submit">Connexion</button>
      <a href="inscription/inscription.php" id="inscription">Inscription</a>
    </form>
  </div>
  </body>
</html>
