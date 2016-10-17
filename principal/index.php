<?php
session_start();
if(!isset($_SESSION['pseudo'])){
  header("location:index.php");
}
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <?php include("../importCommun.php");?>
    <link rel="stylesheet" href="style.css">
  </head>
  <body onload="init()">
  <?php include("menu.php");?>

</body>
<script src="script.js" charset="utf-8"></script>
</html>
