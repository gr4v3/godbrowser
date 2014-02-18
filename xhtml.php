<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<script type="text/javascript" src="docmanager/js/mootools.js"></script>
<style type="text/css">
.jswin {
	width:200px;
	height:200px;
	min-width:200px;
	min-height:200px;
	position:absolute;
}

.jswin div#resize {
	width:17px;
	height:17px;
	position:absolute;
	bottom:5px;
	right:5px;
	background-color:#ff0000;
	cursor:nw-resize;
}

.jswin div#lefttop {
	width:10px;
	height:10px;
	position:absolute;
	top:0px;
	left:0px;
	background-image:url(docmanager/images/jswin/lefttop.gif);
}

.jswin div#righttop {
	width:10px;
	height:10px;
	position:absolute;
	top:0px;
	right:0px;
	background-image:url(docmanager/images/jswin/righttop.gif);
}

.jswin div#leftbottom {
	width:10px;
	height:10px;
	position:absolute;
	bottom:0px;
	left:0px;
	background-image:url(docmanager/images/jswin/leftbottom.gif);
}
.jswin div#rightbottom {
	width:10px;
	height:10px;
	position:absolute;
	bottom:0px;
	right:0px;
	background-image:url(docmanager/images/jswin/rightbottom.gif);
}


.jswin div#top {
	position:absolute;
	top:0px;
	left:10px;
	right:10px;
	height:1px;
	background-color:#000000;
}

.jswin div#bottom {
	position:absolute;
	bottom:0px;
	left:10px;
	right:10px;
	height:1px;
	background-color:#000000;
}

.jswin div#left {
	position:absolute;
	left:0px;
	top:10px;
	bottom:10px;
	width:1px;
	background-color:#000000;
}
.jswin div#right {
	position:absolute;
	right:0px;
	top:10px;
	bottom:10px;
	width:1px;
	background-color:#000000;
}

.jswin table {
	background-color:#ff0000;
}

</style>
<script type="text/javascript">
window.addEvent('domready', function() {
	var jswin = $$('.jswin');
	var dim = jswin.getCoordinates()[0];
		jswin.jswinresize = jswin.getElement('div[id=resize]');
		
	var childs = jswin.getChildren()[0];
	jswin.makeDraggable();
	
	var table = childs[9];
	
	
	table.setStyles(
	{
		'width':dim.width-10,
		'height':dim.height-10,
		'margin-top':5,
		'margin-left':5
	});
	jswin.jswinresize.addEvent('mouseover',function()
	{
		jswin.setStyle('position','fixed');
		jswin.removeEvents();
		jswin.makeResizable({'onDrag':function(){
			
			var childs = this.handle.getChildren();
			var table = childs[9];
			var tabledim = table.getCoordinates();
			var handle = this.handle.getCoordinates();
				table.setStyles(
				{
					'width':handle.width-10,
					'height':handle.height-10,
					'margin-top':5,
					'margin-left':5
				});
				
		}});
	})
	jswin.jswinresize.addEvent('mouseleave',function()
	{
		jswin.removeEvents();
		jswin.makeDraggable();
	})
	
	var a = new FocusNext.obj('texto');
		a.next.id = 'next';
		a.next.key = 13;
		a.execute();
	
	var b = new FocusNext.obj('next');
		b.next.id = 'texto';
		b.next.key = 37;
		b.execute();
		
	var c = new FocusNext.obj('next');
		c.next.id = 'botao';
		c.next.key = 39;
		c.next.event = 'click()';
		c.execute();	
	
	
});

var FocusNext = {
	cache:{},
	obj:function(prefix)
	{
		this.prefix = prefix;
		this.init = function(){FocusNext.cache[this.prefix] = this;}
		this.next = {id:false,event:'focus()',key:13};
		this.execute = function()
		{
			if(!FocusNext.cache[this.prefix]) this.init();
			var parent = this;
			if(!parent.next.id || $type(parent.next) != 'object') return false;
			$(this.prefix).addEvent('keydown', function(e)
			{
				evt = new Event(e);
				if(evt.code == parent.next.key) 
				{
					var obj = $(parent.next.id);
					eval('obj.'+parent.next.event+';');
				}
			});
		}
	}
}




</script>
</head>
<body>
<div class="jswin">
	<div id="resize"></div>
    <div id="lefttop"></div>
    <div id="righttop"></div>
    <div id="leftbottom"></div>
    <div id="rightbottom"></div>

    <div id="top"></div>
    <div id="bottom"></div>
    <div id="left"></div>
    <div id="right"></div>
   	<table id="content" border="0">
    	<tr><td>&nbsp;</td></tr>
        <tr><td align="center">centro da janela :P</td></tr>
        <tr><td>&nbsp;</td></tr>
    </table>
</div>
<input type="text" id="texto" />
<input type="text" id="next" />
<input type="button" id="botao" value="botao" onclick="alert('botao!');" />
<?php
	phpinfo();
?>
</body>
</html>
