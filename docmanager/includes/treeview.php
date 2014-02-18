<?php

header("Cache-Control: no-cache, must-revalidate");

	include_once 'sql.php';

	include_once 'constants.php';

	

	$mode = isset($_GET['mode'])?$_GET['mode']:'false';

	if(!isset($_COOKIE['ArtCalendar_login']))

	{

		//setcookie($_COOKIE['ArtCalendar_login'],'public');

		$_COOKIE['ArtCalendar_login'] = 'public';

	}

	

	function tree ($root = 0) {		

		//query

		$query = 'SELECT DISTINCT t_folders.* FROM '.TABLE_PREFIX.'folders as t_folders INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_folders.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$_COOKIE['ArtCalendar_login'].'") and t_permissions.view = 1 and t_folders.parent = ';

		

		

		$result = mysql_query($query.$root) or die('error: '.$query.$root);

		if(mysql_num_rows($result)>0) {

			echo '<ul id="folder_'.$root.'">';

			while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

				

				$asChilds = mysql_query($query.$row['id']);

				$n_rows = mysql_num_rows($asChilds);

				$folder_name = $row['name'];

				$folder_name = str_replace(' ','&nbsp;',$folder_name);

								

				echo '<li>';

				if($n_rows>0) echo '<img src="'.RELATIVE_IMG_PATH.'treeview/minus.gif" onClick="common.treeview.swap('.$row['id'].',this)" />'; else echo '<div style="margin:0;padding:0;width:9px;height:13px;float:left;">&nbsp;</div>';

				echo '<span id="'.$row['id'].'" onclick="common.folder.set('.$row['id'].')"><img id="icon_'.$row['id'].'" src="'.RELATIVE_IMG_PATH.'treeview/cf.gif" />&nbsp;<a href="javascript:;" id="icon_'.$row['id'].'_a" ref="'.$row['id'].'">'.$folder_name.'</a></span>';

				if($n_rows>0) tree($row['id']);

				echo '</li>';

			}

			echo '</ul>';

		}

		return 0;

	}

	

	if($mode == 'array')

	{

		function treearray ($root = 0) 

		{		

			//query

			$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';

			$result = mysql_query($query.$root);

			if(mysql_num_rows($result)>0) 

			{

				

				while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) 

				{

						echo "tree.push(".$row['id'].");";

						$asChilds = mysql_query($query.$row['id']);

						$n_rows = mysql_num_rows($asChilds);			

						if($n_rows>0) treearray($row['id']);

				}

			}

			return 0;

		}

		

		echo "var tree = new Array();";

		echo "tree.push(0);";

		treearray();

		die();

	}

	

?>

<div id="treeview" align="left"><?php tree(); ?></div>

