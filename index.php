<?php
$view_mode = isset($_COOKIE['viewmode'])?$_COOKIE['viewmode']:'icon';
require_once 'docmanager/includes/constants.php';
require_once 'docmanager/includes/func.php';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>DocManager Editor</title>
<link type="text/css" rel="stylesheet" media="all" href="<?php echo RELATIVE_CSS_PATH; ?>main.css" />
<link type="text/css" rel="stylesheet" media="all" href="<?php echo RELATIVE_CSS_PATH; ?>dropdown.css" />
<link type="text/css" rel="stylesheet" media="all" href="<?php echo RELATIVE_CSS_PATH; ?>contextmenu_new.css" />
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>mootools.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>simpleajax/kernel/simpleajax.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>jsupload/kernel/jsupload.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>autoScroll/kernel/autoScroll.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>jswindow/kernel/jswindow.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>swfupload/handlers.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>swfupload/swfupload.js"></script>
<script type="text/javascript" src="<?php echo RELATIVE_JS_PATH; ?>codepress/codepress.js"></script>
<script type="text/javascript">
var PATH = '<?php echo RELATIVE_PATH; ?>';
var FOLDER = PATH+'/includes/folder.php';
var FILE = PATH+'/includes/file.php';
var CONTEXTMENU = PATH+'/includes/contextmenu2.php';
var UPLOAD = PATH+'/includes/upload.php';
var LOGIN = PATH+'/includes/login.php';
var DOCROOT = '<?php echo $_SERVER['DOCUMENT_ROOT']; ?>';
var FILEBROWSER = PATH+'/includes/filebrowser.php';
var OPEN = PATH+'/includes/open.php';
var SEARCH = PATH+'/includes/search.php';
var STATISTICS = PATH+'/includes/statistics.php';
var MAX_FILE_UPLOAD = <?php echo MAX_FILE_UPLOAD; ?>;
var INCLUDES = PATH+'/includes/';
</script>
<script type="text/javascript" src="common.js"></script>
<script type="text/javascript">
var win = $(window);

common.translation = {
	folder_add:'<?php echo translate('New Folder'); ?>',
	upload:'<?php echo translate('Upload'); ?>',
	icons:'<?php echo translate('Icons'); ?>',
	list:'<?php echo translate('List'); ?>',
	details:'<?php echo translate('Details'); ?>',
	thumbnail:'<?php echo translate('Thumbnail'); ?>',
	search:'<?php echo translate('Search'); ?>',
	help:'<?php echo translate('Help'); ?>',
	divs:['folder_add','upload','icons','list','details','thumbnail','search','help']
}

win.addEvent('domready', function(){common.create();});
win.addEvent('resize', function(){common.multiselect.check();common.frames.check();});
common.html = 'html.php';

</script>
</head>
<body UNSELECTABLE="on" oncontextmenu="return false;">
<div id="docmain" UNSELECTABLE="on"></div>
</body>
</html>
