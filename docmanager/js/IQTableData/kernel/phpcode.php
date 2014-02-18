<?php
function solve($string,$row,$index)
{	
	//substitui simplesmente a variável com o dado vindo da base de dados no campo correspondente
	foreach($row as $match => $data)
	{$string = str_replace('{'.$match.'}',$data,$string);}
	
	//troca expressões especiais para carateres especiais
	foreach($row as $match => $data)
	{$string = str_replace('«'.$match.'»',exchange_char($data),$string);}
	
	//formata um número
	foreach($row as $match => $data)
	{$string = str_replace('!'.$match.'!',number_format(($data),2),$string);}
	
	foreach($row as $match => $data)
	{$string = str_replace('[d]'.$match.'[/d]',DataFormat($data),$string);}
	
	foreach($row as $match => $data)
	{$string = str_replace('[t]'.$match.'[/t]',TimeFormat($data),$string);}
	
	//formata uma data para um aspecto personalizado
	//aqui estaria o procedimento 
	
	return $string;
}
if ( !function_exists('htmlspecialchars_decode') )
{
   function htmlspecialchars_decode($text)
   {
       return strtr($text, array_flip(get_html_translation_table(HTML_SPECIALCHARS)));
   }
}


function DataFormat($string)
{
	$dataarray = explode(" ",$string);
	$dataarray = explode("-",$dataarray[0]);
	$data = $dataarray[2]." / ".$dataarray[1]." / ".$dataarray[0];
	return $data;
}
function TimeFormat($string)
{
	$dataarray = explode(" ",$string);
	$dataarray = explode(":",$dataarray[1]);
	$time = $dataarray[0].":".$dataarray[1];
	return $time;
}
function decode_special_htmlentinties($string)
{
	$arr = array('(!euro!)' => '€',
				 '(!pelicas!)' => '&#039;',
				 '[P]' => "'",
				 '[p]' => '&#039;',
				 '[b]' => '&deg;',
				 '[i]' => '&iacute;',
				 '[c]' => '&ccedil;',
				 '[a]' => '&atilde;',
				 'Ê' => '%ca',
				 '[Pc]' => '%',
				 '[E]' => '&',
				 '[nbsp]' => '&nbsp;',
				 
				 '[v]' => '*',
				 '[m]' => '+',
				 '[car]' => '#',
	
				 '!!newline!!' => '<br>',
				 
				 '[aacute]' => '&aacute;',
				 '[agrave]' => '&agrave;',
				 '[atilde]' => '&atilde;',
				 '[acirc]' => '&acirc;',

				 '[oacute]' => '&oacute;',
				 '[ograve]' => '&ograve;',
				 '[otilde]' => '&otilde;',
				 '[ocirc]' => '&ocirc;',

				 '[eacute]' => '&eacute;',
				 '[egrave]' => '&egrave;',
				 '[etilde]' => '&etilde;',
				 '[ecirc]' => '&ecirc;',

				 '[icute]' => '&iacute;',
				 '[igrave]' => '&igrave;',
				 '[itilde]' => '&itilde;',
				 '[icirc]' => '&icirc;',

				 '[uacute]' => '&uacute;',
				 '[ugrave]' => '&ugrave;',
				 '[utilde]' => '&utilde;',
				 '[ucirc]' => '&ucirc;',

				 '[ccedil]' => '&ccedil;',

				 '[Aacute]' => '&Aacute;',
				 '[Agrave]' => '&Agrave;',
				 '[Atilde]' => '&Atilde;',
				 '[Acirc]' => '&Acirc;',

				 '[Oacute]' => '&Oacute;',
				 '[Ograve]' => '&Ograve;',
				 '[Otilde]' => '&Otilde;',
				 '[Ocirc]' => '&Ocirc;',

				 '[Eacute]' => '&Eacute;',
				 '[Egrave]' => '&Egrave;',
				 '[Etilde]' => '&Etilde;',
				 '[Ecirc]' => '&Ecirc;',

				 '[Icute]' => '&Iacute;',
				 '[Igrave]' => '&Igrave;',
				 '[Itilde]' => '&Itilde;',
				 '[Icirc]' => '&Icirc;',

				 '[Uacute]' => '&Uacute;',
				 '[Ugrave]' => '&Ugrave;',
				 '[Utilde]' => '&Utilde;',
				 '[Ucirc]' => '&Ucirc;',

				 '[Ccedil]' => '&Ccedil;',
				 '§P§' => '"',

				  'Ã¢' => 'â'
				);
	$result = $string;
	foreach($arr as $index => $value)
	{$result = str_replace($index,$value,$result);}
	return $result;	
}

function exchange_char($string)
{
	$chars = array(
		'&oacute;' => 'o',
		'&ocirc;' => 'o',
		'&Oacute;' => 'O',
		'&ocirc;' => 'o',
	);
	foreach($chars as $index => $letter){$string = str_replace($index,$letter,$string);}
	return $string;
}

class corelib
{
	//modo da componente
	var $mode = 'sql';
	var $prefix = '';
	
	//acesso á base de dados
	var $host = NULL;
	var $user = NULL;
	var $pass = NULL;
	var $db = NULL;
	
	//configuraçao basica da tabela
	var $format = array();
	var $title = array();
	var $border = 0;
	var $cellpadding = 0;
	var $cellspacing = 0;
	var $oddcolor = '';
	var $evencolor = '';
	var $width = '';
	var $headerwidth = array();
	
	//query
	var $cached_sql_query = '';
	var $sql = '';
	var $searchQuery = '';
	var $orderby = '';
	var $order = array();
	var $direction = '';
	var $query_count = '';
	var $limitindex = '';
	var $limit = '';
	var $limit_number = 0;
	var $queryrows = 0;
	var $debugstring = '';
	var $http = '';
	var $obj = false;
	var $activeColumns = array();
	var $renew = false;
	
	function parse($data)
	{
		$this->debugstring = '';
		
		
		
		if($this->exists($data['A'])) $this->host = $data['A'];
		if($this->exists($data['B'])) $this->user = $data['B'];
		if($this->exists($data['C'])) $this->pass = $data['C'];
		if($this->exists($data['D'])) $this->db = $data['D'];
		
		if($this->exists($data['mode'])) $this->mode = $data['mode'];
		if($this->exists($data['I'])) $this->prefix = $data['I'];
		
		if($this->exists($data['Q'])) $this->format = $data['Q'];
		if($this->exists($data['R'])) $this->title = $data['R'];
		if($this->exists($data['J'])) $this->border = $data['J'];
		if($this->exists($data['K'])) $this->cellpadding = $data['K'];
		if($this->exists($data['L'])) $this->cellspacing = $data['L'];
		if($this->exists($data['N'])) $this->oddcolor = $data['N'];
		if($this->exists($data['M'])) $this->evencolor = $data['M'];
		if($this->exists($data['O'])) $this->width = $data['O'];
		if($this->exists($data['E'])) $this->sql = decode_special_htmlentinties($data['E']);
		if($this->exists($data['S'])) $this->searchQuery = decode_special_htmlentinties($data['S']);
		if($this->exists($data['orderby'])) $this->orderby = $data['orderby'];
		if($this->exists($data['direction'])) $this->direction = $data['direction'];
		if($this->exists($data['H'])) $this->query_count = decode_special_htmlentinties($data['H']);
		
		if($this->exists($data['G'])) 
			$this->limitindex = ' limit '.$data['G'].','; 
		else $this->limitindex = ' limit ';
		
		if($this->exists($data['F']) && $this->exists($data['G'])) 
			$this->limit = $this->limitindex.$data['F'];
				else $this->limit = ' limit 0,'.$data['F'];
				
		if($this->exists($data['F'])) $this->limit_number = $data['F'];
		if($this->exists($data['X'])) $this->order = $data['X'];
		if($this->exists($data['Y'])) $this->headerwidth = $data['Y'];
		if($this->exists($data['Z'])) $this->activeColumns = $data['Z'];
		
		if($this->exists($data['V'])) $this->new = true; else $this->new = false;
		
		$this->debugstring.= 'query_entrada = '.$data['E'].';<br />';			
	}
	function connect()
	{
		$id = mysql_connect($this->host,$this->user,$this->pass) or $id = false;
		mysql_select_db($this->db) or die('erro ao conectar ao servidor:'.$this->host.' '.$this->user.' '.$this->pass);
		return $id;
	}
	function parsequery_order()
	{	
		$order = '';	
		if($this->orderby and $this->direction) $order = ' order by '.$this->orderby.' '.$this->direction.' ';
		return $order;
	}
	function parsequery_split()
	{
		$query_splited = split('GROUP BY',$this->sql);
		$sql = '';
		if(isset($query_splited[0]) and isset($query_splited[1]))
		{
			$sql = $query_splited[0].($this->renew?'':$this->searchQuery).' GROUP BY '.$query_splited[1].$this->parsequery_order().$this->limit;
		} else
			{ 
				$sql = $this->sql.($this->renew?'':$this->searchQuery).$this->parsequery_order().$this->limit;	
			}
		return $sql;	
	}
	
	function query()
	{
		$sql = decode_special_htmlentinties($this->parsequery_split());
		//if(!$this->exists($_REQUEST['E']) and !$this->exists($_REQUEST['S'])) $sql = $this->cached_sql_query;
		$this->debugstring.= 'query_cache = '.$sql.'<br />';
		$this->cached_sql_query = $sql;
		
		$result = mysql_query($sql);
		if($result)
		{
			$resultCOLS = mysql_num_fields($result);
			$resultROWS = mysql_query('select FOUND_ROWS()') or die('erro na query found_rows()');	
			$resultROWS = mysql_fetch_row($resultROWS);
			$this->queryrows = $resultROWS[0];
			$this->debugstring.= 'number_of_columns = '.$resultCOLS.'<br />';
			if(count($this->activeColumns)==0)$this->activeColumns = array_fill(0,$resultCOLS,true);
		} 
		return $result;
	}
	function print_debugging()
	{
		foreach($_REQUEST as $index => $value){$request.= "['$index'] =>".$value.'</br>';}
		$this->debugstring.= $request;
		$request = '';
		foreach($this->order as $index => $value){$request.= "['X']['$index'] =>".$value.'</br>';}
		$this->debugstring.= $request;
		echo "<request>".$this->debugstring."</request>";
	}
	function create_table()
	{
		$result = $this->query();	
		
		if(!$result) $this->queryrows = 0;
		$html = '<query>'.$this->sql.'</query>';
		$html.= '<count>'.$this->queryrows.'</count>';
		//$this->debugstring.= '<a>'.$this->headerwidth.'</a>';
		$this->debugstring.= '<a>';
		foreach($this->headerwidth as $value)
		{
			$this->debugstring.= $value.'##';
		}
		$this->debugstring.= '</a>';
		
		
		$this->print_debugging();
		$this->obj = $this;
		$create_table = false;
		if($result)
		{
			$create_table = true;
			$querystring = array();
			while ($row = mysql_fetch_assoc($result)) 
			{
				$arr = array();
				foreach($row as $index => $value)
				{$arr[$index] = nl2br(htmlentities($value));}
				$querystring[] = $arr;
			}
			mysql_free_result($result);
	
			/***********************************************************
			*****constroi a tabela propriamente dita a partir daqui*****
			***********************************************************/
			$prefix = $this->prefix;
			
			$first = true;
			if(!$this->exists($querystring[0])) return NULL;
			foreach($querystring[0] as $index => $value)
			{
				if (!$first) $html.= '::';
				$html.= $index;
				$first = false;
			}
			
			$i = 0;
		
			$colgroup = '<colgroup>';
			foreach($this->headerwidth as $index => $value)
			{
				if($value > 0) $colgroup.= '<col width="'.$value.'" >';
					else $colgroup.= '<col >';
				$i++;
			}
			$colgroup.= '</colgroup>';
			$html.= '<div><table unselectable="on" style="table-layout:fixed;width:100%;" border="'.$this->border.'" cellpadding="'.$this->cellpadding.'" cellspacing="'.$this->cellspacing.'">'.$colgroup.'<tbody><tr id="'.$this->prefix.'_tr_header" >';
			
			$titles_count = 0;
			/*
			foreach($querystring[0] as $index => $value)
			{	
				if(!empty($this->title[$titles_count]))
				{
					if($this->order[$titles_count] == $_REQUEST['orderby']) 
					{
						if(count($this->title) > 0)
							$html.= "<td unselectable=\"on\" class=\"cssIQTableData_head_td".$titles_count.$prefix." ".$this->direction."\" style=\"cursor:pointer;background-repeat:no-repeat;\" onclick=\"IQTableData.cache['$prefix'].sortTable('".$this->order[$titles_count]."',this)\" onmouseover=\"IQTableData.cache['$prefix'].mousehandler.title.over('$prefix',this)\" onmouseout=\"IQTableData.cache['$prefix'].mousehandler.title.out('$prefix',this)\">".htmlspecialchars_decode(decode_special_htmlentinties($this->title[$titles_count]))."</td>";
							 else $html.= "<td  unselectable=\"on\" class=\"cssIQTableData_head_td".$titles_count.$prefix." ".$this->direction."\" style=\"cursor:pointer;background-repeat:no-repeat;\" onclick=\"IQTableData.cache['$prefix'].sortTable('".$this->order[$titles_count]."',this)\"  onmouseover=\"IQTableData.cache['$prefix'].mousehandler.title.over('$prefix',this)\"   onmouseout=\"IQTableData.cache['$prefix'].mousehandler.title.out('$prefix',this)\">$index</td>";
					} else {
						if(count($this->title) > 0)
							$html.= "<td unselectable=\"on\" class=\"cssIQTableData_head_td".$titles_count.$prefix."\" style=\"cursor:pointer;background-repeat:no-repeat;\" onclick=\"IQTableData.cache['$prefix'].sortTable('".$this->order[$titles_count]."',this)\"  onmouseover=\"IQTableData.cache['$prefix'].mousehandler.title.over('$prefix',this)\"  onmouseout=\"IQTableData.cache['$prefix'].mousehandler.title.out('$prefix',this)\">".htmlspecialchars_decode(decode_special_htmlentinties($this->title[$titles_count]))."</td>";
							 else $html.= "<td unselectable=\"on\" class=\"cssIQTableData_head_td".$titles_count.$prefix."\" style=\"cursor:pointer;background-repeat:no-repeat;\" onclick=\"IQTableData.cache['$prefix'].sortTable('".$this->order[$titles_count]."',this)\"  onmouseover=\"IQTableData.cache['$prefix'].mousehandler.title.over('$prefix',this)\"  onmouseout=\"IQTableData.cache['$prefix'].mousehandler.title.out('$prefix',this)\">$index</td>";
					}
				} else $html.= "";
				$titles_count++; 
			}
			*/
			foreach($this->headerwidth as $index => $value)
			{
				$html.= "<td unselectable=\"on\" class=\"cssIQTableData_head_td".$index.$prefix." ".($this->order[$index]==$_REQUEST['orderby']?$this->direction:'')."\" style=\"cursor:pointer;background-repeat:no-repeat;\" onclick=\"IQTableData.cache['$prefix'].sortTable('".$this->order[$index]."',this)\" onmouseover=\"IQTableData.cache['$prefix'].mousehandler.title.over('$prefix',this)\" onmouseout=\"IQTableData.cache['$prefix'].mousehandler.title.out('$prefix',this)\">".htmlspecialchars_decode(decode_special_htmlentinties($this->title[$index]))."</td>";			
			}
			$html.= "</tr>";
			
			$tr_color = array('cssIQTableData_'.$this->prefix.'_content_tr_even none none','cssIQTableData_'.$this->prefix.'_content_tr_odd none none');
			foreach($querystring as $j => $row)
			{
				if(empty($tr_color[0])) $tr_color[0] = 'transparent';
				$html.= "<tr id=\"".$this->prefix."_tr_$j\" class=\"".$tr_color[0]."\"  onmouseout=\"IQTableData.cache['$prefix'].mousehandler.content.onRowOut('$prefix',this)\" onmouseover=\"IQTableData.cache['$prefix'].mousehandler.content.onRowOver('$prefix',this)\">"; //  
					/*
					foreach($row as $index => $cell)
					{
						//if(!empty($this->title[$i]))
							$html.= "<td unselectable=\"on\" class=\"cssIQTableData_content_td".$i.$prefix."\" onclick=\"IQTableData.cache['$prefix'].selectRow(this);\">".htmlspecialchars_decode(decode_special_htmlentinties(solve($this->format[$i],$row,$index)))."</td>";
						//		else $html.= "";	
						$i++;
					}
					*/
					foreach($this->headerwidth as $index => $value)
					{
						$html.= "<td unselectable=\"on\" class=\"cssIQTableData_content_td".$index.$prefix."\" onclick=\"IQTableData.cache['$prefix'].selectRow(this);\">".htmlspecialchars_decode(decode_special_htmlentinties(solve($this->format[$index],$row,$index)))."</td>";
					}
				$html.= "</tr>";	
			$tr_color = array_reverse($tr_color);
			}
			$html.='</tbody></table></div>';
		}	
		if($create_table)return $html;
	}
	function exists($var)
	{
		if(!$var) return false;
		if(isset($var) && !empty($var)) return true; else return false;
	}
}
$core = new corelib;
?>