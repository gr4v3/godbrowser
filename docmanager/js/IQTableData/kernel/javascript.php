<?php
set_time_limit(180);
require_once("phpcode.php");
session_start();
error_reporting(0);



if(isset($_REQUEST['I']) && $_REQUEST['I'])
{
	$prefix = $_REQUEST['I'];
	if(isset($_REQUEST['T']) && $_REQUEST['T']) $_SESSION['IQTableData'][$prefix] = false;
}
if(isset($_REQUEST['mode']) && $_REQUEST['mode']=='new'){unset($_SESSION['IQTableData'][$prefix]);}

if(isset($_REQUEST['mode']) && $_REQUEST['mode']=='php')
{
	$field = $_REQUEST['field'];
	$key = $_REQUEST['key'];		
	$_SESSION['IQTableData'][$prefix]->connect();
	$result = mysql_query($_SESSION['IQTableData'][$prefix]->sql.$_SESSION['IQTableData'][$prefix]->searchQuery.' order by '.$_SESSION['IQTableData'][$prefix]->orderby.' '.$_SESSION['IQTableData'][$prefix]->direction) or die();
	$list = array();
	$position = 0;
	$showresult = false;
	$limit = $_SESSION['IQTableData'][$prefix]->limit_number;
	$i = 0;
	$goon = true;
	while (($goon)&&($arr = mysql_fetch_assoc($result)))
	{
		if($arr[$field] == $key) {$position = $i;$showresult = true;$goon=false;}		
		$i++;		
	}
	if($goon == true) 
	{
		echo 'var data = {page:1,row:0};';
		die();
	} 
	$pagina = (int)(((int)$position) / ((int)$limit));
	$pagina++;
	$position = $position % $limit;
	echo 'var data = {page:'.$pagina.',row:'.$position.'};';
	die();
}
if(isset($_REQUEST['mode']) && $_REQUEST['mode']=='preview')
{
	$obj = $_SESSION['IQTableData'][$prefix];
	
	$obj->connect();

	$sql = $obj->sql;
	$search = decode_special_htmlentinties($_REQUEST['S']);
	$orderby = $_REQUEST['orderby'];
	$direction = $_REQUEST['direction'];
	$limitindex = '';
	$limit = '';
	
		if($obj->exists($_REQUEST['G'])) 
			$limitindex = ' limit '.$_REQUEST['G'].','; 
		else $limitindex = ' limit ';
		
		if($obj->exists($_REQUEST['F']) && $obj->exists($_REQUEST['G'])) 
			$limit = $limitindex.$_REQUEST['F'];
				else $limit = ' limit 0,'.$_REQUEST['F'];
	
	$result = mysql_query($sql.' order by '.$orderby.' '.$direction.$limit) or die();
	$row = mysql_fetch_assoc($result);
	
	echo "obj.preview = new Array();";
	foreach($row as $index => $value)
	{
		echo "obj.preview['$index'] = '$value';";
	}	
	die();
}

if(isset($_SESSION['IQTableData'][$prefix]) or !empty($_SESSION['IQTableData'][$prefix]))
{	
	$core = $_SESSION['IQTableData'][$prefix];
	if(!$core) die();
	$core->parse($_REQUEST);
	$core->connect();
	echo $core->create_table();
	$_SESSION['IQTableData'][$prefix] = $core->obj;
	die();
}	

if(!isset($_SESSION['IQTableData'][$prefix]) or empty($_SESSION['IQTableData'][$prefix]))
{
	$core->parse($_REQUEST);	
	$core->connect();
	echo $core->create_table();
	$_SESSION['IQTableData'][$prefix] = $core->obj;
	die();
}





?>
