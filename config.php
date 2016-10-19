<?php
define("OST", "ost");
define("ARTIST", "artiste");
define("AUTRES", "autres");
try
{
  $bdd = new PDO("mysql:host=localhost;dbname=serveurMedia;charset=utf8", 'root', '');
}
catch (Exception $e)
{
      die('Erreur : ' . $e->getMessage());
}
$tabMusique = "musique";
$tabVideo = "video";
 ?>
