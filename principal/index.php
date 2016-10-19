<?php
session_start();
if(!isset($_SESSION['pseudo'])){
  header("location: http://localhost/sygolomia/index.php");
}
$mode = isset($_GET['mode']) AND ($_GET['mode'] === "m" OR $_GET['mode'] === "v") ? $_GET['mode'] : null; 
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
</html>
