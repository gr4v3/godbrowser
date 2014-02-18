// JavaScript Document



var isParent = function(current,filter)

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

			if(src == content[i]) bool = true;

		});

		obj = obj.parentNode; 

	}

	return bool;

}

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

var jsForm = {

	cache:[],

	obj:function(prefix)

	{

		this.prefix = prefix;

		this.form = false;

		this.elements = {};

		

		this.create = function()

		{

			jsForm.cache[this.prefix] = this;

		}

		this.initialize = function()

		{

			if(!this.form) return false;

			var elements = this.form.elements;

			var obj = false;

			var i = 0;

			do

			{

				if(obj) 

				{

					if(obj.type == 'checkbox' && obj.checked) this.elements[obj.name] = obj.value;

					else if(obj.type == 'checkbox' && !obj.checked) this.elements[obj.name] = '';

					else if(obj.type == 'radio' && obj.checked) this.elements[obj.name] = obj.value;

					else if(obj.type != 'radio' && obj.type != 'checkbox') this.elements[obj.name] = obj.value;

				}

				obj = elements.item(i);

				i++;

			} while(obj);

		}

		this.query = function()

		{

			this.initialize();

			return Object.toQueryString(this.elements);

		}	

	}

}



var common = {

	id:false,

	type:false,

	offsetY:0,

	offsetX:0,

	afterEvent:function(){},

	html:'html.php',

	cache:{},

	iframe:false,



	itemsSelected:function(prefix)

	{

		var variable = 'id';

		if(prefix) variable = prefix;

		var folders = new Array();

		var files = new Array();

		for(i in common.folder.folders){folders.push(i);}

		for(i in common.file.files){files.push(i);}

		var obj = {

			folder:{

				data:folders,

				query:folders.length>0?variable+'[]='+folders.join('&'+variable+'[]='):''

			},

			file:{

				data:files,

				query:files.length>0?variable+'[]='+files.join('&'+variable+'[]='):''

			}

		}

		return obj;

	},

	

	translation:{

		divs:[]

	},

	resize:function()

	{

		if(!this.iframe) return false;

		var docmain = $('docmain');

		this.iframe.style.height = (docmain.offsetHeight+3) + 'px';

	},

	create:function()

	{

		var main = $('docmain');

		if(!main) return false;

		

		var parent = this;

		var docbody = $(document.body);

		

		docbody.addEvent('mousedown',parent.contextmenu.hide);

		docbody.addEvent('mousedown',parent.file.resetInline);

		docbody.addEvent('mouseup',parent.frames.erase);

		docbody.addEvent('contextmenu',function(e)

		{

			if(!e) e = window.event;

			var evt = new Event(e);

			var contentor = isParent(evt.target,{id:'filebrowser'});

			if(contentor) common.contextmenu.create(evt); else return false;

		});

		if((window.ie6 || window.ie) && !window.ie7){for(i in document.all){document.all[i].unselectable = 'on';}}

		

		parent.folder.parent = parent;

		parent.file.parent = parent;

		parent.treeview.parent = parent;

		parent.entities.parent = parent;

		

		var ajax = QUERY('html')

			ajax.afterEvent = function()

			{

				this.afterEvent = function(){};

				var main = $('docmain');

				if(!main) return false;

				main.innerHTML = String(this.result);

				

				parent.translation.divs.each(function(value){

					var obj = $$('.'+value);

						obj.setProperty('title',parent.translation[value]);

				})

				parent.login.afterEvent = function()

				{

					this.afterEvent = function(){};

					parent.upload.create();

					parent.uploadOverwrite.create();

				}

				parent.login.create();

				parent.error.obj.create();

				parent.content.obj.create();

				parent.searchFile.obj.create();

				parent.content.obj.create();

				parent.folder.id = 1;

				parent.folder.viewmode = 'icon';

				

				parent.treeview.afterEvent = function()

				{

					

					parent.afterEvent();

					this.afterEvent = function(){};

					filter('false');

					parent.frames.check();

					parent.treeview.assignEVENTS();

					

				}

				parent.treeview.create();

				Drag.init(document.getElementById('treeview_content'));

			}

			ajax.get(INCLUDES+parent.html);

	},

	contextmenu:{

		startMENU:function(prefix) 

		{

			if (window.ie6) 

			{

				navRoot = document.getElementById(prefix);

				for (i=0; i<navRoot.childNodes.length; i++)

				{

					node = navRoot.childNodes[i];

					if (node.nodeName=="LI") 

					{

						node.onmouseover = function() {this.className+=" over";}

						node.onmouseout = function(){this.className=this.className.replace(" over", "");}

					}

				}

			}

		},

		create:function(evt)

		{				

			var x = evt.page.x;

			var y = evt.page.y;	



			var result = common.itemsSelected();

			var files = result.file.data;

			var folders = result.folder.data;

			

			var fileclipboard = common.file.clipboard;

			var folderclipboard = common.folder.clipboard;	

			

			var ajax = QUERY('contextmenu');

				ajax.afterEvent = function()

				{

					var contextmenucontainer = $('contextmenucontainer');

						contextmenucontainer.innerHTML = this.result;

						contextmenucontainer.active = true;

						contextmenucontainer.setStyles({display:'block',position:'absolute',top:y,left:x});

						common.contextmenu.startMENU('context');

				}

				

			var sFile = files.length;

			var sFolder = folders.length;

			var cFile = fileclipboard.length;

			var cFolder = folderclipboard.length;	

					

			//window.status = ' selection: file->'+sFile+' folder->'+sFolder+' clipboard: file->'+cFile+' folder->'+cFolder;

			

			if((sFile > 0 || sFolder > 0) && (cFile == 0 && cFolder == 0))

			{

				if(sFile == 1 && sFolder == 0) ajax.get(CONTEXTMENU+'?mode=file&view='+common.folder.viewmode+'&prefix=context&selection=true&clipboard=false&id='+files.pop());

				else if(sFolder == 1 && sFile == 0) ajax.get(CONTEXTMENU+'?mode=folder&view='+common.folder.viewmode+'&prefix=context&selection=true&clipboard=false&id='+folders.pop());			

				else if(sFolder > 1 && sFile == 0) ajax.get(CONTEXTMENU+'?mode=folders&view='+common.folder.viewmode+'&prefix=context&selection=true&clipboard=false');

				else if(sFile > 1 && sFolder == 0) ajax.get(CONTEXTMENU+'?mode=files&view='+common.folder.viewmode+'&prefix=context&selection=true&clipboard=false');

			}

			if((cFile > 0 || cFolder > 0) && (sFile == 0 && sFolder == 0))

			{

				if(cFile == 1 && cFolder == 0) ajax.get(CONTEXTMENU+'?mode=file&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=true');

				else if(cFolder == 1 && cFile == 0) ajax.get(CONTEXTMENU+'?mode=folder&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=true');

				else if(cFolder > 1 && cFile == 0) ajax.get(CONTEXTMENU+'?mode=folders&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=true');

				else if(cFile > 1 && cFolder == 0) ajax.get(CONTEXTMENU+'?mode=files&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=true');

			}

			if((sFile > 0 && sFolder > 0) && (cFile == 0 && cFolder == 0)) ajax.get(CONTEXTMENU+'?mode=mix&view='+common.folder.viewmode+'&prefix=context&selection=true&clipboard=false');

			if((cFile > 0 && cFolder > 0) && (sFile == 0 && sFolder == 0)) ajax.get(CONTEXTMENU+'?mode=mix&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=true');

			if((sFile == 0 && sFolder == 0) && (cFile == 0 && cFolder == 0)) ajax.get(CONTEXTMENU+'?mode=empty&view='+common.folder.viewmode+'&prefix=context&selection=false&clipboard=false');

		},

		hide:function(e)

		{

			

			if(e != null)

			{

				if(common.folder.foldergrey) common.folder.foldergrey.removeClass('folder_grey');

				if(!e) e = window.event;

				var evt = new Event(e);

				if(evt.button != 2 && evt.target)

				{

					var bool = isParent(evt.target,{className:'onemenuLI'});

					if(!bool) return false;

					

				} 

				

				if(evt.target.parentNode.className == 'onemenuLI') return false;	

			}

			

			var div = $('contextmenucontainer');

			if(div)

			{

				div.empty();

				div.setStyle('display','none');

				div.active = false;

			}

			

		}

	},

	swap:function(id)

	{

		var obj = document.getElementById(id);

		if(!obj) return false;

		var display = obj.style.display;

		

		if(display == 'none') obj.style.display = 'inline';

			else obj.style.display = 'none';

	},

	mix:{

		download:function()

		{

			var folders = common.folder.folders;

			var files = [];

			

			var query = "";

			for(i in folders){query+="id[]="+i+"&";}

			for(i in common.file.files){files.push(i);}

			

			

			var checkFiles = QUERY('listfiles');

				checkFiles.afterEvent = function()

				{

					eval(this.result);

					files = obj.concat(files);

					

					common.content.afterEvent = function()

					{

						

						var input = document.forms.download.type;

						

						this.afterEvent = function(){};

						if(input.item(0).checked)

						{

							files.each(function(value)

							{

								window.open(PATH+'/includes/download.php?id='+value);

							});

							

						} else if(input.item(1).checked)

						{

							var query = "";

							files.each(function(value){query+="id[]="+value+"&";});

							window.open(PATH+'/includes/file.php?mode=multidownload&'+query);

						}

							

					}

					common.content.cancelEvent = function(){common.folder.reset_();}

					

					var html = '<div class="download"><form name="download">';

							html+= '<div id="one">Download all files at once?<input id="a" type="radio" name="type" checked="true" /></div>';

							html+= '<div id="two">Download all files ziped?<input id="b" type="radio" name="type" /></div>';

						html+= '</form></div>';

					

					common.content.obj.setTitle('<span>Download</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

					common.content.obj.innerHTML(html);

					common.content.obj.show();

					

					

				}

				checkFiles.get(FOLDER+'?mode=getallfiles&'+query);

		}

	},

	entities:{

		parent:false,

		selectItem:function(form)

		{

			//alert(form.selectentity_list.value);

		},

		unlink:function()

		{

			var common = this.parent;

			var ajax = QUERY('associate');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.folder.view();	

				}

				ajax.get(INCLUDES+'file.php?mode=deassociate&id='+common.id+'&type='+common.type+this.items);

		},

		submitForm:function()

		{

			var common = this.parent;

			var form = document.forms.content;

			

			var items = form.selectentity_list.options;

			var submited = form.submitedEntity?form.submitedEntity.value:false;

			

			var query = '';

			

			for(var i=0;i<items.length;i++)

			{if(items.item(i).selected) query+= '&items[]='+items.item(i).value;}

			

			var parent = this;

			var ajax = QUERY('associate');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					var win = common.content.obj;

						win.hide();

					common.folder.view();	

				}

				ajax.get(INCLUDES+'entities.php?mode=associate&entity='+form.selectentity.value+query+this.items+'&submited='+submited);

			

		},

		

		getItems:function(form)

		{

			var submited = form.submitedEntity?form.submitedEntity.value:false;

			var parent = this;

			var common = this.parent;

			var ajax = QUERY('associate');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					var win = common.content.obj;			

						win.innerHTML(this.result);

					common.folder.view();	

				}

				ajax.get(INCLUDES+'entities.php?mode=html&entity='+form.selectentity.value+this.items);

		},

		

		

		getSelectedEntity:function(obj)

		{

			var common = this.parent;

			var ent = obj.value;

			

			if(ent == 'false') return false;

			

			

			var ajax = QUERY('associate');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.folder.view();

					

				}

				ajax.get(INCLUDES+'entities.php?mode=SelectedEntity&entity='+ent);

		},

		

		

		

		create:function()

		{

			var common = this.parent;

			var files = common.itemsSelected('files').file.query;

			var folders = common.itemsSelected('folders').folder.query;

			this.items = '&'+files+folders;	

			

			

			if(common.id)

			{

				var parent = this;

				var ajax = QUERY('associate');

					ajax.afterEvent = function()

					{

						this.afterEvent = function(){};

						common.folder.view();

					}

					ajax.get(INCLUDES+'entities.php?mode=associate&entity='+common.type+'&items[]='+common.id+this.items);

				return false;

			}

			

			var parent = this;

			var ajax = QUERY('associate');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.contextmenu.hide();

					

					var win = common.content.obj;

						win.onContentUpdate = function()

						{

							this.show();

						}

						common.content.afterEvent = function()

						{

							common.entities.submitForm();

						}

						win.setTitle('<span>Link</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

						win.innerHTML(this.result);

					

				}

				ajax.get(INCLUDES+'entities.php?mode=html'+this.items);

				

			

		},

		

		items:''

	},

	

	folder:{

		id:0,

		name:'',

		dom:false,

		folders:{},

		mode:false,

		previousFolder:false,

		clipboard:[],

		previousOFolder:false,

		newfile:function(){},

		newfolder:function(){},

		edittags:function(){},

		viewmode:'',

		foldergrey:false,

		parent:false,

		rightclick:function(e)

		{

			if(common.folder.foldergrey) common.folder.foldergrey.removeClass('folder_grey');

			

			var evt = new Event(e);

				evt.stop();	

			if(e.button != 2) return false;



			var obj = evt.target;

			var id = obj.getProperty('ref');

			obj.className = 'folder_grey';

			obj.addClass('folder_grey');

			common.folder.folders[id] = {};

			common.folder.foldergrey = obj;

			common.contextmenu.create(evt);	

		},

		upload:function()

		{

			common.upload.swfupload.selectFiles();

		},

		data:function(id,dest,action)

		{

			var obj = {

				id:id,

				dest:dest,

				action:action

			}

			return obj;

		},

		reset_:function()

		{

			var common = this.parent;

			var folder = common.folder;

			var obj = false;

			for(i in folder.folders)

			{

				obj = folder.folders[i];

				if(obj.parentNode)

				if(this.viewmode == 'list' || folder.viewmode == 'detailed')

				{

						var a = obj.parentNode.getChildren();

							a.each(function(value){

								value.removeClass('item_selected');

								value.removeClass('item_cut');

								value.removeClass('item_copy');

							});

				} else {

					obj.removeClass('item_selected');

					obj.removeClass('item_over');

					obj.removeClass('item_cut');

					obj.removeClass('item_copy');

				}

			}

			folder.folders = {};

			folder.previousFolder = false;

		},

		title:function(name)

		{

			var obj = document.getElementById('foldername');

			if(!obj) return false;

			obj.innerHTML = '<span>&nbsp;<span style="font-weight:bold;">folder</span>&nbsp;'+name+'</span>'; //<div class="openfolder"></div>

			common.folder.name = name;

		},

		set:function(id,view)

		{

			var common = this.parent;

			var folder = common.folder;

			folder.id = id;

			folder.info(id);

			folder.view(id,view);

			

			var icon = $('icon_'+id);

			if(!icon) return false;

			

			var src = String(icon.src);

			var of = /of/gi;

			var cf = /cf/gi;

			

			if(folder.previousOFolder)

			{

				$(folder.previousOFolder.id+'_a').removeClass('folder_selected');

				var previous = String(folder.previousOFolder.src);

				if(previous.match(cf)) folder.previousOFolder.src = previous.replace(cf,'of');

				else folder.previousOFolder.src = previous.replace(of,'cf');

			}

			

			icon.src = src.replace(cf,'of');

			$('icon_'+id+'_a').addClass('folder_selected');

			folder.previousOFolder = icon;

		},

		status:function()

		{

			

		},

		info:function(id)

		{

			var common = this.parent;

			var folder = common.folder;

			var ajax = QUERY('info');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					eval(this.result);	

					folder.title(obj.value[obj.index['name']]);

					folder.afterEvent(obj);

				}

				

				ajax.get(FOLDER+'?mode=folder&id='+id);

		},

		view:function(id,view)

		{	

			var parent = this;

			var common = this.parent;

			

			var entity = document.forms.mainEntitySelect?document.forms.mainEntitySelect.selectentity.value:'false';

				

			var ajax = QUERY('info');

				ajax.afterEvent = function()

				{

					var obj = $('filebrowser');

					if(!obj) return false;

					obj.innerHTML = this.result;

					common.frames.check();

				

					if((window.ie6 || window.ie) && !window.ie7){for(i in document.all){document.all[i].unselectable = 'on';}}

					

					obj.addEvent('mousedown',common.multiselect.create);

					

					common.file.reset_();

					common.folder.reset_();

					common.contextmenu.hide();

					

					var items = obj.getElementsByClassName('icon_view');

					if(items.length == 0 ) items = obj.getElementsByClassName('list_view');

					if(items.length == 0 ) items = obj.getElementsByClassName('detailed_view');

					if(items.length == 0 ) items = obj.getElementsByClassName('thumbnails_view');

					

					common.multiselect.detectable = [];

					items.each(function(value,index){	

						value.addEvent('mouseenter',function()

						{

							var obj = this.getFirst();	

							if(!obj.hasClass('item_selected'))

								obj.addClass('item_over');	

							

						})	 

						value.addEvent('mouseleave',function()

						{

							var obj = this.getFirst();

							obj.removeClass('item_over');

							

						})

						common.multiselect.add(value);

					});



					

					pyramide.setDrops(common.treeview.targets);

    				pyramide.setDrags(items);

								

					

					

					common.afterEvent();	

				}

				if(view)

				{

					var i = 0;

					if(view == 'icon') i = 0;

					if(view == 'list') i = 1;

					if(view == 'detailed') i = 2;

					if(view == 'thumbnails') i = 3;

					common.folder.viewmode = view;

					

					var arr = Array('icon','list','detailed','thumbnails');

					arr.each(function(value){

						var obj = $(value+'_option');

						if(obj)

						{

							obj.style.color = '';

							obj.href = "javascript:common.folder.set(common.folder.id,'"+value+"');";

						}

					})

					var obj = $(view+'_option');

					if(obj){obj.style.color = '#c9c9c9';obj.href = "#";}

					

					ajax.get(FILEBROWSER+'?view_mode='+view+'&folder='+common.folder.id+'&entity='+entity);

				} else {

					var arr = Array('icon','list','detailed','thumbnails');

					arr.each(function(value){

						var obj = $(value+'_option');

						if(obj)

						{

							obj.style.color = '';

							obj.href = "javascript:common.folder.set(common.folder.id,'"+value+"');";

						}

					})

					var obj = $(common.folder.viewmode+'_option');

					if(obj){obj.style.color = '#c9c9c9';obj.href = "#";}

					ajax.get(FILEBROWSER+'?view_mode='+common.folder.viewmode+'&folder='+common.folder.id+'&entity='+entity);

				}

		},

		paste:function()

		{

			var parent = this;

			var common = this.parent;

			var obj = false;

			var fromClipBoard = [];

			

			while(this.clipboard.length > 0)

			{fromClipBoard.push(this.clipboard.pop());}

			common.content.afterEvent = function()

			{

				while(fromClipBoard.length > 0)

				{

					obj = fromClipBoard.pop();

					if(obj.action == 'copy')

					{

						var ajax = QUERY('copy'+obj.id);

							if(fromClipBoard.length == 0)

							{

								ajax.afterEvent = function()

								{

									common.treeview.afterEvent = function()

									{

										common.folder.view();

									}

									common.treeview.create();

								}

							}

							ajax.get(FOLDER+'?mode=copy&id='+obj.id+'&dest='+common.folder.id);

					}

					else if(obj.action == 'cut')

					{

						var ajax = QUERY('cut'+obj.id);

							if(fromClipBoard.length == 0)

							{

								ajax.afterEvent = function()

								{

									common.treeview.afterEvent = function()

									{

										common.folder.view();

									}

									common.treeview.create();

								}

							}

							ajax.get(FOLDER+'?mode=move&id='+obj.id+'&dest='+common.folder.id);

					}

				}

			}

			common.content.cancelEvent = function(){};

			common.content.obj.onContentUpdate = function()

			{

				this.onContentUpdate = function(){};

				this.show();

			}

			common.content.obj.innerHTML('<table border="0"><tr><td>Are you sure to follow these operation?</td></tr></table>');

			this.reset_();

			this.clipboard = [];

			common.contextmenu.hide();

		},

		rename:function()

		{

			var common = this.parent;

			var folders = common.itemsSelected().folder;

			var folder = this;

			common.contextmenu.hide();

			

			var win = common.content;

				win.obj.onContentUpdate = function()

				{

					this.onContentUpdate = function(){};

					this.show();

					var form = document.forms.content;

						if(form)form.result.focus();

				}

				win.afterEvent = function()

				{

					this.afterEvent = function(){};

					var form = document.forms.content;

						if(form)form.result.blur();

					

					var ajax = QUERY('rename');

						ajax.afterEvent = function()

						{

							common.treeview.afterEvent = function()

							{

								this.afterEvent = function(){};

								common.folder.view();

							}

							common.treeview.create();

							

						}

						ajax.get(FOLDER+'?mode=rename&'+folders.query+'&name='+common.content.result);

				}

				win.cancelEvent = function()

				{

					this.cancelEvent = function(){};

					var form = document.forms.content;

						if(form)form.result.blur();

				}

				var html = '<table border="0"><tr><td>enter new name: <input name="result" type="text" onkeyup="common.content.result = this.value;" /></td></tr></table>';

				win.obj.setTitle('<span>Rename</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				win.obj.innerHTML(html);

		},

		new_:function()

		{

			var folder = this;

			var common = this.parent;

			

			var win = common.content;

				win.obj.onContentUpdate = function()

				{

					this.onContentUpdate = function(){};

					this.show();

					var form = document.forms.content;

						if(form)form.result.focus();

				}

				win.afterEvent = function()

				{

					this.afterEvent = function(){};

					

					var ajax = QUERY('new');

						ajax.afterEvent = function()

						{	

							common.treeview.afterEvent = function()

							{

								this.afterEvent = function(){};

								common.folder.view();

							}

							common.treeview.create();

						}

						ajax.get(FOLDER+'?mode=new&parent='+folder.id+'&name='+win.result);

				}

				win.cancelEvent = function()

				{

					this.cancelEvent = function(){};

					var form = document.forms.content;

						if(form)form.result.blur()

				}

				var html = '<table border="0"><tr><td>enter new name: <input name="result" type="text" onkeyup="common.content.result = this.value;" /></td></tr></table>';

				win.obj.setTitle('<span>New&nbsp;Folder</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				win.obj.innerHTML(html);	

		},

		description:function()

		{

			var common = this.parent;

			var folders = common.itemsSelected().folder;

			common.contextmenu.hide();

			

			var win = common.content.obj;

				win.onContentUpdate = function()

				{

					this.show();

					var form = document.forms.content;

						if(form)form.description.focus();

				}

				common.content.afterEvent = function()

				{

					common.content.afterEvent = function(){};

					var form = document.forms.content;

						if(form)form.description.blur();

					common.content.afterEvent = function(){};

					var ajax = QUERY('rename');

						ajax.afterEvent = function()

						{

							common.folder.view();

						}

						ajax.get(FOLDER+'?mode=description&'+folders.query+'&description='+common.content.result);

				}

				common.content.cancelEvent = function()

				{

					common.content.cancelEvent = function(){};

					var form = document.forms.content;

						if(form)form.description.blur();

					

				}

				var html = 'enter new description: <br /><textarea name="description" cols="40" rows="3" onkeyup="common.content.result = this.value;"></textarea>';

				win.setTitle('<span>Description</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				win.innerHTML('<table border="0"><tr><td>'+html+'</td></tr></table>');

		},

		properties:function(a)

		{

			var common = this.parent;

			var html = '';

			var id = false;

			common.contextmenu.hide();

			

			if(a) this.folders[a] = false;

			for(i in this.folders)

			{

				id = i;

				var ajax = QUERY('properties'+i);

					ajax.afterEvent = function()

					{

						eval(this.result);

						for(i in data)

						{

							html+= '<div class="properties_item">';

								html+= '<div id="one">'+i+'</div>';

								html+= '<div id="two">'+data[i]+'</div>';

							html+= '</div>';

						}

							

						var ajax = QUERY('access'+data.filesize);

							ajax.afterEvent = function()

							{

								html+= '<div class="properties_item">';

									html+= '<div id="one">access</div>';

									html+= '<div id="two">'+this.result+'</div>';

								html+= '</div>';

								

								

								common.content.afterEvent = function(){};

								common.content.cancelEvent = function(){};

								

								

								common.content.obj.show();

								common.content.obj.setTitle('<span>Properties</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

								common.content.obj.innerHTML('<div style="width:400px;">'+html+'</div>');

							}

							ajax.get(FOLDER+'?mode=rights&id='+id);

					}

					ajax.get(FOLDER+'?mode=properties&id='+i);

			}

		},

		copy:function()

		{

			var common = this.parent;

			var folder = common.folder;

			

			folder.clipboard = [];

			for(i in this.folders)

			{

				folder.clipboard.push(folder.data(i,false,'copy'));

				folder.folders[i].addClass('item_copy');

			}

			folder.reset_();

		},

		cut:function()

		{

			var common = this.parent;

			var folder = common.folder;

			

			folder.clipboard = [];

			for(i in folder.folders)

			{

				folder.clipboard.push(folder.data(i,false,'cut'));

				folder.folders[i].addClass('item_cut');

			}

			common.contextmenu.hide();

		},

		download:function()

		{

			var common = this.parent;

			common.contextmenu.hide();

			

			var files = [];	

			var query = "";

			for(i in this.folders){query+="id[]="+i+"&";}

			

			var checkFiles = QUERY('listfiles');

			checkFiles.afterEvent = function()

			{

				eval(this.result);

				files = obj;

				common.content.afterEvent = function()

				{

					common.content.afterEvent = function(){};

					var input = document.forms.content.type;

					if(input.item(0).checked)

					{

						files.each(function(value)

						{

							window.open(PATH+'/includes/download.php?id='+value);

						});

						

					} else if(input.item(1).checked)

					{

						var query = "";

						files.each(function(value){query+="id[]="+value+"&";});

						window.open(PATH+'/includes/file.php?mode=multidownload&'+query);

					}

						

				}

				common.content.cancelEvent = function(){common.content.cancelEvent = function(){};common.folder.reset_();}

				

				var html = '<div class="download">';

						html+= '<div id="one">Download all files at once?<input id="a" type="radio" name="type" checked="true" /></div>';

						html+= '<div id="two">Download all files ziped?<input id="b" type="radio" name="type" /></div>';

					html+= '</div>';

				

				common.content.obj.setTitle('<span>Download</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				common.content.obj.innerHTML(html);

				common.content.obj.show();

				

				

			}

			checkFiles.get(FOLDER+'?mode=getallfiles&'+query);	

		},

		erase:function()

		{

			var common = this.parent;

			var folder = common.folder;

			var win = common.content;

			var folders = common.itemsSelected().folder;

	

			this.reset_();

			this.clipboard = [];

			common.contextmenu.hide();

			

			win.afterEvent = function()

			{

				this.afterEvent = function(){};

				var ajax = QUERY('erase'+folders.data[i]);

					ajax.afterEvent = function()

					{

						common.treeview.afterEvent = function()

						{

							this.afterEvent = function(){};

							common.folder.view();

						}

						common.treeview.create();

					}

					ajax.get(FOLDER+'?mode=erase&'+folders.query);

			}

			win.cancelEvent = function(){};

			win.create('<div style="width:150px;">Are you sure?</div>');

		},

		select_:function(folderid,evt,obj)

		{

			if(!obj) return false;

			var ctrlKey = evt.control;

			if(this.folders[folderid]) 

			{

				return false;

			} else {

					if(!ctrlKey)

					{

						for(i in this.folders){this.folders[i].removeClass('item_selected');}

						for(i in common.folder.folders){common.folder.folders[i].removeClass('item_selected');} 

						common.folder.reset_();

						common.file.reset_();

						common.folder.reset_();	

					}

				this.folders[folderid] = obj;

				obj.addClass('item_selected');

				obj.removeClass('item_over');

				common.folder.previousFolder = folderid;

			}

		},

		searchItem:function()

		{

			var common = this.parent;

			common.contextmenu.hide();

			common.searchFile.create();

		},

		multiaccess:function(id,type)

		{

			var common = this.parent;

			var parent = this;

			var ajax = QUERY('access');

				ajax.afterEvent = function()

				{

					common.folder.properties(Number(this.result));

				}

				ajax.get(FOLDER+'?mode=multiaccess&id='+id+'&type='+type);

		},

		access:function(form)

		{

			var common = this.parent;

			var query = '?mode=access';

			

				query+= '&id='+form.id.value;

				query+= '&item_id='+form.item_id.value;

				query+= '&who='+form.who.value;

				

				query+= '&view='+(form.view.checked?1:0);

				query+= '&read='+(form.read.checked?1:0);

				query+= '&write='+(form.write_.checked?1:0);

				query+= '&erase='+(form.erase.checked?1:0);

				

			

			var ajax = QUERY('access');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

				}

				ajax.get(FOLDER+query);

		},

		newAccess:function(form)

		{

			var common = this.parent;

			var item_id  = form.item_id.value;

			var item_type = form.item_type.value;

			var who = form.users.value;

			

			var ajax = QUERY('newaccess');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.folder.properties();

				}

				ajax.get(FOLDER+'?mode=newaccess&item_id='+item_id+'&item_type='+item_type+'&who='+who);

		},

		eraseAccess:function(id,item_id)

		{

			var common = this.parent;

			var ajax = QUERY('eraseaccess');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.folder.properties();

				}

				ajax.get(FOLDER+'?mode=eraseaccess&id='+id);

		},

		deselect:function(id)

		{

			obj = this.folders[id];

			if(obj)

			{

				obj.removeClass('item_selected');

				delete this.folders[id];

			}

		},

		print_:function(){},

		afterEvent:function(){},

		cancelEvent:function(){}

	},	

	file:{

		files:{},

		previousFile:false,

		clipboard:[],

		newfile:function(){},

		newfolder:function(){},

		upload:function(){},

		swfupload:function(){},

		parent:false,

		data:function(id,dest,action)

		{

			var obj = {

				id:id,

				dest:dest,

				action:action

			}

			return obj;

		},

		reset_:function()

		{

			var common = this.parent;

			var file = common.file;

			var obj = false;

			for(i in file.files)

			{

				obj = file.files[i];

				if(obj.hasClass('item_selected')) obj.removeClass('item_selected');

				if(obj.hasClass('item_over')) obj.removeClass('item_over');

				if(obj.hasClass('item_cut')) obj.removeClass('item_cut');

				if(obj.hasClass('item_copy')) obj.removeClass('item_copy');

			}

			file.files = {};

			file.previousFile = false;

		},

		insert:function(obj)

		{

			var common = this.parent;

			if(!common.folder.id) 

			{

				alert('Please select a destination folder first!');

				jsupload.deletefile(obj.prefix);

				return false;

			}

			var ajax = QUERY('name');

				ajax.afterEvent = function(){this.afterEvent = function(){};common.folder.view();};

				ajax.get(FILE+'?mode=insert&name='+escape(obj.name)+'&folder='+common.folder.id);

		},

		rename:function()

		{

			var common = this.parent;

			var files = common.itemsSelected().file.data;

			

			common.contextmenu.hide();

			

			

			if(files.length == 1)

			{

				common.content.afterEvent = function()

				{

					this.afterEvent = function(){};

					var form = document.forms.content;

						if(form)form.filename.blur();

					var ajax = QUERY('rename');

						ajax.afterEvent = function(){this.afterEvent = function(){};common.folder.view();}

						ajax.get(FILE+'?mode=rename&id='+files.pop()+'&name='+common.content.result+'&folder='+common.folder.id);	

				}

				common.content.cancelEvent = function()

				{

					this.cancelEvent = function(){};

					var form = document.forms.content;

						if(form)form.filename.blur();

				}

				var html = '<table border="0"><tr><td>enter new name: <input name="filename" type="text" onkeyup="common.content.result = this.value;" /></td></tr></table>';



				common.content.obj.setTitle('<span>Rename</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				common.content.obj.onContentUpdate = function()

				{

					this.onContentUpdate = function(){};

					this.show();

					var form = document.forms.content;

						if(form)form.filename.focus();

				}

				common.content.obj.innerHTML(html);

				

			}

		},

		description:function()

		{

			var files = new Array();

			for(i in common.file.files)

			{

				files.push(i);

			}

			if(files.length == 1)

			{

				common.content.afterEvent = function()

				{

					common.content.afterEvent = function(){};

					var ajax = QUERY('rename');

						ajax.afterEvent = function()

						{

							common.folder.set(common.folder.id);

						}

						ajax.get(FILE+'?mode=description&id='+files.pop()+'&description='+common.content.result+'&folder='+common.folder.id);	

				}

				var html = '<div class="rename"><div id="one">enter new description: </div><div id="two"><textarea id="newfileitem" cols="40" rows="3" onkeyup="common.content.result = this.value;" ></textarea></div></div>';

				common.content.obj.show();

				common.content.obj.setTitle('<span>Description</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				common.content.obj.onContentUpdate = function()

				{

					this.onContentUpdate = function(){};

					var obj = $('newfileitem');

					if(obj) obj.focus();

				}

				common.content.obj.innerHTML('<table border="0"><tr><td>'+html+'</td></tr></table>');

			

			} else if(files.length > 1) common.error.show('can only edit filenames one at a time!');

			common.contextmenu.hide();

		},

		erase:function()

		{	

			var parent = this;

			var fileidarray = [];

			for(i in common.file.files)

			{fileidarray.push($(common.file.files[i]).getProperty('fileid'));}	

			common.content.afterEvent = function()

			{			

				fileidarray.each(function(value,index)

				{

						var ajax = QUERY(index);

						ajax.afterEvent = function()

						{

							common.folder.view(common.folder.id);

						}

						ajax.get(FILE+'?mode=erase&id='+value+'&folder='+common.folder.id);

				});

				parent.reset_();

				parent.clipboard = [];

			}

			common.contextmenu.hide();

			common.content.create('<div style="width:200px;padding:4px;">Are you sure?</div>');

		},

		cut:function()

		{

			var common = this.parent;

			var file = common.file;

			file.clipboard = [];

			for(i in file.files)

			{

				file.clipboard.push(file.data(i,false,'cut'));

				file.files[i].addClass('item_cut');

			}

			common.contextmenu.hide();

		},

		download:function()

		{

			var files = new Array();

			for(i in common.file.files){files.push(i);}

			if(files.length > 1)

			{

				common.content.afterEvent = function()

				{

					

					this.afterEvent = function(){};

					

					var input = document.forms.download.type;

					if(input.item(0).checked)

					{

						files.each(function(value){

							window.open(PATH+'/includes/download.php?id='+value);			

						});

					} else if(input.item(1).checked)

					{

						var query = "";

						files.each(function(value){query+="id[]="+value+"&";});

						window.open(PATH+'/includes/file.php?mode=multidownload&'+query);

					}

						

				}

				common.content.cancelEvent = function(){this.cancelEvent = function(){};common.folder.reset_();}

				

				var html = '<div class="download"><form name="download">';

						html+= '<div id="one">Download all files at once?<input id="a" type="radio" name="type" checked="true" /></div>';

						html+= '<div id="two">Download all files packed?<input id="b" type="radio" name="type" /></div>';

					html+= '</form></div>';

				

				common.content.obj.setTitle('<span>Download</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				common.content.obj.innerHTML(html);

				common.content.obj.show();

				

			} else if(files.length == 1) window.open(PATH+'/includes/download.php?id='+files.pop());

			common.contextmenu.hide();

		},

		properties:function(a)

		{

			var common = this.parent;

			var html = '';

			var id = false;

			

			if(a) common.file.files[a] = false;

			for(i in common.file.files)

			{

				

				id = i;

				var ajax = QUERY('properties'+i);

					ajax.afterEvent = function()

					{

						eval(this.result);

						for(i in data)

						{

							html+= '<div class="properties_item">';

								html+= '<div id="one">'+i+'</div>';

								html+= '<div id="two">'+data[i]+'</div>';

							html+= '</div>';

						}

							

						var ajax = QUERY('access'+data.filesize);

							ajax.afterEvent = function()

							{

								html+= '<div class="properties_item">';

									html+= '<div id="one">access</div>';

									html+= '<div id="two">'+this.result+'</div>';

								html+= '</div>';

								

								common.content.obj.show();

								common.content.obj.setTitle('<span>Properties</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

								common.content.obj.innerHTML('<div style="width:400px;">'+html+'</div>');

								

							}

							ajax.get(FILE+'?mode=rights&id='+id);

					}

					ajax.get(FILE+'?mode=properties&id='+i+'&folder='+common.folder.id);

			}

			common.contextmenu.hide();

		},

		paste:function()

		{

			var parent = this;

			var obj = false;

			var fromClipBoard = [];

			common.contextmenu.hide();

			common.content.afterEvent = function()

			{

				this.afterEvent = function(){};

				

				parent.clipboard.each(function(obj)

				{

					

					if(obj.action == 'copy')

					{

							var ajax = QUERY('copy'+obj.id);

								ajax.afterEvent = function()

								{if(fromClipBoard.length == 0) common.folder.set(common.folder.id);}

								ajax.get(FILE+'?mode=copy&id='+obj.id+'&dest='+common.folder.id+'&folder='+common.folder.id);

						

					}

					else if(obj.action == 'cut')

					{

							var ajax = QUERY('cut'+obj.id);

								if(fromClipBoard.length == 0)

								{ajax.afterEvent = function()

								{common.folder.set(common.folder.id);}}

								ajax.get(FILE+'?mode=move&id='+obj.id+'&dest='+common.folder.id+'&folder='+common.folder.id);

					}



				});

				common.file.reset_();

				common.file.clipboard = [];

			}

			common.content.cancelEvent = function()

			{

				this.cancelEvent = function(){};

				common.file.reset_();

				common.file.clipboard = [];

			}

			var cut = 0,copy = 0,html = '';

			

			this.clipboard.each(function(value){

				if(value.action == 'cut') cut++;

				if(value.action == 'copy') copy++;

			});

			

			if(cut > 1)

			{

				html+= '<table border="0"><tr><td><span>Are you sure to move these itens to the select location?</span></td></tr></table>';

			} else if(cut == 1)

			{

				html+= '<table border="0"><tr><td><span>Are you sure to move this item to the select location?</span></td></tr></table>';

			} else if(copy == 1)

			{

				html+= '<table border="0"><tr><td><span>Are you sure to duplicate this item to the select location?</span></td></tr></table>';

			} else if(copy > 1)

			{

				html+= '<table border="0"><tr><td><span>Are you sure to duplicate these itens to the select location?</span></td></tr></table>';

			}

			

			common.content.obj.setTitle('<span>Edit</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

			common.content.obj.innerHTML(html);

			common.content.obj.show();

		},

		copy:function()

		{				

			this.clipboard = [];

			for(i in this.files)

			{

				this.clipboard.push(this.data(i,false,'copy'));

				this.files[i].addClass('item_copy');

			}

			common.contextmenu.hide();

		},

		select_:function(fileid,evt,obj)

		{

			if(!obj) return false;

			var ctrlKey = evt.control;

			if(this.files[fileid]) 

			{

				return false;

			} else {

					if(!ctrlKey)

					{

						for(i in this.files){this.files[i].removeClass('item_selected');}

						for(i in common.folder.folders){common.folder.folders[i].removeClass('item_selected');} 

						common.folder.reset_();

						this.reset_();	

					}

				this.files[fileid] = obj;

				obj.addClass('item_selected');

				obj.removeClass('item_over');

				this.previousFile = fileid;

			}

		},

		deselect:function(id)

		{

			obj = this.files[id];

			if(obj)

			{

				obj.removeClass('item_selected');

				delete this.files[id];

			}	

		},

		edittags:function()

		{

			var files = itemsSelected().file.data;

			var file = this;

			

			file.parent.contextmenu.hide();

			

			if(files.length == 1)

			{

				var id = files.pop();

				var ajax = QUERY('tags');

					ajax.afterEvent = function()

					{

						

						var win = common.content;

							win.obj.onContentUpdate = function()

							{

								this.show();

								var form = document.forms.content;

									form.result.focus();

							}

							win.afterEvent = function()

							{

								this.afterEvent = function(){};

								file.parent.folder.view();

							}

						eval(this.result);

						

						var html = '<div class="tags_content">';

								html+= '<div><input name="result" value="'+tags.join(',')+'" type="text" onkeyup="common.content.result = this.value;" /></div>';

							html+= '</div>';

							

						win.obj.setTitle('<span>New Tag</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

						win.obj.innerHTML(html);

					}

					ajax.get(FILE+'?mode=gettags&id='+id+'&folder='+common.folder.id);

			}	

		},

		addtag:function(id)

		{

			var file = this;

				file.parent.content.obj.hide();

			var ajax = QUERY('tags');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					file.parent.folder.view();

				}

				ajax.get(FILE+'?mode=addtag&id='+id+'&tag='+escape(file.parent.content.result)+'&folder='+file.parent.folder.id);

		},

		new_:function()

		{

			var file = this;

			var win = file.parent.content;

				win.obj.onContentUpdate = function()

				{

					this.show();

					var form = document.forms.content;

						if(form)form.filename.focus();

				}

				win.afterEvent = function()

				{

					this.afterEvent = function(){};

					var form = document.forms.content;

						if(form)form.filename.blur();

					

					var ajax = QUERY('new');

						ajax.afterEvent = function()

						{

							this.afterEvent = function(){};

							file.parent.treeview.afterEvent = function()

							{

								this.afterEvent = function(){}; 

								file.parent.folder.view();

							}

							file.parent.treeview.create();

						}

						ajax.get(FILE+'?mode=new&folder='+file.parent.folder.id+'&name='+file.parent.content.result+'&author='+file.parent.login.current.username);

				}

				win.cancelEvent = function()

				{

					this.cancelEvent = function(){};

					var form = document.forms.content;

						if(form)form.filename.blur();

					

				}

				var html = 'enter new name:&nbsp;<br /><input name="filename" type="text" onkeyup="common.content.result = this.value;" />';

				win.obj.setTitle('<span>New File</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				win.obj.innerHTML('<table border="0" style="width:250px"><tr><td>'+html+'</td></tr></table>');

		},

		multiaccess:function(id,type)

		{

			var parent = this;

			var ajax = QUERY('access');

				ajax.afterEvent = function()

				{this.afterEvent = function(){};common.file.properties(Number(this.result));}

				ajax.get(FILE+'?mode=multiaccess&id='+id+'&type='+type);

		},

		searchItem:function()

		{

			common.searchFile.create();

		},

		overwrite:function()

		{

			var fileid = false;

			for(i in common.file.files){fileid = i;}

			common.contextmenu.hide();

			common.uploadOverwrite.fileToUpdate = fileid;

			common.uploadOverwrite.create();

		},

		access:function(form)

		{

			var query = '?mode=access';

			

				query+= '&id='+form.id.value;

				query+= '&item_id='+form.item_id.value;

				query+= '&who='+form.who.value;

				

				query+= '&view='+(form.view.checked?1:0);

				query+= '&read='+(form.read.checked?1:0);

				query+= '&write='+(form.write_.checked?1:0);

				query+= '&erase='+(form.erase.checked?1:0);

			

			var ajax = QUERY('access');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

				}

				ajax.get(FILE+query);

		},

		newAccess:function(form)

		{

			var item_id  = form.item_id.value;

			var item_type = form.item_type.value;

			var who = form.users.value;

			

			

			var ajax = QUERY('newaccess');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.file.properties();

				}

				ajax.get(FILE+'?mode=newaccess&item_id='+item_id+'&item_type='+item_type+'&who='+who);

		},

		eraseAccess:function(id,item_id)

		{

			var ajax = QUERY('eraseaccess');

				ajax.afterEvent = function()

				{

					this.afterEvent = function(){};

					common.file.properties();

				}

				ajax.get(FILE+'?mode=eraseaccess&id='+id);

		},

		resetInline:function(e)

		{

			if(!e) e = window.event;

			var evt = new Event(e);

				

				

			var access = isParent(evt.target,{id:'access'});	

			var associate = isParent(evt.target,{id:'associate'});

			var a = isParent(evt.target,{id:'contentjswindowdiv'});

			var b = isParent(evt.target,{id:'confirmjswindowdiv'});

			var bool = isParent(evt.target,{id:'contextmenucontainer',className:common.folder.viewmode+'_view'});	

			

			if(!bool && !a && !b && !associate && !access)

			{

				common.folder.reset_();

				common.file.reset_();

				common.contextmenu.hide();

				

			}

		},

		sendto:function()

		{

		},

		print_:function()

		{

		},

		view:function()

		{

			this.clipboard = [];

			common.contextmenu.hide();

			for(i in this.files){window.open(OPEN+'?id='+i,'_blank');}

			this.reset_();

		},

		defs:function()

		{

			var win = common.content;

			var file = common.itemsSelected().file.data;

			

				win.afterEvent = function()

				{

					this.afterEvent = function(){};

					

					

					var q = new jsForm.obj('result');

						q.form = document.forms.content;

					

					var result = QUERY('result');

						result.get(INCLUDES+'definitions.php?'+q.query());

					

					

				}

				win.cancelEvent = function()

				{

					this.cancelEvent = function(){};

				}

				win.obj.setTitle('<span>Definitions</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

				win.obj.onContentUpdate = function()

				{

					this.onContentUpdate = function(){};

					this.show();

				}

				

				

				var getfile = QUERY('file');

					getfile.afterEvent = function()

					{

						this.afterEvent = function(){};

						win.obj.innerHTML('<table style="width:300px;" border="0" cellpadding="2"><tr><td>'+this.result+'</td></tr></table>');

					}

					getfile.get(INCLUDES+'definitions.php?id='+file);		

		},

		edit:{

			tinyWin:false,

			text:function(id,ext)

			{

				var win = common.content;

				var file = common.itemsSelected().file.data;

				

					win.afterEvent = function()

					{

						this.afterEvent = function(){};

						var form = document.forms.content;

						if(form)form.source.blur();

						

						var save = new simpleajax.obj('save');

							save.mode = 'customphp';

							save.afterEvent = function(){this.afterEvent = function(){};}

							save.get(FILE+"?mode=save&id="+file+"&content="+escape(form.source.value));

					}

					win.cancelEvent = function()

					{

						this.cancelEvent = function(){};

						var form = document.forms.content;

						if(form)form.source.blur();



					}

					win.obj.setTitle('<span>Text</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

					win.obj.onContentUpdate = function()

					{

						this.onContentUpdate = function(){};

						this.show();

						var form = document.forms.content;

							if(form)form.source.focus();

							

					}

					

				var source = QUERY('source');

					source.afterEvent = function()

					{

						this.afterEvent = function(){};

						win.obj.innerHTML('<table border="0" cellpadding="2"><tr><td><textarea class="codepress text" rows="20" cols="80" name="source">'+this.result+'</textarea></td></tr></table>');

					}

					source.get(FILE+'?mode=source&'+common.itemsSelected().file.query);

			},

			code:function(id,ext)

			{	

				var win = common.content;

				var file = common.itemsSelected().file.data;

				

					win.afterEvent = function()

					{

						this.afterEvent = function(){};

						var form = document.forms.content;

						if(form)form.source.blur();

						

						var iframe = $("codepress");

						var save = new simpleajax.obj('save');

							save.mode = 'customphp';

							save.afterEvent = function(){this.afterEvent = function(){};}

							save.get(FILE+"?mode=save&id="+file+"&content="+escape(iframe.editor.getCode()));

						

							if(iframe) iframe.parentNode.removeChild(iframe);

						

					}

					win.cancelEvent = function()

					{

						this.cancelEvent = function(){};

						var form = document.forms.content;

						if(form)form.source.blur();

						var iframe = $("codepress");

							if(iframe) iframe.parentNode.removeChild(iframe);

					}

					win.obj.setTitle('<span>Source</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

					win.obj.onContentUpdate = function()

					{

						this.onContentUpdate = function(){};

						this.show();

						var form = document.forms.content;

							if(form)form.source.focus();

							

					}

					win.obj.onShow = function()

					{

						this.onShow = function(){};

						CodePress.run(document.forms.content.source);

					}

					

				var source = QUERY('source');

					source.afterEvent = function()

					{

						this.afterEvent = function(){};

						win.obj.innerHTML('<table border="0"><tr><td><textarea class="codepress text" rows="20" cols="80" name="source">'+this.result+'</textarea></td></tr></table>');

					}

					source.get(FILE+'?mode=source&id[]='+file);

			},

			wyswyg:function(id)

			{

				var file = common.itemsSelected().file.data;

				this.tinyWin = window.open(INCLUDES+"tinymce.php?id="+file, "_blank", 'toolbar=no,status=no,titlebar=no,width=800,height=650');

			}

		},

		cancelEvent:function(){},

		afterEvent:function(){}

	},

	upload:{

		obj:false,

		swfupload:false,

		file:false,

		allow:"*.*;",

		progress:function(fileObj,bytesLoaded,bytesTotal)

		{

			var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

			var obj = $('progress');

				if(obj) obj.innerHTML+='<div style="width:100px;text-align:center;">Uploading... '+percent+'%</div>';

		},

		create:function()

		{

			if(window.ie6) url = "docmanager/includes/upload.php";

				else if(window.ie7) url = "docmanager/includes/upload.php";

					else if(window.gecko) url = "../../includes/upload.php";

			

			var defs = {

				upload_url: url,

				post_params:{

					"folder" : '1',

					"mode" : "new",

					"author" : String(common.login.current.username)

				},

				file_size_limit : String(MAX_FILE_UPLOAD),

				//file_types : "*.mp3;*.pdf;*.xml;*.jpg;*.png;*.gif;*.txt;*.doc;*.ini;*.zip;*.xls;*.mpeg;*.mov;",

				file_types : "*.*;",

				file_types_description : "Any Files",

				file_upload_limit : "10",

				file_queue_limit : "5",

				

				file_dialog_start_handler : common.upload.afterEvent,

				file_queued_handler : fileQueued,

				file_queue_error_handler : fileQueueError,

				file_dialog_complete_handler : fileDialogComplete,

				upload_start_handler : function(){

						var multiupload = $('multiupload');

						if(!multiupload) return true;

						multiupload.style.display = 'block';

						var center = new autoScroll.obj('multiupload');

							center.center();	

						return true;

					},

				upload_progress_handler : uploadProgress,

				upload_error_handler : uploadError,

				upload_complete_handler : uploadComplete,

				file_complete_handler : fileComplete,



				// Flash Settings

				flash_url : "docmanager/js/swfupload/swfupload.swf",	// Relative to this file (or you can use absolute paths)



				// UI Settings

				ui_container_id : "flashUI",

				degraded_container_id : "degradedUI",

				debug: false

			}

			var multiupload = $('multiupload'); 

			if(!multiupload) return false;

			this.file = [];



				var obj = new SWFUpload(defs);

					obj.customSettings.progressTarget = "progress";

					obj.customSettings.cancelButtonId = "uploadcancel";

					obj.onAllComplete = function()

					{

						if(common.upload.swfupload.getStats().files_queued == 0)

						{

							common.upload.file.each(function(value,index)

							{

								

									var ajax = QUERY('movefiles');

									if(index == Number(common.upload.file.length)-1)

									{

										ajax.afterEvent = function()

										{

											common.folder.set(common.folder.id);

											multiupload.style.display = 'none';

											common.upload.swfupload = false;

											

										}

									} else ajax.afterEvent = function(){};

									ajax.get(FILE+'?mode=move&id='+value+'&dest='+common.folder.id+'&folder='+common.folder.id);

								

							});	

						}

					}

					obj.onCreate = function()

					{

						this.onCreate = function(){};

						this.selectFiles();

					}

					

				common.upload.swfupload = obj;

		},

		afterEvent:function(){},

		cancelEvent:function(){}

	},

	uploadOverwrite:{

		obj:false,

		swfupload:false,

		file:false,

		fileToUpdate:false,

		afterEvent:function(){},

		progress:function(fileObj,bytesLoaded,bytesTotal)

		{

			var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

			var obj = $('Oprogress');

				if(obj) obj.setHTML("Uploading... "+percent+'%');

		},

		create:function()

		{	

			if(window.ie6) url = "includes/upload.php";

				else if(window.ie7) url = "includes/upload.php";

					else if(window.gecko) url = "../../includes/upload.php";

			var defs = {

				upload_url: url,

				post_params:{

					"folder" : '1',

					"mode" : "new",

					"author" : String(common.login.current.username)

				},

				file_size_limit : String(MAX_FILE_UPLOAD),

				file_types : "*.mp3;*.pdf;*.xml;*.jpg;*.png;*.gif;*.txt;*.doc;*.ini;*.zip;",

				file_types_description : "Any Files",

				file_upload_limit : "10",

				file_queue_limit : "1",

				

				file_dialog_start_handler : common.uploadOverwrite.afterEvent,

				file_queued_handler : fileQueued,

				file_queue_error_handler : fileQueueError,

				file_dialog_complete_handler : fileDialogComplete,

				upload_start_handler : function(){

						var multiupload = $('overwriteupload');

						if(!multiupload) return true;

						multiupload.style.display = 'block';

						var center = new autoScroll.obj('overwriteupload');

							center.center();	

						return true;

					},

				upload_progress_handler : uploadProgress,

				upload_error_handler : uploadError,

				upload_complete_handler : uploadComplete,

				file_complete_handler : fileComplete,

				// Flash Settings

				flash_url : "docmanager/js/swfupload/swfupload.swf",	// Relative to this file (or you can use absolute paths)

				// UI Settings

				ui_container_id : "OflashUI",

				degraded_container_id : "OdegradedUI",

				debug: false

			}



			common.upload.file = [];

			var multiupload = $('overwriteupload');

			if(!multiupload) return false;

			common.upload.file = [];



			var obj = new SWFUpload(defs);

				obj.customSettings.progressTarget = "Oprogress";

				obj.customSettings.cancelButtonId = "Ouploadcancel";

				obj.onAllComplete = function()

				{

					if(common.uploadOverwrite.swfupload.getStats().files_queued == 0)

					{

						common.upload.file.each(function(value,index)

						{

							var ajax = QUERY('delete');

								ajax.afterEvent = function()

								{

									var ajax = QUERY('movefiles');

										ajax.afterEvent = function(){common.folder.set(common.folder.id);multiupload.style.display = 'none';}

										ajax.get(FILE+'?mode=move&id='+value+'&dest='+common.folder.id+'&folder='+common.folder.id);

								}

								ajax.get(FILE+'?mode=erase&id='+common.uploadOverwrite.fileToUpdate+'&folder='+common.folder.id);

						});

					}

				}

				obj.onCreate = function()

				{

					this.onCreate = function(){};

					this.selectFiles();

				}

			common.uploadOverwrite.swfupload = obj;

		}

	},

	error:{

		obj:false,

		show:function(str)

		{

			this.obj.show();

			this.obj.onContentUpdate = function()

			{

				common.error.obj.onContentUpdate = function(){};

				var obj = new autoScroll.obj(common.error.obj.prefix+'jswindowdiv');

					obj.center();

			}

			this.obj.innerHTML('<div class="error">'+str+'</div>');

		}

	},

	treeview:{

		parent:this,

		arr:[],

		highlight:function()

		{

			var common = this.parent;

			var folder = common.folder;

			

			var icon = $('icon_'+id);

			if(!icon) return false;

			

			var src = String(icon.src);

			var of = /of/gi;

			var cf = /cf/gi;

			

			if(folder.previousOFolder)

			{

				$(folder.previousOFolder.id+'_a').removeClass('folder_selected');

				var previous = String(folder.previousOFolder.src);

				if(previous.match(cf)) folder.previousOFolder.src = previous.replace(cf,'of');

				else folder.previousOFolder.src = previous.replace(of,'cf');

			}

			

			icon.src = src.replace(cf,'of');

			$('icon_'+id+'_a').addClass('folder_selected');

			folder.previousOFolder = icon;

		},

		swap:function(id,img)

		{

			var obj = document.getElementById('folder_'+id);

			if(!obj) return false;

			

			var display = obj.style.display;

			if(display == '' || display == 'block') obj.style.display = 'none';

				else obj.style.display = 'block';

			

			

			var src = String(img.src);

			var minus = /minus/gi;

			var plus = /plus/gi;

			

			if(src.match(minus))

				img.src = src.replace(minus,'plus');

			else img.src = src.replace(plus,'minus');

			

			common.treeview.assignEVENTS();

		},

		create:function()

		{

			var tree = QUERY('tree');

				tree.afterEvent = function()

				{

					var treeview_content = document.getElementById('treeview_content');

					if(!treeview_content) return false;

					treeview_content.innerHTML = this.result;

					common.treeview.assignEVENTS();

					common.treeview.highlight();

				}

				tree.get(PATH+'/includes/treeview.php');

		},

		assignEVENTS:function()

		{

			var parent = this;

			var ajax = QUERY('tree1');

				ajax.afterEvent = function()

				{

					eval(this.result);

					parent.arr = tree;

					

					var obj = false;

					common.treeview.targets = new Array();

					for(i in common.treeview.arr)

					{

						obj = $('icon_'+common.treeview.arr[i]);

						if(obj)

						{

							common.treeview.targets.push(obj.getParent());

							var a = $('icon_'+common.treeview.arr[i]+'_a');

							if(a) a.addEvent('mousedown',common.folder.rightclick)

						}

						

					}

					common.treeview.afterEvent();

				}

				ajax.get(PATH+'/includes/treeview.php?mode=array');

		},

		check:function()

		{

			var parent = this;

			var ajax = QUERY('checktree');

				ajax.afterEvent = function()

				{

					eval(this.result);

					var access = true;

					tree.each(function(value,index)

					{

						access = parent.contains(String(value));

					});

					if(access) parent.afterEvent(parent);

				}

				ajax.get(PATH+'/includes/treeview.php?mode=array');

		},

		afterEvent:function(){},

		cancelEvent:function(){}

	},

	content:{

		obj:false,

		result:false,

		create:function(str,title)

		{

			var parent = this;

			this.obj.show();

			this.obj.onContentUpdate = function()

			{

				this.onContentUpdate = function(){};

				var obj = new autoScroll.obj(parent.obj.prefix+'jswindowdiv');

					obj.center();

			}

			this.obj.setTitle(title,'font-weight:bold;font-size:12px;');

			this.obj.innerHTML(str);

		},

		afterEvent:function(){},

		cancelEvent:function(){}

	},

	searchFile:{

		obj:false,

		result:false,

		query:function(form)

		{

			var keywords = form.keyword.value;

			

			var filename = form.filename?form.filename.checked:false;

			var extension = form.extension?form.extension.checked:false;

			var author = form.author?form.author.checked:false;

			var tags = form.tags?form.tags.checked:false;

			var description = form.description?form.description.checked:false;

			

			var type = new Array();

			if(filename) type.push('filename');

			if(extension) type.push('extension');

			if(author) type.push('author');

			if(tags) type.push('tags');

			if(description) type.push('description');

			

			if(type.length == 1) type = type.pop();

			else if(type.length > 1) {type = type.join("&type[]=");}

			

			var ajax = QUERY('search');

				ajax.afterEvent = function()

				{

					var obj = $('filebrowser');

					if(!obj) return false;

					obj.innerHTML = this.result;

					var obj = $('search_results_content');

					common.afterEvent();

				}

				ajax.get(FILE+'?mode=search&keyword='+escape(keywords)+'&kind=string&type[]='+type);

			

		},

		multiplequery:function(form)

		{

			var filename = form.filename.checked?form.filename_keyword.value:false;

			var extension = form.extension.checked?form.extension_keyword.value:false;

			var author = form.author.checked?form.author_keyword.value:false;

			var tags = form.tags.checked?form.tags_keyword.value:false;

			var description = form.description.checked?form.description_keyword.value:false;

			

			var html = '';

				if(filename) html+= "search[filename]="+escape(filename)+"&";

				if(extension) html+= "search[extension]="+escape(extension)+"&";

				if(author) html+= "search[author]="+escape(author)+"&";

				if(tags) html+= "search[tags]="+escape(tags)+"&";

				if(description) html+= "search[description]="+escape(description);

			

			var ajax = QUERY('search');

				ajax.afterEvent = function()

				{

					var obj = $('filebrowser');

					if(!obj) return false;

					obj.innerHTML = this.result;

				}

				ajax.get(FILE+'?mode=asearch&'+html);

		},

		create:function()

		{

			var parent = this;

			var ajax = QUERY('SEARCHHTML');

				ajax.afterEvent = function()

				{

					

					parent.obj.setTitle('<span>search</span>','font-weight:bold;font-size:12px;width:100px;float:left;');

					parent.obj.show();

					parent.obj.innerHTML('<table border="0"><tr></td>'+this.result+'</td></tr></table>');

					parent.obj.onHide = function()

					{

						var obj = document.getElementById('searchFileresult');

						if(!obj) return false;

						obj.style.visibility = 'hidden';

					}

					

				}

				ajax.get(SEARCH);

		},

		afterEvent:function(){},

		cancelEvent:function(){}

	},

	drag:{

		id:false,

		setTimeoutForce:function(time)

		{

			if(!time) time = 150;

			this.id = window.setTimeout("Drag.force($('drag_tracker'))",time);

		},

		eraseTimeoutForce:function()

		{

			if(this.id) window.clearInterval(this.id);

		}

	},

	multiselect:{

		node:{

			x:0,

			y:0

		},

		start:{

			x:0,

			y:0

		},

		end:{

			x:0,

			y:0

		},

		active:false,

		detectable:[],

		check:function()

		{

			this.detectable.each(function(value)

			{

				var obj = $(value);

				var coords = obj.getCoordinates();

				var middlex = (coords.left + (coords.width/2)) - 5;

				var middley = (coords.top + (coords.height/2)) - 5;

				

				if(common.folder.viewmode == 'detailed')

				{

					var coords = obj.cells.item(1).getCoordinates();

					var middlex = (coords.left + (coords.width/2)) - 5;

					var middley = (coords.top + (coords.height/2)) - 5;

					obj.setProperty('x',middlex);

					obj.setProperty('y',middley);

					obj.setProperty('width',10);

					obj.setProperty('height',10);

					

				} else {

					obj.setProperty('x',middlex);

					obj.setProperty('y',middley);

					obj.setProperty('width',10);

					obj.setProperty('height',10);

				}

			});

		},

		add:function(obj)

		{

			var coords = obj.getCoordinates();

			var middlex = (coords.left + (coords.width/2)) - 5;

			var middley = (coords.top + (coords.height/2)) - 5;

			

			if(common.folder.viewmode == 'detailed')

			{

				var coords = obj.cells.item(1).getCoordinates();

				var middlex = (coords.left + (coords.width/2)) - 5;

				var middley = (coords.top + (coords.height/2)) - 5;

				obj.setProperty('x',middlex);

				obj.setProperty('y',middley);

				obj.setProperty('width',10);

				obj.setProperty('height',10);

				

			} else {

				obj.setProperty('x',middlex);

				obj.setProperty('y',middley);

				obj.setProperty('width',10);

				obj.setProperty('height',10);

			}

			if(id = obj.getFirst().getProperty('fileid'))

			{

				obj.setProperty('type','file');

				obj.setProperty('itemid',id);

			}

			if(id = obj.getFirst().getProperty('folderid'))

			{

				obj.setProperty('type','folder');

				obj.setProperty('itemid',id);

			}

			this.detectable.push(obj);	

		},

		create:function(e)

		{

			if(!e) e = window.event;

			var events = new Event(e);

				

			

			if(isParent(events.target,{className:'search_table'})) return true;

			if(isParent(events.target,{id:'jsmenu'})) return false;

			if(isParent(events.target,{id:'contextmenu'})) return false;

			if(isParent(events.target,{id:'contextmenu_new'})) return false;

			if(isParent(events.target,{id:'contextmenu_edit'})) return false;

			if(isParent(events.target,{id:'contextmenu_view'})) return false;

			if(isParent(events.target,{id:'treeview_main'})) return false;

			if(isParent(events.target,{className:'undefined'})) return false;

			if(isParent(events.target,{className:common.folder.viewmode+'_view'})) return false;			

			

				common.file.reset_();

				common.folder.reset_();

				common.contextmenu.hide();

				events.stop();

				

			var obj = $('multiselect');

			if(obj == null) 

			{

				var obj = document.createElement('DIV');

					document.body.appendChild(obj);

					obj.id = 'multiselect';

					obj.style.padding = '0px';

					obj.style.margin = '0px';

				obj = $(obj);	

			}

			obj.style.cssText = 'position:absolute;top:'+(events.page.y+common.offsetY)+'px;left:'+(events.page.x+common.offsetX)+'px;';

			

			

			var dom = common.multiselect;

				dom.start.x = Number(events.page.x);

				dom.start.y = Number(events.page.y);

				dom.node.x = Number(dom.start.x);

				dom.node.y = Number(dom.start.y);

			

			var parent = $('filebrowser');

				parent.addEvent('mousemove',common.multiselect.onmove);

				obj.addEvent('mousemove',common.multiselect.onmove);	

				parent.addEvent('mouseup',function(e)

			    {

				    var evt = new Event(e);

						

					$('filebrowser').removeEvent('mousemove',common.multiselect.onmove);

					$('multiselect').style.display = 'none';

					common.multiselect.active = false;

			    });

				obj.addEvent('mouseup',function(e)

			    {

				    var evt = new Event(e);

						

					$('filebrowser').removeEvent('mousemove',common.multiselect.onmove);

					$('multiselect').style.display = 'none';

					common.multiselect.active = false;

			    })	

		},

		mark:function(obj,id,type)

		{

			

			if(type == 'file')

			{

				obj.addClass('item_selected');

				

				common.file.files[obj.getProperty('fileid')] = obj;

				

			} else if(type == 'folder')

			{

				obj.addClass('item_selected');

				common.folder.folders[obj.getProperty('folderid')] = obj;

			}

		},

		unmark:function(obj,id,type)

		{

			if(type == 'file') 

			{

				obj.removeClass('item_selected');

				delete common.file.files[obj.getProperty('fileid')];

			} 

			else if(type == 'folder')

			{

				obj.removeClass('item_selected');

				delete common.folder.folders[obj.getProperty('folderid')];

			}

		},

		coords:function()

		{

			this.top = {

				left:{

					x:0,

					y:0

				},

				right:{

					x:0,

					y:0

				}

			}

			this.bottom = {

				left:{

					x:0,

					y:0

				},

				right:{

					x:0,

					y:0

				}

			}

		},

		comparedot:function(square,dot)

		{

			var A = {

				x:square.top.left.x,

				y:square.top.left.y

			}

			var B = {

				x:square.top.right.x,

				y:square.top.right.y

			}

			var C = {

				x:square.bottom.right.x,

				y:square.bottom.right.y

			}

			var D = {

				x:square.bottom.left.x,

				y:square.bottom.left.y

			}

			var E = {

				x:dot.x,

				y:dot.y

			}

			

			

			if(

			(E.x >= A.x)

				&&(E.y <= D.y)

				   &&(E.x <= B.x)

				      &&(E.y >= B.y)

					  ) return true; else return false;	

		},

		onmove:function(e)

		{

			if(!e) e = window.event;

			var events = new Event(e);

				events.stopPropagation();

			

			common.multiselect.active = true;

			

			var obj = $('multiselect');

				obj.style.display = 'block';

				

			var dom = common.multiselect;

				dom.end.x = events.client.x;

				dom.end.y = events.page.y;

			

			var offsetX = false,offsetY = false;

			var top = false,left = false,width = false,height = false;

			

			var seek = new dom.coords();

			

			if((dom.end.y < dom.node.y) && (dom.end.x < dom.node.x))

			{

				offsetX = dom.node.x - dom.end.x;

				offsetY = dom.node.y - dom.end.y;

				

				top = dom.end.y;

				left = dom.end.x;

				width = offsetX;

				height = offsetY;		

	

			} else if(dom.end.x < dom.node.x)

			{

				offsetX = dom.node.x - dom.end.x;

				

				top = dom.node.y;

				left = dom.end.x;

				width = offsetX;

				height = (dom.end.y - dom.start.y);

				

			} else if(dom.end.y < dom.node.y)

			{

				var offsetY = dom.node.y - dom.end.y;

				

				top = dom.end.y;

				left = dom.node.x;

				width = (dom.end.x - dom.start.x);

				height = offsetY;

			

			} else {

				

				top = dom.node.y;

				left = dom.node.x;

				width = (dom.end.x - dom.start.x);

				height = (dom.end.y - dom.start.y);

				

				

			}

			

			obj.style.top = top + 'px';

			obj.style.left = left + 'px';

			obj.style.width = width + 'px';

			obj.style.height = height + 'px';

			

			

			seek.top.left.x = left;

			seek.top.left.y = top;

			

			seek.top.right.x = left + width;

			seek.top.right.y = top;

			

			seek.bottom.left.x = left;

			seek.bottom.left.y = top + height;

			

			seek.bottom.right.x = left + width;

			seek.bottom.right.y = top + height;

			

			dom.detectable.each(function(value)

			{

				top = Number(value.getProperty('y'));

				left = Number(value.getProperty('x'));

				width = Number(value.getProperty('width'));

				height = Number(value.getProperty('height'));

				id = Number(value.getProperty('itemid'));

				type = value.getProperty('folderid')?'folder':'file';

				

				var target = new dom.coords();

				

					target.top.left.x = left;

					target.top.left.y = top;

					

					target.top.right.x = left + width;

					target.top.right.y = top;

					

					target.bottom.left.x = left;

					target.bottom.left.y = top + height;

					

					target.bottom.right.x = left + width;

					target.bottom.right.y = top + height;

						

				if(

				   

				   dom.comparedot(seek,target.top.left)||

				   dom.comparedot(seek,target.top.right)||

				   dom.comparedot(seek,target.bottom.left)||

				   dom.comparedot(seek,target.bottom.right)

				   

				) dom.mark(value,id,type); else dom.unmark(value,id,type);



				

			});

		}

	},

	login:{

		current:{

			username:'public',

			firstname:'public',

			lastname:'',

			admin:false

		},

		set:function(){},

		create:function()

		{

			var ajax = QUERY();

				ajax.afterEvent = function()

				{

					eval(this.result);

					common.login.afterEvent();

				}

				ajax.get(LOGIN+'?mode=access');

		},

		afterEvent:function(){},

		cancelEvent:function(){}

	},

	statistics:{

		create:function()

		{

			var ajax = QUERY();

				ajax.afterEvent = function()

				{

					var html = this.result;

					common.content.obj.onContentUpdate = function()

					{

						this.onContentUpdate = function(){};

						this.show();

					}

					common.content.obj.setTitle('statistics');

					common.content.obj.innerHTML(html);

				}

				ajax.get(STATISTICS);

		}

	},

	ping:{

		id:false,

		create:function()

		{

			if(this.id) window.clearInterval(this.id);

			

			this.id = window.setInterval('common.ping.check();',500);

		},

		check:function()

		{

		}

	},

	frames:{

		obj:false,

		left:false,

		right:false,

		table:false,

		bottom:false,

		treeview:false,

		foldername:false,

		begin:0,

		value:0,

		active:true,

		check:function()

		{

			if(!this.active) return false;

			var obj = $('treeview_main');

			if(!obj) return false;

			

			this.left = obj;

			this.right = obj.getNext();

			this.table = $(obj.offsetParent);

			

			if(!this.obj)

			{

				var div = document.createElement('DIV');

				document.body.appendChild(div);

				div.style.cssText = 'position:absolute;cursor:w-resize;width:4px;font-size:4px;';

				div.UNSELECTABLE = 'on';

				this.obj = $(div);

			}

			if(!this.bottom)

			{

				var div = document.createElement('DIV');

				document.body.appendChild(div);

				div.style.cssText = 'position:absolute;cursor:n-resize;height:4px;font-size:4px;';

				div.innerHTML = '&nbsp;';

				div.UNSELECTABLE = 'on';

				this.bottom = $(div);

			}

			

			var coords = obj.getCoordinates();

			var left = (coords.left + coords.width) - 2;

			var top = coords.top;

			

			this.obj.style.top = top + 'px';

			this.obj.style.left = left + 'px';

			this.obj.style.height = coords.height + 'px';

			

			var coords = this.table.getCoordinates();

			var top = (coords.height + coords.top);

			

			this.bottom.style.top = (top - 2) + 'px';

			this.bottom.style.left = coords.left + 'px';

			this.bottom.style.width = coords.width + 'px';

			

			this.obj.addEvent('mousedown',function(e)

		    {

				var evt = new Event(e);

					evt.stop();

				

				if(window.parent) {

					window.parent.document.body.style.cursor = 'w-resize';

					document.body.style.cursor = 'w-resize';

				} else document.body.style.cursor = 'w-resize';

				$(document).addEvent('mousemove',common.frames.moveHorizontal);

				

				common.frames.begin = common.frames.obj.getCoordinates().left;

				common.frames.value = common.frames.left.getCoordinates().width;

			});

			this.bottom.addEvent('mousedown',function(e)

		    {

				var evt = new Event(e);

					evt.stop();

				

				if(window.parent) {

					

					window.parent.document.body.style.cursor = 'n-resize';

					document.body.style.cursor = 'n-resize';

					

				} else document.body.style.cursor = 'n-resize';

				$(document).addEvent('mousemove',common.frames.moveVertical);

				

				

				var table = $(common.frames.table);

				if(table)

				{

					var coords = table.getCoordinates();

					common.frames.begin = coords.height;

					common.frames.value = coords.bottom;

					common.frames.treeview = $('treeview_content').getCoordinates();

					common.frames.foldername = $('foldername').getCoordinates();

				}

			});

		},

		moveHorizontal:function(e)

		{

			if(!common.frames.active) return false;

			if(!e) e = window.event;

			var evt = new Event(e);

				evt.stopPropagation();

				

			var obj = common.frames;

			var left = obj.left;

			var right = obj.right;	

			var a = left.getCoordinates();

			var b = right.getCoordinates();

			var offset = (evt.page.x - obj.begin);

			

			obj.obj.style.left = (evt.page.x - 2) + 'px';

			left.style.width = (obj.value + offset - 3) + 'px';

			obj.onMove();

		},

		moveVertical:function(e)

		{

			if(!common.frames.active) return false;

			if(!e) e = window.event;

			var evt = new Event(e);

				evt.stopPropagation();

				

			var obj = common.frames;

			var table = obj.table;

			var offset = (evt.page.y - obj.value) + 1;

			table.style.height = (obj.begin + offset ) + 'px';

			obj.onMove(offset);

		},

		erase:function()

		{

			//window.status = common.frames.active;

			if(!common.frames.active) return false;

			$(document).removeEvent('mousemove',common.frames.moveHorizontal);

			$(document).removeEvent('mousemove',common.frames.moveVertical);

			if(window.parent)

			{

				window.parent.document.body.style.cursor = 'default';

				document.body.style.cursor = 'default';

				

			} else document.body.style.cursor = 'default';

			common.multiselect.check();

			

			var obj = $('treeview_main');

			if(!obj) return false;

			

			var coords = obj.getCoordinates();

			var left = coords.left + coords.width - 2;

			var top = coords.top;

			

			if(common.frames.obj)

			{

				common.frames.obj.style.top = top + 'px';

				common.frames.obj.style.left = left + 'px';

				common.frames.obj.style.height = coords.height + 'px';

			}

			

			

			

			var table = $(common.frames.table);

			if(table)

			{

				var coords = table.getCoordinates();

				var top = (coords.height + coords.top);

				common.frames.bottom.style.top = (top-2) + 'px';

				common.frames.bottom.style.left = coords.left + 'px';

				common.frames.bottom.style.width = coords.width + 'px';	

			}

			

			

		},

		onMove:function(){}

	}

}



var filter = function(access)

{

	var filter_true = window.parent?window.parent.$('filtertrue'):false;

	var filter_false = window.parent?window.parent.$('filterfalse'):false;

	var access = access;

	

	if(filter_true) filter_true.style.cssText = '';

	if(filter_false) filter_false.style.cssText = '';

	

	var ajax = QUERY('filter');

		ajax.afterEvent = function()

		{

			common.folder.set(common.folder.id);

			

			var current = window.parent?window.parent.$('filter'+access):false;

				if(current) current.style.cssText = 'color:#000000;text-decoration:none;';

			common.frames.check();

			

		}

		ajax.get(FILE+'?mode=filter&access='+access+'&EntityId='+common.id);

}





var QUERY = function(id)

{

	if(simpleajax.cache[id]) delete simpleajax.cache[id];

	var ajax = new simpleajax.obj(id);

		ajax.mode = 'simple';

		ajax.afterEvent = function(){};

	return ajax;

}

var ERASE = function(arr,i)

{

	var result = new Array();

	var value = false;

	while(arr.length > 0)

	{

		value = arr.pop();

		if(value != i) result.push(value);

	}

	return result;

}

var PUSH = function(arr,j)

{

	var access = true;

	for(var i=0;i<arr.length;i++)

	{

		if(arr[i] == j) access = false;

	}

	if(access) arr.push(j);

	return arr;

}

var pyramide = {

	drops:false,

	setDrops:function(arr)

	{

		var parent = this;

		arr.each(function(value)

		{

			//value.fx = value.effect('background-color', {wait: false});

			value.addEvents({

				'drop': function() 

				{						

					if(!parent.container) return false;

				

					common.folder.id = value.getProperty('id');

				

					if(parent.container.type == 'file')

					{

						common.file.cut();

						common.file.paste();

					} else if(parent.container.type == 'folder')

					{

						common.folder.cut();

						common.folder.paste();

					}

					

					parent.container.remove();

					parent.container = false;

					value.style.backgroundColor = '';

				},

				'over': function()

				{

					value.style.backgroundColor = '#ff0000';

				},

				'leave': function()

				{

					value.style.backgroundColor = '';

				}

			});

		});

		this.drops = arr;

	},

	container:false,

	time:false,

	setDrags:function(arr)

	{

		var parent = this;

		var folder = common.folder;

		var file = common.file;

		arr.each(function(item)

		{

			item.addEvent('mousedown',function(e) 

			{

				e = new Event(e).stop();

				

				

				var dim = item.getCoordinates();

				var obj = {

					top:e.page.y+2,

					left:e.page.x+5,

					opacity:0.7,

					position:'absolute',

					visibility:'hidden'

				}

		 

				var clone = new Element('span')

					.setStyles(obj) // this returns an object with left/top/bottom/right, so its perfect

					.addClass('drag')

					.addEvent('emptydrop', function()

					{

						this.remove();

						file.reset_();

						folder.reset_();

					}).inject(document.body);

					

					clone.id = this.id;

					clone.span = this;

					

					if(item.getProperty('fileid'))

					{

						file.select_(item.getProperty('fileid'),e,item);

						clone.type = 'file';	

					} else if(item.getProperty('folderid'))

					{

						folder.select_(item.getProperty('folderid'),e,item);

						clone.type = 'folder';

					}

					parent.container = clone;

				

				var drag = clone.makeDraggable(

				{

					droppables:parent.drops,

					onStart:function()

					{

						var html = '';

						for(index in common.file.files){html+='file. '+common.file.files[index].getProperty('ident')+'<br />';}

						for(index in common.folder.folders){html+='folder. '+common.folder.folders[index].getProperty('ident')+'<br />';}

						clone.setHTML(html);

						parent.container.style.visibility='visible';

					}

				});

				parent.time = window.setTimeout(function(){drag.start(e);},250);	

			});

			item.addEvent('mouseup',function(e){if(parent.time) window.clearInterval(parent.time);});

		});

	}

}





common.content.obj = new jswindow.obj('content')

common.content.obj.method.innerHTML = true;

common.content.obj.toolbar.setup.title.text = '<span class="upload_title">edit</span>';

common.content.obj.toolbar.setup.useGradient.vertical = false;

common.content.obj.style.top = 100;

common.content.obj.style.left = 350;

common.content.obj.ControlButtons.ok.enable = true;

common.content.obj.ControlButtons.cancel.enable = true;

common.content.obj.ControlButtons.style.padding = '2px';

common.content.obj.toolbar.setup.MinButton.enable = false;

common.content.obj.toolbar.setup.MaxButton.enable = false;

common.content.obj.style.backgroundColor = '#ffffff';

common.content.obj.content.style.textAlign = '';

common.content.obj.content.style.padding = 0;

common.content.obj.onClose = function()

{

	common.content.afterEvent = function(){};

	common.content.cancelEvent = function(){};

	this.hide();

	return false;

}

common.content.obj.onHide = function()

{

	this.onContentUpdate = function(){};

	common.content.afterEvent = function(){};

	common.content.cancelEvent = function(){};

	this.innerHTML('&nbsp;');

}

common.content.obj.onShow = function(){};

common.content.obj.onCreate = function()

{

	this.hide();

}

common.content.obj.ControlButtons.ok.onClick = function(o)

{

	common.content.afterEvent();

	o.hide();

	return false;

}

common.content.obj.ControlButtons.cancel.onClick = function(o)

{

	

	common.content.cancelEvent();

	o.hide();

	return false;

}



common.searchFile.obj = common.content.obj;

common.error.obj = common.content.obj;

common.upload.obj = common.content.obj;

