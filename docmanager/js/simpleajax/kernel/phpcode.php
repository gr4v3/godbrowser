<?php
function nl2brStrict($text, $replacement = '<br />')
{return preg_replace("((\r\n)+)", trim($replacement), $text);}
function array_invert($arr) {
  $flipped = array();
  foreach ( $arr as $k => $a ) {
   # put the value in the key, with a throw-away value.  dups are inherently avoided,
   # though overwritten.  not sure if prefixing with if ( !isset($flipped[$a][$k]) )
   # would speed this up or slow it down.  probably depends on quantity of dups.
   $flipped[$a][$k] = NULL;
  }
  foreach ( $flipped as $k => $fl ) {
   # now make the keys the values.
   $flipped[$k] = array_keys($fl);
  }
  return $flipped;
}
function array_sort($array,$key,$direction = '')
{
   if(!is_array($array)) return false;
   for ($i = 0; $i < sizeof($array); $i++) 
   {
       $sort_values[$i] = $array[$i][$key];
   } 
   if(!isset($sort_values)) return false;
   if($direction == 'asc')	natcasesort ($sort_values);
   if($direction == 'desc')	arsort ($sort_values);
   reset ($sort_values);
   //if(is_string($array[0][$key])) $sort_values = array_flip($sort_values);
   while (list ($arr_key, $arr_val) = each ($sort_values)) 
   {$sorted_arr[] = $array[$arr_key];}
   return $sorted_arr;
}
if (!function_exists('htmlspecialchars_decode')) {
       function htmlspecialchars_decode($str, $options="") {
		   $trans = get_html_translation_table(HTML_SPECIALCHARS, $options);
		   $decode = ARRAY();
		   foreach ($trans AS $char=>$entity){$decode[$entity] = $char;}
		   $str = strtr($str, $decode);
		   return $str;
       }
}
function solve($string,$row,$index)
{
	$string = str_replace("(!pelicas!)","'",$string);
	$string = str_replace("(!empty!)","&nbsp;",$string);
	$ifcode = "/^if/";
	
	//substitui simplesmente a variável com o dado vindo da base de dados no campo correspondente
	foreach($row as $match => $data)
	{$string = str_replace('{'.$match.'}',$data,$string);}
	
	//troca expressões especiais para carateres especiais
	foreach($row as $match => $data)
	{$string = str_replace('«'.$match.'»',exchange_char($data),$string);}
	
	//formata um número
	foreach($row as $match => $data)
	{$string = str_replace('!'.$match.'!',number_format(($data),2),$string);}
	
	//formata uma data para um aspecto personalizado
	//aqui estaria o procedimento 
	//$objectId = md5($objectType . strtolower($objectId));
	
	foreach($row as $match => $data)
	{
		$string = str_replace('#'.$match.'#',md5($string),$string);
	}
	
	
	return $string;
}
function decode_special_htmlentinties($string)
{
	$arr = array('(!euro!)' => '€',
				 '(!pelicas!)' => '&#039;',
				 '[P]' => "'",
				 '[p]' => '&#039;',
				 '[b]' => '&deg;',
				 '[i]' => '&iacute;',
				 '[c]' => '&ccedil;',
				 '[a]' => '&atilde;',
				 '\'' => "'",
				 '\\' => "", 
				 "now()" => (int)date("U"),
				 
				 '[aacute]' => '&aacute;',
				 '[agrave]' => '&agrave;',
				 '[atilde]' => '&atilde;',
				 '[acirc]' => '&acirc;',

				 '[oacute]' => '&oacute;',
				 '[ograve]' => '&ograve;',
				 '[otilde]' => '&otilde;',
				 '[ocirc]' => '&ocirc;',

				 '[eacute]' => '&eacute;',
				 '[egrave]' => '&egrave;',
				 '[etilde]' => '&etilde;',
				 '[ecirc]' => '&ecirc;',

				 '[icute]' => '&iacute;',
				 '[igrave]' => '&igrave;',
				 '[itilde]' => '&itilde;',
				 '[icirc]' => '&icirc;',

				 '[uacute]' => '&uacute;',
				 '[ugrave]' => '&ugrave;',
				 '[utilde]' => '&utilde;',
				 '[ucirc]' => '&ucirc;',

				 '[ccedil]' => '&ccedil;',

				 '[Aacute]' => '&Aacute;',
				 '[Agrave]' => '&Agrave;',
				 '[Atilde]' => '&Atilde;',
				 '[Acirc]' => '&Acirc;',

				 '[Oacute]' => '&Oacute;',
				 '[Ograve]' => '&Ograve;',
				 '[Otilde]' => '&Otilde;',
				 '[Ocirc]' => '&Ocirc;',

				 '[Eacute]' => '&Eacute;',
				 '[Egrave]' => '&Egrave;',
				 '[Etilde]' => '&Etilde;',
				 '[Ecirc]' => '&Ecirc;',

				 '[Icute]' => '&Iacute;',
				 '[Igrave]' => '&Igrave;',
				 '[Itilde]' => '&Itilde;',
				 '[Icirc]' => '&Icirc;',

				 '[Uacute]' => '&Uacute;',
				 '[Ugrave]' => '&Ugrave;',
				 '[Utilde]' => '&Utilde;',
				 '[Ucirc]' => '&Ucirc;',

				 '[Ccedil]' => '&Ccedil;'

				);
	$result = $string;
	foreach($arr as $index => $value)
	{$result = str_replace($index,$value,$result);}
	return $result;	
}
function decode_costum_htmlentinties($string)
{
	$arr = array('(!euro!)' => "€",	
				 '(!pelicas!)' => "'",	
				 '[p]' => '&#039;'	
				);
	$result = $string;
	foreach($arr as $index => $value)
	{$result = str_replace($index,$value,$result);}
	return $result;	
}
function exchange_char($string)
{
	$chars = array(
		'&oacute;' => 'o',
		'&ocirc;' => 'o',
		'&Oacute;' => 'O',
		'&ocirc;' => 'o',
	);
	foreach($chars as $index => $letter){$string = str_replace($index,$letter,$string);}
	return $string;
}

class pinglib
{
	function user_exists($nick)
	{
		$sql = "select * from tiki_chat_ping where nickname = '$nick'";
		$result = mysql_query($sql);
		$num_rows = mysql_num_rows($result);
		if($num_rows == 0) return false; else return true;
	}
	function get_channelId($nick)
	{
		$sql = "select channelId from tiki_chat_users where nickname = '$nick'";
		$result = mysql_query($sql);
		$row = mysql_fetch_row($result);
		return $row[0];
	}
	function insert($nick)
	{
		$timestamp = (int) date('U');
		if($this->user_exists($nick))
		{
			$sql = "update tiki_chat_ping set presente = $timestamp
					where nickname = '$nick'";
			mysql_query($sql);		
		} else {
			$id = $this->get_channelId($nick);
			$sql = "insert into tiki_chat_ping (nickname,presente,channelId) 
					values('$nick',$timestamp,$id)";
			mysql_query($sql);		
		}
	}
	function getTimeoutUsers($nick)
	{
		
		$this->insert($nick);
		$timestamp = (int) date('U');
		$timeout = $timestamp - 12;
		
		$sql = "select * from tiki_chat_ping where presente < $timeout";
		$result = mysql_query($sql);
		while($row = mysql_fetch_assoc($result))
		{
			$this->remove_user_from_chat($row['nickname']);
		}
		
		$sql = "select tiki_chat_ping.presente,tiki_chat_users.nickname from tiki_chat_users left join tiki_chat_ping on tiki_chat_ping.nickname = tiki_chat_users.nickname";
		$result = mysql_query($sql);
		while($row = mysql_fetch_assoc($result))
		{
			if($row['presente'] == NULL) $this->remove_user_from_chat($row['nickname']);
		}	
		
	}
	function remove_user_from_chat($nick)
	{
		$channelId = $this->get_channelId($nick);
		$timestamp = (int) date('U');
		$sql = "delete from tiki_chat_users where nickname = '$nick'";
		mysql_query($sql);
		$sql = "delete from tiki_chat_ping where nickname = '$nick'";
		mysql_query($sql);
		$sql = "delete from tiki_chat_server where nickname = '$nick'";
		mysql_query($sql);
		mysql_query("insert into tiki_chat_messages (channelId,data,poster,timestamp) values($channelId,'** o utilizador $nick abandonou o chat **','server',$timestamp)");
	}
	function get_messages($nick)
	{
		$channelId = $this->get_channelId($nick);
		$lastmessageId = $this->server_lastmessage($channelId,$nick);
		
		$ret = mysql_query("select * from tiki_chat_messages where channelId = $channelId and messageId > $lastmessageId");
		$a = 0;
		$num = mysql_num_rows($ret);
		$msgs = array();
		while($row = mysql_fetch_assoc($ret)){$msgs[] = $row;}
		foreach($msgs as $i => $value)
		{
			if($num == 1)echo $value['poster'].': '.$value['data'];
				else 
			if($i == (count($msgs)-1)) echo $value['poster'].": ".$value['data'];
				else echo $value['poster'].": ".$value['data']."<br />";
			if($value['messageId'] > $a) $a = $value['messageId'];
			
		}
		if($a > 0)$this->server_update((int)$a,(int)$channelId,$nick);
	}
	function server_lastmessage($channelId,$nick)
	{	
		$timestamp = (int) date('U');
		$id = $timestamp;
		$ret = mysql_query("select last_time from tiki_chat_server where channelId = $channelId and nickname = '$nick'");
		$id = mysql_fetch_row($ret);
		if($id == '') 
		{
			$ret = mysql_query("select last_time from tiki_chat_server where channelId = $channelId order by last_time desc");
			if($ret)
			{
				$inicio = mysql_fetch_row($ret);
				$i = $inicio[0] + 1;
			} else $i = 0;
			mysql_query("insert into tiki_chat_server (last_time,channelId,nickname) values($i,$channelId,'$nick')");
			return $i;
		} else $id = $id[0];
		return $id;
	}
	function server_update($msgId = false,$channelId = false,$nick)
	{
		if(!$msgId and !$channelId) return false;
		$sql = "update tiki_chat_server set last_time = $msgId where channelId = $channelId and nickname = '$nick'";
		mysql_query($sql);
		$clearmessages = $timestamp - 60;
		mysql_query("delete from tiki_chat_messages where timestamp < $clearmessages");
	}
	function clearemptyChannels()
	{
		$sql = "SELECT tiki_chat_messages.channelId FROM tiki_chat_messages
				left join tiki_chat_users on tiki_chat_users.channelId = tiki_chat_messages.channelId
				where tiki_chat_users.channelId is null";
		$ret = mysql_query($sql);
		while($row = mysql_fetch_assoc($ret))
		{
			mysql_query("delete from tiki_chat_messages where channelId = ".$row['channelId']);
		}
	}
}
function str_encode ($string,$to="iso-8859-9",$from="utf8") {
   if($to=="iso-8859-9" && $from=="utf8"){
       $str_array = array(
       chr(196).chr(177) => chr(253),
       chr(196).chr(176) => chr(221),
       chr(195).chr(182) => chr(246),
       chr(195).chr(150) => chr(214),
       chr(195).chr(167) => chr(231),
       chr(195).chr(135) => chr(199),
       chr(197).chr(159) => chr(254),
       chr(197).chr(158) => chr(222),
       chr(196).chr(159) => chr(240),
       chr(196).chr(158) => chr(208),
       chr(195).chr(188) => chr(252),
       chr(195).chr(156) => chr(220)
       );
       return str_replace(array_keys($str_array), array_values($str_array), $string);
   
   }    
   return $string;
}
$ping = new pinglib;
?>