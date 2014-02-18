<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<style type="text/css" title="currentStyle">@import "style.css";</style>
<title>menu</title>
<script type="text/javascript" src="../../js/mootools.js"></script>
</head>

<body>
<?php


class Item
{
	var $name = '';
	var $action = '';
	var $html = '';
	var $id = '';
	var $Items = array();
	var $hasChilds = false;
	function Item($name,$id = '',$func = '')
	{
		$this->id = $id;
		$this->action = $func;
		$this->name = $name;
		return $this;
	}
	function add()
	{
		$this->hasChilds = true;
		$numargs = func_num_args();
		$arg_list = func_get_args();
		for ($i = 0; $i < $numargs; $i++) {
			$this->Items[] = $arg_list[$i];
		}
	}
}	
class Menu
{
	var $Items = array();
	var $prefix = '';
	
	function Menu($prefix)
	{
		$this->prefix = $prefix;
	}
	function add($obj)
	{
		$this->Items[] = $obj;
	}
	function render($obj,$node = false)
	{
		if($node) echo '<ul class="'.$this->prefix.'menuUL" id="'.$obj->id.'">';
		foreach($obj->Items as $value)
		{
			if($value->hasChilds) 
			{
				echo '<li class="'.$this->prefix.'menuLI">';
				echo '<a href="#" id="'.$this->prefix.'A_father" onclick="'.$value->action.'">'.$value->name.'</a>';
				$this->render($value,true);
				echo '</li>';
			} else echo '<li class="'.$this->prefix.'menuLI"><a href="#" onclick="'.$value->action.'">'.$value->name.'</a></li>';
		}
		if($node) echo '</ul>';
	}
	function create()
	{
		
		echo '<ul class="'.$this->prefix.'menuUL" id="'.$this->prefix.'">';
		$this->render($this);
		echo '</ul>';
		echo '<script type="text/javascript">';
		echo 'var startList'.$this->prefix.' = function()';
		echo '{';
		echo 'if(document.all&&document.getElementById)';
		echo '{';
		echo 'navRoot = document.getElementById("'.$this->prefix.'");';
		echo 'for(i=0;i<navRoot.childNodes.length;i++)';
		echo '{';
		echo 'node = navRoot.childNodes[i];';
		echo 'if (node.nodeName=="LI")'; 
		echo '{';
		echo 'node.onmouseover=function(){this.className+=" over";};';
		echo 'node.onmouseout=function(){this.className=this.className.replace(" over","");};';
		echo '};';
		echo '};';
		echo '};';
		echo '};';
		echo 'startList'.$this->prefix.'();';
		echo '</script>';
	}
}



$docmanager =  new Item('docmanager','');
$new = new Item('new','sub');
$file = new Item('file');
$folder = new Item('folder');
$edit = new Item('edit','sub');
$copy = new Item('copy');
$cut = new Item('cut');
$paste = new Item('paste');	




$file->action = 'alert(1);';


$new->add($file,$folder);
$edit->add($copy,$cut,$paste);


$menu = new Menu('one');
$menu->add($docmanager);
$menu->add($new);
$menu->add($edit);
$menu->create();

?>
</body>
</html>
