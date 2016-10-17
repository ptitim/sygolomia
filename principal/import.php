<?php
require_once('../getid3/getid3.php');
// import module audio
require('../getid3/module.audio.mp3.php');
require('../getid3/module.audio.ogg.php');
require('../getid3/module.audio.flac.php');
require('../getid3/module.audio.midi.php');
require('../getid3/module.audio.wavpack.php');
// import module video
require('../getid3/module.audio-video.flv.php');
require('../getid3/module.audio-video.mpeg.php');

if($_POST['fileType'] === "musique"){
  $getID3 = new getID3;
  $getID3->encoding = 'UTF-8';
// file
  $fileError = $_FILES['file']['error'];
  if($fileError === 0){
    $fileName = $_FILES['file']['name'];
    $fileType = $_FILES['file']['type'];
    $fileSize = $_FILES['file']['size'];
    $filetmp_name = $_FILES['file']['tmp_name'];
  // type
    $type = $_POST['type'];

  }else
    echo $fileError;
}
?>
