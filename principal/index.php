<?php
session_start();
$_SESSION['pseudo'] = "demo";

if(!isset($_SESSION['pseudo'])){
  header("location: http://localhost/sygolomia/index.php");
}
$mode = isset($_GET['mode']) AND ($_GET['mode'] === "m" OR $_GET['mode'] === "v") ? $_GET['mode'] : null;
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <!-- <meta http-equiv="Content-type" content="text/html; charset=iso-8859-1" /> -->

    <?php include("../importCommun.php");?>
    <link href="https://fonts.googleapis.com/css?family=Arimo|Taviraj" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>
  <body onload="init()">
  <?php include("menu.php");?>
  <div id="principal">

  </div>
</body>
</html>
