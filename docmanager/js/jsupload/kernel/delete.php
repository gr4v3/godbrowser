<?php
	unlink($_REQUEST['path']);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>delete section</title>

</head>

<body onload="window.parent.jsupload.cache['<?php echo $_REQUEST['prefix'] ?>'].deleteSuccess();">
</body>
</html>
