if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","/common/xml/"+page[1]+"Nav.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
var lhsDiv="<ul class='firstNav'>";
for(var i=0; i<xmlDoc.getElementsByTagName("item").length; i++) // for all the menu items
{
	var menuItem=xmlDoc.getElementsByTagName("item")[i];
	//lhsDiv+="<li><a href='"+menuItem.getAttribute("link")+"'>"+menuItem.getAttribute("name")+"</a>";
	lhsDiv+="<li id='lhs_"+menuItem.getAttribute('id')+"'>";//<a href='javascript:void(0);'>"+menuItem.getAttribute("name")+"</a>
	if(xmlDoc.getElementsByTagName("item")[i].getElementsByTagName("submenu").length) //if there is a submenu
	{
		//lhsDiv+="<div class='innerNav' style='clear:both'>";
		lhsDiv+="<ul class='secondNav'>";
		for(var j=0; j<menuItem.getElementsByTagName("submenu").length; j++) //scan through the submenus
		{
			var subMenu=menuItem.getElementsByTagName("submenu")[j];
			//lhsDiv+="<li><span>"+subMenu.childNodes[0].nodeValue+"</span>";
			lhsDiv+="<li id='lhs_"+subMenu.getAttribute('id')+"'><h3>"+subMenu.getAttribute("name")+"</h3>";
			
			if(subMenu.getElementsByTagName("third").length) //if there are submenu items 
			{
				lhsDiv+="<ul class='thirdNav'>";
				for(var k=0; k<subMenu.getElementsByTagName("third").length; k++) //scan through them
				{
					var third=subMenu.getElementsByTagName("third")[k];
					//lhsDiv+="<li><a href='"+third.getAttribute("link")+"'>"+third.getAttribute("name")+"</a></li>";
					lhsDiv+="<li id='lhs_"+third.getAttribute('id')+"'><a href='"+third.getAttribute('link')+"'>"+third.getAttribute("name")+"</a>";//Make bold and indented
					if(third.getElementsByTagName("fourth").length) //if there are submenu items 
					{
						lhsDiv+="<ul class='fourthNav'>";
						for(var l=0; l<third.getElementsByTagName("fourth").length; l++) //scan through them
						{
							var fourth=third.getElementsByTagName("fourth")[l];
							//lhsDiv+="<li><a href='"+fourth.getAttribute("link")+"'>"+fourth.getAttribute("name")+"</a></li>";
							lhsDiv+="<li id='lhs_"+fourth.getAttribute('id')+"'><a href='"+fourth.getAttribute('link')+"'>"+fourth.getAttribute("name")+"</a>";
							if(fourth.getElementsByTagName("fifth").length) //if there are submenu items 
							{
								lhsDiv+="<ul class='fifthNav'>";
								for(var m=0; m<fourth.getElementsByTagName("fifth").length; m++) //scan through them
								{
									var fifth=fourth.getElementsByTagName("fifth")[m];
									//lhsDiv+="<li><a href='"+fifth.getAttribute("link")+"'>"+fifth.getAttribute("name")+"</a></li>";
									lhsDiv+="<li id='lhs_"+fifth.getAttribute('id')+"'><a href='"+fifth.getAttribute('link')+"'>"+fifth.getAttribute("name")+"</a>";
									if(fifth.getElementsByTagName("sixth").length) //if there are submenu items 
									{
										lhsDiv+="<ul class='sixthNav'>";
										for(var n=0; n<fifth.getElementsByTagName("sixth").length; n++) //scan through them
										{
											var sixth=fifth.getElementsByTagName("sixth")[n];
											//lhsDiv+="<li><a href='"+sixth.getAttribute("link")+"'>"+sixth.getAttribute("name")+"</a></li>";
											lhsDiv+="<li id='lhs_"+sixth.getAttribute('id')+"'><a href='"+sixth.getAttribute('link')+"'>"+sixth.getAttribute("name")+"</a>";
										}
										lhsDiv+="</ul>";
									}
									lhsDiv+="</li>";
								}
								lhsDiv+="</ul>";
							}
							lhsDiv+="</li>";
						}
						lhsDiv+="</ul>";
					}
					lhsDiv+="</li>";
				}
				lhsDiv+="</ul>";
			}
			lhsDiv+="</li>";
		}
		lhsDiv+="</ul>";
		//lhsDiv+="</div>";
	}
	lhsDiv+="</li>";
}
lhsDiv+="</ul>";
function addLhs(page)
{
	document.getElementById("subMenu").innerHTML=lhsDiv;
	$(".thirdNav").hide();
	$(".fourthNav").hide();
	$(".fifthNav").hide();
	$(".sixthNav").hide();
	//var last=document.getElementById("main_menu").getElementsByTagName("ul")[0].childNodes.length-1;
	//document.getElementById("main_menu").getElementsByTagName("ul")[0].childNodes[length].setAttribute("class", "last");
	//document.getElementById("main_menu").getElementsByTagName("ul")[0].lastChild.setAttribute("class", "last");
	//$("#main_menu > ul > li:last").addClass("last");
	
	setNavigationEvents();
	
	showCurrentPage(page);
	
	removeMainSections(page);
}

function setNavigationEvents()
{
/*	$(".firstNav>li").click(function(event)
	{
		$(this).find(".secondNav").slideToggle();
	});
	$(".secondNav>li").click(function(event)
	{
		event.stopPropagation();
		$(".secondNav>li").find(".thirdNav").slideUp();
		$(this).find(".thirdNav").slideToggle();
	});
	$(".thirdNav>li").click(function(event)
	{
		event.stopPropagation();
		$(".thirdNav>li").find(".fourthNav").slideUp();
		$(this).find(".fourthNav").slideToggle();
	});*/
	$(".fourthNav>li").click(function(event)
	{
		/*Modified as on 11/03/2011*/
		event.stopPropagation();
		var el=$(this);
		$(".fourthNav>li").each(function()
		{
			if($(this).attr("id") != el.attr("id"))
			{
				$(this).find(".fifthNav").slideUp();
			}
		});
		$(this).find(".fifthNav").slideDown();
		/*Modified as on 11/03/2011*/
	});
	$(".fifthNav>li").click(function(event)
	{
		/*Modified as on 11/03/2011*/
		event.stopPropagation();
		var el=$(this);
		$(".fifthNav>li").each(function()
		{
			if($(this).attr("id") != el.attr("id"))
			{
				$(this).find(".sixthNav").slideUp();
			}
		});
		$(this).find(".sixthNav").slideDown();
		/*Modified as on 11/03/2011*/
	});
	$(".sixthNav>li").click(function(event)
	{
		event.stopPropagation();
		//$(".sixthNav>li").find(".sixthNav").slideUp();
		//$(this).find(".sixthNav").slideToggle();
	});
	
	/*$(".nav>li").click(function(event)
	{
		event.stopPropagation();
		$(this).find("li>ul").slideUp();
		$(this).find("ul").slideToggle();
	});*/
	
}

function showCurrentPage(page)
{
	var currentPage=$(xmlDoc).find("#"+page);
	$("#lhs_"+page).show().parents().show();
	$("#lhs_"+page).show().children().show();
	//$("#"+page).parents().find('h3').addClass('active');
	$("#lhs_"+page).addClass('active');
	$("#subMenu").find('h3').addClass('active');
	$("#lhs_"+page).children("a").removeAttr("href");
	//document.getElementById(page).style.border="1px solid red";
}

function removeMainSections(page)
{
	var parent=$(xmlDoc).find("#"+page);
	while(parent.parent().length)
	{
		if(parent.parent().attr("id")=="prd")
		{
			$("#lhs_"+parent.attr("id")).siblings().hide();
			addSectionsToBottom(parent, page);
			break;
		}
		parent=parent.parent();
	}
}

var otherListContent;
function addSectionsToBottom(section, page)
{
	var parent=$(xmlDoc).find("#"+page);
	while(parent.parent().length)
	{
		if(parent.parent().attr("id")==section.attr("id"))
		{
			otherListContent=$("#lhs_"+parent.attr("id")).siblings().detach();
			//$("#"+parent.attr("id")).parent().append("<li id='other"+parent.attr("id")+"'><h3>Other "+ parent.parent().attr("id") +"</h3></li>");
			$("#subMenu").append("<div id='otherProducts'><h3>Other "+ parent.parent().attr("id") +" Products</h3></div>");
			$("#otherProducts").append("<ul id='othersList'></ul>");
			$("#othersList").append(otherListContent);
			$("#othersList").find(".fourthNav").detach();
			break;
		}
		parent=parent.parent();
	}
	
}



