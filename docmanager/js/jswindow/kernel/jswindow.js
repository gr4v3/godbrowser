// JavaScript Document

var ERASE = function(arr,index)
{
	var result = new Array();
	for(var j=0;j<arr.length;j++)
	{if(j != index) result.push(arr[j]);}
	return result;
}


var jswindow = new Object();
	jswindow.cache = new Array();
	jswindow.objId = new Object();
	jswindow.objId.prefix = '';
	jswindow.objId.active = false;
	jswindow.objId.x = null;
	jswindow.objId.y = null;
	jswindow.tempfunc = null;
	jswindow.prefix_array = new Array();
	
	// global jswindow variables
	
	jswindow.useTransparency = false;
	
	jswindow.tile = false;
	jswindow.cascade = true;
	jswindow.position = {
		top:false,
		left:false,
		offsetX:10,
		offsetY:10
	}

	jswindow.style = function()
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
			if(this.cssText) s+=this.cssText;
			return s;
		}
	}
	jswindow.state = function(obj)
	{
		this.begin = new Object();
		this.begin.minimized = false;
		this.begin.maximized = false;
		this.begin.x = false;
		this.begin.y = false;
		this.prefix = obj.prefix;
		this.obj = obj;
		this.tray = new jswindow.trayEngine(this);
	}
	jswindow.trayEngine = function(method)
	{
		this.jswindow = null;
		this.method = method;
		this.x = false;
		this.y = false;
		this.width = 0;
		this.height = 0;
		this.left = 0;
		this.top = 0;
		this.add = true;
		this.step = 0;
		this.execute = function()
		{
			if(this.method.begin.minimized)
			{
				var jswindowobj = document.getElementById(this.method.prefix+'jswindowdiv');
				
				
				//only for mozilla
				if(window.addEventListener && !jswindowobj.clean)
				{
					var i = 0,erase = new Array();
					
					do {
						obj = jswindowobj.childNodes.item(i);
						if(obj && obj.nodeName == '#text') erase.push(obj);
						i++;
					} while(obj);
					do {
						obj = jswindowobj.childNodes.item(0).childNodes.item(i);
						if(obj && obj.nodeName == '#text') erase.push(obj);
						i++;
					} while(obj);
					do {
						obj = jswindowobj.childNodes.item(2).childNodes.item(i);
						if(obj && obj.nodeName == '#text') erase.push(obj);
						i++;
					} while(obj);
					
					while(erase.length > 0)
					{
						var obj = erase.pop();
						obj.parentNode.removeChild(obj);
					}
					jswindowobj.clean = true;
				} 
				
				jswindowobj.childNodes.item(1).style.display = 'none';
				jswindowobj.childNodes.item(2).style.display = 'none';
				
				if(this.method.obj.useHomeTray) trayEngine.minimize(jswindowobj);
				this.method.obj.onMinimize(this.method.obj);
			}
			if(this.method.begin.maximized)
			{
				var jswindowobj = document.getElementById(this.method.prefix+'jswindowdiv');
				
				jswindowobj.childNodes.item(1).style.display = 'block';
				jswindowobj.childNodes.item(2).style.display = 'block';
				
				if(this.method.obj.useHomeTray) trayEngine.maximize(jswindowobj);
				this.method.obj.onMaximize(this.method.obj);
			}
		}
	}
	jswindow.buttons = function(prefix)
	{
		this.enable = false;
		this.type = 'button';
		this.prefix = prefix;
		this.className = '';
		this.title = '';
		this.id = prefix+this.name+'_jswindow_buttons';
		this.style = new jswindow.style;
		this.onClick = false;
		this.onMouseOver = false;
		this.onMouseDown = false;
		this.onMouseUp = false;
		this.onMouseOut = false;
		this.status = null;
		this.html = function(obj)
		{
			var s = '';
			this.status = this;
			var regexp = /"|'/g;
			//alert(String(this.onClick).replace('"','\'').replace('"','\''));
			this.style.margin = '1px';
			
			if(this.onClick) s+= 'onClick="javascript:jswindow.tempfunc = '+this.onClick.toString().replace(regexp,'&quot;')+';jswindow.tempfunc(jswindow.cache[\''+this.prefix+'\']);" ';
			if(this.onMouseOver) s+= 'onMouseOver="javascript:jswindow.tempfunc = '+this.onMouseOver.toString().replace(regexp,'&quot;')+';jswindow.tempfunc(jswindow.cache[\''+this.prefix+'\']);" ';
			if(this.onMouseDown) s+= 'onMouseDown="javascript:jswindow.tempfunc = '+this.onMouseDown.toString().replace(regexp,'&quot;')+';jswindow.tempfunc(jswindow.cache[\''+this.prefix+'\']);" ';
			if(this.onMouseUp) s+= 'onMouseUp="javascript:jswindow.tempfunc = '+this.onMouseUp.toString().replace(regexp,'&quot;')+';jswindow.tempfunc(jswindow.cache[\''+this.prefix+'\']);" ';
			if(this.onMouseOut) s+= 'onMouseOut="javascript:jswindow.tempfunc = '+this.onMouseOut.toString().replace(regexp,'&quot;')+';jswindow.tempfunc(jswindow.cache[\''+this.prefix+'\']);" ';
			
			return '<input '+s+' class="'+this.className+'" style="'+this.style.html()+'" type="'+this.type+'" id="'+prefix+this.name+'_jswindow_buttons" name="'+prefix+this.name+'_jswindow_buttons" value="'+this.title+'" />';
		}
	}
	jswindow.getJswindowObjs = function(prefix)
	{
		var arr = jswindow.prefix_array;
		var arr_obj = new Array();
		var obj = null;
		for(var i = 0; i < arr.length; i++)
		{
			obj = document.getElementById(arr[i]+'jswindowdiv');
			if(obj && arr[i] != prefix)arr_obj.push(obj);	
		}
		obj = document.getElementById(prefix+'jswindowdiv');
		var result = new Object();
			result.brothers = arr_obj;
			result.self = obj;
		return result;
	}
	jswindow.obj = function(prefix)
	{
		this.id = prefix+'jswindowdiv';
		this.prefix = prefix;
		this.relativePath = '';
		this.style = new jswindow.style();
		this.style.width = false;
		this.style.height = false;
		this.style.top = 0;
		this.style.left = 0;
		this.style.zIndex = 100;
		this.style.position = 'absolute';
		this.style.backgroundColor = false;
		this.style.border = '1px solid #000000';
		
		this.html = null;
		this.offsetTop = false;
		this.offsetLeft = false;
		this.windowHtmlContent = '';
		this.InitialHTML = '';
		this.state = new jswindow.state(this);
		this.state.begin.maximized = true;
		this.exists = false;
		this.useHomeTray = true;
		this.Str2Obj = '{OBJ}';
		
		this.onStartMove = function(){};
		this.onEndMove = function(){};
		this.onCreate = function(){};
		this.onClose = false;
		this.onStartContent = function(){};
		this.onEndContent = function(){};
		this.onMinimize = function(){};
		this.onMaximize = function(){};
		this.onContentUpdate = function(){};
		this.onHide = function(){};
		this.onShow = function(o){o.resize();};
		this.onInsertObj = function(){};
		
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
				target.innerHTML+= html;
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
		this.method.writeCSS = function(css)
		{
			
			if(this.innerHTML)
				document.body.innerHTML+= css;
			else if(this.documentWrite) document.write(css);	
			
		}
		
		
		this.toolbar = new Object();
		this.toolbar.className = false;
		this.toolbar.setup = new Object();
		this.toolbar.setup.className = false;
		this.toolbar.setup.useGradient = new Object();
		this.toolbar.setup.useGradient.vertical = false;
		this.toolbar.setup.useGradient.horizontal = false;
		
		this.toolbar.style = new jswindow.style;
		
		
		this.toolbar.setup.title = new Object();
		this.toolbar.setup.title.text = 'jswindow';
		this.toolbar.setup.title.style = new jswindow.style;
		this.toolbar.setup.title.className = false;
		
		this.toolbar.style.backgroundColor = '#CFD2DD';
		this.toolbar.style.align = 'left';		
		this.toolbar.style.color = '#000000';
	
			
		this.toolbar.setup.MinButton = new Object();
		this.toolbar.setup.MinButton.enable = true;
		this.toolbar.setup.MinButton.style = new jswindow.style;
		
		this.toolbar.setup.MaxButton = new Object();
		this.toolbar.setup.MaxButton.enable = true;
		this.toolbar.setup.MaxButton.style = new jswindow.style;
		
		this.toolbar.setup.CloseButton = new Object();
		this.toolbar.setup.CloseButton.enable = true;
		this.toolbar.setup.CloseButton.style = new jswindow.style;
		

		this.content = new Object();
		this.content.parent = this;
		this.content.style = new jswindow.style;
		this.content.style.backgroundColor = '#ffffff';
		this.content.className = false;
		this.content.domobj = false;
		
		this.content.get = function()
		{
			var id = this.parent.prefix+'_content';
			return document.getElementById(id);
		}
		
		
		this.ControlButtons = new Object();
		this.ControlButtons.style = new jswindow.style;
		this.ControlButtons.style.backgroundColor = '#ffffff';
		
		this.ControlButtons.ok = new jswindow.buttons(this.prefix);
		this.ControlButtons.ok.title = 'ok';
		this.ControlButtons.ok.style.width = 50;
		this.ControlButtons.ok.enable = true;
		
		this.ControlButtons.cancel = new jswindow.buttons(this.prefix);
		this.ControlButtons.cancel.title = 'cancel';
		this.ControlButtons.cancel.style.width = 50;
		

		this.ControlButtons.apply = new jswindow.buttons(this.prefix);
		this.ControlButtons.apply.title = 'apply';
		this.ControlButtons.apply.style.width = 50;
		
		
		this.ControlButtons.deny = new jswindow.buttons(this.prefix);
		this.ControlButtons.deny.title = 'deny';
		this.ControlButtons.deny.style.width = 50;
		this.ControlButtons.className = false;
		
		
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
		this.positions = function()
		{
			if(jswindow.cascade) jswindow.tile = false;
				else if(jswindow.tile) jswindow.cascade = false;
				
			if(jswindow.cascade)
			{
				if(jswindow.position.top)
				{
					this.style.top = jswindow.position.top + jswindow.position.offsetY;
					this.style.left = jswindow.position.left + jswindow.position.offsetX;
				}
				jswindow.position.top = this.style.top;
				jswindow.position.left = this.style.left;
			}
		}
		this.create = function(parent)
		{	
			if(this.relativePath == '') this.getRelativePath('jswindow.js');
			jswindow.cache[this.prefix] = this;
			this.method.check();
			this.positions();

			if(window.addEventListener){ 
				document.addEventListener('mousemove',jswindow.mousedetectionlib.getMouseXY, false);
			} else { // IE
				document.attachEvent('onmousemove',jswindow.mousedetectionlib.getMouseXY);
			}
			
			var div = document.getElementById(this.prefix+'jswindowdiv');
			if(!div)
			{
				var html = '<div UNSELECTABLE="on" id="'+this.prefix+'jswindowdiv" style="position:absolute;border:0;margin:0;padding:0;'+this.style.html()+'" class="'+this.className+'">';
						
						html+= this.createToolbar();
						html+= '<div UNSELECTABLE="on" style="padding:0px;margin:0px;'+this.content.style.html()+'"></div>';
						html+= this.createControlButtons();
						
					html+= '</div>';
				this.method.writeHTML(html);
			} else {
				var html = '<div UNSELECTABLE="on" id="'+this.prefix+'jswindowdiv" style="position:absolute;border:0;margin:0;padding:0;'+this.style.html()+'" class="'+this.className+'">';
						
						html+= this.createToolbar();
						html+= '<div UNSELECTABLE="on" style="padding:0px;margin:0px;'+this.content.style.html()+'"></div>';
						html+= this.createControlButtons();
						
					html+= '</div>';
				div.parentNode.removeChild(div);
				document.body.innerHTML+= html;
			}
			
			jswindow.cache[this.prefix] = this;
			jswindow.prefix_array.push(this.prefix);
			this.exists = true;
			
			this.onCreate(this);
		}
		this.createObj = function()
		{
			jswindow.cache[this.prefix] = this;
			jswindow.prefix_array.push(this.prefix);
			this.exists = true;
			
			
			
			if(window.addEventListener){ 
				document.addEventListener('mousemove',jswindow.mousedetectionlib.getMouseXY, false);
			} else { // IE
				document.attachEvent('onmousemove',jswindow.mousedetectionlib.getMouseXY);
			}
			this.onCreate(this);
		}
		this.createToolbar = function()
		{							
			var html = '<div UNSELECTABLE="on" class="'+this.toolbar.className+'" style="height:18px;'+this.toolbar.style.html()+'" onmouseup="jswindow.mouseup(\''+this.prefix+'\')" onmousedown="jswindow.mousedown(\''+this.prefix+'\')">';
				html+= '<div align="left" id="'+this.prefix+'jswindowtitle" UNSELECTABLE="on" class="'+this.toolbar.setup.title.className+'" style="float:left;font-size:15px;">'+this.toolbar.setup.title.text+'</div>';
				//html+= '<div style="float:left;background-color:#ff0000;" align="right">';
			if(this.toolbar.setup.CloseButton.enable)
			{
				var close_standby = 'onMouseOut = "this.src=\''+this.relativePath+'/img/control/close.gif\'"';
				var close_over = 'onMouseOver = "this.src=\''+this.relativePath+'/img/control/close_over.gif\'"';
				html+= '<img onclick="jswindow.cache.'+this.prefix+'.close()" '+close_standby+' '+close_over+' style="float:right;font-size:15px;width:15px;height:15px;margin-top:1px;margin-right:1px;" src="'+this.relativePath+'/img/control/close.gif" />';
			}
			
			if(this.toolbar.setup.MaxButton.enable)
			{
				var max_standby = 'onMouseOut = "this.src=\''+this.relativePath+'/img/control/max.gif\'"';
				var max_over = 'onMouseOver = "this.src=\''+this.relativePath+'/img/control/max_over.gif\'"';
				html+= '<img onclick="jswindow.maximizewindow(\''+this.prefix+'\')" '+max_standby+' '+max_over+' style="float:right;font-size:15px;width:15px;height:15px;margin-top:1px;margin-right:1px;" src="'+this.relativePath+'/img/control/max.gif" />';
			}
			if(this.toolbar.setup.MinButton.enable)
			{
				var min_standby = 'onMouseOut = "this.src=\''+this.relativePath+'/img/control/min.gif\'"';
				var min_over = 'onMouseOver = "this.src=\''+this.relativePath+'/img/control/min_over.gif\'"';
				html+= '<img onclick="jswindow.minimizewindow(\''+this.prefix+'\')" '+min_standby+' '+min_over+' style="float:right;font-size:15px;width:15px;height:15px;margin-top:1px;margin-right:1px;" src="'+this.relativePath+'/img/control/min.gif" />';
			}
			html+= '</div>';
			return html;
		}
		this.createControlButtons = function()
		{
			var html = '<div style="'+this.ControlButtons.style.html()+'" UNSELECTABLE="on" align="center">';
					if(this.ControlButtons.ok.enable) html+= this.ControlButtons.ok.html(this);
					if(this.ControlButtons.cancel.enable) html+= this.ControlButtons.cancel.html(this);
					if(this.ControlButtons.apply.enable) html+= this.ControlButtons.apply.html(this);
					if(this.ControlButtons.deny.enable) shtml+= this.ControlButtons.deny.html(this);				
				html+= '</div>';
			return html;	
		}
		this.close = function()
		{
			if(this.onClose) this.onClose(this); 
				else
					jswindow.closewindow(this.prefix);
		}
		this.hide = function()
		{
			var obj = document.getElementById(this.prefix+'jswindowdiv');
			if(obj) obj.style.visibility = 'hidden';
			this.onHide(this);
		}
		this.show = function()
		{
			var obj = document.getElementById(this.prefix+'jswindowdiv');
			if(obj) obj.style.visibility = 'visible';
			this.content.domobj = document.getElementById(this.prefix+'_jswindow_content');
			this.onShow(this);
		}
		this.gradient = new jswindow.createGradient();
		
		this.setTitle = function(title,css)
		{
			var obj = document.getElementById(this.prefix+'jswindowtitle');
			if(!obj) return false;
			if(!title) return false;
			obj.innerHTML = title;
			if(css) obj.style.cssText = obj.style.cssText+css;
		}
		
		this.innerHTML = function(html)
		{
			if(html == '') return false;
			
			var html = '<table style="width:250px;" border="0" cellpadding="0" cellspacing="0"><tr><td><form name="content" onsubmit="{OBJ}.hide();{OBJ}.ControlButtons.ok.onClick({OBJ});return false;">'+html+'</form></td></tr></table>';
			var thisobj = new RegExp(this.Str2Obj,'gi');
			html = String(html).replace(thisobj,"jswindow.cache."+this.prefix);
			var jswindowobj = $(this.prefix+'jswindowdiv');
			if(!jswindowobj) return false;
			var content = $(jswindowobj.childNodes.item(1));
			content.setHTML(html);
			this.resize();
			this.onContentUpdate(this);
		}
		this.update = function(str)
		{
			jswindow.cache[this.prefix] = this;
			this.method.check();
			this.positions();
			
			if (jswindow.mousedetectionlib.browser() != 'IE') document.captureEvents(Event.MOUSEMOVE)	
			document.onmousemove = jswindow.mousedetectionlib.getMouseXY;
		
			var html = '<div id="'+this.prefix+'jswindowdiv" onMouseOver="jswindow.mouseover(\''+this.prefix+'\')" style="position:absolute;border:0;margin:0;padding:0;'+this.style.html()+'" class="'+this.content.className+'">';
					html+= this.createToolbar();
					html+= '<div id="'+this.prefix+'_jswindow_content" style="padding:0;margin:0;'+this.content.style.html()+'"></div>';
					html+= this.createControlButtons();	
				html+= '</div>';

			var div = document.getElementById(this.prefix+'jswindowdiv');
			if(!div) return false;
			
			var temp = document.createElement('DIV');
			document.body.appendChild(temp);
				temp.innerHTML = html;

			var clone = temp.firstChild.cloneNode(true);
				temp.innerHTML = '';
				temp.parentNode.removeChild(temp);
				
			div.parentNode.replaceChild(clone,div);	
		
			this.innerHTML(str);
			jswindow.cache[this.prefix] = this;
			this.exists = true;
		}
		this.insertOBJ = function(obj)
		{
			if(!obj) return false;
			if(!obj.parentNode) return false;
			var component = obj.cloneNode(true);
			obj.parentNode.removeChild(obj);
			
			
			var content = document.getElementById(this.prefix+'_jswindow_content');
			if(content)
			{
				content.appendChild(component);
				this.content.domobj = content;
			}
			this.resize();
			this.onContentUpdate(this);
		}
		this.insertComponent = function(obj)
		{
			var component = obj.obj.cloneNode(true);
			obj.obj.parentNode.removeChild(obj.obj);
			
			
			var content = document.getElementById(this.prefix+'_jswindow_content');
			if(content)
			{
				content.appendChild(component);
			}
			this.resize();
			this.onContentUpdate(this);
		}
		this.resize = function(def)
		{
			var jswindowobj = $(this.prefix+'jswindowdiv');
			if(!jswindowobj) return false;
				
			var content = $(jswindowobj.childNodes.item(1));
			var top_properties = $(jswindowobj.childNodes.item(0)).getCoordinates();
			var content_properties = content.getFirst()?content.getFirst().getCoordinates():{width:0,height:0,left:0,top:0,right:0,bottom:0};	
			var bottom_properties = $(jswindowobj.childNodes.item(2)).getCoordinates();
			
			content_properties.height = content_properties.height + top_properties.height + bottom_properties.height;
			content_properties.width = content_properties.width;
			
			jswindowobj.setStyles(content_properties);
			
			var center = new autoScroll.obj(jswindowobj);
				center.center();
				
			return 	content;
		}
		

	}
	jswindow.mouseover = function(prefix)
	{
		var obj = jswindow.cache[prefix];
		//jswindow.tempMaskImg(prefix,obj.html['div'].offsetTop,obj.html['div'].offsetLeft,obj.html['div'].offsetWidth,obj.html['div'].offsetHeight);
	}
	jswindow.mousedown = function(prefix)
	{
		var obj = jswindow.cache[prefix];
	
		jswindow.objId.active = true;
		jswindow.objId.prefix = prefix;
		jswindow.highlighactive(prefix);
		obj.onStartMove(obj);
		var obj = new Object();
			obj.domObject = document.getElementById(prefix+'jswindowdiv');	
			obj.x = jswindow.mousedetectionlib.tempX;
			obj.y = jswindow.mousedetectionlib.tempY;
			obj.xpos = Number(String(obj.domObject.offsetLeft).replace('px','')); 
			obj.ypos = Number(String(obj.domObject.offsetTop).replace('px',''));
			obj.width = Number(String(obj.domObject.offsetWidth).replace('px',''));
			obj.height = Number(String(obj.domObject.offsetHeight).replace('px',''));

		jswindow.objId.y = jswindow.mousedetectionlib.tempY - obj.ypos;
		jswindow.objId.x = jswindow.mousedetectionlib.tempX - obj.xpos;	
	}
	jswindow.highlighactive = function(prefix)
	{
		var arr = jswindow.getJswindowObjs(prefix);		
		var arr_obj = arr.brothers;
		var browse = jswindow.mousedetectionlib.browser();
		
		while(arr_obj.length > 0)
		{
			obj = arr_obj.pop();
			if(browse == 'IE' && jswindow.useTransparency) obj.style.filter = 'alpha(opacity=60);';
			if(browse == 'MOZ' && jswindow.useTransparency) obj.style.MozOpacity = '0.6;';
			if(browse == 'OPERA' && jswindow.useTransparency) obj.style.opacity = 60;
			obj.style.zIndex = 99;
		}
		obj = arr.self;
		if(obj)
		{
			if(browse == 'IE' && jswindow.useTransparency) obj.style.filter = 'alpha(opacity=100);';
			if(browse == 'MOZ' && jswindow.useTransparency) obj.style.MozOpacity = '1.0;';
			if(browse == 'OPERA' && jswindow.useTransparency) obj.style.opacity = 100;
			obj.style.zIndex = 100;
		}
	}
	jswindow.createGradient = function()
	{
		this.mode = new Object();
		this.mode.vertical = false;
		this.mode.horizontal = false;
		this.width = 0;
		this.height = 0;
		this.browser = jswindow.mousedetectionlib.browser();
		this.opacity = function(){};
		this.skip = 3;
		this.direction = 'asc';
		this.color = '#000000';
		this.show = function()
		{
		   if(this.browser == 'IE')
		   {
			   this.opacity = function(value)
			   {
				   var value = value * this.skip;
				   var s = 'filter:alpha(opacity='+value+')';
				   return s;
			   }
		   }
		   if(this.browser == 'MOZ')
		   {
			   this.opacity = function(value)
			   {
				   var value = (value * this.skip) / 100;
				   var s = '-moz-opacity:'+value;
				   return s;
			   }
		   }
		   if(this.browser == 'OPERA')
		   {
			   this.opacity = function(value)
			   {
				   var value = value * this.skip;
				   var s = 'opacity:'+value;
				   return s;
			   }
		   }
			
			if(this.mode.vertical)
			{
				var y = 0;
				var s = '';
				while(y < this.height)
				{
					s+= '<div style="position:absolute;left:0px;top:'+y+'px;height:1px;width:'+this.width+'px;'+this.opacity(y)+';background-color:'+this.color+';"></div>';
					y+=1;	
				}
				return s;
			} 
			if(this.mode.horizontal)
			{
				var x = 0;
				var s = '';
				while(x < this.width)
				{
					s+= '<div style="position:absolute;top:0px;left:'+x+'px;height:'+this.height+'px;width:1px;'+this.opacity(x)+';"></div>';
					x+=1;		
				}
				return s;
			}
			
		}	
	}
	jswindow.mouseup = function(prefix)
	{
		jswindow.objId.active = false;
		var obj = jswindow.cache[prefix];
			obj.onEndMove(obj);
	}
	jswindow.mouseuptimeout = function(prefix)
	{
		 self.setTimeout('jswindow.objId.active = false;',100)
	}
	jswindow.minimizewindow = function(prefix)
	{
		var obj = jswindow.cache[prefix];
			if(!obj) return false;
			if(obj.state.begin.minimized) return false;
			obj.state.begin.maximized = false;
			obj.state.begin.minimized = true;
			obj.state.tray.execute();		
	}
	jswindow.maximizewindow = function(prefix)
	{
		var obj = jswindow.cache[prefix];
			if(!obj) return false;
			if(obj.state.begin.maximized) return false;
			obj.state.begin.minimized = false;
			obj.state.begin.maximized = true;
			obj.state.tray.execute();
			jswindow.highlighactive(prefix);
	}
	jswindow.closewindow = function(prefix)
	{
		trayEngine.deleteThisObj(prefix+'jswindowdiv');
		delete jswindow.cache[prefix];
		var obj = document.getElementById(prefix+'jswindowdiv');
		if(obj) obj.parentNode.removeChild(obj);
		var obj = document.getElementById(prefix+'jswindowdiv');
		if(obj) obj.parentNode.removeChild(obj);
	}
	jswindow.mousedetectionlib = new Object();
	jswindow.mousedetectionlib.browser = function() 
	{
		var browser = new String(navigator.appName);
		var version = new String(navigator.appVersion);
		if(browser.match('Microsoft Internet Explorer')) {if(!version.match('MSIE 7.0')) jswindow.useTransparency = false;return String('IE')};
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	}
	jswindow.mousedetectionlib.tempX = 0;
	jswindow.mousedetectionlib.tempY = 0;
	jswindow.mousedetectionlib.getMouseXY = function(e) 
	{
	    if (jswindow.mousedetectionlib.browser() == 'IE') { // grab the x-y pos.s if browser is IE
		jswindow.mousedetectionlib.tempX = event.clientX + document.documentElement.scrollLeft;
		jswindow.mousedetectionlib.tempY = event.clientY + document.documentElement.scrollTop;
	  } else {  // grab the x-y pos.s if browser is NS
		jswindow.mousedetectionlib.tempX = e.pageX
		jswindow.mousedetectionlib.tempY = e.pageY
	  }  
	  // catch possible negative values in NS4
	  if (jswindow.mousedetectionlib.tempX < 0){jswindow.mousedetectionlib.tempX = 0}
	  if (jswindow.mousedetectionlib.tempY < 0){jswindow.mousedetectionlib.tempY = 0}  
	  if(jswindow.objId.active)
	  {	
		var obj = document.getElementById(jswindow.objId.prefix+'jswindowdiv');
			obj.style.left = (jswindow.mousedetectionlib.tempX-jswindow.objId.x)+'px';
			obj.style.top = (jswindow.mousedetectionlib.tempY-jswindow.objId.y)+'px'; 
			
			jswindow.cache[jswindow.objId.prefix].offsetTop = obj.style.top;
			jswindow.cache[jswindow.objId.prefix].offsetLeft = obj.style.left;
	  }
	  return true
	}
	jswindow.showGeneratedCode = function(obj)
	{
		if(!obj)return false;
		var html = obj.body.innerHTML;
		var generatedcode = new jswindow.obj('code');
			generatedcode.toolbar.setup.title = 'Javascript generated Code';
			if(jswindow.mousedetectionlib.browser() == 'IE') generatedcode.style.width = 741;
			if(jswindow.mousedetectionlib.browser() == 'MOZ') generatedcode.style.width = 746;
			if(jswindow.mousedetectionlib.browser() == 'OPERA') generatedcode.style.width = 741;
			generatedcode.style.height = 584;
			if(jswindow.mousedetectionlib.browser() == 'OPERA') generatedcode.style.height = 550;
			if(jswindow.mousedetectionlib.browser() == 'MOZ') generatedcode.style.height = 602;
			
			generatedcode.create();
			generatedcode.innerHTML('<div style="position:static;padding:0px;margin:0px;"><textarea rows="35" cols="90">'+html+'</textarea></div>');
	}
	jswindow.getHTMLlength = function(string)
	{
		var span = document.createElement('SPAN');
			document.body.appendChild(span);
			span.style.cssText = '';
			span.className = 'cssIQBuilderDataMessageWindow cssIQBuilderFont1';
			span.innerHTML = string;
		
		var obj = span.firstChild;
		
		while(obj.nodeName == '#text')
		{
			obj = obj.nextSibling;
		}
		
		var x = obj.offsetWidth;
		var y = obj.offsetHeight;
			span.parentNode.removeChild(span);
		return {width:x,height:y};	
	}

var trayEngine = {
	parent:this,
	cache:[],
	minimizedobjs:[],
	setup:{
		space:2,
		bottom:0,
		mode:{
			bar:{
				top:false,
				bottom:true,
				left:false,
				right:false
			},
			tile:{
				top:false,
				bottom:true,
				left:false,
				right:false
			},
			cascade:{
				top:false,
				bottom:true,
				left:false,
				right:false
			}
		}
	},
	current:new Array(),
	properties:function(win)
	{
		this.coords = IQGetPageCoordsObj(win);
		this.width = parseInt(win.offsetWidth);
		this.height = parseInt(win.offsetHeight);
		this.x = this.coords.x;
		this.y = this.coords.y;
		this.id = win.id;
		this.domHTMLobj = win;
	},
	minimize:function(win)
	{
		if(!win) return false;
		
		var obj = new trayEngine.properties(win);
		trayEngine.cache[win.id] = obj;
		trayEngine.minimizedobjs.push(obj);
		trayEngine.execute();
	
	},
	maximize:function(win)
	{
		if(!win) return false;
		var obj = trayEngine.cache[win.id];
			win.style.top = obj.y + 'px';
			win.style.left = obj.x + 'px';
		trayEngine.deleteThisObj(win.id);
	},
	execute:function()
	{
		var prev = 0;	
		var arr = trayEngine.minimizedobjs;
		for(var i=0;i<arr.length;i++)
		{
			var obj = arr[i];
			obj.domHTMLobj.style.position = 'absolute';
			obj.domHTMLobj.style.left = (trayEngine.setup.space + prev) + 'px';
			obj.domHTMLobj.style.top = '100%';
			obj.domHTMLobj.style.top = (parseInt(obj.domHTMLobj.offsetTop) - (window.event?20:24)) + 'px';
			prev = prev + (obj.width + trayEngine.setup.space);
		}
	},
	deleteThisObj:function(value)
	{
		var arr = trayEngine.minimizedobjs;
		for(var i=0;i<arr.length;i++)
		{if(arr[i].id == value) break;}
		trayEngine.minimizedobjs = ERASE(trayEngine.minimizedobjs,i);
		trayEngine.execute();
	}
}