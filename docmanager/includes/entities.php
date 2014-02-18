<?php session_start();

	include_once 'sql.php';

	include_once 'func.php';

	include_once 'constants.php';



	$mode = isset($_REQUEST['mode'])?$_REQUEST['mode']:die('invalid call');

	if(empty($_GET['entity'])) $entity = 'Artisti'; else $entity = $_GET['entity'];

	if(isset($_GET['files'])&&(count($_GET['files'])==1)) $mode = 'disassociate';

	

	//data 

	if($mode == 'SelectedEntity')

	{

		$id = $_GET['entity'];

		

		$_SESSION['SelectedEntity'] = $id;

		

		die($id);

		

		

	} elseif ($mode == 'associate') {

		if(isset($_GET['items'])) {

			//gets all files ids into the same array 

			if(isset($_GET['files']) && is_array($_GET['files'])) $files = $_GET['files'];

			

			if(isset($_GET['folders']) && is_array($_GET['folders'])) {

				foreach ($_GET['folders'] as $folder) {

					$ids = list_files($folder);

					$files = array_merge($files,$ids);

				}

			}

			if($entity == "s") $entity_temp = 's'; else $entity_temp = 'e';

			foreach($files as $file) {

				foreach ($_GET['items'] as $item) {

					$sql = "insert into ".TABLE_PREFIX."doc_user (docId,userId,sUserType) values($file,$item,'$entity_temp')";

					$dupped_rel = mysql_query('SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId='.$file.' and userId='.$item.' and sUserType="'.$entity_temp.'"');

					if (mysql_num_rows($dupped_rel)<1) {

						mysql_query($sql) or die('error: '.$sql);

					}

				}

			}

		}

	} elseif ($mode == 'disassociate') {

		

		if(isset($_GET['files']) && is_array($_GET['files'])) $files = $_GET['files'];

		if($entity == "s") $entity_temp = 's'; else $entity_temp = 'e';

		if(isset($_GET['submited']))  $submited = $_GET['submited']; else $submited = 0;

		

		if($submited == 1) {

			if(!isset($_GET['items'])) {

				//deletes all association for this file

				if($entity_temp == 'e') {

		

					$sql = 'SELECT doc_user.id FROM '.TABLE_PREFIX.'doc_user as doc_user

					INNER JOIN entity ON entity.id = doc_user.userId

					INNER JOIN entitytype ON entitytype.id = entity.EntityType

					WHERE doc_user.sUserType = "e" and entitytype.sType = "'.$entity.'" and doc_user.docId = '.$files[0];

					

					$res = mysql_query($sql) or die('error: '.$sql);

					

					while($row = mysql_fetch_assoc($res))

					{					

						$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE id = '.$row['id'];

						echo $sql;

						mysql_query($sql) or die('error: '.$sql);

					}

		

				} else {

					$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$files[0];

					mysql_query($sql) or die('error: '.$sql);

				}

			}

		}

					

		if(isset($_GET['items'])) {



			//deletes all association for this file

			if($entity_temp == 'e') {

	

				$sql = 'SELECT doc_user.id FROM '.TABLE_PREFIX.'doc_user as doc_user

				INNER JOIN entity ON entity.id = doc_user.userId

				INNER JOIN entitytype ON entitytype.id = entity.EntityType

				WHERE doc_user.sUserType = "e" and entitytype.sType = "'.$entity.'" and doc_user.docId = '.$files[0];

				

				$res = mysql_query($sql) or die('error: '.$sql);

				

				while($row = mysql_fetch_assoc($res))

				{					

					$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE id = '.$row['id'];

					echo $sql;

					mysql_query($sql) or die('error: '.$sql);

				}

	

			} else {

				$sql = 'DELETE FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$files[0];

				mysql_query($sql) or die('error: '.$sql);

			}

			//links files						

			if(isset($_GET['folders']) && is_array($_GET['folders'])) 

			{

				foreach ($_GET['folders'] as $folder) 

				{

					$ids = list_files($folder);

					$files = array_merge($files,$ids);

				}

			}

			

			if($entity == "s") $entity_temp = 's'; else $entity_temp = 'e';

			

			

			foreach($files as $file) {

				foreach ($_GET['items'] as $item) {				

					$sql = "insert into ".TABLE_PREFIX."doc_user (docId,userId,sUserType) values($file,$item,'$entity_temp')";

					$dupped_rel = mysql_query('SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId='.$file.' and userId='.$item.' and sUserType="'.$entity_temp.'"');

					if (mysql_num_rows($dupped_rel)<1) {

						mysql_query($sql) or die('error: '.$sql);

					}

				}

			}

		}

	}

?>

<div style="width:350px;padding:5px 5px 5px 5px;">



	<label for="entity">Select entity:</label><br />

	<select id="entity" name="selectentity" onchange="common.entities.getItems(this.form);">

    	<option value="Artisti" <?php if($entity == 'Artisti') echo 'selected'; ?>><?php echo etranslate('Artist'); ?></option>

    	<option value="s" <?php if($entity == 's') echo 'selected'; ?>><?php echo etranslate('Shows'); ?></option>

       	<!--<option value="n" <?php if($entity == 'n') echo 'selected'; ?>><?php echo etranslate('Newsletter'); ?></option>-->

        <option value="Agenzie" <?php if($entity == 'Agenzie') echo 'selected'; ?>><?php echo etranslate('Agenzie'); ?></option>

        <option value="Location" <?php if($entity == 'Location') echo 'selected'; ?>><?php echo etranslate('Locations'); ?></option>

    </select> <br />

	

    <input type="hidden" value="1" name="submitedEntity" />

<?php if($entity == 's') {

		$sql = 'SELECT shows.Id as ShowId, shows.sShowCompleteName, showtype.ShowTypeDescription, shows.sShowProducer, entity.sNameShort, entity.EntityType, showstatus.IdShowStatus, showstatus.sShowStatusDescription FROM ((shows INNER JOIN showtype ON shows.ShowType = showtype.IdShowType) INNER JOIN entity ON shows.ShowSellerId = entity.Id) INNER JOIN showstatus ON shows.ShowStatus = showstatus.IdShowStatus WHERE entity.EntityType <> 5 ORDER BY shows.sShowShortName ASC';

		$result = mysql_query($sql) or die('error: '.$sql);

		echo '<select id="entity_list" name="selectentity_list" multiple="multiple" style="width:345px;height:300px;" onchange="common.entities.selectItem(this.form);">';

		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

			if($mode == 'disassociate') {

				$rel_sql = 'SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$_GET['files'][0].' and userId = '.$row['ShowId'].' and sUserType = "'.$entity.'"';

				$rel_res = mysql_query($rel_sql) or die('error: '.$rel_sql);

				if(mysql_num_rows($rel_res) > 0) $selected = ' selected'; else $selected = '';

			}

			echo '<option value="'.$row['ShowId'].'"'.$selected.'>'.htmlentities($row['sShowCompleteName']).'</option>';

		}

		echo '</select>';

	} elseif($entity == 'n') {

		$sql = 'SELECT * FROM newsletter_mails ORDER BY id DESC';

		$result = mysql_query($sql) or die('error: '.$sql);

		echo '<select id="entity_list" name="selectentity_list" multiple="multiple" style="width:345px;height:300px;" onchange="common.entities.selectItem(this.form);">';

		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {

			if($mode == 'disassociate') {

				$rel_sql = 'SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$_GET['files'][0].' and userId = '.$row['id'].' and sUserType = "'.$entity.'"';

				$rel_res = mysql_query($rel_sql) or die('error: '.$rel_sql);

				if(mysql_num_rows($rel_res) > 0) $selected = ' selected'; else $selected = '';

			}		

			echo '<option value="'.$row['id'].'">'.htmlentities($row['Oggetto']).'</option>';

		}

		echo '</select>';		

	} else {

			

		//venue

		if($entity == 'Location') $sql = 'SELECT entity.Id, entity.sNameShort, venue.sVenueName, venue.sVenueDescription, venue.sVenueContactName, venue.VenueType, venuetype.VenueTypeDescription, entity.EntityType, entity.IsFavorite FROM (entity LEFT JOIN venue ON entity.Id = venue.EntityId) LEFT JOIN venuetype ON venue.VenueType = venuetype.IdVenueType WHERE entity.EntityType=3 ORDER BY entity.sNameShort ASC';

		//organization

		if($entity == 'Agenzie') $sql = 'SELECT entity.Id, entity.EntityType, orgtype.OrgTypeDescription, entity.sNameShort, organization.sOrgName, organization.sOrgContactName, entity.IsDefaultOrg, entity.IsFavorite FROM (entity LEFT JOIN organization ON entity.Id = organization.EntityId) LEFT JOIN orgtype ON organization.OrgType = orgtype.IdOrgType WHERE (((entity.EntityType)=1)) ORDER BY sNameShort ASC';

		//artist

		if($entity == 'Artisti') $sql = 'SELECT entity.Id, entity.EntityType, entity.sNameShort, entity.sNote, artist.sArtistName1, artist.sArtistName2, artist.ArtistType, artisttype.ArtistTypeDescription, artist.sArtistSpecialty, organization.sOrgName, entity.ParentId, entity.IsFavorite FROM ((entity LEFT JOIN artist ON entity.Id = artist.EntityId) LEFT JOIN artisttype ON artist.ArtistType = artisttype.IdArtistType) LEFT JOIN organization ON entity.ParentId = organization.EntityId WHERE (((entity.EntityType)=2))';

		

		$result = mysql_query($sql) or die('error: '.$sql);

		echo '<select id="entity_list" name="selectentity_list" multiple="multiple" style="width:345px;height:300px;" onchange="common.entities.selectItem(this.form);">';

		while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {		

			if($mode == 'disassociate') {

				$rel_sql = 'SELECT * FROM '.TABLE_PREFIX.'doc_user WHERE docId = '.$_GET['files'][0].' and userId = '.$row['Id'].' and sUserType = "e"';

				$rel_res = mysql_query($rel_sql) or die('error: '.$rel_sql);

				if(mysql_num_rows($rel_res) > 0) $selected = ' selected'; else $selected = '';

			}

			

			echo '<option value="'.$row['Id'].'"'.$selected.'>'.htmlentities($row['sNameShort']).'</option>';

		}

		echo '</select>';

	}

	echo '<strong>Note:</strong> ctrl + click to select / disselect.<br />';

?>

<?php 

	

	//echo '<pre>'; var_dump($mode); print_r($_GET); echo '</pre>';



?>



</div>