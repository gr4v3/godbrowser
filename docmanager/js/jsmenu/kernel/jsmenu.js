// JavaScript Document

var jsmenu = {
	cache:[],
	style:function()
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
		this.overflowX = false;
		this.overflowY = false;
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
		this.float = false;
		this.scaleUnit = 'px';
		this.html = function()
		{
			var s = '';
			if(this.cssText) s+=this.cssText;
			if(this.backgroundImage) s+='background-image:url('+this.backgroundImage+');';
			if(this.backgroundRepeat) s+='background-repeat:'+this.backgroundRepeat+';';
			if(this.backgroundPosition) s+='background-position:'+this.backgroundPosition+';';
			if(this.float) s+='float:'+this.float+';';
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
			if(this.overflowX) s+='overflow-x:'+this.overflowX+';';
			if(this.overflowY) s+='overflow-y:'+this.overflowY+';';
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
			var dbl = new RegExp(';;','gi');
			s = s.replace(dbl,'');
			return s;
		}
	},
	obj:function(prefix)
	{
		this.prefix = prefix;
		this.style = new jsmenu.style;
		this.relativePath = '';
		this.browser = jsmenu.browser();
		
		this.hidden = {
			style:new jsmenu.style
		}
		this.visible = {
			style:new jsmenu.style
		}
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
		
		this.table = false;
		this._focus_ = {
			parent:this,
			inputarr:new Array(),
			row:0,
			collect:function()
			{
				var id = 'jsmenu_'+this.parent.prefix+'_focus_';
				var i = 0;
				var obj = document.getElementById(id + i);
				while(obj)
				{
					this.inputarr.push(obj);
					obj.onkeydown = this.onkeydown;
					i++;
					obj = document.getElementById(id + i);
				}
				
			},
			blurall:function()
			{
				this.inputarr.each(function(value, index){
					value.blur();				
				});
			
				
			},
			onkeydown:function(e)
			{
				if (!e) var e = window.event;
				if (e.keyCode) code = e.keyCode;
					else if (e.which) code = e.which;
			
				var obj = e.srcElement?e.srcElement:e.target;
				var splited = obj.id.split('_');
				var prefix = splited[1];
				var index = splited[3];
				var menu = jsmenu.cache[prefix]; 
				var len = menu._focus_.inputarr.length - 1;
			
				if(code == 13) {return false;}
				else if(code == 9)
				{

					if(menu.browser == 'IE')
						if(window.event.shiftKey)
						{
							if(index == 0) menu.clearall();
						} else if(index == len) menu.clearall();
					else if(menu.browser == 'MOZ')
						if(e.modifiers && Event.SHIFT_MASK)
						{
							if(index == 0) menu.clearall();
						} else if(index == len) menu.clearall();
				}
				else if(code == 40)
				{
					/*
					var td = menu.table.get(1,index);
					menu.table.father = td;
					var div = menu.table.child(menu._focus_.row);
					menu._focus_.row++;
					menu.submenu.onover(div.firstChild);
					*/
				}
			}
		}
		this.decodeSpecialChars = function(html)
		{
			if(!html) return false;
			var lt = new RegExp("&lt;","gi");
			var gt = new RegExp("&gt;","gi");
			return html.replace(lt,'<').replace(gt,'>');
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
		this.create = function()
		{
			if(this.relativePath == '') this.getRelativePath('jsmenu.js');
			jsmenu.cache[this.prefix] = this;
		}
		
		this.css = function(str)
		{
			var html = '';
				html+='	<style type="text/css">';
				html+='.cssjsmenu_'+this.prefix+'_main {-moz-user-select:none;'+this.style.html()+'}';
				html+='.cssjsmenu_'+this.prefix+'_hidden {visibility:hidden;position:absolute;}';
				html+='.cssjsmenu_'+this.prefix+'_visible {visibility:visible;position:absolute;text-align:left;background-color:#FFFFFF;'+this.visible.style.html()+'}';
				html+='.cssjsmenu_'+this.prefix+'_menu_over {background-color:#3169c6;color:#FFFFFF;}';
				html+='.cssjsmenu_'+this.prefix+'_menu_option {float:left;}';
				html+='div#jsmenu_'+this.prefix+'_content {padding-top:10px;};';
				html+= str?str:'';
				html+='	</style>';
				
			return html;	
		}
		this.content = {
			parent:this,
			arr:new Array(),
			add:function(obj)
			{
				this.arr.push(obj);
				return obj;	
			},
			obj:function()
			{
				var tree = {
					title:'',
					style:new jsmenu.style,
					active:{style:new jsmenu.style},
					hover:{style:new jsmenu.style},
					submenu:{
						style:new jsmenu.style,
						active:{style:new jsmenu.style},
						hover:{style:new jsmenu.style}
					},
					action:'',
					childs:new Array(),
					add:function(string)
					{
						var tree = {
							title:'',
							action:'',
							style:new jsmenu.style,
							active:{style:new jsmenu.style},
							hover:{style:new jsmenu.style}
						}
						tree.title = string;
						this.childs.push(tree);
						return tree;
					}
				}
				return tree;
			},
			html:function()
			{
				var html = '';
				var prefix = this.parent.prefix;
				var path = this.parent.relativePath;
				this.arr.each(function(value,i){
			
				   html+= '<div id="'+i+'" onmouseover="jsmenu.cache[\''+prefix+'\']._focus_.inputarr[\''+i+'\'].focus();jsmenu.cache[\''+prefix+'\'].head.over(this,'+i+');" onclick="javascript:jsmenu.cache[\''+prefix+'\'].display(this,'+i+');'+value.action+'" style="'+value.style.html()+'">';
						html+= '<SPAN>'+value.title+'</SPAN>';
						html+= '<div style="width:1px;height:1px;overflow:hidden;border:0px;position:absolute;"><input id="jsmenu_'+prefix+'_focus_'+i+'" type="button" onfocus="jsmenu.cache[\''+prefix+'\'].head.over(this.parentNode.parentNode,'+i+');" src="'+path+'transparent.gif" /></div>';
					html+= '</div>';
				});
				
				
				return html;
			}
		}
		this.html = function()
		{	
			var prefix = this.prefix;
			
			var css = '';
			var html = '<div id="jsmenu_'+this.prefix+'_main" style="width:99%;">';
					html+= '<div id="jsmenu_'+this.prefix+'_head">'+this.content.html()+'</div>';	
					html+= '<div id="jsmenu_'+this.prefix+'_content">';	
						this.content.arr.each(function(value,i){
							html+= '<div id="jsmenu_'+prefix+'_content_container" class="cssjsmenu_'+prefix+'_hidden">';
								html+= '<div style="'+value.submenu.style.html()+'">';
								
								value.childs.each(function(child,j){
									html+= '<div '+(child.title=='-'?'':'onclick="javascript:jsmenu.cache[\''+prefix+'\'].clearall(10);'+child.action+'"')+'><div '+(child.title=='-'?'':' onmouseover="jsmenu.cache[\''+prefix+'\'].submenu.onover(this);"')+'>'+(child.title=='-'?'<hr style="width:100%;" />':child.title)+'</div></div>';										
								});
								html+= '</div>';
							html+= '</div>';
						});
					html+= '</div>';	
				html+= '</div>';
			html+= this.css();
			
			
			this.method.writeHTML(html);
			this._focus_.collect();
			
			this.updateEvents();
		}
		this.updateEvents = function()
		{
			var element = document.getElementById('jsmenu_'+this.prefix+'_main');
			var obj = this;
			var clearTimer = function()
			{
				if(!this.id) return false;
				var prefix = this.id.split('_')[1];
				var dom = jsmenu.cache[prefix];
				window.clearInterval(jsmenu.cache[prefix].time);
			}
			
			$(element).addEvent('mouseleave',obj.clearall);
			$(element).addEvent('mouseenter',clearTimer);
		}
		
		this.previous = {
				cache:new Array(),
				obj:false,
				classString:false,
				column:{
					cell:null,
					obj:false
				}
		}
		this.display = function(div,index)
		{
			var obj = new jsmenu.dom;
			var coords = obj.getExactDimensions(div);
			var left = coords.x;
			var top = parseInt(coords.y) + parseInt(coords.height);
			
			if(this.previous.column.cell || this.previous.column.cell == 0) this.hide(this.previous.column.cell);
			if(this.previous.column.cell == index)
			{
				this.hide(this.previous.column.cell);
				this.previous.column.cell = null;
				return false;
			}	
			var index = parseInt(div.id);
			var root = div.parentNode.nextSibling;
			var column = root.firstChild;
			for(var i=0;i<index;i++){column = column.nextSibling;}
			
			if(column.firstChild.innerHTML == '&nbsp;' || column.firstChild.innerHTML == '') return false;			
			column.className = 'cssjsmenu_'+this.prefix+'_visible';
			column.style.left = left + 'px';
			column.style.top = top + 'px';
			
			var obj = this.submenu.hightlight.hover.pop();
			if(obj)
			{
				obj.decode();
				obj.active = '';
				obj.hover = 'none';
				obj.render();
			}
			
			this.previous.column.cell = index;
			this.previous.column.obj = column;
		}
		this.hide = function(index)
		{
			if(!index && index != 0) return false;
			if(!this.previous.column.obj) return false;
			this.previous.column.obj.className = 'cssjsmenu_'+this.prefix+'_hidden';
		}
		
		this.head = {
			parent:this,
			hightlight:{
				normal:[],
				hover:[],
				active:[],
				obj:function()
				{
					this.id = '';
					this.style = '';
					this.className = '';
					
					this.normal = false;
					this.active = false;
					this.hover = false;
					
					this.domobj = false;
					this.classString = '';
					
					this.render = function()
					{
						var a = this.normal?this.normal:'none';
						var b = this.active?this.active:'none';
						var c = this.hover?this.hover:'none';
						this.domobj.className = a+' '+b+' '+c;
						this.classString = this.domobj.className;
					}	
					this.decode = function()
					{
						var str = this.domobj.className.split(' ');
						this.normal = str[0]?str[0]:'none';
						this.active = str[1]?str[1]:'none';
						this.hover = str[2]?str[2]:'none';
					}
				}
			},
			over:function(div,index)
			{	
				
				var obj = this.hightlight.hover.pop();
				if(obj)
				{
					obj.decode();
					obj.active = '';
					obj.hover = 'none';
					obj.render();
				}
				
				var _obj_ = new this.hightlight.obj();
					_obj_.domobj = div;
					_obj_.decode();
				this.hightlight.hover.push(_obj_);	
					_obj_.active = 'none';
					_obj_.hover = this.parent.prefix+'_over';
					_obj_.render();	
				
				if(this.parent.previous.column.cell == index) return false;
				
				if(this.parent.previous.column.cell || this.parent.previous.column.cell == 0) this.parent.display(div,index);
			}
		}
		this.submenu = {
			parent:this,
			hightlight:{
				normal:[],
				hover:[],
				active:[],
				obj:function()
				{
					this.id = '';
					this.style = '';
					this.className = '';
					
					this.normal = false;
					this.active = false;
					this.hover = false;
					
					this.domobj = false;
					this.classString = '';
					
					this.render = function()
					{
						var a = this.normal?this.normal:'none';
						var b = this.active?this.active:'none';
						var c = this.hover?this.hover:'none';
						this.domobj.className = a+' '+b+' '+c;
						this.classString = this.domobj.className;
					}
					this.decode = function()
					{
						var str = this.domobj.className.split(' ');
						this.normal = str[0]?str[0]:'none';
						this.active = str[1]?str[1]:'none';
						this.hover = str[2]?str[2]:'none';
					}
				}
			},
			onover:function(div)
			{
				var obj = this.hightlight.hover.pop();
				if(obj)
				{
					obj.decode();
					obj.active = '';
					obj.hover = false;
					obj.render();
				}
				var _obj_ = new this.hightlight.obj();
					_obj_.domobj = div;
					_obj_.decode();
				this.hightlight.hover.push(_obj_);	
					_obj_.active = false;
					_obj_.hover = this.parent.prefix+'_subover';
					_obj_.render();	
			}
		}
		this.time = null;
		
		
		this.clearallFirefox = function(e)
		{
			
			var obj = e.target.parentNode; 
			if(!e.relatedTarget) return false;
			var prev = e.relatedTarget;
			
			var prefix = obj.id.split('_')[1];
			var dom = jsmenu.cache[prefix];
			if(dom == undefined) return false;

			if(dom.detectOBJ(prefix,prev))
			{
				time = 500;
				dom.time = window.setTimeout('jsmenu.cache[\''+dom.prefix+'\'].clearMenu();',time);
			}
		}
		
		this.detectOBJ = function(prefix,b)
		{
			if(!b || !prefix) return false;
			
			var access = true;
			while(b.parentNode)
			{
				
				b = b.parentNode;
				
				if(b.id == 'jsmenu_'+prefix+'_main' || b.id == 'jsmenu_'+prefix+'_head' || b.id == 'jsmenu_'+prefix+'_content') 
				{
					access = false;
					break;
				} 
			}
			
			return access;
		}
		
		this.clearall = function()
		{
			if(!this.id) return false;
			var prefix = this.id.split('_')[1];
			var dom = jsmenu.cache[prefix];
			if(dom == undefined) return false;
			time = 500;
			dom.time = window.setTimeout('jsmenu.cache[\''+dom.prefix+'\'].clearMenu();',time);
		}
		this.clearMenu = function()
		{
		
			if(this.previous.obj) this.previous.obj.className = this.previous.classString;
			if(this.previous.column.cell || this.previous.column.cell == 0) this.hide(this.previous.column.cell);
			this.previous.column.cell = null;
			var obj = this.submenu.hightlight.hover.pop();
			if(obj)
			{
				obj.decode();
				obj.active = '';
				obj.hover = false;
				obj.render();
			}
			var obj = this.head.hightlight.hover.pop();
			if(obj)
			{
				obj.decode();
				obj.active = '';
				obj.hover = false;
				obj.render();
			}
			this._focus_.blurall();
			window.clearInterval(this.time);
		}
	},
	browser:function() 
	{
		var browser = new String(navigator.appName);
		if(browser.match('Microsoft Internet Explorer')) return String('IE');
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	},
	dom:function(obj)
	{
		this.root = obj;
		this.element = false;
		this.notWhitespace = /\S/
		this.get = function(row,col)
		{
			if(!this.root) return false;
			if(this.root.nodeName != 'TABLE') return false;
			if(this.root.firstChild.nodeName == 'TBODY') 
				this.element = this.root.firstChild.firstChild;	
			var y = 0;
			while(y < row && this.element){this.element = this.element.nextSibling;y++;}
			
			if(this.node(this.element,col)) return this.node(this.element,col); 
					else return false;
		}
		this.node = function(obj,index)
		{
			if(!obj) return false;
			var obj = obj.firstChild?obj.firstChild:false;
			if(index == 0) return obj;
			var x = 0;
			while(x < index){obj = obj.nextSibling;x++;}
			return obj;
		}
		this.cleanWhitespace = function(node) 
		{	  
			  for (var x = 0; x < node.childNodes.length; x++) {
				var childNode = node.childNodes[x]
				if ((childNode.nodeType == 3)&&(!this.notWhitespace.test(childNode.nodeValue))) {
			// that is, if it's a whitespace text node
				  node.removeChild(node.childNodes[x])
				  x--
				}
				if (childNode.nodeType == 1) {
			// elements can have text child nodes of their own
				  this.cleanWhitespace(childNode)
				}
			  }
		}
		this.getExactDimensions = function(obj)
		{
			var type = typeof obj;
			if(type == 'undefined') return false;
			if(type == 'string') var obj = document.getElementById(obj);
			if(!obj) return false;
			var browser = this.browser();
			var coords = new this.IQGetPageCoordsObj(obj);
			var dim = {
				padding: {
					horizontal:Number(String(obj.style.paddingLeft).split(/px|pt/)[0])+Number(String(obj.style.paddingRight).split(/px|pt/)[0]),
					vertical:Number(String(obj.style.paddingTop).split(/px|pt/)[0])+Number(String(obj.style.paddingBottom).split(/px|pt/)[0])
				},
				margin: {
					horizontal:Number(String(obj.style.marginLeft).split(/px|pt/)[0])+Number(String(obj.style.marginRight).split(/px|pt/)[0]),
					vertical:Number(String(obj.style.marginTop).split(/px|pt/)[0])+Number(String(obj.style.marginBottom).split(/px|pt/)[0])
				},
				border: {
					horizontal:Number(String(obj.style.borderLeftWidth).split(/px|pt/)[0])+Number(String(obj.style.borderRightWidth).split(/px|pt/)[0]),
					vertical:Number(String(obj.style.borderTopWidth).split(/px|pt/)[0])+Number(String(obj.style.borderBottomWidth).split(/px|pt/)[0])
				},
				x:coords.x,
				y:coords.y,
				width:false,
				height:false
			}
			dim.width = obj.offsetWidth - dim.padding.horizontal - dim.margin.horizontal;
			dim.height = obj.offsetHeight - dim.padding.vertical - dim.margin.vertical;
			if(browser == 'MOZ'){dim.width+=2;dim.height+=1;}
			return dim;
		}
		this.IQGetPageCoordsObj = function(obj) {var coords = {x: 0, y: 0};do {coords.x += obj.offsetLeft;coords.y += obj.offsetTop;}while ((obj = obj.offsetParent));return coords;}
		this.browser = function() 
		{
			var browser = new String(navigator.appName);
			if(browser.match('Microsoft Internet Explorer')) return String('IE');
			if(browser.match('Netscape')) return String('MOZ');
			if(browser.match('Opera')) return String('OPERA');
		}
	},
	tableDomFunctions:function(obj)
	{
		this.root = obj;
		this.element = false;
		this.colgroup = false;
		this.tbody = false;
		this.notWhitespace = /\S/
		
		this.check = function()
		{
			if(!this.root) return false;
			if(this.root.nodeName != 'TABLE') return false;
		
			if(this.root.firstChild.nodeName == 'COLGROUP')
			{
				this.colgroup = this.root.firstChild;
				if(this.root.firstChild.nextSibling.nodeName ==  'TBODY')
				{
					this.tbody = this.root.firstChild.nextSibling;
					this.element = this.root.firstChild.nextSibling.firstChild;
				}
			}
			if(this.root.firstChild.nodeName == 'TBODY')
			{
				this.tbody = this.root.firstChild;
				this.element = this.root.firstChild.firstChild;
			}
		}
		this.get = function(row,col)
		{
			this.check();
			var y = 0;
			while(y < row && this.element){this.element = this.element.nextSibling;y++;}
			
			if(this.node(this.element,col)) return this.node(this.element,col); 
					else return false;
		}
		this.node = function(obj,index)
		{
			if(!obj) return false;
			var obj = obj.firstChild?obj.firstChild:false;
			if(index == 0) return obj;
			var x = 0;
			while(x < index && obj){obj = obj.nextSibling;x++;}
			return obj;
		}
		this.cleanWhitespace = function(node) 
		{	  
			  for (var x = 0; x < node.childNodes.length; x++) {
				var childNode = node.childNodes[x]
				if ((childNode.nodeType == 3)&&(!this.notWhitespace.test(childNode.nodeValue))) {
			// that is, if it's a whitespace text node
				  node.removeChild(node.childNodes[x])
				  x--
				}
				if (childNode.nodeType == 1) {
			// elements can have text child nodes of their own
				  this.cleanWhitespace(childNode)
				}
			  }
		}
		this.father = false;
		this.child = function(index)
		{
			if(!this.father) return false;
			if(index == 0) return this.father.firstChild;
			var obj = this.father;
			for(var i=0;i<index;i++)
			{
				obj = obj.nextSibling;
			}
			return obj;
		}
	}
}
