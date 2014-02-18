<?php
session_start();
header("Cache-Control: no-cache, must-revalidate");
require_once 'constants.php';
require_once 'sql.php';
require_once 'func.php';
require_once 'icons.php';
require_once 'tar/tar.class.php';

$mode = isset($_REQUEST['mode'])?$_REQUEST['mode']:die('invalid call');

if($mode == 'insert')
{
	if(empty($_GET['name'])) die('error: no filename!');
	if(empty($_GET['folder'])) die('error: no folder selected!');
	
	if(!isset($_COOKIE['ArtCalendar_login']))
	{
		$user = 'public';
		setcookie('ArtCalendar_login','public');
	} else $user = $_COOKIE['ArtCalendar_login'];
	
	
	$name = $_GET['name'];
	$data = explode(".",$name);
	$len = count($data);
	
	$extension = array_pop($data);
	$filename = '';
	foreach($data as $value)
	{
		$filename.= $value;
	}
	$folder = $_GET['folder'];
	
	if(!$folderPerms->isWriteable($folder,$user)) die('not allowed!');
	
	$uploaddate = mktime();
	$lastmodifieddate = mktime();
	$filesize = filesize('..'.SLASH.'temp'.SLASH.$name);
	$author = $user;
	$lastchangedby = $user;
	$tags = '';
	$description = '';
	
	$sql = "insert into ".TABLE_PREFIX."documents (
						`filename`,
						`extension`,
						`uploaddate`,
						`lastmodifieddate`,
						`filesize`,
						`author`,
						`lastchangedby`,
						`tags`,
						`description`,
						`folder`
			) 
			values ('$filename','$extension',$uploaddate,$lastmodifieddate,$filesize,'$author','$lastchangedby','$tags','$description',$folder)";
	$result = mysql_query($sql,SQLID) or die("error: ".$sql);
	$id = mysql_insert_id(SQLID);
	copy('..'.SLASH.'temp'.SLASH.$name,'..'.SLASH.'content'.SLASH.$id);
	unlink('..'.SLASH.'temp'.SLASH.$name);
	
	$filePerms->insert($id);
	$filePerms->insert($id,$user,1,1,1,1);
	
	echo $id;
}
else if($mode == 'rename')
{
	$id = $_GET['id'];
	$name = $_GET['name'];
	$folder = $_GET['folder'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	
	
	if ($filePerms->isWriteable($id,$user)) {
		$sql = "update ".TABLE_PREFIX."documents set filename = '$name' where id = $id";
		mysql_query($sql,SQLID) or die("error: ".$sql);
	}
	echo "success!";
}
else if($mode == 'description')
{
	$id = $_GET['id'];
	$description = $_GET['description'];
	$folder = $_GET['folder'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
		
	if(!$filePerms->isOperatable($id,$folder)) die('unsucess!');
	
	if ($filePerms->isWriteable($id,$user)) {
		$sql = "update ".TABLE_PREFIX."documents set description = '$description' where id = $id";
		mysql_query($sql,SQLID) or die("error: ".$sql);
	}
	echo "success!";
}
else if($mode == 'erase')
{
	//vars
	$id = $_GET['id'];
	$folder = $_GET['folder'];
	$root = $_SERVER['DOCUMENT_ROOT'];	
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	
	if ($filePerms->isErasable($id,$user)) {
		
		//gets file extension for thumbnails
		$sql = "select * from ".TABLE_PREFIX."documents where id = $id";
		$result = mysql_query($sql,SQLID) or die("error: ".$sql);
		$row = mysql_fetch_assoc($result);
		
		
		//erases from table documents
		$sql = "delete from ".TABLE_PREFIX."documents where id = $id";
		mysql_query($sql,SQLID) or die("error: ".$sql);	
		
		//erases from table permissions
		$ids = $filePerms->getId($id);
		if(is_array($ids))
		{
			foreach($ids as $value)
			{
				$filePerms->erase($value['id']);
			}
		} else {
			$filePerms->erase($ids);
		}

		//physical file deletion
		unlink('..'.SLASH.'content'.SLASH.$id);
		if(is_file('..'.SLASH.'images'.SLASH.'thumb'.SLASH.$id.'.'.$row['extension'])) unlink('..'.SLASH.'images'.SLASH.'thumb'.SLASH.$id.'.'.$row['extension']);
	}
	echo 'success!';
}
else if($mode == 'move')
{
	//vars
	$id = $_GET['id'];
	$dest = $_GET['dest'];
	$folder = $_GET['folder'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	
	if(!$folderPerms->isWriteable($folder,$user)) die('not allowed!');

	if ($filePerms->isWriteable($id,$user)) {
		$sql = "update ".TABLE_PREFIX."documents set folder = $dest where id = $id";
		mysql_query($sql,SQLID) or die("error: ".$sql);
	}
	echo $id;
}
else if($mode == 'copy')
{
	$id = $_GET['id'];
	$dest = $_GET['dest'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	$folder = $_GET['folder'];
	
	//if(!$filePerms->isOperatable($id,$folder)) die('unsucess!');
	if(!$folderPerms->isWriteable($folder,$user)) die('not allowed!');
	
	if ($filePerms->isWriteable($id,$user)) {
		$sql = "select * from ".TABLE_PREFIX."documents where id = $id";
		$result = mysql_query($sql,SQLID) or die("error: ".$sql);
		$row = mysql_fetch_assoc($result);	
		
		$row['filename'] = $row['filename'].'_copy';
	
		$sql = "insert into ".TABLE_PREFIX."documents (`filename`,`extension`,`uploaddate`,`lastmodifieddate`,`filesize`,`author`,`lastchangedby`,`tags`,`description`,`folder`) values ";	
		$sql.= "('".$row['filename']."',
				 '".$row['extension']."',
				 ".$row['uploaddate'].",
				 ".$row['lastmodifieddate'].",
				 ".$row['filesize'].",
				 '".$row['author']."',
				 '".$row['lastchangedby']."',
				 '".$row['tags']."',
				 '".$row['description']."',
				 ".$dest."
				 )";
		mysql_query($sql,SQLID) or die("error: ".$sql);
		$newid = mysql_insert_id(SQLID);
		copy('..'.SLASH.'content'.SLASH.$id,'..'.SLASH.'content'.SLASH.$newid);
		
		$filePerms->insert($newid);
		$filePerms->insert($newid,$user,1,1,1,1);
	}
	echo $newid;
}
else if($mode == 'tags')
{
	
}
else if($mode == 'gettags')
{
	$id = $_GET['id'];
	
	$sql = "select tags from ".TABLE_PREFIX."documents where id = $id";
	$result = mysql_query($sql,SQLID) or die("error: ".$sql);
	$row = mysql_fetch_assoc($result);
	
	$tags = explode(",",$row['tags']);

	echo 'var tags = [];';
	foreach($tags as $value)
	{
		echo "tags.push('".htmlentities($value)."');";
	}
}
else if($mode == 'addtag')
{
	$id = $_GET['id'];
	$tag = $_GET['tag'];
	
	
	$sql = "update ".TABLE_PREFIX."documents set tags = '$tag' where id = $id";
	mysql_query($sql,SQLID) or die("error: ".$sql);
	echo "success!";
}
else if($mode == 'new')
{
	$name = explode(".",$_GET['name']);
	$folder = $_GET['folder'];
	$author = $_GET['author'];
	$now = mktime();
	
	$row = array();
	$row['filename'] = $name[0];
	$row['extension'] = isset($name[1])?$name[1]:'txt';
	
	if(empty($row['extension']) or $row['extension'] == '') $row['extension'] = 'txt';
	
	$row['uploaddate'] = $now;
	$row['lastmodifieddate'] = $now;
	$row['filesize'] = 0;
	$row['author'] = $author;
	$row['lastchangedby'] = $author;
	$row['tags'] = '';
	$row['description'] = '';
	$dest = $folder;
	
	$sql = "insert into ".TABLE_PREFIX."documents (`filename`,`extension`,`uploaddate`,`lastmodifieddate`,`filesize`,`author`,`lastchangedby`,`tags`,`description`,`folder`) values ";	
	$sql.= "('".$row['filename']."',
			 '".$row['extension']."',
			 ".$row['uploaddate'].",
			 ".$row['lastmodifieddate'].",
			 ".$row['filesize'].",
			 '".$row['author']."',
			 '".$row['lastchangedby']."',
			 '".$row['tags']."',
			 '".$row['description']."',
			 ".$dest."
			 )";
	mysql_query($sql,SQLID) or die("error: ".$sql);
	$id = mysql_insert_id(SQLID);
	$handle = fopen('..'.SLASH.'content'.SLASH.$row['filename'].'.'.$row['extension'], "w+");
	fclose($handle);
	copy('..'.SLASH.'content'.SLASH.$row['filename'].'.'.$row['extension'],'..'.SLASH.'content'.SLASH.$id);
	unlink('..'.SLASH.'content'.SLASH.$row['filename'].'.'.$row['extension']);
	
	$filePerms->insert($id);
	$filePerms->insert($id,$author,1,1,1,1);
	
	echo $id;
}
else if($mode == 'properties')
{
	$id = $_GET['id'];
	$folder = $_GET['folder'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	$filePerms->isViewable($id,$user);
	
	
	$sql = "select * from ".TABLE_PREFIX."documents where id = $id";
	$result = mysql_query($sql,SQLID) or die("error: ".$sql);
	$row = mysql_fetch_assoc($result);
	
	//wordwrap($filename,7,' ',TRUE)

	echo "var data = {};";
	foreach($row as $index => $value)
	{
		if($index == 'uploaddate') echo "data['Create at'] = '".date("H:i:s m-d-Y",$value)."';";
		else if($index == 'lastmodifieddate') echo "data['Modified at'] = '".date("H:i:s m-d-Y",$value)."';";
		else if($index == 'filesize') echo "data.$index = '".size_readable($value)."';";
		else if($index == 'author') echo "data.$index = '".getShortNameByAuthor($value)."';";
		else if($index == 'lastchangedby') echo "data.$index = '".getShortNameByAuthor($value)."';";
		else if($index == 'description') echo "data.$index = '".wordwrap((empty($value)||$value==''?'&nbsp;':$value),20,'<br />',TRUE)."';";
			else if($index != 'id' and $index != 'permissions' and $index != 'folder') echo "data.$index = '".(empty($value)?'&nbsp;':$value)."';";
		
	}
}
else if($mode == 'zip')
{
	$list = $_GET['list'];
	
	
}
else if($mode == 'search')
{
	$type = $_GET['type'];
	$keyword = $_GET['keyword'];
	
	
	$kind = $_GET['kind'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	
	if($kind == 'string')	$keyword = "'%$keyword%'"; 
	if($kind == 'number')	$keyword = "$keyword";
	
	if(is_array($type))
	{
		$arr = array();
		foreach($type as $index => $value)
		{
			$arr[] = "t_documents.$value like $keyword";
		}
		$search = ' and ';
		$search.= implode(" and ",$arr);
	} else if(is_string($type)) $search = '';
	
	
	echo '<table class="search_table" style="width:100%;" cellpadding="0" cellspacing="0" border="0">';
		echo '<tr class="search_menu">';
			echo '<td style="width:17px;" valign="top">&nbsp;</td>';
			echo '<td valign="top">Name</td>';
			echo '<td valign="top">Filesize</td>';
			echo '<td valign="top" style="width:150px;">Date</td>';
			echo '<td valign="top">Description</td>';
			echo '<td  valign="top">Folder</td>';
		echo "</tr>";
		
	//if(isset($dir_list)) unset($dir_list);
	$sql = 'SELECT distinct t_documents.*, t_folders.name FROM '.TABLE_PREFIX.'documents as t_documents
INNER JOIN '.TABLE_PREFIX.'folders as t_folders ON t_documents.folder = t_folders.id
INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id
WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_permissions.item_type = "file" '.$search.' ORDER BY t_documents.filename DESC';
	//"SELECT *,".TABLE_PREFIX."folders.id as folderid FROM ".TABLE_PREFIX."documents inner join ".TABLE_PREFIX."folders on ".TABLE_PREFIX."documents.folder = ".TABLE_PREFIX."folders.id WHERE $search  ORDER BY filename DESC";
	
	//$folderPerms->isViewable();	
	
	$doc_list = mysql_query($sql) or die('error: '.$sql);
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) {
			
			echo '<tr class="search_content">';
				echo '<td><img src="'.set_icon($row['extension'],16).'" style="width:16px;height:16px;" /></td>';
				echo "<td fileid=\"".$row['id']."\" ondblclick=\"common.file.select_(event);common.file.view();\">".$row['filename'].'.'.$row['extension']."</td>";
				echo "<td>".size_readable($row['filesize'])."</td>";
				echo "<td>".date('m-d-Y H:m:s',$row['uploaddate'])."</td>";
				echo "<td>".$row['description']."</td>";
				echo '<td align="center"><img src="images/browser_icons/folder_small.png" style="width:14px;height:13px;" />&nbsp;<a href="#" onclick="common.folder.set('.$row['folder'].');">'.$row['name'].'</a></td>';
			echo "</tr>";
			
				
		}
	}
	echo "</table>";
	if(isset($doc_list)) unset($doc_list);


} else if($mode == 'rights')
{
	$id = $_GET['id'];
	$login = !isset($_COOKIE['ArtCalendar_login'])?'public':$_COOKIE['ArtCalendar_login'];
	
	$sql = "SELECT * FROM dm_permissions WHERE dm_permissions.item_id = $id and item_type = 'file'";
	$permissions = mysql_query($sql,SQLID) or die('error: '.$sql);
	$sql = "SELECT * FROM webcal_user";
	$users = mysql_query($sql,SQLID) or die('error: '.$sql);
	
	
	$sql = "SELECT * FROM webcal_user where cal_login = '".$login."'";
	$result = mysql_query($sql,SQLID) or die('error: '.$sql);
	if($result) $current = mysql_fetch_assoc($result); else $current = false;
	
	

	
	echo '<div id="access">
			<form onsubmit="return false">
			<input type="hidden" name="item_id" value="'.$id.'" />
			<input type="hidden" name="item_type" value="file" />
			<table border="0" cellpadding="0" cellspacing="0">
			<tr><td><select name="users">';
	
	
	
	while($row = mysql_fetch_assoc($users))
	{
		echo '<option value="'.htmlentities($row['cal_login']).'">'.htmlentities($row['cal_login']).'</option>';
	}
	
	
	echo '</select></td><td><input '.($login=='public'?'disabled="disabled"':'').' type="button" value="add" onclick="common.file.newAccess(this.form);" /></td></tr></table></form>
			<div><table border="0" id="access_perms_table" cellpadding="0" cellspacing="0">';
					
	if($filePerms->isOwner($id,$login))	
	{		
				echo '<tr>
						<td align="left" style="width:200px;">&nbsp;</td>
						<td align="center" style="width:22px;"><a href="javascript:common.file.multiaccess('.$id.',\'view\');">v</a></td>
						<td align="center" style="width:21px;"><a href="javascript:common.file.multiaccess('.$id.',\'read\');">r</a></td>
						<td align="center" style="width:21px;"><a href="javascript:common.file.multiaccess('.$id.',\'write\');">w</a></td>
						<td align="center" style="width:21px;"><a href="javascript:common.file.multiaccess('.$id.',\'erase\');">e</a></td>
						<td align="center" style="width:21px;">&nbsp;</td>
					</tr>';
	} else {
		echo '<tr>
				<td align="left" style="width:200px;">&nbsp;</td>
				<td align="center" style="width:22px;">v</td>
				<td align="center" style="width:21px;">r</td>
				<td align="center" style="width:21px;">w</td>
				<td align="center" style="width:21px;">e</td>
				<td align="center" style="width:21px;">&nbsp;</td>
			</tr>';
	}
	while($row = mysql_fetch_assoc($permissions))
	{
		$access = '';
		if($login == 'public' or $login==$row['who']) $access = 'disabled="disabled"';
			else $access = '';
		
		echo '
				<tr>
					<td align="left" style="width:200px;">'.htmlentities($row['who']).'&nbsp;</td>
					<td colspan="5">
						<form onsubmit="return false">
							<input type="hidden" name="who" value="'.$row['who'].'" />
							<input type="hidden" name="id" value="'.$row['id'].'" />
							<input type="hidden" name="item_id" value="'.$row['item_id'].'" />
						<table cellpadding="0" cellspacing="0" border="0">
							<td align="center"><input '.$access.' type="checkbox" name="view" value="1" onclick="common.file.access(this.form);" '.($row['view']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="read" value="1" onclick="common.file.access(this.form);" '.($row['read']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="write_" value="1" onclick="common.file.access(this.form);" '.($row['write']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="erase" value="1" onclick="common.file.access(this.form);" '.($row['erase']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="image" src="'.RELATIVE_IMG_PATH.'action/remove.png" onclick="common.file.eraseAccess('.$row['id'].','.$id.');" /></td>
						</table>
						</form>
					</td>	
				</tr> ';
	}
echo '
</table>
</div>

</div>';
} else if($mode == 'access')
{
	$id = $_GET['id'];
	$item_id = $_GET['item_id'];
	$who = $_GET['who'];
	$view = $_GET['view'];
	$read = $_GET['read'];
	$write = $_GET['write'];
	$erase = $_GET['erase'];
	
	$filePerms->update($id,$item_id,$who,$view,$read,$write,$erase);
	echo "success!";
} else if($mode == 'newaccess')
{
	$item_id = $_GET['item_id'];
	$item_type = $_GET['item_type'];
	$who = $_GET['who'];
	
	$filePerms->insert($item_id,$who,1,1,1,1);
	echo "success!";
} else if($mode == 'eraseaccess')
{
	$id = $_GET['id'];
	$filePerms->delete($id);
	echo "success!";
} else if($mode == 'filecheck')
{
	$login = !isset($_COOKIE['ArtCalendar_login'])?'public':$_COOKIE['ArtCalendar_login'];
	
	$sql = "SELECT * FROM dm_permissions WHERE item_type = 'folder'";
	$folders = mysql_query($sql,SQLID) or die("error: ".$sql);
	
	
	
} else if($mode == 'avaiable')
{
	$id = $_GET['id'];
	$filePerms->isOperatable($id);
} else if($mode == 'asearch')
{
	$search = isset($_GET['search'])?$_GET['search']:'';
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	$arr = array();
	if(is_array($search))
	{
		foreach($search as $index => $value)
		{
			$arr[] = "t_documents.$index like '%$value%'";
		}
		$search = ' and ';
		$search.= implode(" and ",$arr);
		
	} else $search = "";

	echo '<table class="search_table" style="width:100%;" cellpadding="0" cellspacing="0" border="0">';
		echo '<tr class="search_menu">';
			echo '<td style="width:17px;" valign="top">&nbsp;</td>';
			echo '<td valign="top">Name</td>';
			echo '<td valign="top">Filesize</td>';
			echo '<td valign="top" style="width:150px;">Date</td>';
			echo '<td valign="top">Description</td>';
			echo '<td  valign="top">Folder</td>';
		echo "</tr>";
		
	//if(isset($dir_list)) unset($dir_list);
	$sql = 'SELECT distinct t_documents.*, t_folders.name FROM '.TABLE_PREFIX.'documents as t_documents
INNER JOIN '.TABLE_PREFIX.'folders as t_folders ON t_documents.folder = t_folders.id
INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id
WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_permissions.item_type = "file" '.$search.' ORDER BY t_documents.filename DESC';
	//"SELECT *,".TABLE_PREFIX."folders.id as folderid FROM ".TABLE_PREFIX."documents inner join ".TABLE_PREFIX."folders on ".TABLE_PREFIX."documents.folder = ".TABLE_PREFIX."folders.id WHERE $search  ORDER BY filename DESC";
	
	//$folderPerms->isViewable();	
	
	
	$doc_list = mysql_query($sql) or die('error: '.$sql);
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) {
			
			echo '<tr class="search_content">';
				echo '<td><img src="'.set_icon($row['extension'],16).'" style="width:16px;height:16px;" /></td>';
				echo "<td fileid=\"".$row['id']."\" ondblclick=\"common.file.select_(event);common.file.view();\">".$row['filename'].'.'.$row['extension']."</td>";
				echo "<td>".size_readable($row['filesize'])."</td>";
				echo "<td>".date('m-d-Y H:m:s',$row['uploaddate'])."</td>";
				echo "<td>".$row['description']."</td>";
				echo '<td align="center"><img src="images/browser_icons/folder_small.png" style="width:14px;height:13px;" />&nbsp;<a href="#" onclick="common.folder.set('.$row['folder'].');">'.$row['name'].'</a></td>';
			echo "</tr>";
			
				
		}
	}
	echo "</table>";
	if(isset($doc_list)) unset($doc_list);
} else if($mode == 'multiaccess')
{
	$id = $_GET['id'];
	$type = $_GET['type'];

	$sql = "update ".TABLE_PREFIX."permissions set `$type` = not `$type` where item_id = $id and item_type = 'file' and who = 'public'";
	mysql_query($sql) or die('error: '.$sql);
	
	$sql = "select `$type` from ".TABLE_PREFIX."permissions where item_id = $id and item_type = 'file' and who = 'public'";
	$result = mysql_query($sql) or die('error: '.$sql);
	if($result) 
	{
		$current = mysql_fetch_assoc($result);
		$sql = "update ".TABLE_PREFIX."permissions set `$type` = ".$current[$type]." where item_id = $id and item_type = 'file' and who != 'public'";
		mysql_query($sql) or die('error: '.$sql);
	}
	echo $id;
} else if($mode == 'multidownload')
{
    /* TAR.GZ download mode */		
	// Include TAR Class
	error_reporting(0);
	
	$files = $_GET['id'];
	//$files = array(55,56,66);
	
	$query = 'SELECT id,filename,extension,uploaddate FROM dm_documents WHERE id in (';
	foreach ($files as $filekey) {
		$query .= $filekey.',';
	}
	$query = substr($query, 0, -1);
	$query .= ')';
	$result = mysql_query($query);
	$files = array();
	while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
		$blah = fopen('asdasd.txt','w');
		copy(DOC_PATH.SLASH.$row['id'],DOC_DOWNLOAD.SLASH.$row['filename'].'_'.date('Ymd',$row['uploaddate']).'.'.$row['extension']);
		$files[] = $row['filename'].'_'.date('Ymd',$row['uploaddate']).'.'.$row['extension'];
	}
	$time = time();
	if(file_exists(DOC_DOWNLOAD.SLASH.'download_'.$time.'.tar.gz')) unlink(LOCAL_PATH.SLASH.'downloads'.SLASH.'download_'.$time.'.tar.gz');
	
	// Creating a NEW Tar file
	$tar = new tar();
	foreach($files as $file) {
		$tar->addFile(DOC_DOWNLOAD.SLASH.$file);			
	}
	
	$tar->toTar(DOC_DOWNLOAD.SLASH.'download_'.$time.'.tar.gz',TRUE);
	//$tar->toFile("new.tgz",TRUE);
	
	unset($tar);
	
	//deletes files that where compressed	
	foreach($files as $file) {			
		unlink(DOC_DOWNLOAD.SLASH.$file);
	}
	
	
	header('Content-type: application/tar.gz');	
	// defines the filename
	header('Content-Disposition: attachment; filename="artcalendar_download'.date('Ymd').'.tar.gz"');	
	
	readfile(DOC_DOWNLOAD.SLASH.'download_'.$time.'.tar.gz');
	
} else if($mode == 'associate')
{
	$docId = $_GET['id'];
	$userId = $_GET['userId'];
	$sUserType = $_GET['sUserType'];
	echo "<div>";
	$i = 1;
	foreach($docId as $value)
	{
		$dupped_rel = mysql_query('SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId='.$value.' and userId='.$userId.' and sUserType="'.$sUserType.'"');
		if (mysql_num_rows($dupped_rel)<1) {		
			$sql = "insert into ".TABLE_PREFIX."doc_user (docId,userId,sUserType) values($value,$userId,'$sUserType')";
			mysql_query($sql) or die('error: '.$sql);
		}
		
		$sql = "select * from ".TABLE_PREFIX."documents where id = $value";
		$result = mysql_query($sql) or die('error: '.$sql);
		$data = mysql_fetch_assoc($result); 
		echo "<div>".$i.". ".$data['filename'].".".$data['extension']."</div>";
		$i++;
	}
	echo "</div>";
} else if($mode == 'filter')
{
	$_SESSION['filter'] = $_GET['access'];
	$_SESSION['EntityId'] = $_GET['EntityId'];
	echo "success!";
} else if($mode == 'deassociate')
{
    foreach($_GET['files'] as $file) {
		$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$file.' and userId = '.$_GET['id'].' and sUserType = "'. $_GET['type'].'"';
		mysql_query($sql) or die('error: '.$sql);
	}
	echo "success!";
} else if($mode == 'source')
{
	$id = $_GET['id'];
	header('Content-type: text/html');
	
	foreach($id as $value)
	{
		$handle = fopen(DOC_PATH.'/'.$value, "r");
		$contents = fread($handle, filesize(DOC_PATH.'/'.$value));
		fclose($handle);
		echo stripslashes($contents);
	}
} else if($mode == 'save')
{
	$id = $_POST['id'];
	$content = $_POST['content'];
	file_put_contents(DOC_PATH.'/'.$id,$content);
	echo "success!";
}
?>