<?php 
/* online
$db_localhost = 'localhost';
$db_user = 'inforqua_prime';
$db_pass = 'prime360';
$db_name = 'inforqua_madeiraprime';
*/

$db_localhost = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'madeira_prime';

$connectId = mysql_connect($db_localhost,$db_user,$db_pass);
$db = mysql_select_db($db_name);
if(!$db)
{
	mysql_query("CREATE DATABASE `$db_name`",$connectId);
	
	mysql_query("DROP TABLE IF EXISTS `".TABLE_PREFIX."definitions`;
	DROP TABLE IF EXISTS `dm_definitions`;CREATE TABLE  `dm_definitions` (  `id` int(10) unsigned NOT NULL auto_increment,  `docId` int(10) unsigned NOT NULL,  `Title` varchar(45) NOT NULL,  `Classification` varchar(45) NOT NULL,  `Description` text NOT NULL,  `Language` varchar(45) NOT NULL,  `Synthesis` text NOT NULL,  `MenuLevel1` varchar(45) NOT NULL,  `MenuLevel2` varchar(45) NOT NULL,  `Template` varchar(45) NOT NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `dm_doc_user`;CREATE TABLE  `dm_doc_user` (  `id` int(10) unsigned NOT NULL auto_increment,  `docId` varchar(45) NOT NULL,  `userId` varchar(45) NOT NULL,  `sUserType` varchar(45) NOT NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `dm_documents`;CREATE TABLE  `dm_documents` (  `id` int(10) unsigned NOT NULL auto_increment,  `filename` varchar(100) NOT NULL,  `extension` varchar(10) NOT NULL,  `uploaddate` int(10) unsigned NOT NULL,  `lastmodifieddate` int(10) unsigned NOT NULL,  `filesize` int(10) unsigned NOT NULL,  `author` varchar(45) default NULL,  `lastchangedby` varchar(45) default NULL,  `tags` text,  `description` text,  `folder` int(10) unsigned NOT NULL,  `permissions` int(10) unsigned default NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `dm_folders`;CREATE TABLE  `dm_folders` (  `id` int(10) unsigned NOT NULL auto_increment,  `name` varchar(100) NOT NULL,  `parent` int(10) unsigned NOT NULL,  `description` text,  `author` varchar(45) default NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `dm_permissions`;CREATE TABLE  `dm_permissions` (  `id` int(10) unsigned NOT NULL auto_increment,  `item_id` int(10) unsigned default NULL,  `item_type` varchar(45) default NULL,  `who` varchar(45) NOT NULL,  `view` tinyint(1) NOT NULL default '1',  `read` tinyint(1) unsigned NOT NULL default '1',  `write` tinyint(1) unsigned NOT NULL default '0',  `erase` tinyint(1) NOT NULL default '0',  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `dm_personal_permissions`;CREATE TABLE  `dm_personal_permissions` (  `id` int(10) unsigned NOT NULL auto_increment,  `username` varchar(45) NOT NULL,  `doc_id` varchar(45) NOT NULL,  `permissions` varchar(5) NOT NULL,  PRIMARY KEY  (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;DROP TABLE IF EXISTS `webcal_user`;CREATE TABLE  `webcal_user` (  `cal_login` varchar(25) NOT NULL default '',  `cal_passwd` varchar(32) default NULL,  `cal_lastname` varchar(25) default NULL,  `cal_firstname` varchar(25) default NULL,  `cal_user_type` int(4) default NULL,  `cal_is_admin` char(1) default 'N',  `cal_email` varchar(75) default NULL,  `cal_status` int(1) default '0',  PRIMARY KEY  (`cal_login`)) ENGINE=MyISAM DEFAULT CHARSET=latin1;",$connectId);
	
	mysql_query("");
	
}

// CREATE DATABASE `madeira_prime` /*!40100 DEFAULT CHARACTER SET latin1 */;
/*
DROP TABLE IF EXISTS `dm_definitions`;
CREATE TABLE  `dm_definitions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `docId` int(10) unsigned NOT NULL,
  `Title` varchar(45) NOT NULL,
  `Classification` varchar(45) NOT NULL,
  `Description` text NOT NULL,
  `Language` varchar(45) NOT NULL,
  `Synthesis` text NOT NULL,
  `MenuLevel1` varchar(45) NOT NULL,
  `MenuLevel2` varchar(45) NOT NULL,
  `Template` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `dm_doc_user`;
CREATE TABLE  `dm_doc_user` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `docId` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `sUserType` varchar(45) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `dm_documents`;
CREATE TABLE  `dm_documents` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `filename` varchar(100) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `uploaddate` int(10) unsigned NOT NULL,
  `lastmodifieddate` int(10) unsigned NOT NULL,
  `filesize` int(10) unsigned NOT NULL,
  `author` varchar(45) default NULL,
  `lastchangedby` varchar(45) default NULL,
  `tags` text,
  `description` text,
  `folder` int(10) unsigned NOT NULL,
  `permissions` int(10) unsigned default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `dm_folders`;
CREATE TABLE  `dm_folders` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `parent` int(10) unsigned NOT NULL,
  `description` text,
  `author` varchar(45) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `dm_permissions`;
CREATE TABLE  `dm_permissions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `item_id` int(10) unsigned default NULL,
  `item_type` varchar(45) default NULL,
  `who` varchar(45) NOT NULL,
  `view` tinyint(1) NOT NULL default '1',
  `read` tinyint(1) unsigned NOT NULL default '1',
  `write` tinyint(1) unsigned NOT NULL default '0',
  `erase` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `dm_personal_permissions`;
CREATE TABLE  `dm_personal_permissions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(45) NOT NULL,
  `doc_id` varchar(45) NOT NULL,
  `permissions` varchar(5) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `webcal_user`;
CREATE TABLE  `webcal_user` (
  `cal_login` varchar(25) NOT NULL default '',
  `cal_passwd` varchar(32) default NULL,
  `cal_lastname` varchar(25) default NULL,
  `cal_firstname` varchar(25) default NULL,
  `cal_user_type` int(4) default NULL,
  `cal_is_admin` char(1) default 'N',
  `cal_email` varchar(75) default NULL,
  `cal_status` int(1) default '0',
  PRIMARY KEY  (`cal_login`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
*/


define("SQLID",$connectId);
?>