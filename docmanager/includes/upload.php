<?php
include 'constants.php';
include 'sql.php';
include 'func.php';

$mode = $_POST['mode'];
if($mode == 'new')
{
	
	$name = $_FILES['Filedata']['name'];
	$tmp = $_FILES['Filedata']['tmp_name'];
	$filesize = $_FILES['Filedata']['size'];
	$folder = 1;
	

	$stats = statistics();
	
	if($filesize + $stats['used_quota'] > MAX_STORAGE_SPACE) die('-1');
	$filesize = filesize($tmp);
	move_uploaded_file($tmp,'../temp/'.$name);
	
	$data = explode(".",$name);
	$len = count($data);
	
	$extension = array_pop($data);
	$filename = '';
	foreach($data as $value)
	{
		$filename.= $value;
	}
	
	$uploaddate = mktime();
	$lastmodifieddate = mktime();
	$author = $_POST['author'];
	$lastchangedby = $author;
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
	
	copy('../temp/'.$name,'../content/'.$id);
	unlink('../temp/'.$name);
	
	$filePerms->insert($id);
	$filePerms->insert($id,$author,1,1,1,1);
	
	echo $id;
	
}
else if($mode == 'overwrite') {
	
	$name = $_FILES['Filedata']['name'];
	$tmp = $_FILES['Filedata']['tmp_name'];
	$folder = 1;
	
	
	move_uploaded_file($tmp,'../temp/'.$name);
	$data = explode(".",$name);
	$len = count($data);
	
	$extension = array_pop($data);
	$filename = '';
	foreach($data as $value)
	{
		$filename.= $value;
	}
	
	$uploaddate = mktime();
	$lastmodifieddate = mktime();
	$filesize = filesize('../temp/'.$name);
	$lastchangedby = $user;
		
	$sql = "update ".TABLE_PREFIX."documents set 
			`filename` = '$filename', 
			`extension` = '$extension',
			`uploaddate` = $uploaddate,
			`lastmodifieddate` = $lastmodifieddate,
			`filesize` = $filesize,
			`lastchangedby` = '$lastchangedby',
			`folder` = $folder
		where id = $id";
	
	mysql_query($sql,SQLID) or die("error: ".$sql);
	copy('../temp/'.$name,'../content/'.$id);
	unlink('../temp/'.$name);
	$ext = strtoupper($extension);
	if($ext == 'JPG' or $ext == 'GIF' or $ext == 'PNG') unlink('../images/thumb/'.$id.'.'.$extension);
	
	
	$ids = $filePerms->getId($id);
	if(is_array($ids))
	{
		foreach($ids as $value)
		{
			$filePerms->erase($value['id']);
		}
	} else $filePerms->erase($ids);
	
	$filePerms->insert($id);
	$filePerms->insert($id,$user,1,1,1,1);
	
	echo $id;
}
?>