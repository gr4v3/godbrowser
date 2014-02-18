<?php
session_start();
header("Cache-Control: no-cache, must-revalidate");
if(isset($_GET['view_mode'])&&!empty($_GET['view_mode'])) $view_mode = $_GET['view_mode']; else $view_mode = 'icon';
setcookie('viewmode',$view_mode,time()+60*60*24*30,'/');
require_once 'constants.php';
require_once 'sql.php';

if(isset($_GET['folder'])&&!empty($_GET['folder'])) $folder = $_GET['folder']; else $folder = 1;
if(isset($_COOKIE['ArtCalendar_login'])) $user = $_COOKIE['ArtCalendar_login']; else $user = 'public';
if(isset($_SESSION['filter'])) $filter = $_SESSION['filter']; else $filter = "false";
$EntityId = isset($_SESSION['EntityId'])?$_SESSION['EntityId']:false;
$user_type = isset($_COOKIE['user_type'])?$_COOKIE['user_type']:false;
$entity = isset($_REQUEST['entity'])?$_REQUEST['entity']:false;

require_once 'func.php';

if($view_mode == 'icon') 
{ 
	/* icon_view */
	$dir_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = '.$folder.' ORDER BY name DESC');
	if(mysql_num_rows($dir_list) > 0) 
	{
		while ($row = mysql_fetch_assoc($dir_list)) 
		{	
	
				if($folderPerms->isViewable($row['id'],$user))
				echo '
				<div UNSELECTABLE="on" folderid="'.$row['id'].'" class="icon_view" onmousedown="common.folder.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();">
					<div UNSELECTABLE="on" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" id="icon_folder" folderid="'.$row['id'].'" ondblclick="common.folder.set('.$row['id'].');"></div>
					<div UNSELECTABLE="on" id="icon_view_label" folderid="'.$row['id'].'" ident="'.$row['name'].'"><strong UNSELECTABLE="on">'.$row['name'].'</strong></div>
				</div>
				';
			
		}
	}
	if(isset($dir_list)) unset($dir_list);
	//SELECT * FROM dm_documents INNER JOIN dm_doc_user ON dm_doc_user.docId = dm_documents.id WHERE folder = 26 and userId = 722
	
	if($filter == "false") {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC';
	} else {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id INNER JOIN '.TABLE_PREFIX.'doc_user as t_doc_user ON t_doc_user.docId = t_documents.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" and t_doc_user.userId = '.$_SESSION['EntityId'].' ORDER BY t_documents.filename DESC';
	}
	
	$doc_list = mysql_query($doc_list_query) or die('error in query:'.$doc_list_query); //mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE folder = '.$folder.' ORDER BY filename DESC');
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) {
			$filename = $row['filename'].'.'.$row['extension'];
			
			if(strlen($filename)>7) {			
				$filename = wordwrap($filename,7,'<br />',TRUE);
			}
			

				
					if($filePerms->isViewable($row['id'],$user))
					echo '
					<div UNSELECTABLE="on" class="icon_view" fileid="'.$row['id'].'" onmousedown="common.file.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();" onclick="" ondblclick="common.file.select_(event);common.file.view();">
						<div UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" id="icon_file" fileid="'.$row['id'].'" style="background-image: url('.set_icon($row['extension'],48).');background-repeat:no-repeat;background-position:center;vertical-align:text-bottom;"></div>
						<div UNSELECTABLE="on" id="icon_view_label" fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'">'.$filename.'</div> 
					</div>
					';
				

		}
	}
	if(isset($doc_list)) unset($doc_list);

} elseif ($view_mode == 'list') 
{ 
	/* list */
	
	$html = '<table style="margin-top:1px;" border="0" cellpadding="2" cellspacing="0">';
	$dir_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = '.$folder.' ORDER BY name DESC');
	if(mysql_num_rows($dir_list) > 0) {
		while ($row = mysql_fetch_assoc($dir_list)) 
		{
				
				if($folderPerms->isViewable($row['id'],$user))
				$html.= '<tr folderid="'.$row['id'].'" class="list_view" ondblclick="common.folder.set('.$row['id'].');" UNSELECTABLE="on" folderid="'.$row['id'].'" onmousedown="common.folder.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();" onclick="">';
					$html.= '<td folderid="'.$row['id'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="background-image:url('.RELATIVE_IMG_PATH.'browser_icons/folder_small.png);background-position:50% 50%;background-repeat:no-repeat;width:16px;height:16px;">&nbsp;</td>';
					$html.= '<td folderid="'.$row['id'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" ident="'.$row['name'].'" folderid="'.$row['id'].'" align="left" folderid="'.$row['id'].'">'.$row['name'].'</td>';
				$html.= '</tr>';
			
		}
	}
	if(isset($dir_list)) unset($dir_list);
	//$doc_list = mysql_query('SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC'); //mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE folder = '.$folder.' ORDER BY filename DESC');
	if($filter == "false") {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC';
	} else {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id INNER JOIN '.TABLE_PREFIX.'doc_user as t_doc_user ON t_doc_user.docId = t_documents.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" and t_doc_user.userId = '.$_SESSION['EntityId'].' ORDER BY t_documents.filename DESC';
	}
	$doc_list = mysql_query($doc_list_query) or die('error in query:'.$doc_list_query);
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) 
		{
			
				if($filePerms->isViewable($row['id'],$user))
				{
					$html.= '<tr fileid="'.$row['id'].'" class="list_view" UNSELECTABLE="on" onmousedown="common.file.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();" onclick="" ondblclick="common.file.select_(event);common.file.view();">';
						$html.= '<td fileid="'.$row['id'].'" class="'.$filePerms->isLinked($row['id'],$EntityId).'" style="background-image:url('.set_icon($row['extension'],16).');background-repeat:no-repeat;background-position:center;vertical-align:text-bottom;width:16px;height:16px;">&nbsp;</td>';
						$html.= '<td fileid="'.$row['id'].'" class="'.$filePerms->isLinked($row['id'],$EntityId).'" ident="'.$row['filename'].'.'.$row['extension'].'" fileid="'.$row['id'].'">'.$row['filename'].'.'.$row['extension'].'</td>';
					$html.= '</tr>';  	
				}
			
		}
	}
	$html.= '</table>';
	echo $html;
	if(isset($doc_list)) unset($doc_list);

} elseif($view_mode == 'detailed') 
{
	/*detailed list */

	$html = '<table UNSELECTABLE="on" width="100%" border="0" cellpadding="1" cellspacing="0">';
		$html.= '<tr UNSELECTABLE="on">';
			$html.= '<td UNSELECTABLE="on" class="" style="height:19px;width:1%;border-bottom:1px solid #cccccc;">&nbsp;</td>';
			$html.= '<td UNSELECTABLE="on" class="" style="width:100px;border-bottom:1px solid #cccccc;font-weight:bold;text-align:left;">'.etranslate('Name').'</td>';
			$html.= '<td UNSELECTABLE="on" style="width:15%;border-bottom:1px solid #cccccc;font-weight:bold;text-align:left;">'.etranslate('Filesize').'</td>';
			$html.= '<td UNSELECTABLE="on" style="width:100px;border-bottom:1px solid #cccccc;font-weight:bold;text-align:left;">'.etranslate('Date').'</td>';
			$html.= '<td UNSELECTABLE="on" style="width:100px;border-bottom:1px solid #cccccc;font-weight:bold;text-align:left;">'.etranslate('Description').'</td>';
		$html.= '</tr>';
		
	$dir_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = '.$folder.' ORDER BY name DESC');
	if(mysql_num_rows($dir_list) > 0) {
		while ($row = mysql_fetch_assoc($dir_list))
		{
			
				if($folderPerms->isViewable($row['id'],$user))
				{
					$html.= '<tr ondblclick="common.folder.set('.$row['id'].');" folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="detailed_view" onmousedown="common.folder.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();">';
						$html.= '<td folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="padding-left:3px;"><img folderid="'.$row['id'].'" ident="'.$row['name'].'" src="'.RELATIVE_IMG_PATH.'browser_icons/folder_small.png" style="width:14px;height:13px;" /></td>';
						$html.= '<td folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="padding-left:3px;">'.$row['name'].'</td>';
						$html.= '<td folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="">&nbsp;</td>';
						$html.= '<td folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="">&nbsp;</td>';
						$html.= '<td folderid="'.$row['id'].'" UNSELECTABLE="on" ident="'.$row['name'].'" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" style="text-align:left;">'.$row['description'].'</td>';
					$html.= '</tr>';
				}
			
		}
	}
	if(isset($dir_list)) unset($dir_list);
	//$doc_list = mysql_query('SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC'); //mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE folder = '.$folder.' ORDER BY filename DESC');
	if($filter == "false") {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC';
	} else {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id INNER JOIN '.TABLE_PREFIX.'doc_user as t_doc_user ON t_doc_user.docId = t_documents.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" and t_doc_user.userId = '.$_SESSION['EntityId'].' ORDER BY t_documents.filename DESC';
	}	
	$doc_list = mysql_query($doc_list_query) or die('error in query:'.$doc_list_query);
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) 
		{
				
				if($filePerms->isViewable($row['id'],$user))
				{
					$html.= '<tr fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="detailed_view" onmousedown="common.file.select_(event);common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();" onclick="" ondblclick="common.file.select_(event);common.file.view();">';
						$html.= '<td fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'"><img src="'.set_icon($row['extension'],16).'" style="width:16px;height:16px;" /></td>';
						$html.= '<td fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" style="text-align:left;">'.$row['filename'].'.'.$row['extension'].'</td>';
						$html.= '<td fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" style="text-align:left;">'.size_readable($row['filesize']).'</td>';
						$html.= '<td fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" style="text-align:left;">'.date('m-d-Y H:m:s',$row['uploaddate']).'</td>';
						$html.= '<td fileid="'.$row['id'].'" ident="'.$row['filename'].'.'.$row['extension'].'" UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" style="">'.$row['description'].'</td>';
					$html.= '</tr>';	
				}
			
		}
	}
	$html.= '</table>';
	echo $html;
	if(isset($doc_list)) unset($doc_list);
	
} elseif($view_mode == 'thumbnails')
{
	$dir_list = mysql_query('SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = '.$folder.' ORDER BY name DESC');
	if(mysql_num_rows($dir_list) > 0) {
		while ($row = mysql_fetch_assoc($dir_list)) 
		{	
			
				if($folderPerms->isViewable($row['id'],$user))
				echo '
				<div UNSELECTABLE="on" folderid="'.$row['id'].'" class="thumbnails_view" onmousedown="common.folder.select_(event,$(this).getFirst());common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();">
					<div UNSELECTABLE="on" class="'.$folderPerms->isLinked($row['id'],$EntityId).'" folderid="'.$row['id'].'" id="one" ondblclick="common.folder.set('.$row['id'].');"></div>
					<div UNSELECTABLE="on" folderid="'.$row['id'].'" id="two" ident="'.$row['name'].'">'.wordwrap($row['name'],15,'<br />',TRUE).'</div>
				</div>
				';	
			
		}
	}
	if(isset($dir_list)) unset($dir_list);
	//$doc_list = mysql_query('SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC'); //mysql_query('SELECT * FROM '.TABLE_PREFIX.'documents WHERE folder = '.$folder.' ORDER BY filename DESC');
	if($filter == "false") {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id  WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" ORDER BY t_documents.filename DESC';
	} else {
		$doc_list_query = 'SELECT distinct t_documents.* FROM '.TABLE_PREFIX.'documents as t_documents INNER JOIN '.TABLE_PREFIX.'permissions as t_permissions ON t_permissions.item_id = t_documents.id INNER JOIN '.TABLE_PREFIX.'doc_user as t_doc_user ON t_doc_user.docId = t_documents.id WHERE (t_permissions.who = "public" or t_permissions.who = "'.$user.'") and t_permissions.view = 1 and t_documents.folder = '.$folder.' and t_permissions.item_type = "file" and t_doc_user.userId = '.$_SESSION['EntityId'].' ORDER BY t_documents.filename DESC';
	}
	$doc_list = mysql_query($doc_list_query) or die('error in query:'.$doc_list_query);
	if(mysql_num_rows($doc_list) > 0) {
		while ($row = mysql_fetch_assoc($doc_list)) 
		{
			
				if($filePerms->isViewable($row['id'],$user))	
				{	
					if(create_thumb('../images/thumb/'.$row['id'].'.'.$row['extension'],'../content/'.$row['id'].'.'.$row['extension'],THUMBNAIL_WIDTH,THUMBNAIL_HEIGHT))
					{
						echo '
						<div UNSELECTABLE="on" fileid="'.$row['id'].'" class="thumbnails_view" onmousedown="common.file.select_(event,$(this).getFirst());common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();">
							<div UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" fileid="'.$row['id'].'" id="one" ondblclick="common.file.select_(event);common.file.view();" style="background-image:url('.RELATIVE_IMG_PATH.'thumb/'.$row['id'].'.'.$row['extension'].');background-repeat:no-repeat;background-position:50% 50%;"></div>
							<div UNSELECTABLE="on" fileid="'.$row['id'].'" id="two" ident="'.$row['filename'].'.'.$row['extension'].'">'.wordwrap($row['filename'].'.'.$row['extension'],15,'<br />',TRUE).'</div> 
						</div>
						';
					} else
						echo '
						<div UNSELECTABLE="on" fileid="'.$row['id'].'" class="thumbnails_view" onmousedown="common.file.select_(event,$(this).getFirst());common.drag.setTimeoutForce();" onmouseup="common.drag.eraseTimeoutForce();">
							<div UNSELECTABLE="on" class="'.$filePerms->isLinked($row['id'],$EntityId).'" fileid="'.$row['id'].'" id="one" ondblclick="common.file.select_(event);common.file.view();" style="background-image:url('.set_icon($row['extension'],48).');background-repeat:no-repeat;background-position:50% 50%;"></div>
							<div UNSELECTABLE="on" fileid="'.$row['id'].'" id="two" ident="'.$row['filename'].'.'.$row['extension'].'">'.wordwrap($row['filename'].'.'.$row['extension'],15,'<br />',TRUE).'</div> 
						</div>
						';
				}
			
		}
	}
	if(isset($doc_list)) unset($doc_list);
}
?>