<?php	

	//system

	define('SLASH',"/");

	define('LOCAL_PATH',SLASH.'docedit'); // online 	define('LOCAL_PATH',$_SERVER['DOCUMENT_ROOT'].SLASH.'prime/primeservices/admin/docedit');

	define('DOC_PATH','..'.SLASH.'content');

	define('DOC_DOWNLOAD','..'.SLASH.'downloads');

	define('MAX_STORAGE_SPACE',5368709120); // value in bytes 5368709120b = 5gb

	define('MAX_FILE_UPLOAD',52428800); // value in bytes 52428800 = 50 mb	

	define('TABLE_PREFIX','dm_');

	

	//relative path

	define('MODULE_PATH','docmanager/');

	define('RELATIVE_PATH','docmanager');

	define('RELATIVE_IMG_PATH',MODULE_PATH.'images/');

	define('RELATIVE_JS_PATH',MODULE_PATH.'js/');

	define('RELATIVE_CSS_PATH',MODULE_PATH.'css/');

	

	define('THUMBNAIL_WIDTH',90);

	define('THUMBNAIL_HEIGHT',90);

	

	//login information

	//define('LOGIN','');   //



?>