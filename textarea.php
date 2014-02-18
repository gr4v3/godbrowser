<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<script type="text/javascript" src="docmanager/js/mootools.js"></script>
</head>

<body>
<form name="content" action="textarea.php" method="post">
	<input type="texto" name="texto" value="asdas"/>
    <select name="select">
    	<option value="0">00000</option>
        <option value="1">11111</option>
        <option value="2">22222</option>
        <option value="3">33333</option>
    </select>
    <input type="radio" name="radiobotao" value="1" />
    <input type="radio" name="radiobotao" value="2" />
    
    <input type="checkbox" name="checkbotao1" value="1" />
    <input type="checkbox" name="checkbotao2" value="2" />
    
    <input type="button" name="botao_bla" value="bla" onclick="alert(q.query());" />
</form>
<div id="asda" style="top:100px;left:400px;width:100px;height:100px;position:absolute;background-color:#CCCCCC;"></div>


<script type="text/javascript">
window.asdas = $('asda').makeResizable();

var jsForm = {
	cache:[],
	obj:function(prefix)
	{
		this.prefix = prefix;
		this.form = false;
		this.elements = {};
		
		this.create = function()
		{
			jsForm.cache[this.prefix] = this;
		}
		this.initialize = function()
		{
			if(!this.form) return false;
			var elements = this.form.elements;
			var obj = false;
			var i = 0;
			do
			{
				if(obj) 
				{
					if(obj.type == 'checkbox' && obj.checked) this.elements[obj.name] = obj.value;
					else if(obj.type == 'checkbox' && !obj.checked) this.elements[obj.name] = '';
					else if(obj.type == 'radio' && obj.checked) this.elements[obj.name] = obj.value;
					else if(obj.type != 'radio' && obj.type != 'checkbox') this.elements[obj.name] = obj.value;
				}
				obj = elements.item(i);
				i++;
			} while(obj);
		}
		this.query = function()
		{
			this.initialize();
			return Object.toQueryString(this.elements);
		}	
	}
}

var q = new jsForm.obj('asd');
	q.form = document.forms.content;

</script>

</body>
</html>
