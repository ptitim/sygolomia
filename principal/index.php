<?php
session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
<?php if(isset($_SESSION['pseudo']){?>
      <p>
        Bienvenue <?php echo $_SESSION['pseudo'];?>
      </p>
<?php } else {?>
      <h1>Vous n'avez pas etez authentifier correctement</h1>
<?php}?>

</body>
</html>
