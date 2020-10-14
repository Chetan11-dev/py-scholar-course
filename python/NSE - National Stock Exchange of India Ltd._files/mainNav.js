if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

xmlhttp.open("GET","/common/xml/navigation.xml",false);
xmlhttp.send(null);
xmlDoc=xmlhttp.responseXML;
var menuDiv="<ul>";
	for (var i=0; i<xmlDoc.getElementsByTagName("item").length-1; i++) // for all the menu items
	{
		var menuItem=xmlDoc.getElementsByTagName("item")[i];
		//alert(xmlDoc.getElementsByTagName("item")[i].getAttribute("name"));
		var target = '';
		if($(menuItem).attr('target'))
			target="target='"+$(menuItem).attr('target')+"'";
		
		if($(menuItem).attr('img'))
		{
			menuDiv+="<li id='main_"+menuItem.getAttribute('id')+"'><a href='"+menuItem.getAttribute("link")+"' "+target+"><img border='0' src='"+menuItem.getAttribute("img")+"' alt='"+menuItem.getAttribute("alt")+"'/></a>";
	
		} else {
			menuDiv+="<li id='main_"+menuItem.getAttribute('id')+"'><a href='"+menuItem.getAttribute("link")+"' "+target+">"+menuItem.getAttribute("name")+"</a>";
		}
		if(xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("submenu").length) //if there is a submenu
		{
			menuDiv+="<div class='innerNav' id='nav" + xmlDoc.getElementsByTagName("item")[i].getAttribute("id") +"' style='display:none;clear:both'>";
			menuDiv+="<ul>";
			for(var j=0; j<menuItem.getElementsByTagName("submenu").length; j++) //scan through the submenus
			{
				var subMenu=menuItem.getElementsByTagName("submenu")[j];
				menuDiv+="<li id='main_"+subMenu.getAttribute('id')+"'><span>"+subMenu.getAttribute("name")+"</span>";
				
				if(subMenu.getElementsByTagName("submenuitem").length) //if there are submenu items 
				{
					menuDiv+="<ul class='submenu'>";
					for(var k=0; k<subMenu.getElementsByTagName("submenuitem").length; k++) //scan through them
					{
						var linkname = subMenu.getElementsByTagName("submenuitem")[k];
						//alert(linkname.getAttribute('target'));	
						/*** Modified on 26/04/2011 start***/
						if($(linkname).attr('target'))
						{
							menuDiv+="<li id='main_"+linkname.getAttribute('id')+"'><a href='"+linkname.getAttribute("link")+"' target='" + linkname.getAttribute('target') + "'>"+linkname.getAttribute("name")+"</a></li>";	
						}
						else
						{
							menuDiv+="<li id='main_"+linkname.getAttribute('id')+"'><a href='"+linkname.getAttribute("link")+"'>"+linkname.getAttribute("name")+"</a></li>";	
						}
						/*** Modified on 26/04/2011 end***/
					}
					menuDiv+="</ul>";
				}
				menuDiv+="</li>";
			}
			menuDiv+="</ul>";
			menuDiv+="</div>";
		}
		menuDiv+="</li>";
	}
menuDiv+="</ul>";

function addMenu(page)
{
	document.getElementById("main_menu").innerHTML=menuDiv;
	//var last=document.getElementById("main_menu").getElementsByTagName("ul")[0].childNodes.length-1;
	//document.getElementById("main_menu").getElementsByTagName("ul")[0].childNodes[length].setAttribute("class", "last");
	//document.getElementById("main_menu").getElementsByTagName("ul")[0].lastChild.setAttribute("class", "last");
	$("#main_menu > ul > li:last").addClass("last");
	
	var parent=$(xmlDoc).find("#"+page);
	while(parent.parent().length)
	{
		if(parent.parent().attr("id")=="navigation")
		{
			$("#main_"+parent.attr("id")).addClass("active");
			break;
		}
		parent=parent.parent();
	}
	addBreadcrumb(page);
	addNoten();
}

function addNoten(){
 //   var htmln = "<div class='alert' style=' padding-top: 0px' ><h2 style='color:#800000'> <marquee  scrollamount=3 style='background: #F5F098;width:975px;'>The old website will not be available after August 2020. Please refer  <a href='https://archives.nseindia.com/content/circulars/WEB45032.pdf'> Circular 45032</a> </marquee> </h2>";
   // $("#main_menu").append(htmln);
}

//code for breadcrumbs
function addBreadcrumb(page)
{
	if(document.getElementById("breadcrumb")){
		var parent=$(xmlDoc).find("#"+page);
		var breadcrumb=$("#breadcrumb");
		breadcrumb.prepend("<ul class='breadcrumb'>");
		breadcrumb.find("ul").prepend("<li>"+parent.attr("name")+"</li>");
		
		while(parent.parent().attr("id")!="navigation")
		{
				parent=parent.parent();
				//Change Done by Mahendra
				if(parent.attr("name")!="Live Watch" && parent.attr("name")!="Option Chain" &&  parent.attr("name")!="Live Analysis" ){
				breadcrumb.find("ul").prepend("<li id='bread_"+parent.attr("id")+"'><a href='"+parent.attr("link")+"'>"+parent.attr("name")+"</a></li>");
				}
				else{
				breadcrumb.find("ul").prepend("<li id='bread_"+parent.attr("id")+"'><a href='#' style=\"cursor:text;color:#616060\">"+parent.attr("name")+"</a></li>");
				}
				//Change Done by Mahendra
		}
		
		breadcrumb.find("ul").prepend("<li><a href='/index_nse.htm'>Home</a></li>");
		breadcrumb.append("</ul>");
	}
}

xmlhttp.open("GET","/common/xml/supraNav.xml",false);
xmlhttp.send(null);
xmlDocSup=xmlhttp.responseXML;

var supraDiv="<ul class='top_nav'>";
	for (var i=0; i<xmlDocSup.getElementsByTagName("submenu").length; i++) // for all the menu items
	{
		var menuItem=xmlDocSup.getElementsByTagName("submenu")[i];
		//alert(xmlDoc.getElementsByTagName("item")[i].getAttribute("name"));
		supraDiv+="<li id='supra_"+menuItem.getAttribute('id')+"'><a href='"+menuItem.getAttribute("link")+"'>"+menuItem.getAttribute("name")+"</a>";
		if(menuItem.getAttribute('id') == 'ul') 
		{
			supraDiv+="<ul>";
			for(var j=0; j<menuItem.getElementsByTagName("third").length; j++) //scan through the submenus
			{
				var supraMenu=menuItem.getElementsByTagName("third")[j];
				supraDiv+="<li id='main_"+supraMenu.getAttribute('id')+"'><a href='"+menuItem.getAttribute("link")+"'>"+supraMenu.getAttribute("name")+"</a></li>";
			}
			supraDiv+="</ul>";
		}
		supraDiv+="</li>";
	}

supraDiv+="</ul>";

function addSupraNav(page)
{
	if(document.getElementById("subMenu"))
	{	
		$('.right_clm').prepend(supraDiv);
		$(".top_nav").find("#supra_nse a").addClass("active");
		var supraVar = $('#subMenu').find('li.active').parent().parent().attr("id");
		var mySplitResult = supraVar.split("_");
		
		if (mySplitResult[1])
		{
			$(".top_nav").find("#supra_nse a").removeClass("active");
			$(".top_nav").find("#supra_"+mySplitResult[1]).addClass("active");
		}
		if (!$("#supra_"+mySplitResult[1]).length)
		{
			$(".top_nav").find("#supra_nse").addClass("active");
		}
	}
	else
	{
		$('.right_clm').prepend(supraDiv);
		$(".top_nav").find("#supra_nse").addClass("active");
	}
}



xmlhttp.open("GET","/common/xml/globalNav.xml",false);
xmlhttp.send(null);
xmlDocGlo=xmlhttp.responseXML;
var globalDiv="<ul class='top_nav_main'>";
	for (var i=0; i<xmlDocGlo.getElementsByTagName("submenu").length; i++) // for all the menu items
	{
		var menuItem=xmlDocGlo.getElementsByTagName("submenu")[i];
		//alert(xmlDoc.getElementsByTagName("item")[i].getAttribute("name"));
		if(menuItem.getAttribute('id') == 'cir'){
			globalDiv+="<li id='global_"+ menuItem.getAttribute('id')+"'><a style=padding-right:0px href='"+menuItem.getAttribute("link")+"'>"+menuItem.getAttribute("name")+"</a><a target=new href=http://feeds.feedburner.com/nseindia/circulars style=margin-left:-5px;padding-right:1px;background:none;><img width=12 height=12 border=0 alt=RSS src=/common/images/iconFeed.gif></a></li>";
		}else{
		globalDiv+="<li id='global_"+ menuItem.getAttribute('id')+"'><a href='"+menuItem.getAttribute("link")+"'>"+menuItem.getAttribute("name")+"</a></li>";
		}
	}

globalDiv+="</ul>";

function addGlobalNav(page)
{
	if(document.getElementById("subMenu"))
	{	
		$('.header_left').prepend(globalDiv);
		$(".header_left ul.top_nav_main li:first a").addClass("first");
		var globalVar = $('#subMenu').find('li.active').attr("id");
		//alert(globalVar);
		var mySplitResultg = globalVar.split("_");
		if (mySplitResultg[1])
		{
			$(".top_nav_main").find("#global_"+mySplitResultg[1]+" a").addClass("active");
		}
	}
	else
	{
		$('.header_left').prepend(globalDiv);
		$(".header_left ul.top_nav_main li:first a").addClass("first");
		//$(".top_nav_main").find("#global_"+mySplitResultg[1]+" a").addClass("actives");
	}
}

function jsInclude(url){
	document.write('<scr' + '' + 'ipt type="text/javascript" src="' + url + '"></scr' + '' + 'ipt>');
}

function cssInclude(url){
	document.write('<li' + '' + 'nk type="text/css" href="' + url + '"></li' + '' + 'nk>');
}

jsInclude("/common/js/subNav.js");
jsInclude("/emerge/javaScript/nifty.js");
jsInclude("/emerge/autosuggest/js/autosuggest.js");
//jsInclude("/autosuggest/js/fosuggestscript.js");
jsInclude("/emerge/homepage/homepageIndices.js");
