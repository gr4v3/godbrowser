try {

function MM_reloadPage(init){if(init==true)with(navigator){if ((appName=="Netscape")&&(parseInt(appVersion)==4)){document.MM_pgW=innerWidth;document.MM_pgH=innerHeight;onresize=MM_reloadPage;}}else if(innerWidth!=document.MM_pgW||innerHeight!=document.MM_pgH)location.reload();}MM_reloadPage(true);
var MM_findObjCounter = 0;
var MM_findObjTime=0;
var MM_findObjArray = new Array();

function MM_findObj(n,d){
//	MM_findObjCounter++;
//	MM_findObjArray.push(n);
//	var aaa = new Date();

	var p,i,x;if(!d)d=document;if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}if(!(x=d[n])&&d.all)x=d.all[n];var dformslength=d.forms.length;for(i=0;!x&&i<dformslength;i++)x=d.forms[i][n];if (!x&&d.layers){ var dlayerslength=d.layers.length;for(i=0;i<dlayerslength;i++)x=MM_findObj(n,d.layers[i].document); }if(!x&&d.getElementById)x=d.getElementById(n);

//	var bbb = new Date();
//	MM_findObjTime=MM_findObjTime+(bbb.getTime()-aaa.getTime());
	return x;
	}
function MM_changeProp(objName,x,theProp,theValue){var obj=MM_findObj(objName);if(obj&&(theProp.indexOf("style.")==-1||obj.style)){if(theValue==true||theValue==false)eval("obj."+theProp+"="+theValue);else eval("obj."+theProp+"='"+theValue+"'");}}
function IQSetPos(ObjID,top,left,width,height,zindex){if (top!=""){MM_changeProp(ObjID,'','style.top',top,'LAYER');}if (left!=""){MM_changeProp(ObjID,'','style.left',left,'LAYER');}if(width!=""){MM_changeProp(ObjID,'','style.width',width,'LAYER');}if(height!=""){MM_changeProp(ObjID,'','style.height',height,'LAYER');}if(zindex!=""){MM_changeProp(ObjID,'','style.zindex',zindex,'LAYER');}}
function IQSetHtml(ObjID,NewHtml){if(NewHtml!=""){MM_changeProp(ObjID,'','innerHTML',NewHtml,'DIV');MM_changeProp(ObjID,'','innerHTML',NewHtml,'SPAN');}/*var obj = MM_findObj(ObjID);if (NewText==null){eval("obj.innerHTML='';");}else{eval("obj.innerHHTML='"+NewText+"';");}*/}
function IQSetText(ObjID,NewText){if(NewText!=""){/*MM_changeProp(ObjID,'','innerText',NewText,'DIV');MM_changeProp(ObjID,'','innerText',NewText,'SPAN');MM_changeProp(ObjID,'','value',NewText,'INPUT/TEXT');MM_changeProp(ObjID,'','value',NewText,'TEXTAREA');MM_changeProp(ObjID,'','value',NewText,'INPUT/PASSWORD');*/var obj = MM_findObj(ObjID);if (NewText==null){eval("obj.innerText='';");eval("obj.value='';");}else{eval("obj.innerText='"+NewText+"';");eval("obj.value='"+NewText+"';");}}}
function IQSetValue(ObjID,NewValue){IQSetText(ObjID,NewValue);}
function IQSetAction(ObjID,NewAction){if(NewAction!=""){MM_changeProp(ObjID,'','action',NewAction,'FORM');}}
function IQSetChecked(ObjID){MM_changeProp(ObjID,'','checked',true,'INPUT/CHECKBOX');MM_changeProp(ObjID,'','checked',true,'INPUT/RADIO')}
function IQSetUnchecked(ObjID){MM_changeProp(ObjID,'','checked',false,'INPUT/CHECKBOX');}
function IQSetSrc(ObjID,NewSrc){if(NewSrc!="") {MM_changeProp(ObjID,'','src',NewSrc,'IMG');}}
function IQRadioSelect(ObjId,NewValue){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} var objlength=obj.length;for (i=0;i<objlength;i++)if (obj[i].value==NewValue)obj[i].checked=true;}
function IQSetItemIndex(ObjID,NewIndex){if(NewIndex!=""){MM_changeProp(ObjID,'','selectedIndex',NewIndex,'SELECT');}}
function IQSelectClearValues(ObjId){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} for(i=(obj.length-1);i>=0;i--)obj.options[i]=null;}
function IQSelectAddValue(ObjId,NewText,NewValue){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} var optionName=new Option(NewText,NewValue);obj.options[obj.length]=optionName;}
function IQSelectInsertValue(ObjId,ItemIndex,NewText,NewValue){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} if(ItemIndex>=obj.length){IQSelectAddValue(ObjID,NewText,NewValue);}else{var optionName=new Option(NewText, NewValue);obj.options[obj.length]=optionName;for(i=(obj.length-1);i>ItemIndex;i--){var optionName=new Option(obj.options[i-1].text,obj.options[i-1].value);obj.options[i]=optionName;}var optionName=new Option(NewText,NewValue);obj.options[ItemIndex]=optionName;}}
function IQSelectDeleteValue(ObjId,ItemIndex){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} obj.options[ItemIndex]=null;}
function IQDisplay(ObjId,Show,KeepSpace){var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} if((obj!=null)&&(obj.style!=null)){if((Show=='1')||(Show=='true')||(Show==true)){if((KeepSpace=='1')||(KeepSpace=='true')||(KeepSpace==true)){obj.style.display = 'inline';obj.style.visibility = 'visible';}else{obj.style.display='inline';obj.style.visibility='hidden';}}else{if((KeepSpace=='1')||(KeepSpace=='true')){obj.style.display='none';obj.style.visibility='visible';}else{obj.style.display='none';obj.style.visibility='hidden';}}}}
function IQTrim(str){return str.replace(/^\s*|\s*$/g,"");}
function IQStringWords(str){var i=0;if(str!='')i++;var j=0;str=IQTrim(str);var strlength=str.length;while(j<strlength){if(str.charAt(j)==' '){i++;j++;while(str.charAt(j)==' ')j++;j--;}j++;}var ii=i;var r=new Array(i);var s;j=0;while(i>0){s='';while(str.charAt(j)==' ')j++;strlength=str.length;while((j<strlength)&&(str.charAt(j)!=' ')){s=s+str.charAt(j);j++;}r[ii-i]=s;i--;}return r;}
function IQStringWordsChar(str,Ch){var i=0;if(str!='')i++;var j=0;str=IQTrim(str);var strlength=str.length;while(j<strlength){if(str.charAt(j)==Ch){i++;j++;while(str.charAt(j)==Ch)j++;j--;}j++;}var ii=i;var r=new Array(i);var s;j=0;while(i>0){s='';while(str.charAt(j)==Ch)j++;strlength=str.length;while((j<strlength)&&(str.charAt(j)!=Ch)){s=s+str.charAt(j);j++;}r[ii-i]=s;i--;}return r;}
function IQStringSet(str,add,remove){var str2 = new String(str);var add2 = new String(add);var remove2 = new String(remove);var r1=IQStringWords(str2);var i=0;var r2=IQStringWords(add2);var r3=IQStringWords(remove2);var r3length=r3.length;for(i=0;i<r3length;i++){	var r1length=r1.length;for(j=0;j<r1length;j++) { if(r1[j]==r3[i])	r1[j]=null;	} }var s='';var r1length=r1.length;for(i=0;i<r1length;i++) { if(s!='') s=s+' ';if(r1[i]!=null)s=s+r1[i]; }var found=false;var r2length=r2.length;for(i=0;i<r2length;i++){	found=false; var r1length=r1.length;for(j=0;j<r1length;j++)	{ if ((r1[j]!=null)&&(r2[i]==r1[j])) found=true;}if (found==false) {if(s!='')s=s+' ';s=s+r2[i];}} return s;}
//var IQClassObj=0;
//var IQClassStr=0;
//var IQClassTime=0;
function IQClass(objname,add,remove){
//var aaa = new Date();
	var obj=null;if (typeof(objname)=='string'){
//IQClassStr++;
	obj=document.getElementById(objname);} else {
//IQClassObj++;
	obj=objname;} if (obj==null) return; if (obj.className!=undefined){var s = '';if (obj.className==remove) s=add; else s=IQStringSet(obj.className,add,remove);if (obj.className!=s) obj.className=s;/*MM_changeProp(objname,'','className',s);*/}

//var bbb = new Date();
//IQClassTime=IQClassTime+(bbb.getTime()-aaa.getTime());
	}
function IQToogleClass(objname,op1,op2){var obj=null;if (typeof(objname)=='string'){obj=MM_findObj(objname);} else {obj=objname;} var c=IQStringWords(obj.className);var b=false;var clength=c.length;for (i=0;i<clength;i++){if (c[i]==op1){i=c.length;IQClass(objname,op2,op1);b=true;return 2}}if (b==false) {IQClass(objname,op1,op2);return 1}}
function IQStringCopy(strbase,ini,fin){if((ini<0)||(fin<-1)||(ini>=strbase.length)||(fin>=strbase.length)||((fin!=-1)&&(ini>fin))){return '';}else{if(fin==-1){var s='';var strbaselength=strbase.length;for (i=ini;i<strbaselength;i++)s=s+strbase.charAt(i);return s;}else{var s='';for(i=ini;i<=fin;i++)s=s+strbase.charAt(i);return s;}}}
function IQIndexOf(arr,obj){var r=-1;var arrlength=arr.length;for(i=0;i<arrlength;i++)if(arr[i]==obj)r=i;return r;}
function IQToogleProp(objName,theProp,theValue1,theValue2){var obj = MM_findObj(objName);if(obj&&(theProp.indexOf("style.")==-1||obj.style)){if(theValue1==true||theValue1==false||theValue2==false||theValue2==true){if (eval("obj."+theProp+".indexOf('"+theValue1+"')>0")){eval("obj."+theProp+"="+theValue2);} else { eval("obj."+theProp+"="+theValue1);}} else {if (eval("obj."+theProp+".indexOf('"+theValue1+"')>0")){eval("obj."+theProp+"='"+theValue2+"'");} else {eval("obj."+theProp+"='"+theValue1+"'");}}}}
function IQScrollTop(){var scrollYPos;if (typeof window.pageYOffset != 'undefined') {scrollYPos = window.pageYOffset;}else if (document.compatMode && document.compatMode != 'BackCompat') {scrollYPos = document.documentElement.scrollTop;}else {scrollYPos = document.body.scrollTop;}return scrollYPos;}
function IQGetPageCoords (ObjId) {var obj=null;if (typeof(ObjId)=='string'){obj=MM_findObj(ObjId);} else {obj=ObjId;} var coords = {x: 0, y: 0};do {coords.x += obj.offsetLeft;coords.y += obj.offsetTop;}while ((obj = obj.offsetParent));return coords;}
function IQGetPageCoordsObj (obj) {var coords = {x: 0, y: 0};do {coords.x += obj.offsetLeft;coords.y += obj.offsetTop;}while ((obj = obj.offsetParent));return coords;}
var CacheObjs = Array();
var CacheObjIndex = Array();
function IQFindObj2(_name)
{
var n=0;
var found=false;
var CacheObjIndexlength=CacheObjIndex.length;
while ((n<CacheObjIndexlength) && (found==false)) 
{
	if (CacheObjIndex[n]==_name)
	{
		found=true;
		return CacheObjs[n];
	}
	n++;
}
if (found==false)
{
	var obj = MM_findObj(_name);
	CacheObjs[CacheObjslength]=obj;
	CacheObjIndex[CacheObjIndexlength]=_name;return obj;
}
}


function ObjCached()
{
 this.Index = '';
 this.Obj = null;
}
function CmpObjCached(a,b)
{
	if (a.Index<b.Index)
		return -1;
	else if (a.Index>b.Index)
		return 1;
	else
		return 0;
}

var ObjCacheArray = Array(100);
for (var i=0;i<100;i++) ObjCacheArray[i] = new Array();
function IQFindObj(_name)
{
	var n = _name.charCodeAt(0);
	n = n%100;
	var arr = ObjCacheArray[n];

	// Encontrar o elemento por pesquisa binária
	var ini = 0;
	var fin = arr.length-1;
	var mid = 0;
	var obj = null;
	while (ini<=fin)
	{
		mid = (ini+fin)/2;
		obj = arr[mid];
		if (obj!=null)
		{
			if (_name==obj.Index)
			{
				return obj.Obj;
			}
			if (_name<obj.Index)
			{
				fin = mid-1;
			}
			if (_name>obj.Index)
			{
				ini = mid+1;
			}
		}
		else
		{
			ini=fin+1;
		}
	}

	// Se não encontrou introduzir o objecto na cache
	if (obj==null) // não existem elementos na lista
	{
		obj = new ObjCached();
		obj.Index = _name;
		obj.Obj = MM_findObj(_name);
		arr[arr.length] = obj;
		return (obj.Obj);
	}
	else if (ini>fin)
	{
		obj = new ObjCached();
		obj.Index = _name;
		obj.Obj = MM_findObj(_name);
		arr[arr.length] = obj;
		arr.sort(CmpObjCached);
		return (obj.Obj);
	}
	return null;

//	return IQFindObj(_name);
}

function IQNewDiv(id,css) {var mybody=document.getElementsByTagName("body").item(0);var myDiv=document.createElement("div");myDiv.className=css;myDiv.setAttribute('id',id);mybody.appendChild(myDiv);return myDiv;}

function IQDelDiv(obj) {obj.parentNode.removeChild(obj);}

function IQDivModal(width,height)
{
	var div=IQNewDiv('IQlocked_background','');
		div.style.width=width;
		div.style.height=height+24;
		div.innerHTML='&nbsp;';
		div.onstartselect='return false';
		div.style.zIndex = 55;
		div.style.backgroundRepeat='repeat';

	return div;
}


function IQGetWidthObj(text,classname)
{
	objdiv=IQNewDiv('IQGetWidthObj_temp','');
	objdiv.style.width='0%';
	objdiv.className=classname;
	objdiv.innerHTML=String(text);
	var width=objdiv.offsetWidth;
	IQDelDiv(objdiv);
	return width;
}


Number.prototype.frac=function(value){var i=String(this).indexOf('.');if(i==-1)return this;return Number(String(this).substring(0,i+Number(value)+1))}
Array.prototype.indexOf=function(value){var thislength=this.length;for(var i=0;i<thislength;i++){if(this[i]==value)return i}return-1}
Array.prototype.max=function(){var value=0;var thislength=this.length;for(var i=0;i<thislength;i++){if(this[i]>value)value=this[i]}return value}
Array.prototype.min=function(){var value=this.max();var thislength=this.length;for (var i=0;i<thislength;i++){if(this[i]<value) value=this[i]}return value}
Array.prototype.average=function(){var value=0;var len=this.length;var thislength=this.length;for(var i=0;i<thislength;i++){if (typeof(this[i])=='number')value=value+this[i];else len--}return (value/len)}
Array.prototype.insert=function(value,index){var array=new Array();var thislength=this.length;for(var i=0;i<thislength;i++) array.push(this[i]);while(this.length>0) this.pop();if (index==0){this.push(value);var arraylength = array.length;for(var i=0;i<arraylength;i++) this.push(array[i]);return}var first=array.slice(0,index);var second=array.slice(index);while(first.length>0) this.push(first.shift());this.push(value);while(second.length>0) this.push(second.shift())}
Array.prototype.del=function(index){this.array=new Array();while(this.length>0)this.array.push(this.shift());if(index==0){this.array.shift();while(this.array.length>0) this.push(this.array.shift());}else{var first=this.array.slice(0,index);var second=this.array.slice(index+1);while(first.length>0) this.push(first.shift());while(second.length>0) this.push(second.shift())}}
Array.prototype.copy=function(){var target=new Array();for(var i=0;i<this.length;i++)target.push(this[i]);return target;}
Array.prototype.random=function(){return this[Number(Math.random()*(this.length-1)).frac(0)]}
Array.prototype.find=function(value,level,show){for(var i=0;i<this.length;i++){if(arguments.length==3){if(this[i][level]==value){if(!show){return true}else{return this[i]}}} else if(this[i]==value) return true}return false}
function asc(a,b){return (a-b)}
function dec(a,b){return (b-a)}
function Mod(a,b){return a-Math.floor(a/b)*b}
String.prototype.find=function(string){var array=new Array();var thislength=this.length;for(var i=0;i<thislength;i++){if(!array.find(this.indexOf(string,i)) && this.indexOf(string,i)!=-1)array.push(this.indexOf(string,i))}return array;}
Array.prototype.findArrays=function(value,level){var array=new Array();for(var i=0;i<this.length;i++){var valor=this[i][level];if(valor==value) array.push(this[i]);}return array}
Array.prototype.sum=function(){this.arr_=new Array();this.arr_=this.copy();this.var_=0;while(this.arr_.length>0){this.i_=this.arr_.pop();if(typeof(this.i_)=='number')this.var_=this.var_+this.i_}return this.var_}
var IQsetDelay=function(time){var start=new Date().getTime();var end=start+time;while(start<end){start=new Date().getTime()}}
/*
var pic = getCookie("sizepic");
if (!pic) {
 pic = "Full size";
 setCookie('sizepic', pic);
 }
*/

/*
function setCookie(name, value, expire) {
   document.cookie = name + "=" + escape(value)
   + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()))
}
*/

function getCookie(name)
{ // use: getCookie("name");
    var index = document.cookie.indexOf(name + "=");
    if (index == -1) return null;
    index = document.cookie.indexOf("=", index) + 1;
    var endstr = document.cookie.indexOf(";", index);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(index, endstr));
}


function setCookie(name, value, expire)
{ // use: setCookie("name", value);

  var today = new Date();
  var expiry = new Date(today.getTime() + 100 * 24 * 60 * 60 * 1000); // plus 100 days

  if (expire==null)
	expire = expiry.toGMTString();

    if (value != null && value != "")
      document.cookie=name + "=" + escape(value) + "; expires=" + expire;
}



/*
function getCookie(Name) {
   var _search = Name + "=";
   if (document.cookie.length > 0) { // if there are any cookies
      offset = document.cookie.indexOf(_search)
      if (offset != -1) { // if cookie exists
         offset += _search.length
         // set index of beginning of value
         end = document.cookie.indexOf(";", offset)
         // set index of end of cookie value
         if (end == -1)
            end = document.cookie.length
         return unescape(document.cookie.subst­ring(offset, end))
      }
   }
}
*/

function deleteCookie (name) {
var exp = new Date();
exp.setTime (exp.getTime() - 1);
var cval = getCookie (name);
document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}
/*
function deleteCookie(name,path,domain) {
    if (getCookie(name)) document.cookie = name + "=" +
       ( (path) ? ";path=" + path : "") +
       ( (domain) ? ";domain=" + domain : "") +
       ";expires=Thu, 01-Jan-70 00:00:01 GMT";
}
*/
/*
function registerCookie(cookieName,cookieValue) {
  var today = new Date()
  var expires = new Date()
  expires.setTime(today.getTime(­) + 1000*60*60*24*365)
  setCookie(cookieName, cookieValue, expires)
}
*/

var IQShadowDiv=null;
function IQShadow(visible)
{
  if (IQShadowDiv!=null)
  {
	if (visible)
		var s = 'true';
	else
		var s = 'false';
	IQDisplay(IQShadowDiv,s,s);
	if (visible)
	{
		IQShadowDiv.style.height = document.body.scrollHeight;
		IQShadowDiv.style.width = document.body.scrollWidth;
		IQShadowDiv.style.backgroundRepeat='repeat';
	}
  }
  else if (visible)
  {
 	IQShadowDiv = IQDivModal(document.body.scrollWidth,document.body.scrollHeight);
	IQShadowDiv.style.backgroundRepeat='repeat';
  }
}

var IQFocusFirstInput=function(obj)
{
	if (arguments.length>1||arguments.length<1)return false;
	if(typeof(obj)=='string') obj=MM_findObj(obj);
	if(typeof(obj)=='number') return false;
	var inputobj=null;
	var checkobjects=function(obj,value)
	{
		this.obj=obj;
		this.returnObj=function()
		{
			if(this.obj)
			{
				var o=this.obj.firstChild;
				while(o!=null)
				{
					new this.constructor(o).returnObj();
					o=o.nextSibling;
				}
				var type=this.obj.nodeName;
				if(type=='INPUT'&&inputobj==null){this.obj.focus();inputobj=this.obj} 
			} 
		}
	}
	var check=new checkobjects(obj);
	check.returnObj();
	inputobj.focus();
	return inputobj;
}

var IQgetElement=function(e)
{
	if (!e) var e = window.event;
	if(browser.id=='ie') return e.srcElement; else return e.currentTarget;
}
var checkBrowserId=function(){this.id=null;this.get=function(){var id=navigator.appName.toLowerCase();if(id=='microsoft internet explorer') this.id='ie'; else this.id='netscape'}}
var browser=new checkBrowserId;browser.get();

function IQNewID(str)
{
	var i = 3;
	var s = str+i;
	var obj = MM_findObj(s);
	while (obj!=null)
	{
		i=i+1;
		s = str+i;
		obj = MM_findObj(s);
	}
	return s;
}

function IQFocus(id)
{
	var obj=null;if (typeof(id)=='string'){obj=MM_findObj(id);} else {obj=id;}
	if (obj)
	{
		try {
			obj.focus();
		} catch (err) {}
	}
}

function IQDisplayWithButton(Button_id,ObjectToShow_id,ButtonWhenVisible,ButtonWhenInvisible)
{
	var btn = IQFindObj(Button_id);
	var obj = IQFindObj(ObjectToShow_id);
	var s = new String(obj.className);
	if (s.indexOf('cssinvisible')>=0)
	{
		IQClass(ObjectToShow_id,'cssvisible','cssinvisible');
		if (ButtonWhenInvisible!='')
			btn.innerHTML = ButtonWhenVisible;
	}
	else
	{
		IQClass(ObjectToShow_id,'cssinvisible','cssvisible');
		if (ButtonWhenInvisible!='')
			btn.innerHTML = ButtonWhenInvisible;
	}
}


var IQEnterAsTab = function(e) 
{
	/*
	if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
				else if (e.which) code = e.which;
	if(code == 13)
	{
		var obj = e.srcElement?e.srcElement:e.target;
//		alert(obj.nodeName);
		obj=obj.nextSibling;
		while ((obj!=null)&&(obj.nodeName!='INPUT'))
		{
//			alert(obj.id);
			obj=obj.nextSibling;
		}
		// BUG: Não trata bem o caso em que o próximo elemento a receber focus não está neste ramo da árvore.
		// Não existe uma maneira melhor de fazer isto?

		obj.focus();
//		alert('tecla enter premida');
	}
	*/
}

//obj.onkeyup=IQEnterAsKey
//<input onkeyup="IQEnterAsKey()" />

var IQEnterAsClick = function(e) 
{
	if (!e) var e = window.event;
			if (e.keyCode) code = e.keyCode;
				else if (e.which) code = e.which;
	if(code == 13)
	{
		var obj = e.srcElement?e.srcElement:e.target;
//		alert(obj.nodeName);
		obj.click();
	}
}
//obj.onkeyup=IQEnterAsKey
//<input onkeyup="IQEnterAsKey()" />


var jsFirstChild = function(obj)
{
	var obj = obj?obj.firstChild:false;
	obj = ((obj.nodeName == '#text' || obj.nodeName == '#comment' || obj.nodeName == 'SCRIPT')?jsNextSibling(obj):obj);
	return obj;
}
var jsNextSibling = function(obj)
{
	var obj = obj?obj.nextSibling:false;
	obj = ((obj.nodeName == '#text' || obj.nodeName == '#comment' || obj.nodeName == 'SCRIPT')?jsNextSibling(obj):obj);
	return obj;
}
var jsPreviousSibling = function(obj)
{
	var obj = obj?obj.previousSibling:false;
	obj = ((obj.nodeName == '#text' || obj.nodeName == '#comment' || obj.nodeName == 'SCRIPT')?jsPreviousSibling(obj):obj);
	return obj;	
}


Array.prototype.insert=function(value,index){var array=new Array();for(var i=0;i<this.length;i++) array.push(this[i]);while(this.length>0) this.pop();if (index==0){this.push(value);for(var i=0;i<array.length;i++) this.push(array[i]);return}var first=array.slice(0,index);var second=array.slice(index);while(first.length>0) this.push(first.shift());this.push(value);while(second.length>0) this.push(second.shift())}
Array.prototype.index = function(s){if(!s && s != 0) return false;var value = '';for(var i=0;i<this.length;i++){value = this[i];if(value == s) return i;}}
Array.prototype.max=function(){var value=0;for(var i=0;i<this.length;i++){if(this[i]>value)value=this[i]}return value}
Array.prototype.min=function(){var value=this.max();for (var i=0;i<this.length;i++){if(this[i]<value) value=this[i]}return value}
Array.prototype.replace = function(a,b){this[this.index(a)] = b;}
Array.prototype.internalCounter = 0;
Array.prototype.next = function()
{
	var value = this[this.internalCounter];
	this.internalCounter++;
	if(value == undefined) {this.internalCounter = this.length-1;value = false;}
	return value;
}
Array.prototype.previous = function()
{
	var value = this[this.internalCounter];
	this.internalCounter--;
	if(value == undefined) {this.internalCounter = 0;value = false;}
	return value;
}

Array.prototype.fullindex = function(s)
{
	if(!s && s != 0) return false;
	var arr = new Array();
	for(var i=0;i<this.length;i++)
	{
		value = this[i];
		if(value == s) arr.push(i);
	}
	return arr;
}
Array.prototype.copy = function()
{
	var arr = new Array();
	return this.concat(arr);
}
Array.prototype.erase = function(i)
{
	var ret = new Array();
	this.internalCounter = 0;
	while(value = this.next())
	{if((this.internalCounter-1) != i) ret.push(value);}
	return ret;
}


String.prototype.repeat = function(i){var str = '';while(i>0){str = str + this;i--;}return str;}
function IQGetPageCoordsObj (obj) {var coords = {x: 0, y: 0};do {coords.x += obj.offsetLeft;coords.y += obj.offsetTop;}while ((obj = obj.offsetParent));return coords;}



var jsMouse = {
	obj:function(id)
	{
		this.id = id;
		this.mouseleave = function(){};
		this.mouseout = function(){};
		this.execute = function()
		{
			var root = document.getElementById(this.id);
			if(!root) return false;
			
			
			
			root.jsMouse = this;
			root.onmouseout = function(e)
			{
				var real = e.relatedTarget;
				var fake = e.currentTarget;
				
				var obj = false;
				
				while(real)
				{
					if(real.isSameNode(root)) 
					{
						break;
						return false;
					} else obj = real;
					real = real.parentNode;
				}
				if(real == null) root.jsMouse.mouseleave();
			}
			
		}
		
	}
}

} catch(ev) {IQCatch(ev,'basic.js','Sintatic Error - block 10')};

