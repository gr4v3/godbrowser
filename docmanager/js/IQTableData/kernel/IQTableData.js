Array.prototype.index = function(s){if(!s && s != 0) return false;var value = '';for(var i=0;i<this.length;i++){value = this[i];if(value == s) return i;}}
Array.prototype.replace = function(a,b){this[this.index(a)] = b;}
var isParentObj = function(current,filter)
{
	var obj = $(current);
	var index = [];
	var content = [];
	var bool = false;
	for(i in filter)
	{	
		index.push(i);
		content.push(filter[i]);
	}
	while(obj != null)
	{
		index.each(function(value,i)
		{
			eval('var src = obj.'+value+';');
			if(src == content[i]) bool = obj;
		});
		obj = obj.parentNode; 
	}
	return bool;
}

var IQTableData = new Object();
	IQTableData.cache = new Array();
	IQTableData.style = function()
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
	IQTableData.MouseEvent = function(parent)
	{
		this.parent = parent;
		this.title = new Object();
		this.title.obj = false;
		this.title.css = false;
		this.title.hightlight = true;
		this.content = new Object();
		this.content.obj = false;
		this.content.css = false;
		this.content.hightlight = true;
		this.title.over = function(prefix,element)
		{	
			var obj = IQTableData.cache[prefix];
			var __tr__ = obj.hightlight.hover.pop();
			if(__tr__)
			{
				__tr__.decode();
				__tr__.hover = false;
				__tr__.render();
			}
			if(!obj.header.hightlight) return false;
			/*
			if(obj.mousehandler.title.obj) obj.mousehandler.title.obj.style.cssText = obj.mousehandler.title.css;
			if(obj.mousehandler.content.obj) obj.mousehandler.content.obj.style.cssText = obj.mousehandler.content.css;
			obj.mousehandler.title.obj = element;
			obj.mousehandler.title.css = element.style.cssText;
			element.style.cssText = element.style.cssText+';'+obj.header.hover.html();
			*/
		}
		this.title.out = function(prefix,element)
		{	
			var obj = IQTableData.cache[prefix];
			if(!obj.header.hightlight) return false;
			/*
			if(obj.mousehandler.title.obj) obj.mousehandler.title.obj.style.cssText = obj.mousehandler.title.css;
			if(obj.mousehandler.content.obj) obj.mousehandler.content.obj.style.cssText = obj.mousehandler.content.css;
			obj.mousehandler.title.obj = element;
			obj.mousehandler.title.css = element.className;

			element.className = obj.mousehandler.content.css;
			*/
		}
		this.content.onRowOver = function(prefix,element)
		{
			var obj = IQTableData.cache[prefix];
			if(!obj.content.hightlight) return false;
			//if(obj.mousehandler.title.obj) obj.mousehandler.title.obj.style.cssText = obj.mousehandler.title.css;
			var __tr__ = obj.hightlight.hover.pop();
			
			if(__tr__)
			{
				__tr__.decode();
				__tr__.hover = 'none';
				__tr__.render();
			}
				__tr__ = new obj.hightlight.obj();
				__tr__.domobj = element;
				__tr__.decode();
			obj.hightlight.hover.push(__tr__);	
				__tr__.hover = 'cssIQTableData_'+prefix+'_content_tr_hover';
				__tr__.render();
		}
		this.content.onRowOut = function(prefix,element)
		{
			/*
			var obj = IQTableData.cache[prefix];
			if(!obj.content.hightlight) return false;

			if(obj.mousehandler.title.obj) 
				obj.mousehandler.title.obj.style.cssText = obj.mousehandler.title.css;
			*/
		}
		this.main = function(e)
		{	
			if(!e) e = window.event;
			var evt = new Event(e);
			var main = isParentObj(evt.target,{className:'IQTableData'});
			if(main)
			{
				var prefix = main.getProperty('prefix');
			}
			if(prefix == null) return false;
			var obj = IQTableData.cache[prefix];
			var __tr__ = obj.hightlight.hover.pop();
			if(__tr__)
			{
				__tr__.decode();
				__tr__.hover = false;
				__tr__.render();
			}
			if(obj.mousehandler.content.obj) obj.mousehandler.content.obj.style.cssText = obj.mousehandler.content.css;
			if(obj.mousehandler.title.obj) obj.mousehandler.title.obj.style.cssText = obj.mousehandler.title.css;
	}
		this.position = function(e)
		{
			var element = false;
			if(window.event)
			{
				var e = window.event;element = e.srcElement;
				var obj = IQTableData.cache[String(element.parentNode.id.split('_')[0])];
				if(!obj) return false;
				if(!obj.header.column.hightlight) return false;
				var cursorimage = obj.style.cursor;
				
				if(e.offsetY <= 5 && obj.header.colHightlight)
				{ obj.header.column.obj = element;
				//element.style.cursor = obj.relativePath+'img/down.cur';
				} 
				else {element.style.cursor = "pointer";
						obj.header.column.obj = false;}		
						
				
			} else {
				try
				{
					var element = e.target;
					var obj = IQTableData.cache[String(element.parentNode.id.split('_')[0])];
					if(!obj) return false;
					var cursorimage = obj.style.cursor;
					
					
					//var offsetY = new IQGetPageCoordsObj(element);
					
					var offsetY = $(element).getPosition();
					
					var y = Number((e.pageY - offsetY.y));
				
					if(y <= 5 && obj.header.colHightlight)
					{
						obj.header.column.obj = element;
						//element.style.cursor = 'kernel/img/down.cur';
					} 
					else {element.style.cursor = "pointer";
							obj.header.column.obj = false;}
				} catch(erro){}
			}
			
		}
	}
	IQTableData.sortTableArray = new Array();
	
	IQTableData.dbconnection = function()
	{
		this.host = false;
		this.user = false;
		this.pass = false;
		this.db = false;
		this.query = false;
		this.limit = false;
		this.index = false;
		this.countQuery = false;
		this.prefix = false;
		this.format = false;
		this.titles = false;
		this.border = false;
		this.cellpadding = false;
		this.cellspacing = false;
		this.evencolor = false;
		this.oddcolor = false;
		this.width = false;
		this.searchQuery = false;
		this.order = false;
		this.headerwidth = false;
		this.headercolumns = false;
		this.renew = false;
		
		this.html = function()
		{	
			var html = "";
				if(this.host) html+= 'A='+IQTableData.encodeSpecialChars(this.host)+'&';
				if(this.user) html+= 'B='+IQTableData.encodeSpecialChars(this.user)+'&';
				if(this.pass) html+= 'C='+IQTableData.encodeSpecialChars(this.pass)+'&';
				if(this.db) html+= 'D='+IQTableData.encodeSpecialChars(this.db)+'&';
				if(this.query) html+= 'E='+IQTableData.encodeSpecialChars(this.query)+'&';
				if(this.limit) html+= 'F='+IQTableData.encodeSpecialChars(this.limit)+'&';
				if(this.index) html+= 'G='+IQTableData.encodeSpecialChars(this.index)+'&';
				if(this.countQuery) html+= 'H='+IQTableData.encodeSpecialChars(this.countQuery)+'&';
				if(this.prefix) html+= 'I='+IQTableData.encodeSpecialChars(this.prefix)+'&';
				if(this.border) html+= 'J='+IQTableData.encodeSpecialChars(this.border)+'&';
				if(this.cellpadding) html+= 'K='+IQTableData.encodeSpecialChars(this.cellpadding)+'&';
				if(this.cellspacing) html+= 'L='+IQTableData.encodeSpecialChars(this.cellspacing)+'&';
				if(this.evencolor) html+= 'M='+IQTableData.encodeSpecialChars(this.evencolor)+'&';
				if(this.oddcolor) html+= 'N='+IQTableData.encodeSpecialChars(this.oddcolor)+'&';
				if(this.width) html+= 'O='+IQTableData.encodeSpecialChars(this.width)+'&';
				if(this.searchQuery) html+= 'S='+IQTableData.encodeSpecialChars(this.searchQuery)+'&';	
				if(this.renew) html+= 'V='+IQTableData.encodeSpecialChars(this.renew)+'&';
			
			if(this.headerwidth)for(var i=0;i<this.headerwidth.length;i++){html+= "Y["+i+"]="+IQTableData.encodeSpecialChars(this.headerwidth[i])+"&";}
			if(this.order)for(var i=0;i<this.order.length;i++){html+= "X["+i+"]="+IQTableData.encodeSpecialChars(this.order[i])+"&";}
			if(this.format)for(var i=0;i<this.format.length;i++){html+= "Q["+i+"]="+IQTableData.encodeSpecialChars(this.format[i],true)+"&";}
			if(this.titles)for(var i=0;i<this.titles.length;i++){html+= "R["+i+"]="+IQTableData.encodeSpecialChars(this.titles[i],true)+"&";}
			if(this.headercolumns)for(var i=0;i<this.headercolumns.length;i++){html+= "Z["+i+"]="+IQTableData.encodeSpecialChars(this.headercolumns[i],true)+"&";}
			return html;	
		}
	}
	IQTableData.specialCharsArray = {
		pelicas:new RegExp("'","gi"),
		aspas:new RegExp("\"","gi"),
		perc:new RegExp("%","gi"),
		esp:new RegExp(" ","gi"),
		cardinal:new RegExp("[#]","gi"),
		vezes:new RegExp("[*]","gi"),
		mais:new RegExp("[+]","gi"),
		espe:new RegExp("&","gi"),
		nbsp:new RegExp("&nbsp;","gi")
	}
	IQTableData.encodeSpecialChars = function(expressao,mode)
	{
		return escape(expressao);
	}
	IQTableData.obj = function(prefix)
	{
		//kernel specifications
		
		this.relativePath = '';
		this.prefix = prefix;
		
		this.header = new Object();
		this.header.title = new Array();
		this.header.style = new Array();
		this.header.hover = new IQTableData.style;
		this.header.hover.cssText = 'background-color:#cecece;';
		this.header.active = new IQTableData.style;
		this.header.active.cssText = 'background-color:#cecece;';
		this.header.hightlight = true;
		this.header.colHightlight = true;
		this.header.column = new Object();
		this.header.column.obj = false;
		this.header.column.active = new IQTableData.style;
		this.header.order = new Array();
		this.header.width = new Array();
		this.header.activeColumn = new Array();
		
		//this.header.column.active.backgroundColor = '#ff0000';
		
		this.content = new Object();
		this.content.style = new Array();
		this.content.format = new Array();
		this.content.parameters = new Array();
		this.content.selectsrow = false;
		this.content.repeatRowSelection = false;
		
		this.content.hover = new IQTableData.style;
		this.content.hover.cssText = 'background-color:#cecece;';
		this.content.active = new IQTableData.style;
		this.content.active.cssText = 'background-color:#cecece;';
		
		this.content.center = new IQTableData.style;
		this.content.center.cssText = 'background-color:#cecece;';
		
		this.content.hightlight = true;
		this.content.rowHightlight = true;
		this.content.crossHightlight = false;
		this.header.column.hightlight = false;
		
		this.mousehandler = false;
		
		this.column = new Array();
		this.row = new Array();
		
		this.sortArray = new Array();
		this.sortName = new Object();
		this.sortName.campo = '';
		this.sortName.direction = '';
		this.sortName.htmlobj = false;
		this.orderBy = new Array();
		
		this.onEnd = function(){};
		this.onReady = function(){};
		this.onRowSelect = function(){};
		this.onEmptyResults = function(){};
		this.onNewPage = function(){};
		this.onNewOrder = function(){};
		this.onCreate = function(){};
		this.onPrint = function(){};
		this.onReNew = function(){};
		this.onPreview = function(){};
		
		this.onendaccess = false;
		this.oncreateaccess = false;
		this.onneworderaccess = false;
		this.onnewpageaccess = false;
		this.onprintaccess = false;
		this.onreadyaccess = false;
		this.onrenewaccess = false;
		this.onpreviewaccess = false;
		
		this.limitarray = new Array(-1,10,50,100,200);
		this.querylimitindex = false;
		this.queryrows = 0;
		this.pageIndex = 0;
		this.emptyquerystring = 'Pesquisa sem resultados';
		this.debugMessageString = '';
		this.language = 'pt';
		this.languagecontent = {
			'pt':{
					'first':'primeiro',
					'before':'anterior',
					'after':'seguinte',
					'last page':'&uacute;ltima p&aacute;gina'
				},
			'en':{
					'first':'first',
					'before':'before',
					'after':'after',
					'last page':'last page'
				}	
		}
		
		this.controlPanelTitle = '&nbsp;';
		this.controlPanelStyle =  new IQTableData.style;
		this.controlPanelAlign = 'center';
		this.controlPanelVisible = true;
		this.controlPanelElements = new Object();
		
		this.controlPanelElements.index = new Object();
		this.controlPanelElements.end = new Object();
		this.controlPanelElements.begin = new Object();
		this.controlPanelElements.minus = new Object();
		this.controlPanelElements.plus = new Object();
		
		this.controlPanelElements.top = true;
		this.controlPanelElements.bottom = false;
		
		this.controlPanelElements.index.style = new IQTableData.style;
		this.controlPanelElements.index.style.cssText = 'width:30px;font-size:10px;text-align:center;padding-bottom:2px;';
		
		this.controlPanelElements.minus.style = new IQTableData.style;
		this.controlPanelElements.minus.style.cssText = 'background-color:transparent !important;text-decoration:none;font-size:14px;color:#000000;width:15px;cursor:pointer;margin-right:5px;border:0px;';
		
		this.controlPanelElements.plus.style = new IQTableData.style;
		this.controlPanelElements.plus.style.cssText = 'background-color:transparent !important;text-decoration:none;font-size:14px;color:#000000;width:15px;cursor:pointer;margin-left:5px;border:0px;';
		
		this.controlPanelElements.end.style = new IQTableData.style;
		this.controlPanelElements.end.style.cssText = 'background-color:transparent !important;text-decoration:none;font-size:14px;color:#000000;width:20px;cursor:pointer;border:0px;';
		
		this.controlPanelElements.begin.style = new IQTableData.style;
		this.controlPanelElements.begin.style.cssText = 'background-color:transparent !important;text-decoration:none;font-size:14px;color:#000000;width:20px;cursor:pointer;border:0px;';
			
		this.controlPanelElements.title = '';
		this.controlPanelElements.numPagesPrefix = '';
		
		this.controlPanelElements.selectLimit = new Object();
		this.controlPanelElements.selectLimit.top = false;
		this.controlPanelElements.selectLimit.left = false;
		this.controlPanelElements.selectLimit.right = false;
		this.controlPanelElements.selectLimit.bottom = false;
		this.controlPanelElements.selectLimit.title = '';
		
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
		this.method.writeCSS = function(css)
		{
			
			if(this.innerHTML)
				document.body.innerHTML+= css;
			else if(this.documentWrite) document.write(css);	
			
		}
		
		this.countQuery = 'false';
		this.numberOfPages = false;
		this.pageStep = false;
		this.firstTime = true;
		this.stylepermission = true;
		this.globalLimit = 0;
		this.spanControlPanel = new Object();
		this.spanControlPanel.top = new Object();
		this.spanControlPanel.bottom = new Object();
		this.funcao = '';
		this.fields = Array();
		this.breadcrumb = 'basic'; // 'advanced'
		this.printableHTML = '';
		this.selectobj = false;
		this.selectobjdom = false;
		this.initialize = false;
		
		
		this.hightlight = {
			normal:[],
			hover:[],
			active:[],
			parent:this,
			obj:function()
			{
				this.id = '';
				this.browser = IQTableData.selectBox.browser();
				this.style = '';
				this.className = '';
				this.classAttribute = this.browser == 'IE'?'className':'class';
				
				this.normal = false;
				this.active = false;
				this.hover = false;
				
				this.domobj = false;
				this.classString = '';
				
				this.render = function()
				{
					var a = this.normal?this.normal:'false';
					var b = this.active?this.active:'false';
					var c = this.hover?this.hover:'false';
					this.domobj.setAttribute(this.classAttribute,a+' '+b+' '+c);
					this.classString = this.domobj.className;
					return this.classString;
				}
				this.decode = function()
				{
					var str = this.domobj.className.split(' ');
					this.normal = str[0]?str[0]:'false';
					this.active = str[1]?str[1]:'false';
					this.hover = str[2]?str[2]:'false';
					this.classString = this.normal+' '+this.active+' '+this.hover;
					return str;
				}
			},
			browser:function() 
			{
				var browser = new String(navigator.appName);
				if(browser.match('Microsoft Internet Explorer')) return String('IE');
				if(browser.match('Netscape')) return String('MOZ');
				if(browser.match('Opera')) return String('OPERA');
			}
		}
		//table layout properties
		this.style = new IQTableData.style;
		this.width = '0%';
		this.border = 1;
		this.cellspacing = 0;
		this.cellpadding = 1;
		this.oddColor = '#E9E9E9';
		this.evenColor = '#ffffff';
		this.rowcolors = new Array(this.oddColor,this.evenColor);
		this.align = 'left';
		this.root = false;
		this.domObjectTable = false;
		this.selectboxadomobj = false;
		this.selectboxbdomobj = false;
		this.preview = new Array();
		
		// dados do servidor
		this.query = '';
		this.completeQuery = '';
		this.searchQuery = '';
		this.host = 'localhost';
		this.user = 'root';
		this.pass = '';
		this.db = 'mysql';
		this.limit = 20;
		this.connection = false;
		
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
			this.mousehandler = new IQTableData.MouseEvent(this);
			this.method.check();
			
			if (this.relativePath == '') this.getRelativePath('IQTableData.js');
			//IQTableData.automaticSearch.create(this.prefix)
			
			var html = this.generateStyleContent()+'<div style="width:0%;-moz-user-select:none;margin:0px;padding:0px;float:none;" UNSELECTABLE="on" id="'+this.prefix+'IQTableData" class="IQTableData" ondblclick="">'; //IQTableData.automaticSearch.'+prefix+'keypressed();
					html+= '<div id="control-a" UNSELECTABLE="on" ></div>';
					html+= '<div UNSELECTABLE="on"></div>';
					html+= '<div id="control-b" UNSELECTABLE="on" ></div>';
					html+= '<div id="'+this.prefix+'controlImage" style="position:absolute;left:50%;top:50%;z-index:99999999;"></div>';
				html+= '</div>';
				
				
			this.method.writeHTML(html);
			
			var obj = $(this.prefix+'IQTableData');
			
			
				if(obj)
				{					
					//onmouseout="IQTableData.cache[\''+this.prefix+'\'].mousehandler.main(\''+this.prefix+'\')"
					this.domObjectTable = obj;
					this.domObjectTable.setProperty('prefix',this.prefix);
					this.domObjectTable.addEvent('mouseleave',this.mousehandler.main)
					
					$(obj).getFirst().getNext().getNext().getNext().innerHTML = '<img src="'+this.relativePath+'img/ampulheta.gif" />';
					var controlImage = document.getElementById(this.prefix+'controlImage');
						controlImage.x = 0;
						controlImage.y = 0;
						controlImage.center = function(prefix)
						{
							var main = $(prefix+'IQTableData');
							if(!main) return false;
							var coords = main.getFirst().getNext().getFirst().getCoordinates();
							var width = coords.width;
							var height = coords.height;
							var top = coords.top;
							var left = coords.left;
							
							this.x = (left + width) / 2; 
							this.y = (top + height) / 2; 	
							
							this.style.top = this.y + 'px';
							this.style.left = this.x + 'px';
						}	
				}
			
			this.limitarray.replace(-1,999999);
			if(!this.limitarray.index(this.limit)) this.limitarray.insert(this.limit,0);
			function sortit(a,b){return(a-b)};
			this.limitarray.sort(sortit);
			
			if(this.query)
			{
				var str = this.query.slice(7);	
				this.query = 'select SQL_CALC_FOUND_ROWS '+str;
			} else this.query = false;
			this.connection = new IQTableData.dbconnection();
			this.connection.host = this.host;
			this.connection.user = this.user;
			this.connection.pass = this.pass;
			this.connection.db = this.db;
			this.connection.query = this.query;
			this.connection.searchQuery = this.searchQuery;
			this.connection.order = this.header.order.length>0?this.header.order:false;
			this.connection.index = this.querylimitindex;
			this.connection.limit = this.limit;	
			this.connection.prefix = this.prefix;
			this.connection.format = this.content.format;
			this.connection.titles = this.header.title;
			this.connection.border = this.border;
			this.connection.cellpadding = this.cellpadding;
			this.connection.cellspacing = this.cellspacing;
			this.connection.oddcolor = this.oddColor;
			this.connection.evencolor = this.evenColor;
			this.connection.width = this.width;
			this.connection.headerwidth = this.header.width;
			this.globalLimit = this.limit;
			IQTableData.cache[this.prefix] = this;
			var order = '';
			if(this.orderBy)
			{
				order = 'orderby='+this.orderBy[0]+'&direction='+this.orderBy[1];
				this.sortName.campo = this.orderBy[0];
				this.sortName.direction = this.orderBy[1];
				this.sortArray[this.orderBy[0]] = this.orderBy[1];
			}
			
			this.onendaccess = true;
			this.onreadyaccess = true;
			this.oncreateaccess = true;
			
			IQTableData.cache[this.prefix] = this;
			
			//if(this.controlPanelVisible) this.controlpanel(this.limit);
			
			IQTableData.ajaxquery(this.connection.html()+'mode=new&'+order,this.prefix);
			if(this.controlPanelVisible) this.controlpanel(this.limit);
			
			
		}
		this.update = function(campo,searchstring)
		{
			this.oncreateaccess = false;
			var obj = document.getElementById(this.prefix+'IQTableData');
				
				if(obj)
				{	
					var ampulheta = obj.firstChild.nextSibling.nextSibling.nextSibling;
						ampulheta.innerHTML = '<img src="'+this.relativePath+'img/ampulheta.gif" />';
				}
				
			this.connection.host = false;
			this.connection.user = false;
			this.connection.pass = false;
			this.connection.db = false;
			this.connection.query = false;
			this.connection.searchQuery = searchstring?searchstring:false;
			if(campo) 
			{
				var str = campo.slice(7);	
				this.query = 'select SQL_CALC_FOUND_ROWS '+str;
				this.connection.query = this.query;
			}	
			this.connection.order = this.header.order.length>0?this.header.order:false;
			this.connection.countQuery = false;
			this.connection.limit = this.limit;
			this.connection.index = this.querylimitindex;
			this.connection.prefix = this.prefix;
			this.connection.format = this.content.format;
			this.connection.titles = this.header.title;
			this.connection.border = false;
			this.connection.cellpadding = false;
			this.connection.cellspacing = false;
			this.connection.oddcolor = this.oddColor;
			this.connection.evencolor = this.evenColor;
			this.connection.width = this.width;
			this.connection.headerwidth = this.header.width;
			
			var order = '';
			if(this.orderBy)
			{
				order = 'orderby='+this.orderBy[0]+'&direction='+this.orderBy[1];
				this.sortName.campo = this.orderBy[0];
				this.sortName.direction = this.orderBy[1];
				this.sortArray[this.orderBy[0]] = this.orderBy[1];
			}
			this.onendaccess = true;
			this.onreadyaccess = true;
			IQTableData.cache[this.prefix] = this;
			IQTableData.ajaxquery(this.connection.html()+order,this.prefix);
			
		}
		this.sortTable = function(name,obj)
		{
		
			//if(this.header.column.obj){this.selectColumn(obj);return false}
			//alert(this.header.column.obj);
			if(obj)
				if(obj.firstChild)
				{
					if(obj.firstChild.nodeName != '#text' || obj.firstChild.nodeName == 'INPUT') return false;
				} else return false;
				
				var sort_ = this.sortArray;
				
				if(name == 'false') return false;
				
				if(sort_[name] == undefined) sort_[name] = 'DESC';
				else if(sort_[name] == 'ASC') sort_[name] = 'DESC';
				else if(sort_[name] == 'DESC') sort_[name] = 'ASC';
				this.orderBy = Array(name,sort_[name]);				
				this.sortArray = sort_;
				
				this.sortName.campo = name;
				this.sortName.direction = sort_[name];
				//this.sortName.htmlobj = obj.cellIndex;
				
				this.onneworderaccess = true;
				
				this.update();				
		}
		this.controlpanel = function(param)
		{	
			if(!param) var linhas = Number(this.limit),selecionado = '';
			else var linhas = Number(param);
			
			var html = '<table unselectable="on" align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%;'+this.controlPanelStyle.html()+'">';
				html+= '<tbody>';	
					html+= '<tr>';
						html+= '<td unselectable="on" colspan="5" align="center" style="font-size:1px;">&nbsp;</td>';
					html+= '</tr>';
					html+= '<tr>';
						html+= '<td unselectable="on" align="center" style="font-size:1px;">&nbsp;</td>';
						html+= '<td unselectable="on" align="right" style="font-size:1px;">&nbsp;</td>';
						html+= '<td unselectable="on" align="'+this.controlPanelAlign+'">';
							
							html+= '<table  unselectable="on" border="0" cellspacing="0" cellpadding="0">';
								html+= '<tr>';
									html+= '<td unselectable="on">&nbsp;</td>';
									html+= '<td unselectable="on" align="left">&nbsp;</td>';
									html+= '<td unselectable="on">&nbsp;</td>';
								html+= '</tr>';
							html+= '</table>';
							
						html+= '</td>';
						html+= '<td unselectable="on" align="left" style="font-size:1px;">&nbsp;</td>';
						html+= '<td unselectable="on" align="center" style="font-size:1px;">&nbsp;</td>';
					html+= '</tr>';
					html+= '<tr>';
						html+= '<td unselectable="on" colspan="5" align="center" style="font-size:1px;">&nbsp;</td>';
					html+= '</tr>';
				
				html+= '</tbody>';
				html+= '</table>';
			
			var panel = this.controlpaneldom();
			
			if(this.controlPanelElements.top) panel.top.obj.innerHTML = html; 
			if(this.controlPanelElements.bottom) panel.bottom.obj.innerHTML = html;
		
			var panel = this.controlpaneldom();
			this.selectboxadomobj = false;
			this.selectboxbdomobj = false;
					
			
			if(this.controlPanelElements.selectLimit.top
			   || this.controlPanelElements.selectLimit.left
			   || this.controlPanelElements.selectLimit.right
			   || this.controlPanelElements.selectLimit.bottom
			   )
			{
				
				
				var selectboxa = new IQTableData.selectBox.obj(this.prefix+'selectboxa');
					selectboxa.relativePath=this.relativePath+'selectBox/kernel/';
					selectboxa.style.width = 30;
					selectboxa.tableobj = this;
					for(var i=0;i<this.limitarray.length;i++)
					{selectboxa.add((this.limitarray[i]==999999?'todas':this.limitarray[i]));}
					if(this.controlPanelElements.top)
					{
						this.selectboxadomobj = selectboxa.create();
						selectboxa.indexStatic(this.limitarray.index(this.limit));
					}
					selectboxa.onChange = function(s)
					{
						var value = s.valueText;
						if(s.valueText == 'todas') value = 999999;
						 else 
							if(s.valueText == '----') return false;
						
						s.tableobj.globalLimit = value;
						s.tableobj.limit = value;
						s.tableobj.querylimitindex = 0;
						s.tableobj.pageIndex = 1;
						
						var bro = IQTableData.selectBox.cache[s.tableobj.prefix+'selectboxb'];
						if(bro)
						{	
							bro.showIndex = Number(s.value);
							bro.cache['previousValue'] = Number(s.value);
							bro.index(Number(s.value));
						}
						s.tableobj.update();
					}
					
					
					
					
				var selectboxb = new IQTableData.selectBox.obj(this.prefix+'selectboxb');
					selectboxb.relativePath=this.relativePath+'selectBox/kernel/';
					selectboxb.style.width = 30;
					selectboxb.tableobj = this;
					for(var i=0;i<this.limitarray.length;i++)
					{selectboxb.add((this.limitarray[i]==999999?'todas':this.limitarray[i]));}
					if(this.controlPanelElements.bottom)
					{
						this.selectboxbdomobj = selectboxb.create();
						selectboxb.indexStatic(this.limitarray.index(this.limit));
					}
					selectboxb.onChange = function(s)
					{	
						var value = s.valueText;
						if(s.valueText == 'todas') value = 999999;
						 else 
							if(s.valueText == '----') return false;
						
						s.tableobj.globalLimit = value;
						s.tableobj.limit = value;
						s.tableobj.querylimitindex = 0;
						s.tableobj.pageIndex = 1;
						
						var bro = IQTableData.selectBox.cache[s.tableobj.prefix+'selectboxa'];
						if(bro)
						{
							bro.showIndex = Number(s.value);
							bro.cache['previousValue'] = Number(s.value);
							bro.index(Number(s.value));
						}
						s.tableobj.update();	
					}	
					
			}
			var table = '<table border="0" cellpadding="0" cellspacing="0">';
						table+= '<tr>';
							table+= '<td unselectable="on"></td><td unselectable="on"></td><td unselectable="on">'+this.controlPanelElements.selectLimit.title+'</td>';
						table+= '</tr>';
					table+= '</table>';
			
			var dom = new IQTableData.tableDomFunctions();
			
			if(this.controlPanelElements.top)
			{
				if(this.controlPanelElements.selectLimit.top)
				{
					var obj = panel.top.selectbox;
						obj.innerHTML = table;
				
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxadomobj);
					
						obj.align = 'center';
						obj.style.width = this.selectboxadomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.left)
				{
					var obj = panel.top.selectbox.parentNode.nextSibling.firstChild;
						obj.innerHTML = table;
				
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxadomobj);
					
						obj.align = 'left';
						obj.style.width = this.selectboxadomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.right)
				{
					var obj = panel.top.selectbox.parentNode.nextSibling.lastChild;
						obj.innerHTML = table;
					
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxadomobj);
					
						obj.align = 'right';
						obj.style.width = this.selectboxadomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.bottom)
				{
					var obj = panel.top.selectbox.parentNode.nextSibling.nextSibling.firstChild;
						obj.innerHTML = table;
					
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxadomobj);

						obj.align = 'center';
						obj.style.width = this.selectboxadomobj.offsetWidth+'px';
				}
			}
			
			if(this.controlPanelElements.bottom)
			{
				if(this.controlPanelElements.selectLimit.top)
				{
					var obj = panel.bottom.selectbox;
						obj.innerHTML = table;
					
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxbdomobj);
					
						obj.align = 'center';
						obj.style.width = this.selectboxbdomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.left)
				{
					var obj = panel.bottom.selectbox.parentNode.nextSibling.firstChild;
						obj.innerHTML = table;
				
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxbdomobj);	
					
						obj.align = 'left';
						obj.style.width = this.selectboxadomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.right)
				{
					var obj = panel.bottom.selectbox.parentNode.nextSibling.lastChild;
						obj.innerHTML = table;
					
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxbdomobj);
					
						obj.align = 'right';
						obj.style.width = this.selectboxbdomobj.offsetWidth+'px';
				}
				else if(this.controlPanelElements.selectLimit.bottom)
				{
					var obj = panel.bottom.selectbox.parentNode.nextSibling.nextSibling.firstChild;
						obj.innerHTML = table;
					
					dom.root = obj.firstChild;
					dom.get(0,1).appendChild(this.selectboxbdomobj);

						obj.align = 'center';
						obj.style.width = this.selectboxbdomobj.offsetWidth+'px';
				}
			}

			if(param == 'todas' || !this.controlPanelVisible || (!this.controlPanelElements.top && !this.controlPanelElements.bottom)) param = 999999999999;
			this.limit = param;
			this.globalLimit = param;
			this.querylimitindex = 0;
		}
		this.generateStyleContent = function()
		{
			var html = '<style type="text/css">';
				for(var i=0;i<this.header.style.length;i++)
				{
					if(this.header.style[i] != undefined) html+= '.cssIQTableData_head_td'+i+this.prefix+' {';html+= this.header.style[i];html+= '}';
				}
				for(var i=0;i<this.content.style.length;i++)
				{
					if(this.content.style[i] != undefined) html+= '.cssIQTableData_content_td'+i+this.prefix+' {';html+= this.content.style[i];html+= '}';
				}
				html+= '.ASC {background-image:url('+this.relativePath+'img/ASC.gif);background-repeat:no-repeat;background-position:0% 50%;}';
				html+= '.DESC {background-image:url('+this.relativePath+'img/DESC.gif);background-repeat:no-repeat;background-position:0% 50%;}';
				
				html+= '.cssIQTableData_'+this.prefix+'_content_tr_normal {}';
				html+= '.cssIQTableData_'+this.prefix+'_content_tr_hover td {'+this.content.hover.cssText+'}';
				html+= '.cssIQTableData_'+this.prefix+'_content_tr_active td {cursor:pointer;'+this.content.active.cssText+'}';				
				
				html+= '.cssIQTableData_'+this.prefix+'_content_tr_even {cursor:pointer;background-color:'+this.oddColor+'}';
				html+= '.cssIQTableData_'+this.prefix+'_content_tr_odd {cursor:pointer;background-color:'+this.evenColor+'}';

				html+= '</style>';
				
			return html;
		}
		this.controlpaneldom = function()
		{
			var obj = document.getElementById(this.prefix+'IQTableData');
			if(!obj) return false;
			var root = {
				
				top : {
						obj: false,
						selectbox: false,
						backward: false, 
						index: false,
						forward: false
					},
				bottom : {
						obj: false,
						selectbox: false,
						backward: false, 
						index: false,
						forward: false
					}	
			}
			var controla = obj.firstChild;
			if(!controla) return root;
			var controlb = controla.nextSibling.nextSibling;
					
			root.top.obj = controla?controla:false;
			root.bottom.obj = controlb?controlb:false;
			
			if(controla.firstChild)
			{
				var dom = new IQTableData.tableDomFunctions();
					dom.root = controla.firstChild;
			
					root.top.selectbox = dom.get(0,0);
					var d = dom.get(1,2)?dom.get(1,2):false;
					
					dom.root = d.firstChild;
					
					root.top.backward = dom.get(0,0);
					root.top.index = dom.get(0,1);
					root.top.forward = dom.get(0,2);
			}
			if(controlb.firstChild)
			{
				var dom = new IQTableData.tableDomFunctions();
					dom.root = controlb.firstChild;
					
					root.bottom.selectbox = dom.get(0,0);
					var d = dom.get(1,2)?dom.get(1,2):false;

					dom.root = d.firstChild;	
					
					root.bottom.backward = dom.get(0,0);
					root.bottom.index = dom.get(0,1);
					root.bottom.forward = dom.get(0,2);
			}
			return root;
		}
		this.currentSpan = false;
		this.selectCurrentIndex = function(span)
		{
			if(!span) return false;
			if(this.currentSpan) this.currentSpan.style.fontWeight = 'normal';
			span.style.fontWeight = 'bold';
			this.currentSpan = span;
		}
		this.rowobj = false;
		this.rowcss = false;
		this.selectRow = function(td)
		{
			if(!td) return false; else tr = td.parentNode;
			var divmain = document.getElementById(this.prefix+'IQTableData');
			if(this.content.selectsrow){if(!this.content.selectsrow[td.cellIndex]) return false;}
			if(this.content.crossHightlight) this.interceptData(String(tr.rowIndex),false);
			if(tr.innerHTML == this.rowobj.innerHTML && !this.content.repeatRowSelection) return false;
			
			if(this.interceptColumn && this.interceptColumn != 0)
			{	
				var table = divmain.firstChild.nextSibling.firstChild;
				var index = new IQTableData.tableDomFunctions;
					index.root = table;	
				var obj = index.get(tr.rowIndex,this.interceptColumn);	
			 		obj.style.cssText = this.content.active.html();
			}
			
			var table = divmain.firstChild.nextSibling.firstChild
			var index = new IQTableData.tableDomFunctions;
			var dados = new Array();
				index.root = table;
			
			
			var x = 0;
			while(obj != false)
			{
				if(obj)dados.push(obj.innerHTML);
				obj = index.get(tr.rowIndex,x);
				x++;
			}
			this.row = dados;

			var obj = this.hightlight.active.pop();
			if(obj)
			{
				obj.decode();
				obj.active = false;
				obj.render();
			}
			var __tr__ = new this.hightlight.obj();
				__tr__.domobj = tr;
				__tr__.decode();
			this.hightlight.active.push(__tr__);	
				__tr__.active = 'cssIQTableData_'+this.prefix+'_content_tr_active';
				__tr__.render();
			eval("IQTableData.cache['"+prefix+"'].onRowSelect(IQTableData.cache['"+prefix+"'])");
			
		}
		this.deselectRow = function()
		{
			var __tr__ = this.hightlight.active.pop();
			if(__tr__)
			{
				__tr__.decode();
				__tr__.active = false;
				__tr__.hover = false;
				__tr__.render();
			}
		}
		this.getSelectedRowIndex = function()
		{
			var data = this.hightlight.active[0];
			if(data != undefined) return data.domobj.rowIndex; else return false;
		}
		this.columncssText = new Array();
		this.selectColumn = function(td)
		{
			if(!td) return false;
			var tr = td.parentNode;
			if(!this.header.colHightlight) return false;
			if(td.cellIndex != this.interceptColumn)
			{
				//eval('IQTableData.automaticSearch.'+this.prefix+'palavra = false;');
				//IQTableData.automaticSearch.delDiv();
			}
			if(this.content.crossHightlight) this.interceptData(false,String(td.cellIndex));	
			if(this.columncssText.length > 0)
			{
				if(this.mousehandler.title.obj) this.mousehandler.title.obj.style.cssText = this.mousehandler.title.css;
				for(var i=0;i<this.columncssText.length;i++)
				{this.columncssText[i][0].style.cssText = this.columncssText[i][1];}
			}
			tr = tr.nextSibling;
			while(tr != null)
			{
				tds = tr.getElementsByTagName('TD');
				this.columncssText.push(Array(tds.item(td.cellIndex),tds.item(td.cellIndex).style.cssText));
				tds.item(td.cellIndex).style.cssText = tds.item(td.cellIndex).style.cssText+';'+this.header.column.active.html();
				tr = tr.nextSibling;
			}
		}
		this.interceptRow = false;
		this.interceptColumn = false;
		this.interceptObj = false;
		this.interceptCss = false;
		this.interceptData = function() //row,column
		{
			var row = this.interceptData.arguments[0];
			var column = this.interceptData.arguments[1];
			if(row) this.interceptRow = row;
			if(column) this.interceptColumn = column;
			if(this.interceptRow && this.interceptColumn)
			{
				var divmain = this.domObjectTable;
				var table = divmain.firstChild.nextSibling.firstChild;
				var index = new IQTableData.tableDomFunctions;
					index.obj = table;
				var obj = index.get(this.interceptRow,this.interceptColumn);
				if(obj)
				{
					if(this.interceptObj) this.interceptObj.style.cssText = this.interceptCss;
					this.interceptCss = obj.style.cssText;
					this.interceptObj = obj;
					obj.style.backgroundColor = this.content.center.backgroundColor;	
				}
			}
		}
		this.tras = function()
		{
			if(this.pageIndex == 1) return false;
			this.querylimitindex -= Number(this.globalLimit);
			this.pageIndex--;
			this.onendaccess = true;
			this.onnewpageaccess = true;
			this.onreadyaccess = true;
			this.update();
		}
		this.frente = function()
		{	
			
			if(this.pageIndex == this.numberOfPages) return false;
			this.querylimitindex += Number(this.globalLimit);
			this.pageIndex++;
			this.onendaccess = true;
			this.onnewpageaccess = true;
			this.onreadyaccess = true;
			this.update();
		}
		this.IndexTempValue = '';
		this.onIndexChange = function(e)
		{
			var e = window.event?window.event:e;
			var obj = e.srcElement?e.srcElement:e.target;
			var character = e.keyCode;
		
			if(character == 13 || character == 9)
				{
					var valor = Number(obj.value);
					if(!valor || valor <= 0 || valor > this.numberOfPages){obj.value=this.pageIndex;return true;}
					this.querylimitindex = (valor-1) * this.globalLimit;
					this.limit = this.globalLimit;
					if(this.querylimitindex < 0)
					{
						this.limit = this.globalLimit - Math.abs(this.querylimitindex);
						this.querylimitindex = false;
					}
					this.pageIndex = valor;
					
					this.onendaccess = true;
					this.onnewpageaccess = true;
					this.onreadyaccess = true;
					
					this.update();
				}
			if(character == 8) return true;
			if(character == 109) return true;
			if(character == 109) return true;
			if(character >= 96 && character <= 105) return true;
			if(character < 45 || character > 57) {e.returnValue=false;return false;}
		}
		this.onIndexChangeblurevent = function(obj)
		{
			var valor = Number(obj.value);
			if(!valor || valor <= 0 || valor > this.numberOfPages){obj.value=this.pageIndex;return true;}
			this.querylimitindex = (valor-1) * this.globalLimit;
			this.limit = this.globalLimit;
			if(this.querylimitindex < 0)
			{
				this.limit = this.globalLimit - Math.abs(this.querylimitindex);
				this.querylimitindex = false;
			}
			this.onnewpageaccess = true;
			this.pageIndex = valor;
			this.update();
		}
		this.changePageIndex = function(index)
		{
			var valor = Number(index);
			if(!valor || valor <= 0 || valor > this.numberOfPages)	return false;
			this.querylimitindex = (valor-1) * this.globalLimit;
			this.limit = this.globalLimit;
			if(this.querylimitindex < 0)
			{
				this.limit = this.globalLimit - Math.abs(this.querylimitindex);
				this.querylimitindex = false;
			}
			//this.onnewpageaccess = true;
			this.pageIndex = valor;
			this.update();
		}
		this.printtable = function(tudo,a,b,c)
		{
			var index = this.pageIndex;
			var limitindex = this.querylimitindex;
			var limit = this.limit;
				
			if(tudo)
			{
				this.limit = 9999999999;
				this.querylimitindex = 0;
				this.update();
			}
			
			this.onPrint = function()
			{
				a = window.open(a?a:"",b?b:"",c?c:"");
				a.document.open();
				var tr = this.content.data.get(1,0).parentNode,td = false;
				
				this.printableHTML = this.generateStyleContent()+'<table>';
				while(tr)
				{
					td = tr.firstChild;
					this.printableHTML+= '<tr>';
					while(td)
					{
						this.printableHTML+= '<td class="'+td.className+'">'+td.innerHTML+'</td>';
						td = td.nextSibling;
					}
					this.printableHTML+= '</tr>';
					tr = tr.nextSibling;
				}
				this.printableHTML+= '</table>';
			
				a.document.write(this.printableHTML);
				a.document.close();
				a.print();
				this.limit = limit;
				this.querylimitindex = limitindex;
				this.onPrint = function(){};
				this.onprintaccess = true;
				this.onnewpageaccess = false;
				this.changePageIndex(index);
			}
			if(!tudo) this.onPrint();
		}
		this.findRowIndex = function(field,key)
		{
			if(!field || !key) return false;
			var prefix = this.prefix;
			var obj = this;
			
			var resultado = function()
			{
				if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
				{
					var result = String(xmlRequestObj.responseText);		
					eval(result);
					if(data)
					{
						obj.onEnd = function(_obj_)
						{
							_obj_.onEnd = function(){};
							var value = false,i=0;
							while(!value){i++;value = _obj_.header.order[i];}
							var td = _obj_.content.data.get(data.row+1,i);
							_obj_.mousehandler.content.onRowOver(_obj_.prefix,td.parentNode);
							_obj_.selectRow(td);
						}
						obj.onneworderaccess = false;
						obj.onnewpageaccess = false;
						obj.changePageIndex(data.page);
					} else {
						var td = obj.content.data.get(1,1);
							obj.mousehandler.content.onRowOver(obj.prefix,td.parentNode);
							obj.selectRow(td);
					}
				}
			}
		
			var url = 'I='+this.prefix+'&mode=php&field='+field+'&key='+key;
			var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
				xmlRequestObj.open("POST",this.relativePath+'javascript.php', true);
				xmlRequestObj.onreadystatechange = resultado;
				xmlRequestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlRequestObj.send(url);	
		}
		this.previewFirstResult = function(url)
		{
			/*
			var obj = this;
			
			
			var resultado = function()
			{
				if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
				{
					var result = String(xmlRequestObj.responseText);
					eval(result);
					//obj.debug(result);
					if(obj.onpreviewacess && obj.onnewpageaccess) obj.onPreview(obj);
				}
			}
	
			var url = url+'&mode=preview';
			var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
				xmlRequestObj.open("POST",this.relativePath+'javascript.php', true);
				xmlRequestObj.onreadystatechange = resultado;
				xmlRequestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xmlRequestObj.send(url);
			*/
		}
		this.debug = function(info)
		{
			
			janela = window.open("","IQTableData","height=600,width=700,status=no,toolbar=no,menubar=no,location=no");
			janela.document.open();
			janela.document.write(info);
			janela.document.write('<div align="center"><a href="#" onclick="window.close()"></a></div>');
			
		}
	}
//esta função dá o início e o fim do breadcrumb avançado
	IQTableData.listpages = function(rows,step)
	{
		var obj = new Object();
			obj.primeiro = step;
		var index = 0;	
		var numero_de_paginas = 0;
		
		while(index < rows)
		{
			index = index + step;
			numero_de_paginas++;
		}
		
		obj.ultimo = index - step;
		obj.numero_de_paginas = numero_de_paginas;
		return obj;
	}
	//esta função manipula a tabela com os dados da base de dados
	IQTableData.ajaxquery = function(url,prefix) 
	{
		//esta função é para o ajax apresentar os resultados logo que a query é concluída
		var obj = IQTableData.cache[prefix];
		var prefix = prefix;
		var controlImage = document.getElementById(prefix+'controlImage');
	
		var resultado = function()
		{
			//só passa se a interacção com o servidor tiver concluída e bem sucessida
			if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
			{
					
					
					
					obj.content.data = false;
					
					var divmain = document.getElementById(prefix+'IQTableData'),div = divmain.firstChild.nextSibling,ampulheta = divmain.firstChild.nextSibling.nextSibling.nextSibling;
					var result = String(xmlRequestObj.responseText);
					var browser = IQTableData.selectBox.browser();
					var count = new RegExp(/<count>(.*)<\/count>/);
					var table = new RegExp(/<div>(.*)<\/div>/);
					var fields = new RegExp(/<fields>(.*)<\/fields>/);
					var query = new RegExp(/<query>(.*)<\/query>/);
					var debug = new RegExp(/<debug>(.*)<\/debug>/);
					var request = new RegExp(/<request>(.*)<\/request>/);
					var status = new RegExp(/<state>(.*)<\/state>/);
					var colgroup = new RegExp(/<colgroup>(.*)<\/colgroup>/i);
				
					if(obj.initialize)
					{
						obj.initialize = false;
						if(ampulheta) ampulheta.innerHTML = '';
						return false;
					}
				
					var linhas = result.match(count)?result.match(count)[1]:0;
					if(linhas == 0)
					{
						div.innerHTML = obj.emptyquerystring;
							
							var panel = obj.controlpaneldom();
								
							//	if(panel.top.selectbox)panel.top.selectbox.parentNode.parentNode.style.display = 'none';
							//	if(panel.bottom.selectbox)panel.bottom.selectbox.parentNode.parentNode.style.display = 'none';
								
								if(panel.top.backward.style) panel.top.backward.style.visibility = 'hidden';
								if(panel.top.index.style) panel.top.index.style.visibility = 'hidden';
								if(panel.top.forward.style) panel.top.forward.style.visibility = 'hidden';
								
								if(panel.bottom.backward.style) panel.bottom.backward.style.visibility = 'hidden';
								if(panel.bottom.index.style) panel.bottom.index.style.visibility = 'hidden';
								if(panel.bottom.forward.style) panel.bottom.forward.style.visibility = 'hidden';
						
						if(ampulheta) ampulheta.innerHTML = '';
						
						obj.debugMessageString = String(result);
						//eval("IQTableData.cache['"+prefix+"'].onEmptyResults(IQTableData.cache['"+prefix+"'])");
						obj.onEmptyResults(obj);
						return false;
					}	
					var html = result.match(table)[1];
					
	
					
					if(linhas != 0 || linhas!= undefined) obj.queryrows = Number(linhas);
					if (div)
					{
							//document.getElementById('html').value = String(html).match(/[<table>](.*)[<\/table>]/gi);
							//document.getElementById('html').value = String(result);
							div.innerHTML = html;
							var dom = new IQTableData.tableDomFunctions();
								dom.root = div.firstChild;
								dom.check();
							
							obj.content.data = dom;
								
							var tr = dom.get(0,0).parentNode;
							if(tr) var td = tr.firstChild; else td = false;
							if(td)
								while(td)
								{
									td.onmousemove = obj.mousehandler.position;
									td = td.nextSibling;
								}
										  
						controlImage.center(prefix);
					}
					var html = '',step = Number(obj.globalLimit),paginas = Math.round(linhas/step);	
					var querydata = IQTableData.listpages(linhas,step);
					obj.numberOfPages = querydata.numero_de_paginas;
					obj.pageStep = step;
					
					
					
					if(obj.numberOfPages > 1)
					{	
						var loop = linhas;
						var quantaslinhas = obj.limit;
						var quantaspaginas = paginas;
					
						if(obj.breadcrumb == 'basic')
						{		
							// breadcrumb no modo básico
							var panel = obj.controlpaneldom();
							if(!panel.top.index.firstChild)
							{
								for(var i = 1 ; i <= quantaspaginas ; i++)
								{
									var index = i;
									loop = loop - step;
									if(loop < 0){quantaslinhas = step + loop;loop = 0;html+= '<span style="cursor:pointer;padding:1px;" onclick="javascript:IQTableData.cache[\''+prefix+'\'].selectCurrentIndex(this);IQTableData.cache[\''+prefix+'\'].limit='+quantaslinhas+';IQTableData.cache[\''+prefix+'\'].querylimitindex = '+loop+';IQTableData.cache[\''+prefix+'\'].pageIndex='+index+';IQTableData.cache[\''+prefix+'\'].update();">'+index+'</span>&nbsp;';break;} 
									html+= '<span style="cursor:pointer;padding:1px;" onclick="javascript:IQTableData.cache[\''+prefix+'\'].selectCurrentIndex(this);IQTableData.cache[\''+prefix+'\'].limit='+quantaslinhas+';IQTableData.cache[\''+prefix+'\'].querylimitindex = '+loop+';IQTableData.cache[\''+prefix+'\'].pageIndex='+index+';IQTableData.cache[\''+prefix+'\'].update();">'+index+'</span>&nbsp;';
								}	
									
								if(panel.top.selectbox)panel.top.selectbox.parentNode.parentNode.style.display = 'inline';
								if(panel.bottom.selectbox)panel.bottom.selectbox.parentNode.parentNode.style.display = 'inline';
								
								panel.top.backward.innerHTML = '';
								panel.bottom.backward.innerHTML = panel.top.backward.innerHTML;	
							
								panel.top.forward.innerHTML = '';
								panel.bottom.forward.innerHTML = panel.top.forward.innerHTML;
							
								panel.top.index.innerHTML = html;
								panel.bottom.index.innerHTML = html;
							}	
						} else {
							// breadcrumb no modo avançado	
							if(obj.pageIndex == 0) obj.pageIndex = 1; 
							var panel = obj.controlpaneldom();		
							if(obj.controlPanelElements.top)
							{
								//if(panel.top.selectbox)panel.top.selectbox.parentNode.parentNode.style.display = 'inline';
								
								
								var a = divmain.firstChild;
								a.style.display = 'block';
								
								panel.top.backward.style.visibility = 'visible';
								panel.top.index.style.visibility = 'visible';
								panel.top.forward.style.visibility = 'visible';
								
								panel.top.backward.innerHTML = (obj.controlPanelAlign == 'right'?obj.controlPanelElements.title:'')+'<input type="button" id="'+prefix+'inicio" style="'+obj.controlPanelElements.end.style.html()+'" onclick="javascript:IQTableData.cache[\''+prefix+'\'].limit='+step+';IQTableData.cache[\''+prefix+'\'].querylimitindex = 0;IQTableData.cache[\''+prefix+'\'].onnewpageaccess = true;IQTableData.cache[\''+prefix+'\'].pageIndex=1;IQTableData.cache[\''+prefix+'\'].update();" value="<<"  title="'+(obj.languagecontent[obj.language]['first'])+'"><input type="button" id="'+prefix+'back" style="'+obj.controlPanelElements.minus.style.html()+'" onclick="IQTableData.cache[\''+prefix+'\'].tras();"   title="'+(obj.languagecontent[obj.language]['before'])+'" value="<">';
								panel.top.index.innerHTML = '<input id="'+prefix+'index" style="'+obj.controlPanelElements.index.style.html()+'" type="text" value="'+obj.pageIndex+'" onkeydown="IQTableData.cache[\''+prefix+'\'].onIndexChange(event);" onblur="IQTableData.cache[\''+prefix+'\'].onIndexChangeblurevent(event);">&nbsp;'+obj.controlPanelElements.numPagesPrefix+'&nbsp;'+querydata.numero_de_paginas;
								panel.top.forward.innerHTML = '<input type="button" id="'+prefix+'forward" style="'+obj.controlPanelElements.plus.style.html()+'" onclick="IQTableData.cache[\''+prefix+'\'].frente();"   title="'+(obj.languagecontent[obj.language]['after'])+'" value=">" /><input type="button" id="'+prefix+'fim" style="'+obj.controlPanelElements.begin.style.html()+'" onclick="javascript:IQTableData.cache[\''+prefix+'\'].limit='+step+';IQTableData.cache[\''+prefix+'\'].querylimitindex = '+querydata.ultimo+';IQTableData.cache[\''+prefix+'\'].pageIndex='+querydata.numero_de_paginas+';IQTableData.cache[\''+prefix+'\'].onnewpageaccess = true;IQTableData.cache[\''+prefix+'\'].update();" title="'+(obj.languagecontent[obj.language]['last page'])+'" value=">>">'+(obj.controlPanelAlign == 'left'?obj.controlPanelElements.title:'');
							
								
							}
							
							if(obj.controlPanelElements.bottom)
							{
								//if(panel.bottom.selectbox)panel.bottom.selectbox.parentNode.parentNode.style.display = 'inline';
								var a = divmain.firstChild.nextSibling.nextSibling;
								a.style.display = 'block';
								
								
								panel.bottom.backward.style.visibility = 'visible';
								panel.bottom.index.style.visibility = 'visible';
								panel.bottom.forward.style.visibility = 'visible';

								panel.bottom.backward.innerHTML = panel.top.backward.innerHTML;			
								panel.bottom.index.innerHTML = panel.top.index.innerHTML;
								panel.bottom.forward.innerHTML = panel.top.forward.innerHTML;
							}
							
						}
						
					}
					else 
					{					
							var panel = obj.controlpaneldom();
							if(obj.controlPanelElements.top)
							{
								
								if(panel.top.backward.style) panel.top.backward.style.visibility = 'hidden';
								if(panel.top.index) panel.top.index.style.visibility = 'hidden';
								if(panel.top.forward) panel.top.forward.style.visibility = 'hidden';
							}
							if(obj.controlPanelElements.bottom)
							{
								if(panel.bottom.backward.style) panel.bottom.backward.style.visibility = 'hidden';
								if(panel.bottom.index) panel.bottom.index.style.visibility = 'hidden';
								if(panel.bottom.forward) panel.bottom.forward.style.visibility = 'hidden';
							}
							if(obj.queryrows && panel)
							{
								if(Number(obj.limitarray[0]) > Number(obj.queryrows))
								{
									if(obj.controlPanelElements.top)
									{
										
										var a = divmain.firstChild;
										a.style.display = 'none';
									}
									if(obj.controlPanelElements.bottom)
									{
										
										var a = divmain.firstChild.nextSibling.nextSibling;
										a.style.display = 'none';
									}
								}
							}
					}
					var indexobj = document.getElementById(obj.prefix+'index');
					if(indexobj) indexobj.value = obj.pageIndex;
					if(ampulheta) ampulheta.innerHTML = '';	
					var panel = obj.controlpaneldom();
					var table_top = false;
					var table_bottom = false;
							
					if(obj.onendaccess) obj.onEnd(obj);
					if(obj.oncreateaccess) obj.onCreate(obj);
					if(obj.onneworderaccess) obj.onNewOrder(obj);
					if(obj.onnewpageaccess && !obj.oncreateaccess) obj.onNewPage(obj);
					if(obj.onprintaccess) obj.onPrint(obj);
					if(obj.onreadyaccess) obj.onReady(obj);
					if(obj.onrenewaccess) obj.onReNew(obj);
					
					if(obj.queryrows && panel)
					{
						if(Number(obj.limitarray[0]) > Number(obj.queryrows))
						{
							var a = obj.selectboxadomobj;
							if(a)a.parentNode.parentNode.style.visibility = 'hidden';
							var b = obj.selectboxadomobj;
							if(b)b.parentNode.parentNode.style.visibility = 'hidden';
							
						} else {
							var a = obj.selectboxadomobj;
							if(a)a.parentNode.parentNode.style.visibility = 'visible';
							var b = obj.selectboxbdomobj;
							if(b)b.parentNode.parentNode.style.visibility = 'visible';	
						}
					}
					
					if(obj.controlPanelVisible)
					{
						if(obj.controlPanelElements.top)
						{
							table_top = panel.top.selectbox.parentNode.parentNode.parentNode;
							table_top.style.width = div.firstChild.offsetWidth + 'px';
						}
						if(obj.controlPanelElements.bottom)
						{
							table_bottom = panel.bottom.selectbox.parentNode.parentNode.parentNode;
							table_bottom.style.width = div.firstChild.offsetWidth + 'px';
						}
					}
					obj.interceptRow = false;
					if(obj.selectedColumn) obj.selectColumn(obj.selectedColumn);					
					
					obj.onendaccess = false;
					obj.oncreateaccess = false;
					obj.onneworderaccess = false;
					obj.onnewpageaccess = false;
					obj.onprintaccess = false;
					obj.onreadyaccess = false;
					obj.onrenewaccess = false;
			
			}
			
			return false;
		}
		
		obj.previewFirstResult(url);
		
		var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
			xmlRequestObj.open("POST",obj.relativePath+'javascript.php', true);
			xmlRequestObj.onreadystatechange = resultado;
			xmlRequestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xmlRequestObj.send(url);	
			
	}
	/*
	
	IQTableData.mousedetectionlib = new Object();
	IQTableData.mousedetectionlib.browser = function() 
	{
		var browser = new String(navigator.appName);
		var version = new String(navigator.appVersion);
		if(browser.match('Microsoft Internet Explorer')) return String('IE');
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	}
	*/
	IQTableData.tableDomFunctions = function(obj)
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
			
			for(var y=0;y < row && this.element;y++)
			{
				this.element = this.element.nextSibling;
			}
			
			if(this.node(this.element,col)) return this.node(this.element,col); 
					else return false;
		}
		this.node = function(obj,index)
		{
			if(!obj) return false;
			var obj = obj.firstChild?obj.firstChild:false;
			if(index == 0) return obj;
			var x = 0;
			
			for(var x=0;x < index;x++)
			{
				obj = obj.nextSibling;
			}
			
			
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
	}
	IQTableData.automaticSearch = new Object();
	IQTableData.automaticSearch.create = function(prefix)
	{
		if(!prefix) return false;
		var obj = IQTableData.cache[prefix];
		
		var funcao = 'IQTableData.automaticSearch.'+prefix+'palavra = false;';
			funcao+= 'IQTableData.automaticSearch.'+prefix+'keypressed = function(e)';
			funcao+= '{IQTableData.automaticSearch.createDiv("'+prefix+'");}';	
		eval(funcao);
		var funcao = 'IQTableData.automaticSearch.'+prefix+'update = function(d,e)';
			funcao+= '{';
				funcao+= 'var prefix = "'+prefix+'";';
				funcao+= 'if(window.event) e = window.event;';
				funcao+= 'var character = e.keyCode;';
				funcao+= 'if(character == 13){IQTableData.automaticSearch.delDiv();return false;}';
				funcao+= 'var obj = IQTableData.cache[prefix];';
				funcao+= '    obj.searchQuery = " where "+(obj.fields[Number(obj.interceptColumn)])+" like [P]"+d.value+"%[P]";';
				funcao+= 'obj.update();';
			funcao+= '}';
		eval(funcao);	
	}
	IQTableData.automaticSearch.createDiv = function(prefix)
	{
	//		return false;
//		var div = document.getElementById('autosearchbox');
//		var obj = document.getElementById(prefix+'IQTableData');
//		if(div) return false;
//			div = document.createElement('DIV');
//			document.body.appendChild(div);
//			div.id = 'autosearchbox';
//			div.style.cssText = 'position:absolute;left:'+(obj.offsetWidth / 2)+'px;top:'+(obj.offsetHeight / 2)+'px;z-index:99999999;';
//			div.innerHTML = '<input type="text" value="" onblur="IQTableData.automaticSearch.delDiv();" onkeyup="IQTableData.automaticSearch.'+prefix+'update(this);"/>';	
//			div.firstChild.focus();
	}
	IQTableData.automaticSearch.delDiv = function()
	{
	//	var div = document.getElementById('autosearchbox');
//		if(div) div.parentNode.removeChild(div);
	}
	/*
//	IQTableData.querybuilder = new Object();
//	IQTableData.querybuilder.cache = new Array();
//	IQTableData.querybuilder.obj = function(prefix)
//	{
//		this.prefix = prefix;
//		this.interval = 512;
//		this.querystring = new Array('begin');
//		this.relativePath = '';
//		this.getRelativePath = function(script)
//		{
//			var scripts = document.getElementsByTagName('SCRIPT');
//			if(!scripts) return false;
//			var regexp = new RegExp(script,"gi");
//			for(var i = 0; i<scripts.length; i++)
//			{
//				if(String(scripts.item(i).src).match(regexp))
//					this.relativePath = scripts.item(i).src.replace(regexp,'');
//			}
//		}
//		this.execute = function(query)
//		{
//			if (this.relativePath=='')
//				this.getRelativePath('IQTableData.js');
//			this.interval = 512;
//			var len = Number(query.length);
//			var str = String(query);
//			var index = 0;
//			if(len > 1024)
//			{
//				while(index <= len)
//				{	  
//					this.querystring.push(str.substr(index,this.interval));
//					index = (index + this.interval);
//					if(index > len) this.interval = 0;
//				}
//			} else this.querystring.push(query);
//			this.querystring.push('end');
//			IQTableData.querybuilder.cache[this.prefix] = this;
//			
//			while(this.querystring.length > 0)
//			{
//				IQTableData.querybuilder.ajaxquery(this.relativePath+'qbuilder.php?prefix='+this.prefix+'&str='+this.querystring.shift(),this.prefix);	
//			}
//		}
//	}
//	IQTableData.querybuilder.ajaxquery = function(url,prefix)
//	{
//		var result = function()
//		{
//			if (xmlRequestObj.readyState == 4 && (xmlRequestObj.status == 200 || xmlRequestObj.status == 304))
//			{
//				alert(xmlRequestObj.responseText);
//			}
//		}
//		var xmlRequestObj = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP")
//			xmlRequestObj.onreadystatechange = result;
//			xmlRequestObj.open("POST", url,false);
//			xmlRequestObj.send(null);
//	}
//	*/
	IQTableData.selectBox=new Object();
	IQTableData.selectBox.cache=Array();

	IQTableData.selectBox.obj = function(prefix)
	{
		
		this.prefix=prefix;
		this.className = '';
		this.cache = new Array();
		
		this.content = new Object();
		this.content.style = new IQTableData.style();
		
		this.editableContent = new Object();
		this.editableContent.defaultValue = '';
		this.editableContent.style = new IQTableData.style();
		
		this.content.style.borderColor = '#7F9DB9';
		this.content.style.border = '1px solid '+this.content.style.borderColor;
		this.content.style.color = '#000000';
		this.content.style.backgroundColor = '#ffffff';
		this.content.style.height = 200;
		this.content.style.font='Times New Roman';
		this.content.style.fontSize=12;
		this.content.style.fontWeight='normal';
		this.content.style.margin = '0px';
		
		this.style = new IQTableData.style();
		this.style.height='0px';
		this.style.overColor='#8BBBED';
		//this.style.overColor='#ff0000';
		this.style.selectedColor='#CDE4FC';
		this.style.borderColor='#7F9DB9';
		this.style.backgroundColor='#ffffff';
		this.style.font='Times New Roman';
		this.style.fontSize=12;
		this.style.fontWeight='normal';
		//this.style.border='1px solid '+this.style.borderColor;
		this.style.width = 0;
		this.style.color = '#000000';
		
		this.relativePath='';
		this.showIndex=false;
		this.showValueFirst = false;
		
		this.refreshEvent=false;
		this.htmlFormat = false;
		this.name = '';
		this.value = '';
		this.valueText = '';
		this.scrollvalue = 0;
		this.tableobj = false;
		
		
		this.title = {
			top: false,
			bottom: false,
			left: false,
			right: false
		}
		
		// settings de controle da componente;
		this.cache=Array();
		this.cache['selectedIndexContent']='&nbsp;';
		this.cache['selectedRealIndex']='&nbsp;';
		
		//objecto que vai guardar todas as rows que introduzir na componente
		this.data = new Object();
		this.data.content = new Array();	
		this.data.contentIndex = new Array();
			
		this.state='hidden';
		this.headHTML='';
		this.contentHTML='';
		this.firstTime=0;
		this.ArrowImage=null;
		this.resumeonclick = true;
		this.resumeonDblClick = false;
		this.editable = false;
		this.HTMLcontentObjs = new Object();
		this.selectBoxdomobj = false;
		
		this.onChange = function(){};		
		this.onclick = function(){};		
		this.onmouseover = function(){};		
		this.onmouseout = function(){};		
		this.onmouseup = function(){};		
		this.onmousedown = function(){};
		
		this.replaceStr = function(str,rexp,subs)
		{
			if(!str)return false;
			var result = String(str);
			while(result.search(rexp) != -1){result = result.replace(rexp,subs);}
			return result;
		}
		this.add=function(content)
		{
			var regexp = new RegExp("\"|'","gi");
			if(typeof content == 'string') content = content.replace(regexp,"'");
			this.data.content.push(content);
			this.data.contentIndex.push(this.data.content.length);
			this.getdivwidth(content);
		}
		this.addIndex = function(content,index)
		{
			if(!index && index != 0) return false;
			var regexp = new RegExp("\"|'","gi");
			if(typeof content == 'string') content = content.replace(regexp,"'");
			this.data.content.push(content);
			this.data.contentIndex.push(index);
			this.getdivwidth(content);
		}
		this.getdivwidth = function(obj)
		{
			var span=document.createElement("SPAN");
			document.body.appendChild(span);
			span.innerHTML = obj;
			var width = span.offsetWidth;
			if(width > this.style.width) this.style.width = width;
			span.parentNode.removeChild(span);
		}
		this.verifyindex = function(a,b)
		{
			var index_a = null,index_b = null;
			for(x=0;x<this.data.length;x++){if(a == x) index_a = i;}
			for(x=0;x<this.data.length;x++){if(b == x) index_b = i;}
			if(Number(index_a) == Number(index_b))return true; else return false;
		}
		this.transformObjectToHTML = function(obj)
		{
			var regexp = new RegExp("'","gi");
			var div = document.createElement('DIV');
				document.body.appendChild(div);
				div.appendChild(obj);
			var html = div.innerHTML;
				obj.parentNode.removeChild(obj);
				div.parentNode.removeChild(div);	
			return html;
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
		
		//creates the IQTableData.selectBox for the first time
		this.create=function()
		{
			
			if(!this.refreshEvent)this.style.width = this.style.width;
			IQTableData.selectBox.cache[this.prefix] = this;
			this.relativePath = this.tableobj.relativePath+'img/';
			
			var paddingtop = '';
			var expwidth = 0;
			var margintop = '';
			var regexp = new RegExp("\"|'","gi");
			
			
			var browser = this.browser();
			if(browser == 'IE')
			{imgheight = 19;paddingtop = 'padding-top:1px;';}
			if(browser == 'MOZ' || browser == 'OPERA')
			{imgheight = 18;margintop = 'margin-top:1px;margin-bottom:1px;';}
			
			var s = '<table id="'+this.prefix+'_IQTableData.selectBoxTable" style="background-color:'+this.style.backgroundColor+';border-width:1px;border-style:solid;border-color:'+this.style.borderColor+';height:'+this.style.height+';'+paddingtop+'padding-right:1px;" cellpadding="0" cellspacing="0">';
					s+= '<tr style="vertical-align:middle">';
						s+= '<td id="'+this.prefix+'_selectedIndex" style="width:50px;background-color:'+this.style.backgroundColor+';padding-left:2px;"><div style="padding:0;margin:0;width:'+(this.style.width+expwidth)+'px;overflow:hidden;color:'+this.style.color+';font-family:'+this.style.font+';font-size:'+this.style.fontSize+'px;font-weight:'+this.style.fontWeight+';" '+(this.editable?'onclick="IQTableData.selectBox.cache[\''+this.prefix+'\'].addNewRow(this);"':'')+'>'+this.cache['selectedIndexContent']+'</div></td>';
						s+= '<td><div id="'+this.prefix+'_IQTableData.selectBoxButton" style="margin:0;padding:0;'+margintop+'background-image:url('+this.relativePath+'combo.gif);width:15px;height:'+imgheight+'px;background-repeat:no-repeat;cursor:pointer;" onclick="IQTableData.selectBox.visibility(\''+this.prefix+'\')" onmouseover="IQTableData.selectBox.swapOverArrowImg(\''+this.prefix+'\',this)" onmouseout="IQTableData.selectBox.swapArrowImg(\''+this.prefix+'\',this)"></div></td>';
					s+= '</tr>';
					s+= '</table>';
			this.headHTML = s;
			
			var bottomvisibility = 'border-bottom:0px solid '+this.content.style.borderColor+';';
			var widthoffset = 20;
			var moz_bottomvisible = 'border-bottom:1px solid '+this.content.style.borderColor+';';
			
			if(browser == 'IE') widthoffset = 21; 
			if(browser == 'OPERA') widthoffset = 20;
			if(browser == 'MOZ' && this.state == 'hidden' ) moz_bottomvisible = 'border-bottom:0px solid '+this.content.style.borderColor;
			if(browser == 'OPERA' && this.state == 'hidden' ) moz_bottomvisible = 'border-bottom:0px solid '+this.content.style.borderColor;

			var s = '<div onscroll="IQTableData.selectBox.getscrollvalue.get(this,\''+this.prefix+'\')" style="margin:0;padding:0;position:absolute;border:0px;'+moz_bottomvisible+'">';
				s+= '<table id="'+this.prefix+'_IQTableData.selectBoxContentTable" style="table-layout:fixed;width:'+(this.style.width+widthoffset)+'px;border:1px solid '+this.content.style.borderColor+';background-color:'+this.content.style.backgroundColor+';border-top:0px;overflow:auto;border-bottom:0px;" cellpadding="0" cellspacing="0" border="0">';
			var  bgcolor = '';
			
			
			if(this.state=='visible')
			{
				for(var x=0;x<this.data.content.length;x++)
				{
					
					if(x == this.showIndex) bgcolor='background-color:'+this.style.selectedColor; else bgcolor = '';
					s+= '<tr onmouseover="IQTableData.selectBox.eventMouseOverContent(\''+this.prefix+'\',this)" onclick="IQTableData.selectBox.eventSelectIndex(\''+this.prefix+'\',this.firstChild.firstChild)" style="cursor:pointer;'+bgcolor+';">';
						s+= '<td style="overflow:hidden"><div id="'+this.prefix+'_'+this.data.contentIndex[x]+'_'+x+'" style="position:static;padding:0px;margin:0px;padding-left:2px;overflow:hidden;font-family:'+this.content.style.font+';font-size:'+this.content.style.fontSize+'px;font-weight:'+this.content.style.fontWeight+';">'+this.data.content[x]+'</div></td>';
					s+= '</tr>';
				}
			}
			s+= '</table></div>';
			
			this.contentHTML = s;
			this.outputHTML();
			this.selectBoxdomobj = document.getElementById(this.prefix);
			this.selectBoxTable = this.selectBoxdomobj.firstChild;
			this.selectedIndex = this.selectBoxTable.firstChild.firstChild.firstChild;
			this.selectBoxButton = this.selectedIndex.nextSibling.firstChild;
			this.selectBoxContentTable = this.selectBoxTable.nextSibling.firstChild;
			return this.selectBoxdomobj;
		}
		
		//print the IQTableData.selectBox in the html
		this.outputHTML=function()
		{
			var s = '<div id="'+this.prefix+'" style="width:50px;margin:0;padding:0;'+(this.browser()=='MOZ'?'margin-right:20px;':'')+'">';	
				s+= this.headHTML+this.contentHTML;
				s+= '</div>';
			
			if(this.firstTime==0 && !this.refreshEvent)document.writeln(s);
			 else
			{
				if(!this.selectBoxdomobj)return false;this.selectBoxdomobj.innerHTML=this.headHTML+this.contentHTML;
				var string = new String(this.cache['selectedRealIndex']);
				var rExp = new RegExp('"','gi');
				var newString = new String ('&quot;');
				var converted = string.replace(rExp,newString);
					converted = converted.replace(rExp,newString);
				this.value = converted;
				if(this.cache['previousValue'] && this.cache['previousValue'] != converted)
				{eval("IQTableData.selectBox.cache['"+this.prefix+"'].onChange(IQTableData.selectBox.cache['"+this.prefix+"']);");}
				
				this.selectBoxdomobj.style.textAlign = 'left';
				this.selectBoxdomobj.innerHTML+='<input type="hidden" name="'+this.name+'" value="'+converted+'" />';
				this.cache['previousValue'] = converted;
				
			}
		}
		this.index = function(index)
		{
			this.cache['selectedIndexContent'] = this.data.content[index];
			this.refreshEvent=true;
			this.state='hidden';
			this.showIndex = index;
			this.cache['selectedRealIndex'] = index;
			this.create();
		}
		this.indexStatic = function(index)
		{
			this.cache['selectedIndexContent'] = this.data.content[index];
			this.refreshEvent=true;
			this.state='hidden';
			this.showIndex = index;
			this.cache['selectedRealIndex'] = index;
			var obj = this.selectedIndex;
			if(obj) obj.firstChild.innerHTML = '<div id="'+this.prefix+'_'+this.data.contentIndex[index]+'_'+index+'" style="text-align:left;position:static;padding:0px;margin:0px;'+(this.browser()=='IE'?'margin-left:-6px;':'')+'width:'+(this.style.width)+'px;overflow:hidden;font-family:'+this.content.style.font+';font-size:'+this.content.style.fontSize+'px;font-weight:'+this.content.style.fontWeight+';">'+this.data.content[index]+'</div>';
			this.tiggerDropDownEvent();
			this.tiggerDropDownEvent();
		}
		this.arrayIndex = function(index)
		{
			var i = this.data.contentIndex.index(index);
			this.index(i);
		}
		this.getContent = function(index)
		{
			var content = this.data.content;
			var i = this.data.contentIndex.index(index);
			return content[i];
		}
		this.clear = function()
		{
			this.data.content = new Array();
			this.data.contentIndex = new Array();
			this.cache['selectedIndexContent'] = '';
			this.cache['selectedRealIndex'] = false;
			this.showIndex = false;
		}
		this.addNewRow = function()
		{
			var obj = this.selectedIndex;
			var width = obj.offsetWidth;
			if(obj.firstChild.name == 'editvalue') return false;
			if(IQTableData.selectBox.browser() == 'IE') width-= 5;
			if(IQTableData.selectBox.browser() == 'MOZ') width-= 2;
			obj.innerHTML = '<input name="editvalue" style="width:'+width+'px;border:0px;'+this.editableContent.style.html()+'" onblur="IQTableData.selectBox.cache[\''+this.prefix+'\'].updateEditValue(this);" style="border:0px;" type="text" />';	
			
			this.data.content[-1] = false;
			this.showIndex = -1;
			this.value = -1;
			this.valueText = false;
			this.cache['selectedRealIndex'] = -1;
			
			obj.firstChild.focus();
			obj.firstChild.focus();
		}
		this.updateEditValue = function(obj_)
		{
			IQTableData.selectBox.cache[this.prefix].data.content[-1] = obj_.value;
			IQTableData.selectBox.cache[this.prefix].showIndex = -1;
			IQTableData.selectBox.cache[this.prefix].value = -1;
			IQTableData.selectBox.cache[this.prefix].valueText = obj_.value;
			IQTableData.selectBox.cache[this.prefix].cache['selectedIndexContent'] = obj_.value;
			eval("IQTableData.selectBox.cache['"+this.prefix+"'].onChange(IQTableData.selectBox.cache['"+this.prefix+"']);");
		}
		this.showEditValue = function()
		{
			var obj = this.selectedIndex;
			var width = obj.offsetWidth;
			this.cache['selectedIndexContent'] = this.valueText;
			this.cache['selectedRealIndex'] = -1;
			this.value = -1;
			this.create();
		}
		this.browser = function() 
		{
			var browser = new String(navigator.appName);
			if(browser.match('Microsoft Internet Explorer')) return String('IE');
			if(browser.match('Netscape')) return String('MOZ');
			if(browser.match('Opera')) return String('OPERA');
		}
		this.tiggerDropDownEvent = function()
		{
			IQTableData.selectBox.visibility(this.prefix);
		}
	}
	
	IQTableData.selectBox.getscrollvalue = new Object();
	IQTableData.selectBox.getscrollvalue.value = new Array();
	IQTableData.selectBox.getscrollvalue.get = function(obj,prefix){IQTableData.selectBox.getscrollvalue.value[prefix] = obj.scrollTop;}
	IQTableData.selectBox.tempfunc = null;

	IQTableData.selectBox.buttons = function(prefix,name)
	{
		this.name = name;
		this.enable = false;
		this.type = 'button';
		this.prefix = prefix;
		this.className = '';
		this.id = prefix+this.name+'_IQTableData.selectBox_buttons';
		this.style = new IQTableData.selectBox.style;
		this.onChange = false;
		this.onclick = false;
		this.onmouseover = false;
		this.onmousedown = false;
		this.onmouseup = false;
		this.onmouseout = false;
		this.status = null;
		this.html = function(obj)
		{
			var s = '';
			this.status = this;
			if(this.onclick) s+= 'onclick="javascript:IQTableData.selectBox.tempfunc = '+this.onclick.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);" ';
			if(this.onmouseover) s+= 'onmouseover="javascript:IQTableData.selectBox.tempfunc = '+this.onmouseover.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);" ';
			if(this.onmousedown) s+= 'onmousedown="javascript:IQTableData.selectBox.tempfunc = '+this.onmousedown.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);" ';
			if(this.onmouseup) s+= 'onmouseup="javascript:IQTableData.selectBox.tempfunc = '+this.onmouseup.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);" ';
			if(this.onmouseout) s+= 'onmouseout="javascript:IQTableData.selectBox.tempfunc = '+this.onmouseout.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);" ';
			if(this.onChange) s+= 'IQTableData.selectBox.tempfunc = '+this.onChange.toString()+';IQTableData.selectBox.tempfunc(IQTableData.selectBox.cache[\''+this.prefix+'\']);';
			return s;
		}
	}
	//sets the visibility property of the content data
	IQTableData.selectBox.eventMouseOverContent=function(prefix,div)
	{
		if(!IQTableData.selectBox.cache[prefix].cache['MouseOver'])
			IQTableData.selectBox.cache[prefix].cache['MouseOver'] = new Object();
		var mem = IQTableData.selectBox.cache[prefix].cache['MouseOver'];
		
		if(mem.obj) mem.obj.style.backgroundColor = mem.objColor;
			
			mem.obj = div;
			mem.id = div.id;
			mem.objColor = div.style.backgroundColor;
			
		div.style.backgroundColor = IQTableData.selectBox.cache[prefix].style.overColor;	
	}
	IQTableData.selectBox.eventSelectIndex=function(prefix,div)
	{
			IQTableData.selectBoxInnerObj = IQTableData.selectBox.cache[prefix];
		if(!IQTableData.selectBoxInnerObj.cache['selectedIndex'])IQTableData.selectBoxInnerObj.cache['selectedIndex'] = new Object();		
		if(!IQTableData.selectBoxInnerObj.resumeonclick && !IQTableData.selectBoxInnerObj.resumeonDblClick)return false;
		var obj = IQTableData.selectBoxInnerObj.selectedIndex;
			IQTableData.selectBoxButton = IQTableData.selectBoxInnerObj.selectBoxButton;
			IQTableData.selectBoxDiv = IQTableData.selectBoxInnerObj.selectBoxdomobj;
			obj.innerHTML=div.innerHTML;
			//alert(div.innerHTML);
			IQTableData.selectBoxInnerObj.cache['selectedIndexContent'] = IQTableData.selectBoxInnerObj.replaceStr(div.innerHTML,'"',"'");
			IQTableData.selectBoxInnerObj.cache['selectedRealIndex'] = div.id.split('_')[2];
			IQTableData.selectBoxInnerObj.value = div.id.split('_')[2];
			IQTableData.selectBoxInnerObj.valueText = div.innerHTML;
			IQTableData.selectBoxInnerObj.refreshEvent=true;
			IQTableData.selectBoxInnerObj.state='hidden';
			IQTableData.selectBoxInnerObj.showIndex = div.id.split('_')[2];
			IQTableData.selectBoxInnerObj.create();
		
	}
	IQTableData.selectBox.visibility=function(prefix)
	{	
		IQTableData.selectBoxInnerObj = IQTableData.selectBox.cache[prefix];
		IQTableData.selectBoxInnerObj.firstTime = 1;
			
		var div = IQTableData.selectBoxInnerObj.selectBoxdomobj;
		var table = IQTableData.selectBoxInnerObj.selectBoxTable;
		if(!div || !table) return false;	
		
		if(IQTableData.selectBoxInnerObj.state=='visible')IQTableData.selectBoxInnerObj.state='hidden'; else IQTableData.selectBoxInnerObj.state='visible';
		
		var obj = IQTableData.selectBoxInnerObj.selectedIndex;		
		if(!obj) return false;
		var width = obj.offsetWidth;
		
		IQTableData.selectBoxInnerObj.create();

		var obj = IQTableData.selectBoxInnerObj.selectedIndex;
		var table = IQTableData.selectBoxInnerObj.selectBoxTable;		
		if(!obj)return false;
		obj.style.width=width+'px';
		table.style.borderBottom='1px solid '+IQTableData.selectBoxInnerObj.style.borderColor;
	}
	IQTableData.selectBox.swapOverArrowImg=function(prefix,obj)
	{
		var image = obj;
		image.style.backgroundImage = 'url('+IQTableData.selectBox.cache[prefix].relativePath+'combo_over.gif)';
	}
	IQTableData.selectBox.swapArrowImg=function(prefix,obj)
	{
		var image = obj;
		image.style.backgroundImage = 'url('+IQTableData.selectBox.cache[prefix].relativePath+'combo.gif)';
	}
	IQTableData.selectBox.browser = function() 
	{
		var browser = new String(navigator.appName);
		if(browser.match('Microsoft Internet Explorer')) return String('IE');
		if(browser.match('Netscape')) return String('MOZ');
		if(browser.match('Opera')) return String('OPERA');
	}
	
