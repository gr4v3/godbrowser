// JavaScript Document


var checkbox = new Object();
	checkbox.cache = new Array();
	checkbox.style = function()
	{
		this.cssText = false;
		this.border = false;
		this.borderTop = false;
		this.borderBottom = false;
		this.borderLeft = false;
		this.borderRight = false;
		this.backgroundColor = false;
		this.backgroundImage = false;
		this.backgroundRepeat = false;
		this.backgroundPosition = false;
		this.textAlign = false;
		this.fontSize = false;
		this.font = false;
		this.width = false;
		this.height = false;
		this.position = 'static';
		this.textDecoration = false;
		this.color = false;
		this.top = false;
		this.left = false;
		this.right = false;
		this.bottom = false;
		this.cursor = false;
		this.zIndex = false;
		this.display = false;
		this.overflow = false;
		this.padding = false;
		this.paddingTop = false;
		this.paddingBottom = false;
		this.paddingLeft = false;
		this.paddingRight = false;
		this.margin = 0;
		this.marginTop = false;
		this.marginBottom = false;
		this.marginLeft = false;
		this.marginRight = false;
		this.listStyle = false;
		this.usefloat = false;
		this.scaleUnit = 'px';
		this.html = function()
		{
			var s = '';
			if(this.cssText) s+= this.cssText;
			if(this.backgroundImage) s+='background-image:url('+this.backgroundImage+');';
			if(this.backgroundRepeat) s+='background-repeat:'+this.backgroundRepeat+';';
			if(this.backgroundPosition) s+='background-position:'+this.backgroundPosition+';';
			if(this.usefloat) s+='float:'+this.usefloat+';';
			if(this.listStyle) s+='list-style:'+this.listStyle+';';
			if(this.borderTop) s+='border-top:'+this.borderTop+';';
			if(this.borderBottom) s+='border-bottom:'+this.borderBottom+';';
			if(this.borderLeft) s+='border-left:'+this.borderLeft+';';
			if(this.borderRight) s+='border-right:'+this.borderRight+';';
			if(this.padding) s+='padding:'+this.padding+';';
			if(this.paddingTop) s+='padding-top:'+this.paddingTop+this.scaleUnit+';';
			if(this.paddingBottom) s+='padding-bottom:'+this.paddingBottom+this.scaleUnit+';';
			if(this.paddingLeft) s+='padding-left:'+this.paddingLeft+this.scaleUnit+';';
			if(this.paddingRight) s+='padding-right:'+this.paddingRight+this.scaleUnit+';';
			if(this.margin) s+='margin:'+this.margin+';';
			if(this.marginTop) s+='margin-top:'+this.marginTop+this.scaleUnit+';';
			if(this.marginBottom) s+='margin-bottom:'+this.marginBottom+this.scaleUnit+';';
			if(this.marginLeft) s+='margin-left:'+this.marginLeft+this.scaleUnit+';';
			if(this.marginRight) s+='margin-right:'+this.marginRight+this.scaleUnit+';';
			if(this.display) s+='display:'+this.display+';';
			if(this.overflow) s+='overflow:'+this.overflow+';';
			if(this.zIndex) s+='z-index:'+this.zIndex+';';
			if(this.font) s+='font-family:'+this.font+';';
			if(this.border) s+='border:'+this.border+';';
			if(this.backgroundColor) s+='background-color:'+this.backgroundColor+';';
			if(this.textAlign) s+='text-align:'+this.textAlign+';';
			if(this.fontSize) s+='font-size:'+this.fontSize+this.scaleUnit+';';
			if(this.width) s+='width:'+this.width+this.scaleUnit+';';
			if(this.height) s+='height:'+this.height+this.scaleUnit+';';
			if(this.position) s+='position:'+this.position+';';
			if(this.textDecoration) s+='text-decoration:'+this.textDecoration+';';
			if(this.color) s+='color:'+this.color+';';
			if(this.top) s+='top:'+this.top+this.scaleUnit+';';
			if(this.left) s+='left:'+this.left+this.scaleUnit+';';
			if(this.right) s+='right:'+this.right+this.scaleUnit+';';
			if(this.bottom) s+='bottom:'+this.bottom+this.scaleUnit+';';
			if(this.cursor) s+='cursor:'+this.cursor+';';
			return s;
		}
	}
	checkbox.obj = function(prefix)
	{
		this.state = false;
		this.prefix = prefix;
		this.initialState = 0;
		this.relativePath = '';
		
		this.method = new Object();
		this.method.innerHTML = false;
		this.method.ADDinnerHTML = false;
		this.method.createElement = false;
		this.method.documentWrite = true;
		this.method.targetHTML = false;
		
		this.method.check = function()
		{
			if(this.innerHTML)
			{
				this.createElement = false;
				this.documentWrite = false;
				this.ADDinnerHTML = false;
			} else
			if(this.ADDinnerHTML)
			{
				this.innerHTML = false;
				this.documentWrite = false;
				this.createElement = false;
			} else
			if(this.createElement)
			{
				this.innerHTML = false;
				this.documentWrite = false;
				this.ADDinnerHTML = false;
			} else
			if(this.documentWrite)
			{
				this.innerHTML = false;
				this.createElement = false;
				this.ADDinnerHTML = false;
			}
		}
		this.method.writeHTML = function(html)
		{
			if(this.innerHTML)
			{
				var target = document.body;
				if(this.targetHTML)
				{
					var obj = document.getElementById(this.targetHTML);
					if(obj) target = obj;
				}
				target.innerHTML = html;
			} else
			if(this.ADDinnerHTML)
			{
				var target = document.body;
				if(this.targetHTML)
				{
					var obj = document.getElementById(this.targetHTML);
					if(obj) target = obj;
				}
				target.innerHTML+=html;
			} else
			if(this.createElement)
			{
				var div = document.createElement(div);
					document.body.appendChild(div);
					div.innerHTML = html;
			} else
			if(this.documentWrite)
			{
				document.write(html);
			}
		}
		
		this.checkbox_loop = false;
		this.onClick = function(){};
		this.style = new checkbox.style;
		this.style.border = '1px solid #7F9DB9';
		this.style.width = 11;
		this.style.height = 11;
		this.style.fontSize = 10;
		this.style.fontFamily = 'verdana';
		
		this.threestates = true;
		
		
		this.unchecked = new checkbox.style();
		this.unchecked.backgroundColor = '#ffffff';
		this.unchecked.border = '1px solid #7F9DB9';
		this.unchecked.width = this.style.width;
		this.unchecked.height = this.style.height;
		this.unchecked.fontSize = this.style.fontSize;
		this.unchecked.fontFamily = 'verdana';
		
		this.checked = new checkbox.style();
		this.checked.backgroundColor = '#ffffff';
		this.checked.border = '1px solid #7F9DB9';
		this.checked.width = this.style.width;
		this.checked.height = this.style.height;
		this.checked.fontSize = this.style.fontSize;
		this.checked.fontFamily = 'verdana';
		this.checked.backgroundRepeat = 'no-repeat';
		this.checked.backgroundPosition = '50% 50%';
		this.checked.backgroundImage = '|path|certo.gif';
		
		this.nan = new checkbox.style();
		this.nan.backgroundColor = '#c9c9c9';
		this.nan.border = '1px solid #7F9DB9';
		this.nan.width = this.style.width;
		this.nan.height = this.style.height;
		this.nan.fontSize = this.style.fontSize;
		this.nan.fontFamily = 'verdana';
		this.nan.backgroundRepeat = 'no-repeat';
		this.nan.backgroundPosition = '50% 50%';
		this.nan.backgroundImage = '|path|certo_cyan.gif';
		
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
		this.create = function(state)
		{
			if (this.relativePath=='')
				this.getRelativePath('checkBox.js');
			if(state) this.initialState = state;
			this.method.check();
			
			
			this.method.writeHTML('<div id="checkbox_'+this.prefix+'"  onMouseUp="checkbox.cache[\''+this.prefix+'\'].checkState(this)" style="'+this.style.html()+'"></div>')
			var div = document.getElementById('checkbox_'+this.prefix);
			var browser = checkbox.browser();
			if(this.initialState!=null)
			{
				if(this.initialState==0)
				{
					div.style.cssText = this.unchecked.html().replace('|path|',this.relativePath);
					this.state='unchecked';
					this.checkbox_loop = 1;
				}
				if(this.initialState==1)
				{	
					div.style.cssText = this.checked.html().replace('|path|',this.relativePath);
					this.state='checked';
					if(this.threestates)this.checkbox_loop = 2;
					 else this.checkbox_loop = 0;
				}
				if(this.initialState==2)
				{
					div.style.cssText = this.nan.html().replace('|path|',this.relativePath);
					this.state='NaN';
					this.checkbox_loop = 0;
				}
			}
			checkbox.cache[this.prefix] = this;
		}
		
		this.update = function(i)
		{
			this.checkbox_loop = i;
			this.checkState(document.getElementById('checkbox_'+this.prefix));
			checkbox.cache[this.prefix] = this;
		}
		
		this.checkState=function(div)
		{ 
			var prefix=div.id.split('_')[1];
			var browser = checkbox.browser();

			if(this.checkbox_loop == 0)
			{
				div.style.cssText = this.unchecked.html().replace('|path|',this.relativePath);
				this.state='unchecked';
			}
			if(this.checkbox_loop == 1)
			{
				div.style.cssText = this.checked.html().replace('|path|',this.relativePath);
				this.state='checked';
				if(!this.threestates) this.checkbox_loop =-1;
			}
			if(this.checkbox_loop == 2)
			{
				div.style.cssText = this.nan.html().replace('|path|',this.relativePath);
				this.state='NaN';
				this.checkbox_loop =-1;
			}
			this.checkbox_loop++
			eval("checkbox.cache['"+this.prefix+"'].onClick(checkbox.cache['"+this.prefix+"'])");
		}
	}
	
	checkbox.browser = function() 
	{
		var browser = new String(navigator.appName);
		if(browser.match('Microsoft Internet Explorer')) return String('IE');
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	}
	
	
