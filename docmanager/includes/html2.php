<?php 
require_once 'constants.php';
require_once 'sql.php';
require_once 'func.php';
?>
<table UNSELECTABLE="on" id="contentor" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td UNSELECTABLE="on" colspan="2" align="right" style="padding-bottom:2px;" valign="bottom">
			
			<div id="docsearch" UNSELECTABLE="on" style="float:right;">
				<form name="searchFile" onsubmit="common.searchFile.query(this);return false;">	
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td><input type="text" name="keyword" /><input style="margin-left:2px;" type="button" value="<?php echo etranslate('Search'); ?>" onclick="common.searchFile.query(this.form);" /></td>
						</tr>
					</table>
					<input type="hidden" name="filename" checked="true"/>
					
				</form>
			</div>		
			<div style="float:left;">
					<div class="folder_add" title="New Folder" onclick="common.folder.new_();"></div>
					<div class="upload" title="Upload" onclick="common.upload.swfupload.selectFiles();"></div>
				<div class="separator"></div>
					<div class="icons" title="Icons" onclick="common.folder.set(common.folder.id,'icon');"></div>
					<div class="list" title="List" onclick="common.folder.set(common.folder.id,'list');"></div>
					<div class="details" title="Details" onclick="common.folder.set(common.folder.id,'detailed');"></div>
					<div class="thumbnail" title="Thumbnail" onclick="common.folder.set(common.folder.id,'thumbnails');"></div>
				<div class="separator"></div>
					<div class="search" title="Search" onclick="common.searchFile.create();"></div>
					<div class="help" title="Help" onclick=""></div>
			</div>
		</td>
	</tr>
</table>
<table UNSELECTABLE="on" id="contentor" cellpadding="0" cellspacing="0" border="0" style="height:350px;">
	<tr>
		<td id="treeview_main" valign="top" UNSELECTABLE="on">
			<div id="foldername" UNSELECTABLE="on">&nbsp;<?php echo etranslate('folder'); ?></div>
			<div id="treeview_content" UNSELECTABLE="on" style="overflow:hidden;"></div>
		</td>
		<td id="filebrowser" UNSELECTABLE="on" style="overflow:hidden"></td>
	</tr>
</table>
</div>
<span id="drag_tracker" UNSELECTABLE="on" style="padding:2px;display:none;border:1px solid #cccccc;background-color:#ffffff;"></span>
<div UNSELECTABLE="on" id="multiupload" style="display:none;width:300px;border:1px solid #000000;text-align:center;padding:2px;">
	<div id="flashUI"><input type="button" value="browse..." onclick="common.upload.swfupload.selectFiles()" style="font-size: 8pt;display:none;" /></div>
	<div id="degradedUI"></div>
	<div id="progress"></div>
	<div><input type="button" id="uploadcancel" value="cancel" style="display:none;" /></div>
</div>
<div UNSELECTABLE="on" id="overwriteupload" style="display:none;width:300px;border:1px solid #000000;text-align:center;padding:2px;">
	<div id="OflashUI"><input type="button" value="browse..." onclick="common.uploadOverwrite.swfupload.selectFiles()" style="font-size: 8pt;display:none;" /></div>
	<div id="OdegradedUI"></div>
	<div id="Oprogress"></div>
	<div><input type="button" id="Ouploadcancel" value="cancel" style="display:none;" /></div>
</div>
<div UNSELECTABLE="on" id="contextmenucontainer" style="display:none;"></div>