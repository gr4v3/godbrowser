<?php



function translate($str)

{

	return $str;

}

//define('FILE_APPEND', 1);

if(!function_exists('file_put_contents'))

{

	function file_put_contents($n, $d, $flag = false) {

		$mode = ($flag == FILE_APPEND || strtoupper($flag) == 'FILE_APPEND') ? 'a' : 'w';

		$f = @fopen($n, $mode);

		if ($f === false) {

			return 0;

		} else {

			if (is_array($d)) $d = implode($d);

			$bytes_written = fwrite($f, $d);

			fclose($f);

			return $bytes_written;

		}

	}

}





//error_reporting(0);

function parent_from_children ($id=0,$folder_array = array()) {

	$result = mysql_query('SELECT folders.id, folders.name, folders.parent FROM folders WHERE folders.id = '.$id);

	//echo 'SELECT folders.name, folders.parent FROM folders WHERE folders.id = '.$id;

	$row = mysql_fetch_array($result,MYSQL_ASSOC);

	//echo $row['name'];

	$folder_array[$row['id']] = $row['name'];

	if ($row['parent'] != 0) {

		$folder_array = bread_crums($row['parent'],$folder_array);

	}

	return array_reverse($folder_array);

}



//lists files in recursive way given a folder id

function list_files ($root = 0,$list = array()) {

	//query

	$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';		

	

	$sql = 	'SELECT * FROM '.TABLE_PREFIX.'documents WHERE '.TABLE_PREFIX.'documents.folder = '.$root;

		

	$file_list = mysql_query($sql) or die('operation canceled due to errors: '.$sql);

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



function folder_properties ($id = 0,$info = array()) {		

	//query

	$query = 'SELECT * FROM '.TABLE_PREFIX.'folders WHERE parent = ';

		

	$filesize_query = 'SELECT sum(filesize) as \'sum\', count(filename) as \'filecount\' FROM '.TABLE_PREFIX.'documents WHERE '.TABLE_PREFIX.'documents.folder = '.$id;

	//echo $filesize_query;

	$filesize = mysql_query($filesize_query) or die('operation canceled due to errors.'.$filesize_query);

	$filesize = mysql_fetch_array($filesize,MYSQL_ASSOC);

	

	if(empty($info['folder_size'])) $info['folder_size'] = 0;

	if(empty($info['file_count'])) $info['file_count'] = 0;

	

	$info['file_count'] = $info['file_count'] + $filesize['filecount'];

	$info['folder_size'] = $info['folder_size'] + $filesize['sum'];

	

	$result = mysql_query($query.$id);

	if(mysql_num_rows($result)>0) {

		while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {			

			$info = folder_properties($row['id'],$info);

		}			

	}

	return $info;

}



if(!function_exists('etranslate')) {

	function etranslate($string = '') {

		return $string;

	}

}



function folders($id)

{

	$arr = array();

	

	$sql = "select * from folders where parent = $id";

	$result = mysql_query($sql,SQLID) or die($sql);

	

	while($row = mysql_fetch_assoc($result))

	{

		$arr[$row['name']] = array

		(

			'content' => $row,

			'childs'  => folders($row['id'])

		);

	}

	return $arr;

}

function convert2js($arr,$path)

{

	foreach($arr as $index => $value)

	{

		if(is_array($value)) 

		{

			echo $path."['".$index."'] = {};";

			convert2js($arr[$index],$path."['".$index."']");

		} else {

			echo $path."['".$index."'] = '".$value."';";

		}

	}

}

function size_readable($size, $unit = null, $retstring = null, $si = true)

{	

    // Units

    if ($si === true) {

        $sizes = array('B', 'kB', 'MB', 'GB', 'TB', 'PB');

        $mod   = 1000;

    } else {

        $sizes = array('B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB');

        $mod   = 1024;

    }

    $ii = count($sizes) - 1;

 

    // Max unit

    $unit = array_search((string) $unit, $sizes);

    if ($unit === null || $unit === false) {

        $unit = $ii;

    }

 

    // Return string

    if ($retstring === null) {

        $retstring = '%01.2f %s';

    }

 

    // Loop

    $i = 0;

    while ($unit != $i && $size >= 1024 && $i < $ii) {

        $size /= $mod;

        $i++;

    }

 

    return sprintf($retstring, $size, $sizes[$i]);

}



function create_thumb($img_thumb, $img_name, $x, $y) {

	

	//descobrir a extensão do ficheiro

	

	

	

	$ext = strrpos($img_name,".");	

	$type = substr($img_name,$ext+1);

	$name = substr($img_name,0,$ext);

	

	if(is_file($img_thumb)) return true;

	

	if (strpos(strtoupper($type),'JPG') !== false)

	{

		$pic = imagecreatefromjpeg($name);

	}

	else if (strpos(strtoupper($type),'GIF') !== false)

	{

		$pic = imagecreatefromgif($name);

	}

	else if (strpos(strtoupper($type),'PNG') !== false)

	{

		$pic = imagecreatefrompng($name);

	}

	else return false;

	

	

	$sizex = imagesx($pic);

	$sizey = imagesy($pic);

	

	if($sizex>$sizey) {

		 $s0x = $x;

		 $s0y = (($x * $sizey)/$sizex);

		 settype ($s0y, "integer");

	} else if($sizex<$sizey){

		 $s0y = $y;

		 $s0x = (($y * $sizex)/$sizey);

		 settype ($s0x, "integer");

	} else {

		$s0x = $x ;

		$s0y = $y ;

	}

	

	$out = imagecreatetruecolor($s0x, $s0y);

	imagecopyresampled($out, $pic, 0, 0, 0, 0, $s0x, $s0y, $sizex, $sizey);

	

	if (strtoupper($type) == 'JPG') imagejpeg($out, $img_thumb);

	if (strtoupper($type) == 'GIF') imagegif($out, $img_thumb);

	if (strtoupper($type) == 'PNG') imagepng($out, $img_thumb);

	

	imagedestroy($pic);

	imagedestroy($out);

	

	return true;

}



$itemColor = array('view_even','view_odd');

function swapColor()

{

	global $itemColor;

	array_reverse($itemColor);

	return $itemColor[0];

}

function set_icon ($ext = '', $size = 16) {

	$ext = trim($ext);	

	

	//icon array

	$icons['unknown'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/unknown.png';	

	$icons['zip'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['rar'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['ace'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['tar'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['7z'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['gz'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/zip.png';

	$icons['php'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/php.png';

	$icons['mp3'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/midi.png';

	$icons['wma'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/midi.png';

	$icons['mid'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/midi.png';

	$icons['wav'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/midi.png';

	$icons['jpg'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/images.png';

	$icons['png'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/images.png';

	$icons['gif'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/images.png';

	$icons['psd'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/images.png';	

	$icons['xls'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/spreadsheet.png';

	$icons['doc'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/doc.png';

	$icons['pps'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/pps.png';

	$icons['txt'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/txt.png';

	$icons['html'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/html.png';

	$icons['htm'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/html.png';	

	$icons['pdf'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/pdf.png';

	$icons['avi'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/video.png';

	$icons['mov'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/video.png';

	$icons['rm'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/video.png';

	$icons['wmv'] = RELATIVE_IMG_PATH.'browser_icons/'.$size.'/video.png';

		

	

	if (empty($ext)||empty($icons[$ext])) {	

		return $icons['unknown']; 

	} else {	

		return $icons[$ext];

	}

}



class permissions

{

	var $tableName = "permissions";

	var $type = 'file';

	function permissions($type)

	{

		$this->type = $type;

	}

	

	function properties($id)

	{

		if($this->type == 'file')

		{

			$sql = "select * from ".TABLE_PREFIX."documents where id = $id";

			$result = mysql_query($sql,SQLID) or die('error: '.$sql);

			return mysql_fetch_assoc($result);

		} else return false;

		

	}

	

	

	function isLinked($file = false,$entity = false)

	{

		global $filter;

		if($this->type == 'file' and $filter == 'false')

		{

			$sql = 'SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId='.$file;

			$result = mysql_query($sql,SQLID) or die('error: '.$sql);

			$num = mysql_num_rows($result);

			if($num > 0) return 'item_hightlight'; else return '';

		}

	}

	

	function isLinkedType($file = false,$entity = false)

	{

		global $filter; 

		

		

		

		if($this->type == 'file')

		{

			if($entity == 'false') return true;

 			

			

			if($entity == "s") {

				$sql = 'SELECT userId FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$file.' and sUserType = "s"';



				$res = mysql_query($sql) or die('error: '.$sql);

				/*

				$row = mysql_fetch_array($res,MYSQL_ASSOC);

				

				$sql = 'SELECT * FROM shows WHERE id = '.$row['userId'];

				$res = mysql_query($sql) or die('error: '.$sql);

				*/

				$num = mysql_num_rows($res);

				if($num > 0) return true; else return false;

				

			} else {



							

				$sql = 'SELECT dm_doc_user.userId as userId FROM dm_doc_user

				INNER JOIN entity ON entity.id = dm_doc_user.userId

				INNER JOIN entitytype ON entitytype.id = entity.EntityType

				WHERE dm_doc_user.sUserType = "e" and entitytype.sType = "'.$entity.'" and dm_doc_user.docId = '.$file;

				

				$res = mysql_query($sql) or die('error: '.$sql);

				//$row = mysql_fetch_array($res,MYSQL_ASSOC);

				$num = mysql_num_rows($res);

				

				if($num>0)

				{

					return true;

				} else return false;

				

				/*

				//Artisti

				if($entity == 'Artisti') {

					$sql = 'SELECT dm_doc_user.docId FROM dm_doc_user

							INNER JOIN entity ON entity.id = dm_doc_user.userId

							INNER JOIN entitytype ON entitytype.id = entity.EntityType

							WHERE dm_doc_user.sUserType = "e" and entitytype.sType = "Artisti"';

				}

				//Agenzie

				if($entity == 'Agenzie') {

					$sql = 'SELECT dm_doc_user.docId FROM dm_doc_user

							INNER JOIN entity ON entity.id = dm_doc_user.userId

							INNER JOIN entitytype ON entitytype.id = entity.EntityType

							WHERE dm_doc_user.sUserType = "e" and entitytype.sType = "Agenzie"';

				}

				//Location

				if($entity == 'Location') $sql = '';

				{

					$sql = 'SELECT dm_doc_user.docId FROM dm_doc_user

							INNER JOIN entity ON entity.id = dm_doc_user.userId

							INNER JOIN entitytype ON entitytype.id = entity.EntityType

							WHERE dm_doc_user.sUserType = "e" and entitytype.sType = "Location"';

				}

				*/

			}



			return true;

			

			

			

		} else if($this->type == 'folder') return true;

	}

	function insert($item_id,$who = false,$view = 1,$read = 1,$write = 1,$erase = 1)

	{

		if($who == false) $who = 'public';

		elseif($who == 'public') return false;

		

		$sql = "insert into ".TABLE_PREFIX.$this->tableName." (

					`item_id`,`item_type`,`who`,`view`,`read`,`write`,`erase`

				) values ($item_id,'".$this->type."','$who',$view,$read,$write,$erase)";

				

		

		mysql_query($sql,SQLID) or die('error: '.$sql);

		$id = mysql_insert_id(SQLID);	

		return $id;	

	}

	function update($id,$item_id,$who = 'public',$view = 1,$read = 1,$write = 1,$erase = 1)

	{

		$sql = "update ".TABLE_PREFIX.$this->tableName." set 

				`item_id` = $item_id,

				`item_type` = '".$this->type."',

				`who` = '$who',

				`view` = $view,`read` = $read,`write` = $write,`erase` = $erase where id = $id";				

					

		mysql_query($sql,SQLID) or die('error: '.$sql);

		$id = mysql_insert_id(SQLID);	

		return $id;	

	}

	function getId($item_id)

	{

		$sql = "select id from ".TABLE_PREFIX.$this->tableName." where item_id = $item_id and item_type = '".$this->type."'";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if($result)

		{

			$num = mysql_num_rows($result);

			if($num == 1)

			{

				$row = mysql_fetch_row($result); 

				return $row[0];

			}

			else if($num > 1)

			{

				$arr = array();

				while($row = mysql_fetch_assoc($result))

				{

					$arr[] = $row;

				}

				return $arr;

			}

		}	

	}

	function delete($id)

	{

		$sql = "delete from ".TABLE_PREFIX.$this->tableName." where id = $id and `who` != 'public'";

		mysql_query($sql,SQLID) or die('error: '.$sql);

	}

	function erase($id)

	{

		$sql = "delete from ".TABLE_PREFIX.$this->tableName." where id = $id";

		mysql_query($sql,SQLID) or die('error: '.$sql);

	}

	function isReadable($id,$user)

	{

		$sql = "select id from ".TABLE_PREFIX.$this->tableName." 

			where item_id = $id and item_type = '".$this->type."' and ((who = '$user' and `read` = 1) or (who = 'public' and `read` = 1))";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false; else return true;

	}

	function isViewable($id,$user)

	{

		

		$sql = "select id from ".TABLE_PREFIX.$this->tableName." 

			where item_id = $id and item_type = '".$this->type."' and ((who = '$user' and `view` = 1) or (who = 'public' and `view` = 1))";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false;

		else {

			$row = mysql_fetch_assoc($result);

			return $row['id'];

		}	

	}

	function isWriteable($id,$user)

	{

		$sql = "select id from ".TABLE_PREFIX.$this->tableName." 

			where item_id = $id and item_type = '".$this->type."' and ((who = '$user' and `write` = 1) or (who = 'public' and `write` = 1))";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false; else return true;

	}

	function isErasable($id,$user)

	{

		$sql = "select id from ".TABLE_PREFIX.$this->tableName." 

			where item_id = $id and item_type = '".$this->type."' and ((who = '$user' and `erase` = 1) or (who = 'public' and `erase` = 1))";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false; else return true;

	}

	function isOperatable($id,$in_folder = '')

	{

		if($this->type == 'file') {

			$table = 'documents'; 

			$sql = "select id from ".TABLE_PREFIX.$table." where id = $id and folder = $in_folder";

		

		} else if($this->type == 'folder') {

			$table = 'folders'; 

			$sql = "select id from ".TABLE_PREFIX.$table." where id = $id and parent = $in_folder";

		}

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false;

		else return true;

	}

	function isOwner($id,$user)

	{

		$table = 'documents';

		if($this->type == 'file') $table = 'documents';

		else if($this->type == 'folder') $table = 'folders';

		

		$sql = "select id from ".TABLE_PREFIX.$table." where id = $id and author = '$user'";

		$result = mysql_query($sql,SQLID) or die('error: '.$sql);

		if(mysql_num_rows($result) == 0) return false; else return true;

	}

}



$filePerms = new permissions('file');

$folderPerms = new permissions('folder');





if(!function_exists('http_build_query')) {

    function http_build_query($data,$prefix=null,$sep='',$key='') {

        $ret    = array();

            foreach((array)$data as $k => $v) {

                $k    = urlencode($k);

                if(is_int($k) && $prefix != null) {

                    $k    = $prefix.$k;

                };

                if(!empty($key)) {

                    $k    = $key."[".$k."]";

                };



                if(is_array($v) || is_object($v)) {

                    array_push($ret,http_build_query($v,"",$sep,$k));

                }

                else {

                    array_push($ret,$k."=".urlencode($v));

                };

            };



        if(empty($sep)) {

            $sep = ini_get("arg_separator.output");

        };



        return    implode($sep, $ret);

    };

};





function statistics()

{

	$sql = "SELECT sum(filesize) as totalsize, count(filename) as totalfiles FROM ".TABLE_PREFIX."documents ";

	

	$result = mysql_query($sql) or die('error: '.$sql);

	$owner = mysql_fetch_array($result,MYSQL_ASSOC);	

	

	$used_quota = $owner['totalsize'];

	$n_files = $owner['totalfiles'];

	

	$total_quota_bytes = MAX_STORAGE_SPACE;

	$total_quota = size_readable(MAX_STORAGE_SPACE);	

	

	$occupied = ($owner['totalsize']*100) / MAX_STORAGE_SPACE;

	$occupied = round($occupied,2);

	

	

	$result = array();

	$result['files'] = $n_files;

	$result['total_quota_bytes'] = $total_quota_bytes;

	$result['used_quota'] = $used_quota;

	$result['used_quota_readable'] = size_readable($used_quota);

	$result['total_quota'] = $total_quota;

	$result['occupied'] = $occupied;

	

	return $result;

}





class Item

{

	var $name = '';

	var $action = '';

	var $className = '';

	var $cssText = '';

	var $html = '';

	var $id = '';

	var $Items = array();

	var $hasChilds = false;

	

	function Item($name,$id = '',$func = '')

	{

		$this->id = $id;

		$this->action = $func;

		$this->name = $name;

		return $this;

	}

	function add()

	{

		$this->hasChilds = true;

		$numargs = func_num_args();

		$arg_list = func_get_args();

		for ($i = 0; $i < $numargs; $i++) {

			$this->Items[] = $arg_list[$i];

		}

	}

}	

class Menu

{

	var $Items = array();

	var $prefix = '';

	

	function Menu($prefix)

	{

		$this->prefix = $prefix;

	}

	function add($obj)

	{

		$this->Items[] = $obj;

	}

	function render($obj,$node = false)

	{

		if($node) echo '<ul class="'.$this->prefix.'menuUL" id="'.$obj->id.'">';

		foreach($obj->Items as $value)

		{

			if($value->hasChilds) 

			{

				echo '<li class="'.$this->prefix.'menuLI">';

				echo '<a href="#" id="'.$this->prefix.'A_father" onclick="common.contextmenu.hide();'.$value->action.'" style="'.$value->cssText.'" class="'.$value->className.'">'.$value->name.'</a>';

				$this->render($value,true);

				echo '</li>';

			} else echo '<li class="'.$this->prefix.'menuLI"><a href="#" style="'.$value->cssText.'" class="'.$value->className.'" onclick="common.contextmenu.hide();'.$value->action.'">'.$value->name.'</a></li>';

		}

		if($node) echo '</ul>';

	}

	function create()

	{

		

		echo '<ul class="'.$this->prefix.'menuUL" id="'.$this->prefix.'">';

		$this->render($this);

		echo '</ul>';

		/*	

		echo '<eval>';

		echo 'window.startList'.$this->prefix.' = function()';

		echo '{';

		echo 'if(document.all&&document.getElementById)';

		echo '{';

		echo 'navRoot = document.getElementById("'.$this->prefix.'");';

		echo 'for(i=0;i<navRoot.childNodes.length;i++)';

		echo '{';

		echo 'node = navRoot.childNodes[i];';

		echo 'if (node.nodeName=="LI")'; 

		echo '{';

		echo 'node.onmouseover=function(){this.className+=" over";};';

		echo 'node.onmouseout=function(){this.className=this.className.replace(" over","");};';

		echo '};';

		echo '};';

		echo '};';

		echo '};';

		echo 'window.startList'.$this->prefix.'();';

		*/

	}

}



function delete_linked_document($docId) {

	

	$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE id = '.$docId;

	mysql_query($sql) or die('error: '.$sql);

	//linked_document_table($userId);

}

function linked_document_table ($userId) {



		$query = 'SELECT documents.id, documents.filename, documents.extension,doc_user.id as doc_user_id FROM '.TABLE_PREFIX.'documents as documents INNER JOIN '.TABLE_PREFIX.'doc_user as doc_user ON doc_user.docId = documents.id WHERE doc_user.userId = '.$userId;

		$result = mysql_query($query) or die('error in query: '.$query);

		echo '<div id="rel_doc_table">';

		if(mysql_num_rows($result)>0) {

	?>			

			<table width="400" class="tablepagina" cellspacing="1">

			<tbody>

				<tr>

					<th><?php etranslate("Id"); ?></th><th><?php etranslate("Filename"); ?></th><th>&nbsp;</th>

				</tr>

	<?php

			while($row = mysql_fetch_array($result)) {

				echo '

				<tr>

					<td>'.$row['id'].'</td><td><a href="docmanager/includes/download.php?id='.$row['id'].'">'.$row['filename'].'.'.$row['extension'].'</a></td><td style="text-align:center;cursor:pointer;"  onclick="updateTable.erase('.$row['doc_user_id'].','.$userId.');"><img src="img/edit_trash.gif" width="15" height="15" alt="Elimina"  vspace="1"/></td>

				</tr>';

			}

		

	?>		

			</tbody></table>		

			

	<?php

		} else {

			echo etranslate("No attachments");

		}

		echo '</div>';

}



if(isset($_GET['eraseDOC']))

{

	include_once 'constants.php';

	include_once 'sql.php';

	

	if(isset($_GET['docId'])) $docId = $_GET['docId'];

		else return false;

	if(isset($_GET['userId'])) $userId = $_GET['userId'];

		else return false;

		

	delete_linked_document($docId,$userId);	

} else if(isset($_GET['createDOC']))

{

	include_once 'constants.php';

	include_once 'sql.php';

	if(isset($_GET['userId'])) $userId = $_GET['userId'];

		else return false;

	linked_document_table($userId);

}

/*

$docmanager =  new Item('docmanager','');

$new = new Item('new','sub');

$file = new Item('file');

$folder = new Item('folder');

$edit = new Item('edit','sub');

$copy = new Item('copy');

$cut = new Item('cut');

$paste = new Item('paste');	

$asdasd = new Item('new');



$file->action = 'alert(1);';



$new->add($file,$folder,$asdasd);

$edit->add($copy,$cut,$paste);



$menu = new Menu();

$menu->add($docmanager);

$menu->add($new);

$menu->add($edit);

$menu->create();

*/



function getShortNameByAuthor($author = false)

{ 

	if(!$author) return false;

	

	$sql = 'SELECT cal_lastname FROM webcal_user where cal_login = "'.$author.'"';

	$result = mysql_query($sql) or die('error: '.$sql);

	$num = mysql_num_rows($result);

	if($num == 0) return $author; else return mysql_result($result,0);

}









?>