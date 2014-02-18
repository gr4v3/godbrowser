<?php header("Cache-Control: no-cache, must-revalidate");

require_once 'constants.php';

require_once 'sql.php';

require_once 'func.php';

require_once 'icons.php';



?>

<div id="statistics">

<table style="border:0px;width:100%;" cellpadding="2" cellspacing="0">

<?php 

	//doc manager statistics and information 



	

	$stats = statistics();

	

?>

	<tr>

		<td><strong>Statistcs:</strong></td>

	</tr>

	<tr>

		<td>

			<?php etranslate('Total n.&deg; of files:'); echo $stats['files']; ?><br />

			<?php etranslate('Used quota:'); echo $stats['used_quota_readable']; ?><br />

			<?php etranslate('Total quota:'); echo $stats['total_quota']; ?><br /><br />

		</td>

	</tr>	

	<tr>

		<td><div style="width:100%;text-align:left;height:30px;border:1px solid black;color:#FF0000;background-color:#00CC33;"><div style="width:<?php echo $stats['occupied']; ?>%;height:30px;background-color:#FF0000;"></div></div></td>

	</tr>

	<tr>

		<td style="text-align:center;">

			<?php echo $stats['occupied'].'%'; ?>

		</td>

	</tr>

</table></div>