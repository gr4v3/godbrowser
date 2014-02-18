<?php		
if(isset($_REQUEST['path']))
{
	$path = $_REQUEST['path'].$_FILES['filepath']['name'];
	move_uploaded_file($_FILES['filepath']['tmp_name'],$path);
}
else
{	
	$path = str_replace('upload.php','',$_SERVER['SCRIPT_FILENAME']).$_FILES['filepath']['name'];
	move_uploaded_file($_FILES['filepath']['tmp_name'],$path);
	
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>upload section</title>

</head>

<body onload="window.parent.jsupload.cache['<?php echo $_REQUEST['prefix'] ?>'].uploadSuccess('<?php echo $_FILES['filepath']['name'] ?>','<?php echo $path ?>');">
</body>
</html>
