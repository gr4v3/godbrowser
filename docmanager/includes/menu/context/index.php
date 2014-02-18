<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>

<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

<title>context menu</title>

<style type="text/css">

/* ================================================================ 

This copyright notice must be untouched at all times.



The original version of this stylesheet and the associated (x)html

is available at http://www.cssplay.co.uk/menus/flyout_4level.html

Copyright (c) 2005-2007 Stu Nicholls. All rights reserved.

This stylesheet and the associated (x)html may be modified in any 

way to fit your requirements.

=================================================================== */

.menu {

height:150px;

font-size:90%;

margin:25px 0 50px 15px; /* this page only */

}



/* remove all the bullets, borders and padding from the default list styling */

.menu ul {

position:relative;

z-index:500;

padding:0;

margin:0;

list-style-type:none;

width:150px;

}

/* style the list items */

.menu li {

background:#d4d8bd url(shade.gif);

height:26px;

/* for IE7 */

float:left;

}

.menu li.sub {background:#d4d8bd url(sub.gif) no-repeat right center;} 



/* get rid of the table */

.menu table {position:absolute; border-collapse:collapse; top:0; left:0; z-index:100; font-size:1em;}



/* style the links */

.menu a, .menu a:visited {

display:block; 

text-decoration:none;

height:25px;

line-height:25px;

width:149px;

color:#000;

text-indent:5px;

border:1px solid #fff;

border-width:0 1px 1px 1px;

}

/* hack for IE5.5 */

* html .menu a, * html .menu a:visited {width:150px; w\idth:149px;}

/* style the link hover */

* html .menu a:hover {color:#efa; background:#aa7; position:relative;}



.menu li:hover {position:relative;}



/* For accessibility of the top level menu when tabbing */

.menu a:active, .menu a:focus {color:#efa; background:#aa7;}



/* retain the hover colors for each sublevel IE7 and Firefox etc */

.menu li:hover > a {color:#efa; background:#aa7;}

 

/* hide the sub levels and give them a positon absolute so that they take up no room */

.menu li ul {

visibility:hidden;

position:absolute;

top:-30px;

/* set up the overlap (minus the overrun) */

left:100px;

/* set up the overrun area */

padding:30px;

/* this is for IE to make it interpret the overrrun padding */

background:transparent url(transparent.gif);

}



/* for browsers that understand this is all you need for the flyouts */

.menu li:hover > ul {visibility:visible;}





/* for IE5.5 and IE6 you need to style each level hover */



/* keep the third level+ hidden when you hover on first level link */

.menu ul a:hover ul ul{

visibility:hidden;

}

/* keep the fourth level+ hidden when you hover on second level link */

.menu ul a:hover ul a:hover ul ul{

visibility:hidden;

}

/* keep the fifth level hidden when you hover on third level link */

.menu ul a:hover ul a:hover ul a:hover ul ul{

visibility:hidden;

}



/* make the second level visible when hover on first level link */

.menu ul a:hover ul {

visibility:visible;

}

/* make the third level visible when you hover over second level link */

.menu ul a:hover ul a:hover ul{ 

visibility:visible;

}

/* make the fourth level visible when you hover over third level link */

.menu ul a:hover ul a:hover ul a:hover ul { 

visibility:visible;

}

/* make the fifth level visible when you hover over fourth level link */

.menu ul a:hover ul a:hover ul a:hover ul a:hover ul { 

visibility:visible;

}

</style>

</head>

<body>

<?php include('../../func.php');

?>



<div class="menu">

<ul>

<li><a href="#nogo">Home</a></li>

<li><a href="#nogo">About us</a></li>

<li class="sub"><a href="#nogo">Products<!--[if IE 7]><!--></a><!--<![endif]-->

<!--[if lte IE 6]><table><tr><td><![endif]-->

	<ul>

	<li><a href="#nogo">Tripods</a></li>

	<li class="sub"><a href="#nogo">Cameras<!--[if IE 7]><!--></a><!--<![endif]-->



	<!--[if lte IE 6]><table><tr><td><![endif]-->

		<ul>

			<li><a href="#nogo">Compact</a></li>

			<li><a href="#nogo">SLR</a></li>

			<li class="sub"><a href="#nogo">Digital<!--[if IE 7]><!--></a><!--<![endif]-->

			<!--[if lte IE 6]><table><tr><td><![endif]-->

				<ul>



					<li><a href="#nogo">Canon</a></li>

					<li class="sub"><a href="#nogo">Nikon<!--[if IE 7]><!--></a><!--<![endif]-->

					<!--[if lte IE 6]><table><tr><td><![endif]-->

						<ul>

							<li><a href="#nogo">D200</a></li>

							<li><a href="#nogo">D80</a></li>

							<li><a href="#nogo">Coolpix</a></li>



							<li><a href="#nogo">Lenses</a></li>

							<li><a href="#nogo">Speedlight</a></li>

						</ul>

					<!--[if lte IE 6]></td></tr></table></a><![endif]-->

					</li>

					<li><a href="#nogo">Minolta</a></li>

					<li><a href="#nogo">Pentax</a></li>



				</ul>

			<!--[if lte IE 6]></td></tr></table></a><![endif]-->

			</li>

		</ul>

	<!--[if lte IE 6]></td></tr></table></a><![endif]-->

	</li>

	<li><a href="#nogo">Films</a></li>

	</ul>



<!--[if lte IE 6]></td></tr></table></a><![endif]-->

	</li>

<li><a href="#nogo">FAQs</a></li>

<li><a href="#nogo">Privacy</a></li>

<li><a href="#nogo">Contact us</a></li>



</ul>

</div>

</body>

</html>