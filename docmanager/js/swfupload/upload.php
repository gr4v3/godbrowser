<?php
$name = $_FILES['Filedata']['name'];
$tmp = $_FILES['Filedata']['tmp_name'];
move_uploaded_file($tmp,$name);
?>