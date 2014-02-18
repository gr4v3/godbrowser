<?php
header("Cache-Control: no-cache, must-revalidate");
require_once 'constants.php';
include_once "sql.php";
include_once "func.php";

$mode = isset($_REQUEST['mode'])?$_REQUEST['mode']:die('invalid call');

if($mode == 'root')
{
	$arr = folders(0);
	echo "var obj = {};";
	convert2js($arr,"obj");
	
}
else if($mode == 'content')
{
	$id = $_GET['id'];
	$arr = folders($id);
	echo "var obj = {};";
	convert2js($arr,"obj"); 
}
else if($mode == 'folder')
{
	$id = $_GET['id'];
	$sql = "select * from ".TABLE_PREFIX."folders where id = $id";
	$result = mysql_query($sql,SQLID) or die("error: ".$sql);
	
	echo "var obj = {};";
	echo "obj.index = {};";
	echo "obj.value = new Array();";
	$row = mysql_fetch_assoc($result);
	
	foreach($row as $index => $value)
	{
		echo "obj.index['".$index."'] = obj.value.length;";
		echo "obj.value.push('".$value."');";
	}
}
else if($mode == 'move')
{
	$id = $_GET['id'];
	$dest = $_GET['dest'];
	
	if($id == $dest) die($id);
	
	$sql = "update ".TABLE_PREFIX."folders set parent = $dest where id = $id";
	mysql_query($sql,SQLID) or die("error: ".$sql);
	echo $id;
}
else if($mode == 'erase')
{
	$id = $_GET['id'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	function erase_folder ($root = 0) {
		//query
		$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';
		
			
		$file_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE '.TABLE_PREFIX.'documents.folder = '.$root) or die('operation canceled due to errors: ');
		while ($row = mysql_fetch_array($file_list,MYSQL_ASSOC)) {				
			if(file_exists(DOC_PATH.SLASH.$row['id'])) unlink(DOC_PATH.SLASH.$row['id']) or die('operation canceled due to errors');
		}
		$delete_folder = mysql_query('DELETE FROM '.TABLE_PREFIX.'folders WHERE id = '.$root);
		$delete_perms = mysql_query('DELETE FROM '.TABLE_PREFIX.'permissions WHERE item_type = \'folder\' and item_id = '.$root); 
		$result = mysql_query($query.$root);
		
		if(mysql_num_rows($result)>0) {
			while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {				
				erase_folder($row['id']);
			}			
		}
		return 0;
	}
	foreach($id as $value)
	{
		erase_folder($value);
	}
	echo 'OK';
}
else if($mode == 'rename')
{
	$id = $_GET['id'];
	$name = $_GET['name'];
	
	foreach($id as $index => $value)
	{
		$i = '';
		if($index==0) $i = ""; else $i = "($index)";
		$sql = "update ".TABLE_PREFIX."folders set name = '$name$i' where id = $value";
		mysql_query($sql,SQLID) or die("error: ".$sql);
	}
	
	echo 'success!';
}
else if($mode == 'copy')
{
	$id = $_GET['id'];
	$dest = $_GET['dest'];

	function copy_dir ($root = 0,$destination = '') {
	
		if (!isset($destination) || empty($destination)) return 0;
		
		//gets $root info
		$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE id = ';	
		$result = mysql_query($query.$root) or die('operation canceled due to errors');
		$row = mysql_fetch_assoc($result);
		
		$copied_folder = mysql_query('INSERT INTO '.TABLE_PREFIX.'folders (name,parent,description) VALUES ("'.$row['name'].'","'.$destination.'","'.$row['description'].'")') or die('operation canceled due to erros');
		$new_folder_id = mysql_insert_id() or die('operation canceled due to errors');
		$folderPerms->insert($new_folder_id);
		
		//copies all files to the new folder
		$file_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE '.TABLE_PREFIX.'documents.folder = '.$root) or die('operation canceled due to errors');
		
		while ($row = mysql_fetch_array($file_list,MYSQL_ASSOC)) {
			$query  = 'INSERT INTO '.TABLE_PREFIX.'documents (filename, extension, uploaddate, lastmodifieddate, filesize, author, lastchangedby, tags, description, folder, permissions) VALUES ("'.$row['filename'].'_copy","'.$row['extension'].'","'.$row['uploaddate'].'","'.$row['lastmodifieddate'].'","'.$row['filesize'].'","'.$row['author'].'","'.$row['lastchangedby'].'","'.$row['tags'].'","'.$row['description'].'","'.$new_folder_id.'","'.$row['permissions'].'")';
			//echo $query;
			$copied_file = mysql_query($query) or die('operation canceled due to errors');
			$new_file_id = mysql_insert_id() or die('operation canceled due to errors');
			$filePerms->insert($new_folder_id);
					
			copy(DOC_PATH.SLASH.$row['id'],DOC_PATH.SLASH.$new_file_id) or die('operation canceled due to errors');
		}
		
		//gets $root children
		$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';	
		$result = mysql_query($query.$root) or die('operation canceled due to errors');
		
		while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {		
			//creates the new folder on destination
			copy_dir($row['id'],$new_folder_id);
			
		}
		
		return 0;
	}			
	copy_dir($id,$dest);
	echo "success!";
}
else if($mode == 'new')
{
	$name = $_GET['name'];
	$parent = $_GET['parent'];
	if(!isset($_COOKIE['ArtCalendar_login'])) $user = 'public'; else $user = $_COOKIE['ArtCalendar_login'];
	
	$sql = "insert into ".TABLE_PREFIX."folders (`name`,`parent`,`author`) values ('$name',$parent,'$user')";
	mysql_query($sql,SQLID) or die("error: ".$sql);
	$id = mysql_insert_id(SQLID);
	
	$folderPerms->insert($id);
	$folderPerms->insert($id,$user,1,1,1,1);
	
	echo $id;
}
else if($mode == 'properties')
{
	$id = $_GET['id'];
	
	$sql = "select * from ".TABLE_PREFIX."folders where id = $id";
	$result = mysql_query($sql,SQLID) or die("error: ".$sql);
	$row = mysql_fetch_assoc($result);
	$num = mysql_num_fields($result);
	echo "var data = {};";
	foreach($row as $index => $value)
	{
		if($index == 'description') echo "data.$index = '".wordwrap((empty($value)||$value==''?'&nbsp;':$value),20,'<br />',TRUE)."';";
		else if($index == 'author') echo "data.$index = '".getShortNameByAuthor($value)."';";
		else if($index != 'id' and $index != 'permissions' and $index != 'parent') echo "data.$index = '".(empty($value)?'&nbsp;':$value)."';";
		
	}
	$folder_info = folder_properties($id);
	echo "data.Size = '".size_readable($folder_info['folder_size'])."';";
	echo "data.Contains = '".$folder_info['file_count']."';";
	echo "var rows = $num;";
}
else if($mode == 'description')
{
	$id = $_GET['id'];
	$description = $_GET['description'];
	
	foreach($id as $value)
	{
		$sql = "update ".TABLE_PREFIX."folders set description = '$description' where id = $value";
		mysql_query($sql,SQLID) or die("error: ".$sql);
	}
	echo "success!";
	
} else if($mode == 'rights')
{
	$id = $_GET['id'];
	$login = !isset($_COOKIE['ArtCalendar_login'])?'public':$_COOKIE['ArtCalendar_login'];
	
	$sql = "SELECT * FROM dm_permissions WHERE dm_permissions.item_id = $id and item_type = 'folder'";
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
	
	
	echo '</select></td><td><input '.($login=='public'?'disabled="disabled"':'').' type="button" value="add" onclick="common.folder.newAccess(this.form);" /></td></tr></table></form>
			<div><table id="access_perms_table" cellpadding="0" cellspacing="0">';
					
	if($folderPerms->isOwner($id,$login))	
	{			
		echo '<tr>
				<td align="left" style="width:201px;">&nbsp;</td>
				<td align="center" style="width:21px;"><a href="javascript:common.folder.multiaccess('.$id.',\'view\');">v</a></td>
				<td align="center" style="width:21px;"><a href="javascript:common.folder.multiaccess('.$id.',\'read\');">r</a></td>
				<td align="center" style="width:21px;"><a href="javascript:common.folder.multiaccess('.$id.',\'write\');">w</a></td>
				<td align="center" style="width:21px;"><a href="javascript:common.folder.multiaccess('.$id.',\'erase\');">e</a></td>
				<td align="center" style="width:21px;">&nbsp;</td>
			</tr>';
	} else {
		echo '<tr>
				<td align="left" style="width:201px;">&nbsp;</td>
				<td align="center" style="width:21px;">v</td>
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
						<table cellpadding="0" cellspacing="0">
							<td align="center"><input '.$access.' type="checkbox" name="view" value="1" onclick="common.folder.access(this.form);" '.($row['view']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="read" value="1" onclick="common.folder.access(this.form);" '.($row['read']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="write_" value="1" onclick="common.folder.access(this.form);" '.($row['write']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="checkbox" name="erase" value="1" onclick="common.folder.access(this.form);" '.($row['erase']==1?'checked="checked"':'').' /></td>
							<td align="center"><input '.$access.' type="image" src="'.RELATIVE_IMG_PATH.'action/remove.png" onclick="common.folder.eraseAccess('.$row['id'].','.$id.');" /></td>
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
	
	$folderPerms->update($id,$item_id,$who,$view,$read,$write,$erase);
	echo "success!";
} else if($mode == 'newaccess')
{
	$item_id = $_GET['item_id'];
	$item_type = $_GET['item_type'];
	$who = $_GET['who'];
	
	$folderPerms->insert($item_id,$who,1,1,1,1);
	echo "success!";
} else if($mode == 'eraseaccess')
{
	$id = $_GET['id'];
	$folderPerms->delete($id);
	echo "success!";
} else if($mode == 'multiaccess')
{
	$id = $_GET['id'];
	$type = $_GET['type'];

	$sql = "update ".TABLE_PREFIX."permissions set `$type` = not `$type` where item_id = $id and item_type = 'folder' and who = 'public'";
	mysql_query($sql) or die('error: '.$sql);
	
	$sql = "select `$type` from ".TABLE_PREFIX."permissions where item_id = $id and item_type = 'folder' and who = 'public'";
	$result = mysql_query($sql) or die('error: '.$sql);
	if($result) 
	{
		$current = mysql_fetch_assoc($result);
		$sql = "update ".TABLE_PREFIX."permissions set `$type` = ".$current[$type]." where item_id = $id and item_type = 'folder' and who != 'public'";
		mysql_query($sql) or die('error: '.$sql);
	}
	echo $id;
} else if($mode == 'getallfiles')
{
	echo 'var obj = [];';
	$id = $_GET['id'];
	foreach($id as $value)
	{
		$list = list_files($value);
		
		foreach($list as $file)
		{
			echo 'obj.push('.$file.');';
		}
		
	}
}
?>
