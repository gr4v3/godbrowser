// JavaScript Document

var jsupload = new Object();
	jsupload.cache = new Array();
	jsupload.style = function()
	{
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
		this.position = false;
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
		this.decodeCSS = function(obj,element)
		{
			var s = '';
			if(obj.style.backgroundImage) element.style.backgroundImage = 'url('+obj.style.backgroundImage+')';
			if(obj.style.backgroundRepeat) element.style.backgroundRepeat = obj.style.backgroundRepeat;
			if(obj.style.backgroundPosition) element.style.backgroundPosition = obj.style.backgroundPosition;
			if(obj.style.usefloat) element.style.usefloat = obj.style.usefloat;
			if(obj.style.listStyle) element.style.listStyle = obj.style.listStyle;
			if(obj.style.borderTop) element.style.borderTop = obj.style.borderTop;
			if(obj.style.borderBottom) element.style.borderBottom = obj.style.borderBottom;
			if(obj.style.borderLeft) element.style.borderLeft = obj.style.borderLeft;
			if(obj.style.borderRight) element.style.borderRight = obj.style.borderRight;
			if(obj.style.padding) element.style.padding = obj.style.padding;
			if(obj.style.paddingTop) element.style.paddingTop = obj.style.paddingTop+obj.style.scaleUnit;
			if(obj.style.paddingBottom) element.style.paddingBottom = obj.style.paddingBottom+obj.style.scaleUnit;
			if(obj.style.paddingLeft) element.style.paddingLeft = obj.style.paddingLeft+obj.style.scaleUnit;
			if(obj.style.paddingRight) element.style.paddingRight = obj.style.paddingRight+obj.style.scaleUnit;
			if(obj.style.margin) element.style.margin = obj.style.margin;
			if(obj.style.marginTop) element.style.marginTop = obj.style.marginTop+obj.style.scaleUnit;
			if(obj.style.marginBottom) element.style.marginBottom = obj.style.marginBottom+obj.style.scaleUnit;
			if(obj.style.marginLeft) element.style.marginLeft = obj.style.marginLeft+obj.style.scaleUnit;
			if(obj.style.marginRight) element.style.marginRight = obj.style.marginRight+obj.style.scaleUnit;
			if(obj.style.display) element.style.display = obj.style.display;
			if(obj.style.overflow) element.style.overflow = obj.style.overflow;
			if(obj.style.zIndex) element.style.zIndex = obj.style.zIndex;
			if(obj.style.font) element.style.font = obj.style.font;
			if(obj.style.border) element.style.border = obj.style.border;
			if(obj.style.backgroundColor) element.style.backgroundColor = obj.style.backgroundColor;
			if(obj.style.textAlign) element.style.textAlign = obj.style.textAlign;
			if(obj.style.fontSize) element.style.fontSize = obj.style.fontSize+obj.style.scaleUnit;
			if(obj.style.width) element.style.width = obj.style.width+obj.style.scaleUnit;
			if(obj.style.height) element.style.height = obj.style.height+obj.style.scaleUnit;
			if(obj.style.position) element.style.position = obj.style.position;
			if(obj.style.textDecoration) element.style.textDecoration = obj.style.textDecoration;
			if(obj.style.color) element.style.color = obj.style.color;
			if(obj.style.top) element.style.top = obj.style.top+obj.style.scaleUnit;
			if(obj.style.left) element.style.left = obj.style.left+obj.style.scaleUnit;
			if(obj.style.right) element.style.right = obj.style.right+obj.style.scaleUnit;
			if(obj.style.bottom) element.style.bottom = obj.style.bottom+obj.style.scaleUnit;
			if(obj.style.cursor) element.style.cursor = obj.style.cursor;
		}
	}
	jsupload.getRelativePath = function(string)
	{
		var relativePath = '';
		var scripts = document.getElementsByTagName('script');
		if(!scripts)return false;
			
			for(var i=0;i<scripts.length;i++)
			{
				var myString = new String(scripts.item(i).src)
				var rExp = string;
				result = myString.search(rExp)
				if(result!=-1) relativePath=scripts.item(i).src.slice(0,result);
			}
		return relativePath;
	}
	jsupload.obj = function(prefix)
	{
		this.style = new jsupload.style;
		this.className = '';
		this.prefix = prefix;
		this.relativePath = '';
		this.onUpload = function(){};
		this.onDelete = function(){};
		this.name = '';
		this.path = false;
		this.deleteAccess = true;
		
		this.onclick= false;
		this.onmouseover = false;
		this.onmousedown= false;
		this.onmouseup= false;
		this.onmouseout= false;
		
		this.returnHTML = false;
		
		this.create = function()
		{
			var buttons_html = '';
			var buttoncode = false;
			if(this.onclick)
			{
				buttoncode = new jsupload.buttons;
				buttoncode.onclick= this.onclick;
				buttons_html+= buttoncode.html(this);
			}
			if(this.onmouseover)
			{
				buttoncode = new jsupload.buttons;
				buttoncode.onmouseover = this.onmouseover;
				buttons_html+= buttoncode.html(this);
			}
			if(this.onmousedown)
			{
				buttoncode = new jsupload.buttons;
				buttoncode.onmousedown= this.onmousedown;
				buttons_html+= buttoncode.html(this);
			}
			if(this.onmouseup)
			{
				buttoncode = new jsupload.buttons;
				buttoncode.onmouseup= this.onmouseup;
				buttons_html+= buttoncode.html(this);
			}
			if(this.onmouseout)
			{
				buttoncode = new jsupload.buttons;
				buttoncode.onmouseout= this.onmouseout;
				buttons_html+= buttoncode.html(this);
			}
			var height = 0;
			if(jsupload.browser() == 'IE') height = 21;
			
			
			this.relativePath = jsupload.getRelativePath('jsupload.js');
		
			var s = '<div id="'+this.prefix+'" style="'+this.style.html()+';margin:0;padding:0;'+jsupload.css('height:'+height+'px;overflow:hidden;','','')+'">';
					s+='<iframe src="'+this.relativePath+'blank.php" id="'+this.prefix+'jsuploadframeid" name="'+this.prefix+'jsuploadframe" style="display:none;"></iframe>';
					s+= '<form style="width:1px;" id="'+this.prefix+'jsupload" enctype="multipart/form-data" method="POST" target="'+this.prefix+'jsuploadframe" action="'+this.relativePath+'upload.php">';
						s+= '<input id="'+this.prefix+'inputfile" name="filepath" class="'+this.className+'" type="file" onChange="jsupload.submitForm(\''+this.prefix+'\')" style="" '+buttons_html+' />';
						s+= '<input type="hidden" name="MAX_FILE_SIZE" value="5000000" />';
						s+= '<input type="hidden" name="prefix" value="'+this.prefix+'" />';
						if(this.path) s+= '<input type="hidden" name="path" value="'+this.path+'" />';
					s+= '</form>';
					s+= '<span id="'+this.prefix+'jsuploadspan" style="display:none;"></span>';
					if(this.deleteAccess) s+= '<img id="'+this.prefix+'jsuploadimg" style="display:none;" src="'+this.relativePath+'delete.gif" onclick="jsupload.deletefile(\''+this.prefix+'\')" />';
				s+= '</div>';	
			
			jsupload.cache[this.prefix] = this;
			
			if(!this.returnHTML) document.write(s);
				else return s;
		}
		this.uploadSuccess = function(name,path)
		{
			var span = document.getElementById(this.prefix+'jsuploadspan');
			var form = document.getElementById(this.prefix+'jsupload');
				form.style.display = 'none';	
			
			span.innerHTML = name;
			span.style.display = 'inline';
			if(this.deleteAccess)
			{
				var img = document.getElementById(this.prefix+'jsuploadimg');
				img.src = this.relativePath+'delete.gif';
				img.style.cursor = 'pointer';
				img.style.display = 'inline';
			}
			this.path = path;
			this.name = name;
			jsupload.cache[this.prefix] = this;
			this.onUpload(this);
		}
		this.deleteSuccess = function()
		{
			var div = document.getElementById(this.prefix);
			var span = document.getElementById(this.prefix+'jsuploadspan');
			var img = document.getElementById(this.prefix+'jsuploadimg');
			var form = document.getElementById(this.prefix+'jsupload');
			var file = document.getElementById(this.prefix+'inputfile');
			
			
			var tempdiv = document.createElement('DIV');
				document.body.appendChild(tempdiv);
			tempdiv.innerHTML = '<input id="'+this.prefix+'inputfile" name="filepath" class="'+this.className+'" type="file" onChange="jsupload.submitForm(\''+this.prefix+'\')" style="'+this.style.html()+'" />';	
			form.replaceChild(tempdiv.firstChild,file);
			
			img.style.display = 'none';
			span.style.display = 'none';
			form.style.display = 'inline';
			
			this.onDelete(this);
			this.refresh();
		}
		this.refresh = function()
		{
			var buttons_html = '';
			var buttoncode = false;
			var jsuploadobj = document.getElementById(this.prefix+'inputfile');
			this.style.decodeCSS(this,jsuploadobj);
			if(this.onclick) jsuploadobj.onclick = this.onclick;
			if(this.onmouseover) jsuploadobj.onmouseover = this.onmouseover;
			if(this.onmousedown) jsuploadobj.onmousedown = this.onmousedown;
			if(this.onmouseup) jsuploadobj.onmouseup = this.onmouseup;
			if(this.onmouseout) jsuploadobj.onmouseout = this.onmouseout;
		}
		
	}
	jsupload.css = function(IEstring,MOZstring,OPERAstring)
	{
		if(jsupload.browser() == 'IE') return IEstring;
		if(jsupload.browser() == 'MOZ') return MOZstring;
		if(jsupload.browser() == 'OPERA') return OPERAstring;
	}
	jsupload.browser = function() 
	{
		var browser = new String(navigator.appName);
		var version = new String(navigator.appVersion);
		if(browser.match('Microsoft Internet Explorer')) return String('IE');
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	}
	jsupload.submitForm = function(prefix)
	{
		var form = document.getElementById(prefix+'jsupload');
			form.submit();
	}
	jsupload.deletefile = function(prefix)
	{
		var obj = jsupload.cache[prefix];
		var frame = document.getElementById(prefix+'jsuploadframeid');
			frame.src = obj.relativePath+'delete.php?prefix='+prefix+'&path='+obj.path;	
	}
	jsupload.buttons = function(prefix,name)
	{
		this.name = name;
		this.enable = false;
		this.type = 'button';
		this.prefix = prefix;
		this.className = '';
		this.id = prefix+this.name+'_textarea_buttons';
		this.style = new jsupload.style;
		this.onChange = false;
		this.onclick= false;
		this.onmouseover = false;
		this.onmousedown= false;
		this.onmouseup= false;
		this.onmouseout= false;
		this.status = null;
		this.html = function(obj)
		{
			var s = '';
			this.status = this;
			
			var regexp = /"|'/g;
			if(this.onclick) s+= 'onclick="javascript:jsupload.tempfunc = '+this.onclick.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();return true;" ';
			if(this.onmouseover) s+= 'onmouseover="javascript:jsupload.tempfunc = '+this.onmouseover.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();" ';
			if(this.onmousedown) s+= 'onmousedown="javascript:jsupload.tempfunc = '+this.onmousedown.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();" ';
			if(this.onmouseup) s+= 'onmouseup="javascript:jsupload.tempfunc = '+this.onmouseup.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();" ';
			if(this.onmouseout) s+= 'onmouseout="javascript:jsupload.tempfunc = '+this.onmouseout.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();" ';
			if(this.onChange) s+= 'onChange="javascript:jsupload.tempfunc = '+this.onChange.toString().replace(regexp,'"')+';jsupload.tempfunc(jsupload.cache[\''+obj.prefix+'\']);jsupload.cache[\''+obj.prefix+'\'].refresh();" ';
			return s;
		}
	}
	
	