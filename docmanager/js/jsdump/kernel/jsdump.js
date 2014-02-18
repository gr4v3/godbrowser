// JavaScript Document

Array.prototype.dump = function(colorarray)
{
	var is_array = function(arr)
	{var type = typeof arr;if(type=='object'&&arr[0]!=undefined) return true; else return false;}
	var str_repeat = function(char,times)
	{
		var str = '';
		while(times>0)
		{
			str+=char;
			times--;
		}
		return str;
	}
	
	this.level = 0;
	if(!colorarray)this.color = Array('#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff');
		else this.color = colorarray;
	var check = function(arr)
	{		
		document.write('<span style="color:'+arr.color[arr.level]+';">'+str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',arr.level)+'level:'+arr.level+'</span><br />');
		for(var i=0;i<arr.length;i++)
		{
			if(is_array(arr[i]))
			{
				document.write('<span style="color:'+arr.color[arr.level]+';">'+str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',arr.level)+'['+i+'] => Array</span><br />');
				arr[i].level = arr.level+1;
				arr[i].color = arr.color;
				check(arr[i]);
			} else document.write('<span style="color:'+arr.color[arr.level]+';">'+str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',arr.level)+'['+i+'] => ['+arr[i]+']</span><br />');
		}
	}
	check(this);
	
}