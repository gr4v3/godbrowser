<?php
set_time_limit(180);
session_start();
function exists($var){if(isset($var) && !empty($var)) return true; else return false;}



if(!isset($_SESSION['qbuilder'])){ $_SESSION['qbuilder'] = array();echo 1; }


if(exists($_REQUEST['str']) and $_REQUEST['str'] == 'begin')
{
	$_SESSION['qbuilder'][$_REQUEST['prefix']]['querystring'] = array();
}
if(exists($_REQUEST['str']))
{
	$_SESSION['qbuilder'][$_REQUEST['prefix']]['querystring'][] = $_REQUEST['str'];
}
var_dump($_SESSION['qbuilder'][$_REQUEST['prefix']]);

?>
