<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

<title>drop down</title>

<style type="text/css">



html {

font-family:Arial, Helvetica, sans-serif;

}

/* ================================================================ 

This copyright notice must be untouched at all times.



The original version of this stylesheet and the associated (x)html

is available at http://www.cssplay.co.uk/menus/simple_vertical.html

Copyright (c) 2005-2007 Stu Nicholls. All rights reserved.

This stylesheet and the associated (x)html may be modified in any 

way to fit your requirements.

=================================================================== */



/* Add a margin - for this demo only - and a relative position with a high z-index to make it appear over any element below */

#menu_container {margin:0 0 5px 0; position:relative; width:630px; height:20px; z-index:100;}



/* Get rid of the margin, padding and bullets in the unordered lists */

#pmenu, #pmenu ul {padding:0; margin:0; list-style-type: none;}



/* Set up the link size, color and borders */

#pmenu a, #pmenu a:visited {display:block;width:120px; font-size:11px; color:#000000; height:20px; line-height:19px; text-decoration:none; text-indent:5px; border:1px solid #000; border-width:1px 0 1px 1px;}



/* Set up the sub level borders */

#pmenu li ul li a, #pmenu li ul li a:visited {border-width:0 1px 1px 1px;}

#pmenu li a.enclose, #pmenu li a.enclose:visited {border-width:1px;}



/* Set up the list items */

#pmenu li {float:left; background:#FFFFFF; text-align:left;}



/* For Non-IE browsers and IE7 */

#pmenu li:hover {position:relative;}

/* Make the hovered list color persist */

#pmenu li:hover > a {color:#4378FF;}

/* Set up the sublevel lists with a position absolute for flyouts and overrun padding. The transparent gif is for IE to work */

#pmenu li ul {display:none;}

/* For Non-IE and IE7 make the sublevels visible on list hover. This is all it needs */

#pmenu li:hover > ul {display:block; position:absolute; top:-6px; left:80px; padding:5px 30px 30px 30px; background:transparent url(transparent.gif); width:120px;}

/* Position the first sub level beneath the top level liinks */

#pmenu > li:hover > ul {left:-30px; top:16px;}



/* get rid of the table */

#pmenu table {position:absolute; border-collapse:collapse; top:0; left:0; z-index:100; font-size:1em;}



/* For IE5.5 and IE6 give the hovered links a position relative and a change of background and foreground color. This is needed to trigger IE to show the sub levels */

* html #pmenu li a:hover {position:relative; background:#FFFFFF; color:#4378FF;}



/* For accessibility of the top level menu when tabbing */

#pmenu li a:active, #pmenu li a:focus {background:#FFFFFF; color:#4378FF;}

/*#pmenu li.drop a:active, #pmenu li.drop a:focus {background:#FFFFFF url(../images/dropdown/drop.gif) no-repeat right center; color:#4378FF;}*/



/* Set up the pointers for the sub level indication */

#pmenu li.fly {background:#FFFFFF url(nfly.gif) no-repeat right center;}

#pmenu li.drop {background:#FFFFFF url(dropdown/drop.gif) no-repeat right center;}





/* This lot is for IE5.5 and IE6 ONLY and is necessary to make the sublevels appear */



/* change the drop down levels from display:none; to visibility:hidden; */

* html #pmenu li ul {visibility:hidden; display:block; position:absolute; top:-6px; left:80px; padding:5px 30px 30px 30px; background:transparent url(transparent.gif);}



/* keep the third level+ hidden when you hover on first level link */

#pmenu li a:hover ul ul{

visibility:hidden;

}

/* keep the fourth level+ hidden when you hover on second level link */

#pmenu li a:hover ul a:hover ul ul{

visibility:hidden;

}

/* keep the fifth level hidden when you hover on third level link */

#pmenu li a:hover ul a:hover ul a:hover ul ul{

visibility:hidden;

}

/* keep the sixth level hidden when you hover on fourth level link */

#pmenu li a:hover ul a:hover ul a:hover ul a:hover ul ul {

visibility:hidden;

}



/* make the second level visible when hover on first level link and position it */

#pmenu li a:hover ul {

visibility:visible; left:-30px; top:14px; lef\t:-31px; to\p:15px;

}



/* make the third level visible when you hover over second level link and position it and all further levels */

#pmenu li a:hover ul a:hover ul{ 

visibility:visible; top:-6px; left:80px;

}

/* make the fourth level visible when you hover over third level link */

#pmenu li a:hover ul a:hover ul a:hover ul { 

visibility:visible;

}

/* make the fifth level visible when you hover over fourth level link */

#pmenu li a:hover ul a:hover ul a:hover ul a:hover ul { 

visibility:visible;

}

/* make the sixth level visible when you hover over fifth level link */

#pmenu li a:hover ul a:hover ul a:hover ul a:hover ul a:hover ul { 

visibility:visible;

}

/* If you can see the pattern in the above IE5.5 and IE6 style then you can add as many sub levels as you like */

</style>

</head>

<body>

<?php include('../../func.php');

?>

<div id="menu_container">

<ul id="pmenu">

	<li class="drop"><a href="#"><?php etranslate('New'); ?><!--[if IE 7]><!--></a><!--<![endif]-->

		<!--[if lte IE 6]><table><tr><td><![endif]-->

		<ul>

			<li><a href="javascript:common.file.new_();" class="enclose"><?php etranslate('File'); ?></a></li>

			<li><a href="javascript:common.folder.new_();"><?php etranslate('Folder'); ?></a></li>

		</ul>

		<!--[if lte IE 6]></td></tr></table></a><![endif]-->

	</li>

	<li><a href="javascript:common.upload.swfupload.selectFiles();"><?php etranslate('Upload'); ?></a></li>

	<li class="drop"><a href="#"><?php etranslate('View'); ?><!--[if IE 7]><!--></a><!--<![endif]-->

		<!--[if lte IE 6]><table><tr><td><![endif]-->

		<ul>

			<li><a href="javascript:common.folder.set(common.folder.id,'icon');" class="enclose"><?php etranslate('Icon'); ?></a></li>

			<li><a href="javascript:common.folder.set(common.folder.id,'list');"><?php etranslate('List'); ?></a></li>

			<li><a href="javascript:common.folder.set(common.folder.id,'detailed');"><?php etranslate('Details'); ?></a></li>

			<li><a href="javascript:common.folder.set(common.folder.id,'thumbnails');"><?php etranslate('Thumbnails'); ?></a></li>

		</ul>

		<!--[if lte IE 6]></td></tr></table></a><![endif]-->

	</li>

	<li><a href="javascript:common.searchFile.create();"><?php etranslate('Search'); ?></a></li>

	<li class="drop"><a href="#" class="enclose"><?php etranslate('Help'); ?><!--[if IE 7]><!--></a><!--<![endif]-->

		<!--[if lte IE 6]><table><tr><td><![endif]-->

		<ul>

			<li><a href="#" class="enclose"><?php etranslate('How To'); ?></a></li>

			<li><a href="#"><?php etranslate('About'); ?></a></li>

			<li><a href="javascript:common.statistics.create();"><?php etranslate('Statistics'); ?></a></li>

		</ul>

		<!--[if lte IE 6]></td></tr></table></a><![endif]-->

	</li>	

</ul>

</div>

</body>

</html>

