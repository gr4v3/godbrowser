<?php header("Cache-Control: no-cache, must-revalidate"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Untitled Document</title>
<script type="text/javascript" src="kernel/jsmenu.js"></script>
<style type="text/css">

.over {
	color:#00CCFF;
	cursor:pointer;
}
.subover {
	text-decoration:underline;
	cursor:pointer;
}
.subover div {
	background-color:#CCCCCC;
}

</style>
</head>

<body>

<script type="text/javascript">

var menu = new jsmenu.obj('one');
	menu.create();

	var a = menu.content.obj();
		a.title = 'tools';
		a.action = '';
		a.hover.style.cssText = 'background-color:#ff0000;';
		a.style.cssText = 'cursor:pointer;padding:2px;float:left;';
		a.submenu.style.cssText = 'width:103px;padding:2px;border:1px solid #c9c9c9;';
		
		a.add('browse').action = 'common.treeview.create();';
		a.add('search');
		a.add('advanced search');
	menu.content.add(a);
	
var a = menu.content.obj();
		a.title = 'view';
		a.style.cssText = 'cursor:pointer;padding:2px;float:left;';
		
		a.submenu.style.cssText = 'width:80px;padding:2px;border:1px solid #c9c9c9;';
		
		a.add('icon').action = 'alert(2);';
		a.add('list');
		a.add('details');
		a.add('thumbnails');
	menu.content.add(a);

var a = menu.content.obj();
		a.title = 'edit';
		a.style.cssText = 'cursor:pointer;padding:2px;float:left;';
		
		a.submenu.style.cssText = 'width:80px;padding:2px;border:1px solid #c9c9c9;';
		a.submenu.hover.style.cssText = '';
		
		a.add('copy').action = 'alert(3);';
		a.add('cut');
		a.add('delete');
		a.add('rename');
		a.add('description');
	menu.content.add(a);		
		
		
var a = menu.content.obj();
		a.title = 'help';
		a.style.cssText = 'cursor:pointer;padding:2px;float:left;';
		
		a.submenu.style.cssText = 'width:60px;padding:2px;border:1px solid #c9c9c9;';
		a.submenu.hover.style.cssText = '';
		
		a.add('system').action = 'alert(4);';
		a.add('how to...');
		a.add('version');
	menu.content.add(a);
	

	

	menu.html();




</script>
</body>
</html>
