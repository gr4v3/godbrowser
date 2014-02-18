<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>realfilepath</title>
<script type="text/javascript" src="kernel/jsupload.js"></script>
</head>
<body>
<script type="text/javascript">

var obj = new jsupload.obj('a');
	obj.path = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>/docmanager/content/';
	obj.style.backgroundColor = '#ff0000';
	obj.create();
	
var obj = new jsupload.obj('b');
	obj.path = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>/docmanager/content/';
	obj.style.backgroundColor = '#ff0000';
	obj.create();
	
var obj = new jsupload.obj('c');
	obj.path = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>/docmanager/content/';
	obj.style.backgroundColor = '#ff0000';
	obj.create();
	
var obj = new jsupload.obj('d');
	obj.path = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>/docmanager/content/';
	obj.style.backgroundColor = '#ff0000';
	obj.onUpload = function()
	{
		alert(this.name);
	}
	obj.create();			
		
</script>
</body>
</html>
