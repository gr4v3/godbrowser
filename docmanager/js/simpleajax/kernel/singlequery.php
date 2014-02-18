<?php
session_start();
set_time_limit(60);
error_reporting(0);
include('phpcode.php');
$quer = '';
unset($_SESSION['F']);
if(isset($_REQUEST['A']) && $_REQUEST['A']) $_SESSION['host'] = $_REQUEST['A']; 
if(isset($_REQUEST['B']) && $_REQUEST['B']) $_SESSION['user'] = $_REQUEST['B'];
if(isset($_REQUEST['C']) && $_REQUEST['C']) $_SESSION['pass'] = $_REQUEST['C'];
if(isset($_REQUEST['D']) && $_REQUEST['D']) $_SESSION['db'] = $_REQUEST['D'];
if(isset($_REQUEST['E']) && $_REQUEST['E']) $prefix = $_REQUEST['E'];
if(isset($_REQUEST['F']) && $_REQUEST['F']) $quer = $_REQUEST['F'];
if(isset($_REQUEST['G']) && $_REQUEST['G']) $mod = $_REQUEST['G'];
if(isset($_REQUEST['H']) && $_REQUEST['H']) $func = $_REQUEST['H'];
if(isset($_REQUEST['I']) && $_REQUEST['I']) $args = $_REQUEST['I'];


if($mod == 'sql')
{
		mysql_connect($_SESSION['host'],$_SESSION['user'],$_SESSION['pass']) or die();
		mysql_select_db($_SESSION['db']) or die();
		$result = mysql_query(decode_special_htmlentinties($_REQUEST['F'])) or die();
		$access = 'false';
		$matches = array(
				'/^create/i',
				'/^show/i',
				'/^alter/i',
				'/^delete/i',
				'/^select/i',
				'/^update/i',
				'/^insert/i'
				);
		foreach($matches as $index => $value)
		{if(preg_match($value,$_REQUEST['F'])) $access = $index;}
		echo "var type = $access;";
		echo "var query = \"".decode_special_htmlentinties($_REQUEST['F'])."\";";
		echo "var result = new Array();
		";
		while($row = mysql_fetch_assoc($result))
		{
			echo "var temp = new Array();
		";
			foreach($row as $value)
			{
				echo "temp.push(\"".$value."\");
		";
			}
			echo "result.push(temp);
		";
		}
		unset($_SESSION['F']);
		
}
if($mod == 'php')
{
	echo md5("chat" . strtolower((int) $_REQUEST['I']));
}
if($mod == 'now')
{
	echo (int)date("U");
}	
if($mod == 'ping')
{
	$id = mysql_connect($_SESSION['host'],$_SESSION['user'],$_SESSION['pass']) or die();
	mysql_select_db($_SESSION['db']) or die();
	$ping->getTimeoutUsers($args);
	$ping->get_messages($args);
	$ping->clearemptyChannels();
}
if($mod == 'md5')
{
	$data = explode(":",$args);
	echo md5($data[0].strtolower($data[1]));
}
if($mod == 'newnick')
{
	$data = explode(":",$args);
	$newnick = $data[1];
	$nick = $data[0];
	echo $newnick;
	$id = mysql_connect($_SESSION['host'],$_SESSION['user'],$_SESSION['pass']) or die();
	mysql_select_db($_SESSION['db']) or die();
	mysql_query("delete from tiki_chat_ping where nickname = '$nick'");
	mysql_query("delete from tiki_chat_users where nickname = '$nick'");
	$ret = mysql_query("select last_time,channelId from tiki_chat_server where nickname = '$nick'");
	if($ret)
	{
		
		while($row = mysql_fetch_assoc($ret))
		{
			$last_time = $row['last_time'];
			$channelId = $row['channelId'];
			
			$sql = "insert into tiki_chat_server (last_time,nickname,channelId) values($last_time,'$newnick',$channelId)";
			mysql_query($sql);
		}
		mysql_query("delete from tiki_chat_server where nickname = '$nick'");
	}
}
if($mod == 'firsttime')
{
	$sql = "SELECT max(messageId) as max,channelId,poster FROM tiki_chat_messages group by channelId";
	$ret = $chatlib->query($sql);
	while($row = $ret->fetchRow())
	{
		$sql = "delete from tiki_chat_server where nickname = ? and channelId = ?";
		$chatlib->query($sql,array($row['channelId'],$args));
		$sql = "insert into tiki_chat_server (last_time,channelId,nickname) values(?,?,?)";
		$chatlib->query($sql,array($row['max'],$row['channelId'],$args));		
	}
}
if($mod == 'mysqldump')
{
	set_time_limit(0);
	ini_set("memory_limit", "500M");
	
	
	$dbhost = $_SESSION['host'];
	$dbuser = $_SESSION['user'];
	$dbpass = $_SESSION['pass'];
	$dbname = $_SESSION['db'];
	
	$backupDir = '';
	$backupFileName = $dbname . date("Y-m-d-H-i-s") . '.sql';
	$backupFile = $backupDir . $backupFileName;
	
	if ($dbpass!='')
		$command = "mysqldump.exe -h $dbhost -u $dbuser -p $dbpass $dbname > $backupFile";
	else
		$command = "mysqldump.exe -h $dbhost -u $dbuser $dbname > $backupFile";
	echo $command;
	system($command);
	
	
	$file = fopen($backupFile,'rb');
	$data = fread($file,filesize($backupFile));
	fclose($file);
	
//	echo $backupFile;
	
}
var_dump($_REQUEST['id']);
?>