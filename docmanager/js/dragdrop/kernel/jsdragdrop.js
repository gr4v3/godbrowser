// JavaScript Document
var pushOnce = function(obj,value)
{
	var arr = new Array(),d = true,a = false;
	while(obj.length>0)
	{
		a = obj.shift();
		if(a==value) {a = value;d = false;}
		arr.push(a);
	}
	if(d) arr.push(value);
	return arr;
}
var eraseByValue = function(obj,value)
{
	var arr = new Array();
	for(var i=0;i<obj.length;i++){if(obj[i] != value) arr.push(obj[i]);}
	return arr;
}
function IQGetPageCoordsObj (obj) {var coords = {x: 0, y: 0};do {coords.x += obj.offsetLeft;coords.y += obj.offsetTop;}while ((obj = obj.offsetParent));return coords;}
var Drag = {
	obj:[],
	current:false,
	allPrefix:[],
	timeoutId:false,
	identify:function(obj)
	{
		return window.event?String(obj.sourceIndex):String(obj.className+obj.offsetTop+obj.offsetLeft);
	},
	root:function()
	{
		return window.parent.document.getElementById('myframe');
	},
	init:function()
	{
		var o = false;
		for(var i = 0;i<arguments.length;i++)
		{
			o = arguments[i];
			if(typeof o == 'string') o = $(arguments[i]);
			if(o)
			{
				o.onDrag = function(){};
				o.onDrop = function(){};
				o.onDragStart = function(){};
				o.onDragEnd = function(){};
				o.onCollisionStart = function(){};
				o.onCollisionEnd = function(){};
				o.onCollision = function(){};
				o.collisions = new Array();
				o.exterior = new Array();
				o.state = new Object();
				o.current = false;
				o.target = false;
				o.previousBOX = false;
				o.previousOBJ = false;
				Drag.allPrefix = pushOnce(Drag.allPrefix,Drag.identify(o));
				Drag.obj[Drag.identify(o)] = o;
				Drag.collision(o);
			}
		}
	},
	dragable:function()
	{
		var o = false;
		for(var i = 0;i<arguments.length;i++)
		{
			o = arguments[i];
			if(typeof o == 'string') o = document.getElementById(arguments[i]);
			
			if(window.addEventListener){ // Mozilla, Netscape, Firefox
				o.addEventListener('mousedown',Drag.start,false);
			} else { // IE
				o.attachEvent('onmousedown',Drag.start);
			}
		}
	},
	detectable:function()
	{
		
	},
	conditionDragable:function()
	{
		var o = false;
		for(var i = 0;i<arguments.length;i++)
		{
			o = arguments[i];
			if(typeof o == 'string') o = document.getElementById(arguments[i]);
			
			if(window.addEventListener){ // Mozilla, Netscape, Firefox
				o.addEventListener('mousedown',o.onDragStart,false);
			} else { // IE
				o.attachEvent('onmousedown',o.onDragStart);
			}
		}
	},
	undragable:function()
	{	
		var o = false;
		for(var i = 0;i<arguments.length;i++)
		{
			o = arguments[i];
			if(typeof o == 'string') o = document.getElementById(arguments[i]);
			o.onmousedown = function(){};
		}
	},
	start:function(e,obj)
	{
		var e = window.event?window.event:e;
		var o = window.event?Drag.current = e.srcElement.parentNode:Drag.current = this;
		
		var events = new Event(e);
		
		if(obj) o = Drag.current = obj;
		else o.onDragStart(e);
		var coords = IQGetPageCoordsObj(o);		
			o.style.left = coords.x + 'px';
			o.style.top = coords.y + 'px';
			o.lastMouseX = Number(events.page.x);
			o.lastMouseY = Number(events.page.y);
		if(window.addEventListener){ // Mozilla, Netscape, Firefox
			document.addEventListener('mousemove',Drag.commonEventMove,false);
			document.addEventListener('mouseup',Drag.commonEventEnd, false);
		} else { // IE
			document.attachEvent('onmousemove',Drag.commonEventMove);
			document.attachEvent('onmouseup',Drag.commonEventEnd);
		}
		return false;
	},
	force:function(obj)
	{
		
		if(!obj) return false;
		
		
		Drag.current = obj;
		obj.onDragStart(obj);
		
		var coords = $(obj).getCoordinates();
				
			obj.style.left = (coords.left+10) + 'px';
			obj.style.top = coords.top + 'px';
			obj.lastMouseX = coords.left;
			obj.lastMouseY = coords.top;
		
		if(window.addEventListener){ // Mozilla, Netscape, Firefox
			document.addEventListener('mousemove',Drag.commonEventMove,false);
			document.addEventListener('mouseup',Drag.commonEventEnd, false);
		} else { // IE
			document.attachEvent('onmousemove',Drag.commonEventMove);
			document.attachEvent('onmouseup',Drag.commonEventEnd);
		}
		return false;
		
	},
	staticStart:function(e,o)
	{
		var coords = IQGetPageCoordsObj(o);		
			o.style.left = coords.x + 'px';
			o.style.top = coords.y + 'px';
			o.lastMouseX = e.clientX;
			o.lastMouseY = e.clientY;
		if(window.addEventListener){ // Mozilla, Netscape, Firefox
			document.addEventListener('mousemove',Drag.commonEventMove,false);
			document.addEventListener('mouseup',Drag.commonEventEnd, false);
		} else { // IE
			document.attachEvent('onmousemove',Drag.commonEventMove);
			document.attachEvent('onmouseup',Drag.commonEventEnd);
		}
		return false;
	},
	commonEventMove:function(e){Drag.collision(Drag.drag(e));},
	commonEventEnd:function(e){Drag.end(e);},
	drag:function(e) 
	{
		var e = window.event?window.event:e;
		var events = new Event(e);
		
		var o =  Drag.current;
		var newX = parseInt(o.style.left) + Number(events.page.x) - o.lastMouseX;
		var newY = parseInt(o.style.top) + Number(events.page.y) - o.lastMouseY;
		o.style.position = 'absolute';
		o.style.left = newX + "px";
		o.style.top = newY  + "px";
		o.lastMouseX = Number(events.page.x);
		o.lastMouseY = Number(events.page.y);
		return o;
	},
	end:function(e)
	{
		var e = window.event?window.event:e;
		if(window.addEventListener)
		{
			document.removeEventListener('mousemove',Drag.commonEventMove,false);
			document.removeEventListener('mouseup',Drag.commonEventEnd,false);
		} else {
			document.detachEvent('onmousemove',Drag.commonEventMove);
			document.detachEvent('onmouseup',Drag.commonEventEnd);
		}	
		Drag.current.onDragEnd(e.clientX,e.clientY);
		Drag.current = null;
	},
	setZindex:function(id)
	{
		var value = false;
		for(var i=0;i<Drag.allPrefix.length;i++)
		{
			value = Drag.obj[Drag.allPrefix[i]];
			value.style.zIndex = 1;
		}
		Drag.obj[id].style.zIndex = 10;
	},
	collision:function(o)
	{
		if(!o) return false;
		var coords = $(o).getCoordinates();
		
		var state = {
			topleft:{x:coords.left,y:coords.top},
			topright:{x:coords.left + coords.width,y:coords.top},
			bottomleft:{x:coords.left,y:coords.top + coords.height},
			bottomright:{x:coords.left + coords.width,y:coords.top + coords.height},
			active:false
		}
		o.state = state;
		if(!Drag.current) return false;
		for(var i=0;i<Drag.allPrefix.length;i++)
		{
			value = Drag.obj[Drag.allPrefix[i]];
			if(
				(Drag.identify(value) != Drag.identify(Drag.current))
					&&
					(
						(o.lastMouseX > value.state.topleft.x)
						&&
						(o.lastMouseY > value.state.topleft.y)
						&&
						(o.lastMouseX < value.state.topright.x)
						&&
						(o.lastMouseY < value.state.bottomleft.y)
					)
				)
			{ 
				o.collisions = pushOnce(o.collisions,value);
				o.exterior = eraseByValue(o.exterior,value);
				o.onCollision();
			} else {
				o.collisions = eraseByValue(o.collisions,value);
				o.exterior = pushOnce(o.exterior,value);
			}
			
			o.onDrag();
		}
	},
	verify:{
		exterior:function(root,obj)
		{
			var access = false;
			for(var i=0;i<root.exterior.length;i++)
			{
				if(root.exterior[i] === obj) access = true;
			}
			return access;
		},
		interior:function(root,obj)
		{
			
			var access = false;
			for(var i=0;i<root.collisions.length;i++)
			{
				if(root.collisions[i] === obj) access = true;
			}
			return access;
		}
	}
}