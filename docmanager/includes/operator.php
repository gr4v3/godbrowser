<?php mysql_connect('localhost','root','');

mysql_select_db('docmanager');



include_once 'func.php';

include_once 'constants.php';	

	



	if(!isset($_COOKIE['c_view_mode'])) {

		setcookie('c_view_mode','icon',9999);

	} else {

		if(isset($_GET['view_mode'])) $_COOKIE['c_view_mode'] = $_GET['view_mode'];

	}	

	

	function tree ($root = 0) {		

		

		$viewer = 'giacomo';

		/*		  

		  SELECT * FROM DM_folders as t_folders INNER JOIN DM_permissions as t_permissions ON t_permissions.item_id = t_folders.id WHERE (t_permissions.who = "public" or t_permissions.who = "giacomo" or t_folders.author = "giacomo") and t_permissions.view = 1 and t_folders.parent = 1

		  SELECT * FROM DM_folders INNER JOIN DM_permissions ON DM_permissions.item_id = DM_folders.id WHERE (DM_permissions.who = "public" or DM_permissions.who = "giacomo" or DM_folders.author = "giacomo") and DM_permissions.view = 1 and DM_folders.parent = 1

		*/		

		//query

		$query = ' SELECT * FROM '.TABLE_PREFIX.'folders as t_folders INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_folders.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$viewer.'" or t_folders.author = "'.$viewer.'") and t_permissions.view = 1 and t_folders.parent = ';

		echo $query;

		$result = mysql_query($query.$root);

		if(mysql_num_rows($result)>0) {

			echo '<ul id="folder_'.$root.'">';

			while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

				

				$asChilds = mysql_query($query.$row['id']);

				$n_rows = mysql_num_rows($asChilds);

								

				echo '<li>';

				if($n_rows>0) echo '<img src="'.RELATIVE_IMG_PATH.'treeview/minus.gif" onClick="common.treeview.swap('.$row['id'].',this)" />'; else echo '<div style="margin:0;padding:0;width:9px;height:13px;float:left;">&nbsp;</div>';

				echo '<span id="'.$row['id'].'" onClick="common.folder.set('.$row['id'].')"><img id="icon_'.$row['id'].'" src="'.RELATIVE_IMG_PATH.'treeview/cf.gif" />&nbsp;<a href="#">'.$row['name'].'</a></span>';

				if($n_rows>0) tree($row['id']);

				echo '</li>';

			}

			echo '</ul>';

		}

		return 0;

	}

	

	function list_files ($root = 0,$list = array()) {

		//query

		$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';		

			

		$file_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE '.TABLE_PREFIX.'documents.folder = '.$root) or die('operation canceled due to errors: ');

		while ($row = mysql_fetch_array($file_list,MYSQL_ASSOC)) {				

			$list[] = $row['id'];

		}

	

		$result = mysql_query($query.$root);

		

		if(mysql_num_rows($result)>0) {

			while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {				

				$list = list_files($row['id'],$list);

			}			

		}

		return $list;

	}

		

	//cookies code

	

	

	

	/* TAR.GZ download mode */		

	// Include TAR Class

	

	/*

	include("tar/tar.class.php");

	

	error_reporting(0);

	

	$files = array(55,56,66);

	

	$query = 'SELECT id,filename,extension,uploaddate FROM dm_documents WHERE id in (';

	foreach ($files as $filekey) {

		$query .= $filekey.',';

	}

	$query = substr($query, 0, -1);

	$query .= ')';

	$result = mysql_query($query);

	$files = array();

	while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

		copy(DOC_PATH.SLASH.$row['id'],LOCAL_PATH.SLASH.'downloads'.SLASH.$row['filename'].'_'.date('Ymd',$row['uploaddate']).'.'.$row['extension']);

		$files[] = $row['filename'].'_'.date('Ymd',$row['uploaddate']).'.'.$row['extension'];

	}

	$time = time();

	if(file_exists(LOCAL_PATH.SLASH.'downloads'.SLASH.'download_'.$time.'.tar.gz')) unlink(LOCAL_PATH.SLASH.'downloads'.SLASH.'download_'.$time.'.tar.gz');

	

	// Creating a NEW Tar file

	$tar = new tar();

	foreach($files as $file) {

		$tar->addFile(LOCAL_PATH.SLASH.'downloads'.SLASH.$file);			

	}

	

	$tar->toTar(LOCAL_PATH.SLASH.'downloads'.SLASH.'download_'.$time.'.tar.gz',TRUE);

	//$tar->toFile("new.tgz",TRUE);

	

	unset($tar);

	

	//deletes files that where compressed	

	foreach($files as $file) {			

		unlink(LOCAL_PATH.SLASH.'downloads'.SLASH.$file);

	}

	

	

	header('Content-type: application/tar.gz');	

	// defines the filename

	header('Content-Disposition: attachment; filename="artcalendar_download'.date('Ymd').'.tar.gz"');	

	

	readfile(LOCAL_PATH.SLASH.'downloads'.SLASH.'download_'.$time.'.tar.gz');

	*/

?>