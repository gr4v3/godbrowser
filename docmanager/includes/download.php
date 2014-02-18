<?php
	header("Cache-Control: no-cache, must-revalidate");
	//gets database connect
	include_once 'constants.php';
	include_once 'sql.php';
	include_once 'func.php';
	
	$result = mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE id = '.$_GET['id']);
	$row = mysql_fetch_array($result,MYSQL_ASSOC);	
	
	if (mysql_num_rows($result) > 0) {
			
		header('Content-type: application/'.$row['extension']);
		header('Content-Disposition: attachment; filename="'.$row['filename'].'.'.$row['extension'].'"');
		
		readfile(DOC_PATH.SLASH.$row['id']);
		
	} else {
		echo 'File not found.';
	}
	
?> 