<?php include_once 'sql.php';

	include_once 'constants.php';

	if(isset($_GET['id'])&&!empty($_GET['id'])) $id = $_GET['id'];

	$LanguageList = array('Portuguese','English');

	$MenuLevel1 = array('Item1','Item2','Item3','Item4');

	$MenuLevel2 = array('SubItem1','SubItem2','SubItem3');

	$Template = array('1','2');	

	

	/*

DROP TABLE IF EXISTS `artcalendar`.`dm_definitions`;

CREATE TABLE  `artcalendar`.`dm_definitions` (

  `id` int(10) unsigned NOT NULL auto_increment,

  `docId` int(10) unsigned NOT NULL,

  `Title` varchar(45) NOT NULL,

  `Classification` varchar(45) NOT NULL,

  `Description` text NOT NULL,

  `Language` varchar(45) NOT NULL,

  `Synthesis` varchar(45) NOT NULL,

  `MenuLevel1` varchar(45) NOT NULL,

  `MenuLevel2` varchar(45) NOT NULL,

  `Template` varchar(45) NOT NULL,

  PRIMARY KEY  (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=latin1;

	*/

	

	if(isset($_GET['submited']) && $_GET['submited'] == '1') {

		

		$skip = array('submited'); //fields to skip

		

		//detects if this file allready as definitions

		$sql = 'SELECT * FROM '.TABLE_PREFIX.'definitions WHERE docId = '.$_GET['docId'];

		$result = mysql_query($sql)or die('error: '.$sql);

		

		if(mysql_num_rows($result) > 0) {

			$sql = 'UPDATE '.TABLE_PREFIX.'definitions SET ';

			

			foreach ($_GET as $key => $item) {

				if(!in_array($key,$skip)) $sql .= $key.' = "'.$item.'", ';

			}

			

			$sql = substr($sql,0,-2);

			$sql .= ' WHERE docId = '.$_GET['docId'];

			

			mysql_query($sql) or die($sql);

			

		} else {		

			$sql = 'INSERT INTO '.TABLE_PREFIX.'definitions ';

			

			$sql_fields = '(';

			$sql_values = ' VALUES (';

			

			foreach ($_GET as $key => $item) {

				if(!in_array($key,$skip)) {

					$sql_fields .= $key.', ';

					$sql_values .= '"'.$item.'", ';

				}

			}

			

			$sql_fields = substr($sql_fields,0,-2);

			$sql_values = substr($sql_values,0,-2);

			

			$sql_fields .= ')';

			$sql_values .= ')';

			

			mysql_query($sql.$sql_fields.$sql_values) or die('sql insert error: '.$sql.$sql_fields.$sql_values);

		}

		die('submited');

	}

?>



<div style="width:400px">

<?php $sql = 'SELECT * FROM '.TABLE_PREFIX.'definitions as definitions WHERE definitions.docId = '.$id;

	$result = mysql_query($sql) or die('sql result error: '.$sql);

	if(mysql_num_rows($result)>0) $row = mysql_fetch_array($result,MYSQL_ASSOC); else unset($result,$sql);

	//echo '<pre>'; print_r($row); echo '</pre>';

?>



<table>

<tr>

	<td style="width:120px">Id</td><td><?php echo $id; ?></td>

</tr>

<tr>

	<td style="width:120px"><label for="title">Title:</label></td><td><input name="Title" id="title" value="<?php if(!empty($row['Title'])) echo $row['Title']; ?>" /></td>

</tr>

<tr>

	<td style="width:120px"><label for="classification">Classification:</label></td><td><input name="Classification" id="classification" value="<?php if(!empty($row['Classification'])) echo $row['Classification']; ?>" /></td>

</tr>

<tr>

	<td style="width:120px; vertical-align:top;"><label for="description">Description:</label></td><td><textarea name="Description" id="description"><?php if(!empty($row['Description'])) echo $row['Description']; ?></textarea></td>

</tr>

<tr>

	<td style="width:120px"><label for="language">Language:</label></td><td><select name="Language" id="language"><?php foreach($LanguageList as $lang) { if($lang == $row['Language']) $selected = ' selected="selected"'; else $selected = ''; echo '<option value="'.$lang.'"'.$selected.'>'.$lang.'</option>'; }?></select></td>

</tr>

<tr>

	<td style="width:120px; vertical-align:top;"><label for="synthesis">Synthesis:</label></td><td><textarea name="Synthesis" id="synthesis"><?php if(!empty($row['Synthesis'])) echo $row['Synthesis']; ?></textarea></td>

</tr>

<tr>

	<td style="width:120px"><label for="MenuLevel1">Menu Level 1:</label></td><td><select name="MenuLevel1" id="MenuLevel1"><?php foreach($MenuLevel1 as $item) { if($item == $row['MenuLevel1']) $selected = ' selected="selected"'; else $selected = ''; echo '<option value="'.$item.'"'.$selected.'>'.$item.'</option>'; }?></select></td>

</tr>

<tr>

	<td style="width:120px"><label for="MenuLevel2">Menu Level 2:</label></td><td><select name="MenuLevel2" id="MenuLevel2"><?php foreach($MenuLevel2 as $item) { if($item == $row['MenuLevel2']) $selected = ' selected="selected"'; else $selected = ''; echo '<option value="'.$item.'"'.$selected.'>'.$item.'</option>'; }?></select></td>

</tr>

<tr>

	<td style="width:120px"><label for="template">Template:</label></td><td><select name="Template" id="template"><?php foreach($Template as $item) { if($item == $row['Template']) $selected = ' selected="selected"'; else $selected = ''; echo '<option value="'.$item.'"'.$selected.'>'.$item.'</option>'; }?></select></td>

</tr>

</table>

<input type="hidden" name="submited" value="1" />

<input type="hidden" name="docId" value="<?php echo $id; ?>" />

</div>