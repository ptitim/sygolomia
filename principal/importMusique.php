<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
      <form class="" action="import.php" method="post">
          <fieldset>
            <input type="file" name="file">
          </fieldset>
          <fieldset>
            <input type="radio" name="type" value="artiste" checked> artiste<br>
            <input type="radio" name="type" value="ost"> ost<br>
            <input type="radio" name="type" value="other"> autres
          </fieldset>
          <input type="text" name="fileType" value="musique" hidden="hidden">
          <input type="submit" value="submit">
      </form>
  </body>
</html>
