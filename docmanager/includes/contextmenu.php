<?php
session_start();
header("Cache-Control: no-cache, must-revalidate");
include 'constants.php';
include 'sql.php';
include 'func.php';


$mode = isset($_GET['mode'])?$_GET['mode']:'mix';
$prefix = $_GET['prefix'];
$selection = isset($_GET['selection'])&&$_GET['selection']=='true'?true:false;
$clipboard = isset($_GET['clipboard'])&&$_GET['clipboard']=='true'?true:false;
$id = isset($_GET['id'])?$_GET['id']:false;
if(isset($_COOKIE['ArtCalendar_login'])) $user = $_COOKIE['ArtCalendar_login']; else $user = 'public';
$viewmode = $_GET['view'];
if(isset($_SESSION['filter'])) $filter = $_SESSION['filter']; else $filter = "false";



$items = array();
if($mode == 'file')
{	
	if($selection)
	{
		
		$items['Open'] = array('action' => 'common.file.view();','child' => false);
		
		$sub = array();
		if($filePerms->isReadable($id,$user)) $sub['Copy'] = array('action' => 'common.file.copy();','child' => false);
			else $sub['Copy'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($filePerms->isWriteable($id,$user)) $sub['Cut'] = array('action' => 'common.file.cut();','child' => false);
			else $sub['Cut'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		if($filePerms->isErasable($id,$user)) $sub['Delete'] = array('action' => 'common.file.erase();','child' => false);
			else $sub['Delete'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		$items['Edit'] = array('action' => '','child' => $sub);
			
		if($filePerms->isWriteable($id,$user)) $items['Rename'] = array('action' => 'common.file.rename();','child' => false);
			else $items['Rename'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($filePerms->isWriteable($id,$user)) $items['Update'] = array('action' => 'common.file.overwrite();','child' => false);
			else $items['Update'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		/*
		if($filePerms->isWriteable($id,$user)) $items['Tags'] = array('action' => 'common.file.edittags();','child' => false);
			else $items['Tags'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		*/
		if($filePerms->isWriteable($id,$user)) $items['Description'] = array('action' => 'common.file.description();','child' => false);
			else $items['Description'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		if($filePerms->isReadable($id,$user)) $items['Download'] = array('action' => 'common.file.download();','child' => false);
			else $items['Download'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		/*
		if($filePerms->isReadable($id,$user)) $items['Send to'] = array('action' => 'common.file.sendto();','child' => false);
			else $items['Send to'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		*/	
		if($filter == 'false') $items['Link and Unlink'] = array('action' => 'common.entities.create();','child' => false);
			else $items['Link'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		/*
		if($filePerms->isReadable($id,$user)) $items['Print'] = array('action' => 'common.file.print_();','child' => false);
			else $items['Print'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		*/	
		$items['Properties'] = array('action' => 'common.file.properties();','child' => false);
		
	} else if($clipboard){
		
		$items['Open'] = array('action' => 'common.file.view();','child' => false);
		
		$sub['Paste'] = array('action' => 'common.file.paste();','child' => false);
		$sub['Delete'] = array('action' => 'common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);
		
		$items['Rename'] = array('action' => 'common.file.rename();','child' => false);
		$items['Update'] = array('action' => 'common.file.overwrite();','child' => false);
		$items['Tags'] = array('action' => 'common.file.edittags();','child' => false);
		$items['Description'] = array('action' => 'common.file.description();','child' => false);
		$items['Download'] = array('action' => 'common.file.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		//$items['Print'] = array('action' => 'common.file.print_();','child' => false);
		$items['Properties'] = array('action' => 'common.file.properties();','child' => false);
	}
}
else if($mode == 'folder')
{	
	if($selection)
	{
		if($folderPerms->isReadable($id,$user)) $items['Open'] = array('action' => 'common.folder.set('.$id.');','child' => false);
			else $items['Open'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		$sub = array();
		if($folderPerms->isReadable($id,$user)) $sub['Copy'] = array('action' => 'common.folder.copy();','child' => false);
			else $sub['Copy'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($folderPerms->isWriteable($id,$user)) $sub['Cut'] = array('action' => 'common.folder.cut();','child' => false);
			else $sub['Cut'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($folderPerms->isErasable($id,$user)) $sub['Delete'] = array('action' => 'common.folder.erase();','child' => false);
			else $sub['Delete'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		$items['Edit'] = array('action' => '','child' => $sub);
		
		if($folderPerms->isWriteable($id,$user)) $items['Rename'] = array('action' => 'common.folder.rename();','child' => false);
			else $items['Rename'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($folderPerms->isWriteable($id,$user)) $items['Description'] = array('action' => 'common.folder.description();','child' => false);
			else $items['Description'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		if($folderPerms->isReadable($id,$user)) $items['Download'] = array('action' => 'common.folder.download();','child' => false);
			else $items['Download'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		/*
		if($folderPerms->isReadable($id,$user)) $items['Send to'] = array('action' => '','child' => false);
			else $items['Send to'] = array('action' => '','child' => false);
		
		if($filter == 'false') $items['Link'] = array('action' => 'common.entities.create();','child' => false);
			else $items['Link'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		*/
		$items['Properties'] = array('action' => 'common.folder.properties();','child' => false);
		
	} else if($clipboard){
		
		$items['Open'] = array('action' => 'common.folder.set('.$id.');','child' => false);
		
		$sub = array();
		$sub['Paste'] = array('action' => 'common.folder.paste();','child' => false);
		$sub['Delete'] = array('action' => 'common.folder.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);
		
		$items['Rename'] = array('action' => 'common.folder.rename();','child' => false);
		$items['Description'] = array('action' => 'common.folder.description();','child' => false);
		$items['Download'] = array('action' => 'common.folder.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		$items['Properties'] = array('action' => 'common.folder.properties();','child' => false);
		
	}
}
else if($mode == 'mix')
{
	if($selection)
	{		
		$sub = array();
		$sub['Copy'] = array('action' => 'common.folder.copy();common.file.copy();','child' => false);
		$sub['Cut'] = array('action' => 'common.folder.cut();common.file.cut();','child' => false);
		$sub['Delete'] = array('action' => 'common.folder.erase();common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);
		
		$items['Download'] = array('action' => 'common.mix.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		
		if($filter == 'false') $items['Link'] = array('action' => 'common.entities.create();','child' => false);
			else $items['Link'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
	} else if($clipboard){
		
		$sub = array();
		$sub['Paste'] = array('action' => 'common.folder.paste();common.file.paste();','child' => false);
		$sub['Delete'] = array('action' => 'common.folder.erase();common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);
		
		$items['Download'] = array('action' => 'common.folder.download();common.file.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
	}
}
else if($mode == 'empty')
{
	$file = array('action' => 'common.file.new_();','child' => false);
	$folder = array('action' => 'common.folder.new_();','child' => false);
	$items['New'] = array('action' => '','child' => array('Folder' => $folder));
		
	$items['Upload'] = array('action' => 'common.upload.swfupload.selectFiles();','child' => false);
	
	$sub = array();
	if($viewmode == 'icon') $sub['Icon'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
	else $sub['Icon'] = array('action' => 'common.folder.set(common.folder.id,\'icon\');','child' => false,'cssText' => false);
	
	
	if($viewmode == 'list') $sub['List'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
	else $sub['List'] = array('action' => 'common.folder.set(common.folder.id,\'list\');','child' => false);
	
	if($viewmode == 'detailed') $sub['Details'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
	else $sub['Details'] = array('action' => 'common.folder.set(common.folder.id,\'detailed\');','child' => false);
	
	if($viewmode == 'thumbnails') $sub['Thumbnails'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
	else $sub['Thumbnails'] = array('action' => 'common.folder.set(common.folder.id,\'thumbnails\');','child' => false);
	
	$items['View'] = array('action' => '','child' => $sub);
	$items['Advanced Search'] = array('action' => 'common.searchFile.create();','child' => false);
	$items['Properties'] = array('action' => 'common.folder.properties(common.folder.id);','child' => false);
	$items['Statistics'] = array('action' => '','child' => false);
	
	$sub = array();
	$sub['How to'] = array('action' => '','child' => false);
	$sub['About'] = array('action' => '','child' => false);
	$items['Help'] = array('action' => '','child' => $sub);
}
else if($mode == 'files')
{
	if($selection)
	{
		$items['Open'] = array('action' => 'common.file.view();','child' => false);
	
		$sub = array();
		$sub['Copy'] = array('action' => 'common.file.copy();','child' => false);
		$sub['Cut'] = array('action' => 'common.file.cut();','child' => false);
		
		$sub['Delete'] = array('action' => 'common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);	

		$items['Download'] = array('action' => 'common.file.download();','child' => false);
		//$items['Send to'] = array('action' => 'common.file.sendto();','child' => false);
		
		if($filter == 'false') $items['Link'] = array('action' => 'common.entities.create();','child' => false);
			else $items['Link'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		//$items['Print'] = array('action' => 'common.file.print_();','child' => false);
		
	} else if($clipboard){
		
		$sub['Paste'] = array('action' => 'common.file.paste();','child' => false);
		$sub['Delete'] = array('action' => 'common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);	
		
		$items['Download'] = array('action' => 'common.file.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		//$items['Print'] = array('action' => 'common.file.print_();','child' => false);

	}
}
else if($mode == 'folders')
{
	if($selection)
	{
	
		$sub = array();
		$sub['Copy'] = array('action' => 'common.folder.copy();','child' => false);
		$sub['Cut'] = array('action' => 'common.folder.cut();','child' => false);
		$sub['Delete'] = array('action' => 'common.folder.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);	

		$items['Rename'] = array('action' => 'common.folder.rename();','child' => false);
			//else $items['Rename'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
		
		$items['Download'] = array('action' => 'common.folder.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		
		if($filter == 'false') $items['Link'] = array('action' => 'common.entities.create();','child' => false);
			else $items['Link'] = array('action' => '','child' => false,'cssText' => 'color:#bababa;');
			
		//$items['Print'] = array('action' => 'common.folder.print_();','child' => false);
		
	} else if($clipboard){
		
		$sub['Paste'] = array('action' => 'common.file.paste();','child' => false);
		$sub['Delete'] = array('action' => 'common.file.erase();','child' => false);
		$items['Edit'] = array('action' => '','child' => $sub);	
		
		$items['Download'] = array('action' => 'common.folder.download();','child' => false);
		//$items['Send to'] = array('action' => '','child' => false);
		//$items['Print'] = array('action' => 'common.folder.print_();','child' => false);

	}
}


//$docmanager =  new Item('docmanager','');
//$docmanager->cssText = 'background-color:#f0f0f0;color:#000000;';

$menu = new Menu($prefix);
//$menu->add($docmanager);
foreach($items as $index => $value)
{
	

		$obj = new Item($index);
		$obj->action = $value['action'];
		if(isset($value['cssText'])) $obj->cssText = $value['cssText'];
		if($value['child'])
		{
			$obj->id = 'sub';
			foreach($value['child'] as $index => $child)
			{
				$sub = new Item($index);
				$sub->action = $child['action'];
				if(isset($child['cssText'])) $sub->cssText = $child['cssText'];
				$obj->add($sub);
			}
		}
	
	
	$menu->add($obj);
}
$menu->create();
?>