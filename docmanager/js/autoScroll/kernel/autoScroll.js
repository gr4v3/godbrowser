// JavaScript Document
var autoScroll = new Object();
	autoScroll.cache = new Array();
	autoScroll.obj = function(id)
	{
		this.prefix = id;
		this.execute = function(){};
		this.offsetY = 0;
		this.offsetX = 0;
		this.x = 0;
		this.y = 0;
		this.afterEvent = function(){};
		this.run = function()
		{
			autoScroll.cache[this.prefix] = this;
			var obj = document.getElementById(this.prefix);
			if(!obj) return false;
			var top = Number(obj.offsetTop);	
			var code = 'this.execute = function()';
				code+= '{';
				code+= '	this.offsetY = document.documentElement.scrollTop;';
				code+= '	var obj = document.getElementById("'+this.prefix+'");';
				code+= '	if(!obj) return false;obj.style.top = '+top+' + this.offsetY + "px";';
				code+= '}';
			eval(code);
			window.onscroll = autoScroll.cache[this.prefix].execute;
			
		}
		this.end = function(){}
		this.center = function(offsetX,offsetY)
		{
			var div = document.createElement('DIV');
				document.body.appendChild(div);

				div.style.position = 'absolute';
				div.style.top = '50%';
				div.style.left = '50%';
				div.style.width = '1px';
				div.style.height = '1px';
				div.style.backgroundColor = '#ffffff';
				div.style.fontSize = '1px';
				this.x = (div.offsetLeft + this.offsetX + document.body.scrollLeft);
			if (this.x<0) this.x=0;	
				this.y = (div.offsetTop + this.offsetY + document.body.scrollTop);
			if (this.y<0) this.y=0;
			var obj = document.getElementById(this.prefix);
			if(obj)
			{
				this.x = this.x - (obj.offsetWidth / 2);
				this.y = this.y - (obj.offsetHeight / 2);
				obj.style.position = 'absolute';
			
				obj.style.left = (this.x+(offsetX?offsetX:0)) + 'px';
				obj.style.top = (this.y + this.scrollPosition()+(offsetY?offsetY:0)) + 'px';
			}
			div.parentNode.removeChild(div);
			this.afterEvent(this);
		}
		this.scrollPosition = function()
		{
			if(window.sessionStorage)
				return Number(window.scrollY);
			else return Number(window.document.documentElement.scrollTop);	
		}
	}