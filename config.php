<?php
define("OST", "ost");
define("ARTIST", "artiste");
define("AUTRES", "autres");
try
{
  $bdd = new PDO("mysql:host=localhost;dbname=serveurMedia;charset=utf8", 'root', '');
  $bdd->exec("set names utf8");
}
catch (Exception $e)
{
      die('Erreur : ' . $e->getMessage());
}
$tabMusique = "musique";
$tabVideo = "video";
 ?>
