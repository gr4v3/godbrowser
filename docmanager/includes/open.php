<?php
	
	//gets database connect
	include_once 'constants.php';
	include_once 'sql.php';
	include_once 'func.php';
	
	$result = mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE id = '.$_GET['id']);
	$row = mysql_fetch_array($result,MYSQL_ASSOC);
	
	$browser_handled =
	array(
		'jpg'=>'image/jpg',
		'png'=>'image/png',
		'gif'=>'image/gif',
		'txt'=>'text/plain',
		'pdf'=>'application/pdf',
		'doc'=>'application/msword',
		'xls'=>'application/vnd.ms-excel',
		'ppt'=>'application/vnd.ms-powerpoint',
		'mp3'=>'audio/mpeg',
		'wav'=>'audio/x-wav',
		'mpg'=>'video/mpeg',
		'avi'=>'video/x-msvideo',
		'zip'=>'application/zip'
	);
	
	/*
      case "pdf": $ctype="application/pdf"; break;
      case "exe": $ctype="application/octet-stream"; break;
      case "zip": $ctype="application/zip"; break;
      case "doc": $ctype="application/msword"; break;
      case "xls": $ctype="application/vnd.ms-excel"; break;
      case "ppt": $ctype="application/vnd.ms-powerpoint"; break;
      case "gif": $ctype="image/gif"; break;
      case "png": $ctype="image/png"; break;
      case "jpeg":
      case "jpg": $ctype="image/jpg"; break;
      case "mp3": $ctype="audio/mpeg"; break;
      case "wav": $ctype="audio/x-wav"; break;
      case "mpeg":
      case "mpg":
      case "mpe": $ctype=""; break;
      case "mov": $ctype="video/quicktime"; break;
      case "avi": $ctype="video/x-msvideo"; break;	
	*/
	
	if (mysql_num_rows($result) > 0) {			
		if(!empty($browser_handled[$row['extension']])) {
			header('Content-type: '.$browser_handled[$row['extension']]);
			header('Content-Disposition: inline; filename="'.$row['filename'].'.'.$row['extension'].'"');			
		} else {
			header('Content-type: application/'.$row['extension']);
			header('Content-Disposition: attachment; filename="'.$row['filename'].'.'.$row['extension'].'"');
		}
		
		readfile(DOC_PATH.SLASH.$row['id']);
		
	} else {
		echo 'File not found.';
	}
	
?> 