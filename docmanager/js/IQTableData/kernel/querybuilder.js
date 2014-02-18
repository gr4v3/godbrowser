// JavaScript Document


var querybuilder = new Object();
	querybuilder.cache = new Array();
	querybuilder.obj = function(prefix)
	{
		this.prefix = prefix;
		this.interval = 512;
		this.querystring = new Array('begin');
		this.relativePath = '';
		this.getRelativePath = function(script)
		{
			var scripts = document.getElementsByTagName('SCRIPT');
			if(!scripts) return false;
			var regexp = new RegExp(script,"gi");
			for(var i = 0; i<scripts.length; i++)
			{
				if(String(scripts.item(i).src).match(regexp))
					this.relativePath = scripts.item(i).src.replace(regexp,'');
			}
		}
		this.execute = function(query)
		{
			this.getRelativePath('querybuilder.js');
			this.interval = 512;
			var len = Number(query.length);
			var str = String(query);
			var index = 0;
			if(len > 1024)
			{
				while(index <= len)
				{	  
					this.querystring.push(str.substr(index,this.interval));
					index = (index + this.interval);
					if(index > len) this.interval = 0;
				}
			} else this.querystring.push(query);
			this.querystring.push('end');
			//this.querystring.reverse();
			querybuilder.cache[this.prefix] = this;
			
			while(this.querystring.length > 0)
			{
				querybuilder.ajaxquery(this.relativePath+'qbuilder.php?prefix='+this.prefix+'&str='+this.querystring.shift(),this.prefix);	
			}
		}
	}
	querybuilder.ajaxquery = function(url,prefix)
	{
		var result = function()
		{
			if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
			{
				alert(xmlRequestObj.responseText);
			}
		}
		
		var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
			xmlRequestObj.onreadystatechange = result;
			xmlRequestObj.open("POST", url,false);
			xmlRequestObj.send(null);
	}