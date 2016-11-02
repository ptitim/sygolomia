<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="import.css" media="screen" title="no title">
  </head>
  <body>
    <?php include("menu.php") ?>
      <form class="form-import" action="import.php" method="post" enctype="multipart/form-data">
          <fieldset>
            <label for="uploads[]">dossier a importer</label>
            <input type="file" name="uploads[]" id ="upload"  mutiple="" directory="" webkitdirectory="" mozdirectory="">
          </fieldset>
          <fieldset>
            <input type="radio" name="type" value="artiste" checked> artiste<br>
            <input type="radio" name="type" value="ost"> ost<br>
            <input type="radio" name="type" value="autres"> autres
          </fieldset>
          <input type="text" name="fileType" value="musiques" hidden="hidden">
          <input type="submit" value="submit">
      </form>
  </body>
</html>
