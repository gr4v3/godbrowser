// JavaScript Document
//isto faz com que o menu funcione no IE (IE estúpido)
/*
startList = function() 
{
	if (document.all&&document.getElementById) 
	{
		navRoot = document.getElementById("one");
		for (i=0; i<navRoot.childNodes.length; i++)
		{
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") 
			{
				node.onmouseover = function() {this.className+=" over";}
  				node.onmouseout=function(){this.className=this.className.replace(" over", "");}
   			}
  	    }
    }
}

window.onload=startList;

*/