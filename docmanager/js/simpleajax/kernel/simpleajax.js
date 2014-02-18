// JavaScript Document

var simpleajax = new Object();
	simpleajax.cache = new Array();
	simpleajax.dbconnection = function()
	{
		this.host = false;
		this.user = false;
		this.pass = false;
		this.db = false;
		this.query = false;
		this.prefix = false;
		this.mode = false;
		this.arguments = false;
		this.html = function()
		{	
			var html = "";
				if(this.host) html+= 'A='+simpleajax.encodeSpecialChars(this.host)+'&';
				if(this.user) html+= 'B='+simpleajax.encodeSpecialChars(this.user)+'&';
				if(this.pass) html+= 'C='+simpleajax.encodeSpecialChars(this.pass)+'&';
				if(this.db) html+= 'D='+simpleajax.encodeSpecialChars(this.db)+'&';
				if(this.query) html+= 'F='+simpleajax.encodeSpecialChars(this.query)+'&';
				if(this.prefix) html+= 'E='+simpleajax.encodeSpecialChars(this.prefix)+'&';
				if(this.mode) html+= 'G='+simpleajax.encodeSpecialChars(this.mode)+'&';
				if(this.arguments) html+= 'I='+simpleajax.encodeSpecialChars(this.arguments)+'&';
			return html;	
		}
	}
	simpleajax.encodeSpecialChars = function(expressao)
	{
		return escape(expressao);
	}
	simpleajax.obj = function(prefix)
	{
		this.prefix = prefix;
		this.relativePath = '';
		this.host = '';
		this.user = '';
		this.pass = '';
		this.db = '';
		this.afterEvent = function(){};
		this.result = new Array();
		this.mode = 'simple'; // mode=sql ou mode=php
		this.core = false;
		this.access = true;
		this.returnXML = false;

		
		this.cancel = function()
		{
			if(this.core) this.core.abort();
		}
		
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
		this.get = function(query)
		{
			this.getRelativePath('simpleajax.js');
			
			this.access = false;
			if(this.mode == 'sql')
			{
				var url = new simpleajax.dbconnection();
					url.prefix = this.prefix;
					url.host = this.host;
					url.user = this.user;
					url.pass = this.pass;
					url.db = this.db;
					url.mode = this.mode;
					url.query = simpleajax.encodeSpecialChars(query);
				this.ajax(this.relativePath+"singlequery.php?"+url.html(),this.prefix);
			} else if(this.mode == 'mysqldump')
			{
				var url = new simpleajax.dbconnection();
					url.prefix = this.prefix;
					url.host = this.host;
					url.user = this.user;
					url.pass = this.pass;
					url.db = this.db;
					url.mode = this.mode;
				this.ajax(url.html());		
			} else if(this.mode == 'customphp')
			{
				var arr = query.split('?');
				this.ajax(arr);		
			
			} else if(this.mode == 'simple')
			{
				this.ajax(query);		
			} else {
				var url = new simpleajax.dbconnection();
					url.mode = this.mode;
					url.arguments = query;
					this.ajax(url.html());
			}
			simpleajax.cache[this.prefix] = this;
		}
		this.ajax = function(url)
		{
			var obj = this;
			var result = function()
			{
				try {
					if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
					{
						obj.result = new Array();
						var type = false;	
						if(obj.mode == 'sql')
						{
							eval(xmlRequestObj.responseText);
							obj.result = result;
						} else {
							if(obj.returnXML)
								obj.result = xmlRequestObj.responseXML;
							else
								obj.result = xmlRequestObj.responseText;
						}
						obj.access = true;
						obj.core = false;
						obj.afterEvent(obj);
						
					}
				} catch(e) {
					obj.cancel();
				}
			}
			
			if(this.mode == 'customphp')
			{
				var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
				xmlRequestObj.onreadystatechange = result;
				xmlRequestObj.open("POST",url[0], true);
				xmlRequestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlRequestObj.setRequestHeader('Cache-Control','no-cache, must-revalidate');
					
				xmlRequestObj.setRequestHeader('Accept-Charset','ISO-8859-1,utf-8;q=0.7,*;q=0.7');
				xmlRequestObj.send(url[1]);
			} else if(this.mode == 'simple')
			{
				var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
				xmlRequestObj.onreadystatechange = result;
				xmlRequestObj.open("GET",url, true);
				xmlRequestObj.setRequestHeader('Cache-Control','no-cache, must-revalidate');
				//xmlRequestObj.setRequestHeader('Connection','close');
				xmlRequestObj.setRequestHeader('Expires','Wed, 09 Aug 1970 08:21:57 GMT');
				
				xmlRequestObj.send(null);
			}  else {
				var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
				xmlRequestObj.onreadystatechange = result;
				xmlRequestObj.open("POST",this.relativePath+'singlequery.php', true);
				xmlRequestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlRequestObj.send(url);
			}
			this.core = xmlRequestObj;
		}
		
	}


