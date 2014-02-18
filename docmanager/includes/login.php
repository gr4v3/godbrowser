<?php
header("Cache-Control: no-cache, must-revalidate");
require_once 'constants.php';
require_once 'sql.php';
require_once 'func.php';


$mode = isset($_REQUEST['mode'])?$_REQUEST['mode']:die('invalid call');

if($mode == 'create')
{
	if(!isset($_COOKIE['ArtCalendar_login']))
	{
		setcookie('user_type',1);
		setcookie('ArtCalendar_login','giacomo');
		setcookie('ArtCalendar_session','7fccc6c8b989dec5e282db7a79dfbe7f8dacc0a9ca');
		setcookie('nRecordDocs',1);
		setcookie('ajax_chat_style',1);
		
	} else {
		echo 'var login = true;';
	}
}
else if($mode == 'admin')
{
	setcookie('user_type',1);
	setcookie('ArtCalendar_login','giacomo');
	setcookie('ArtCalendar_session','7fccc6c8b989dec5e282db7a79dfbe7f8dacc0a9ca');
	setcookie('nRecordDocs',1);
	setcookie('ajax_chat_style',1);
}
else if($mode == 'access')
{
	if(!isset($_COOKIE['ArtCalendar_login'])) die('var login = false;');
	else {
		
		$sql = "select * from webcal_user where cal_login = '".$_COOKIE['ArtCalendar_login']."'";
		$result = mysql_query($sql,SQLID) or die('error: '.$sql);
		if(mysql_num_rows($result) > 0)
		{
			$row = mysql_fetch_assoc($result);
			echo "common.login.current.username = '".$row['cal_login']."';";
			echo "common.login.current.firstname = '".$row['cal_firstname']."';";
			echo "common.login.current.lastname = '".$row['cal_lastname']."';";
			echo "common.login.current.admin = ".($row['cal_is_admin']=='Y'?1:0).";";
			echo "var login = true;";
		} else {
			echo "common.login.current.username = 'public';";
			echo "common.login.current.firstname = 'public';";
			echo "common.login.current.lastname = '';";
			echo "common.login.current.admin = 0;";
			echo "var login = true;";
		}
	}
}
else if($mode == 'erase')
{
	setcookie('user_type',1);
	setcookie('ArtCalendar_login','public');
	setcookie('ArtCalendar_session','');
	setcookie('nRecordDocs',0);
	setcookie('ajax_chat_style',0);
}
?>