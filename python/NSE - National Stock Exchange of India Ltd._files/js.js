function searchCheck()
{
	var searchString =document.getElementById('searchBox').value;
	if(document.getElementById('searchBox').value!="Search NSE" && document.getElementById('searchBox').value!="")
	{
		//window.location.replace("/search.jsp?q="+searchString);
		window.location.replace("/gsa/search.jsp?q="+escape(searchString)+"");
	}
	else
	{
		alert("Please enter text to search");
	}
}
function over_tip(_id)
{
	//$("#fundamentals_tbl").css({'position' : 'relative'});
	//$("#fundamentals_tbl table tr td").css({'position' : 'relative'});
	$("#" + _id).siblings(".tooltip").show();
}

function out_tip(_id)
{
	$("#" + _id).siblings(".tooltip").hide();
	//$("#fundamentals_tbl table tr td").css({'position' : 'static'});
	//$("#fundamentals_tbl").css({'position' : 'static'});
}

jsInclude("/common/js/common.js");
jsInclude("/common/js/mpulse.js");

function getNextTrdDate(str)
{
	/*$.get("/homeNextDate.htm",
	function(html){
	var nextTradeData = '';
	nextTradeData = html;
	str +=html;
	if(nextTradeData==''){//to check if the next trading date is available or not. If not available create an empty <p> tag
	var newParaTag = '';
	newParaTag = '<p style=\"height: 9px\"></p>';
	str +=newParaTag;
	}
	$("p.notification").html(str);
});*/

$("p.notification").html(str);
} 


function updateNotification()
	{
		var temp='';
	var text='';
	var code= indexObjs.code;	
	var marketHaltDesc= indexObjs.haltedStatus;//Added for circuit breaker
	try
	{
		if(code == 1)
		{
			 text='<span id="status1" style="color:red;">'+indexObjs.status+'</span><br>';
		}
		else
		{
			text='<span id="status1" style="color:#189009;">'+indexObjs.status+'</span><br>';
		}
		text+='<span>'+marketHaltDesc+'</span>';
	}catch(e)	
	{
	}
	getNextTrdDate(text);  
}



$(document).ready(function(){

		//added by Abhi on 14 Jan 2014
		
		$("#container").before("<div class='topLine'></div>");
		
		$("#tab14Content").show();
		$("#tab5Content").show();
		$("#tab6Content").hide();
		$("#tab7Content").hide();
		window.setInterval('loadIndicesData();getNifty();getTopGainersData();', 60*1000);
		//getNextTrdDate();

		//$('head').append('<meta http-equiv="X-UA-Compatible" content="IE=8">');

		var metaEle=document.createElement('meta');  
		metaEle.setAttribute('http-equiv','X-UA-Compatible');  
		metaEle.setAttribute('content','IE=8');
		//window.document.head.appendChild(metaEle);
		$('head').append(metaEle);


		$(".nav ul > li").hover(function(){
		$(this).find('.innerNav').show();
	}, function(){
		$(this).find('.innerNav').hide();
	})
	
	
	// ======== start animation ========
	
	setTimeout(function(){ $(".indices").height($(".int_left").height() - 30) },1000);  // updated by sagar 26nov13
	$(".overlay").click(function(){
		closeAnimation();
		$(".tabClose").fadeOut(100);
		if($(".equityUl").css("display")=="block"){ 
			hideEquityUl();
		}
	});
	
	$(".tabAnimate").click(function(){
		if($(".equityUl").css("display")=="block"){ 
			hideEquityUl();
		}
		$(".indices").height($(".int_left").height() - 30)  // updated by sagar 26nov13
		if($(".indices").hasClass('active')){
			closeAnimation();
			$(".tabClose").fadeOut(100);
			$('.footer_nav_main').removeClass('zIndex100');
			return;
		}

		$(".slidingDiv .close").click(); // updated by sagar 26nov13
		$("#main_menu").addClass('navHidden') // updated by sagar 26nov13
		$('.footer_nav_main').addClass('zIndex100');
		$(".overlay").fadeIn(100,function(){
		$(".int_left").animate({left:360},500).css('border-left-width',"0");
		setTimeout(function(){$(".indices").animate({paddingRight:20},10)},400);
			
		});
		$(".indices").addClass('active');
		$(".tabClose").fadeIn(400);
	});


	$(".tabClose").click(function(){
		
		$(".overlay").click();
	});
	
	$(".indices td").click(function(){
		if($(this).hasClass('head')) return;
		var indice = $(this).find("span.index a").text();
		$(".indices td").removeClass('active');
		$(this).parent().find('td').addClass('active')
			//Add code for dynamic graph
			//****************************
	});

	
	$(".indicesTab li#broad_indices").click(function(){

		$(".indicesTab li").removeClass("active");
		$(".other").hide();
		$(".sector").hide();
			$("#broad_indices").addClass("active");
			$(".broadMarket").fadeIn();

			
	})

	$(".indicesTab li#other_indices").click(function(){

		$(".indicesTab li").removeClass("active");
			$(".broadMarket").hide();
			$(".sector").hide();
			$("#other_indices").addClass("active");
			$(".other").fadeIn();
			
	})

	$(".indicesTab li#sectorial_indices").click(function(){
		$(".indicesTab li").removeClass("active");
			$(".broadMarket").hide();
			$(".other").hide();
			$("#sectorial_indices").addClass("active");
			$(".sector").fadeIn();
			
	})
	// ======== indices animation ========
	
   // updated by sagar 26nov13
	if(navigator.appName=="Microsoft Internet Explorer") {
		setTimeout(function(){$("#footerec").css("top",$(window).height()-47)},1000)
		$( window ).resize(function() {
			$("#footerec").css("top",$(window).height()-47)
		});
	}
   // updated by sagar 26nov13

   
   
   // start updated by sagar 6Jan14
   $(document).keyup(function(e) { 
		if (e.keyCode  == 27) {
			closeAnimation();
			$(".tabClose").fadeOut(100);
	    }  
	});
	// end updated by sagar 6Jan14

	

		//ended by Abhi on 14 Jan 2014
		$("#container").hide();
		try{
		addMenu(page[0]);
		if(document.getElementById("subMenu"))
		{
			addLhs(page[0]);
		}
		//globalnav();
		header();

		$("#keyword").show();
		$("#fokeyword").hide();
		$("#cidkeyword").hide(); 
		$("#comdkeyword").hide(); 

		searchSelect();

		$("#QuoteSearch").change(function(){
    

			//if(this.options[this.selectedIndex].text == 'Equity')
			if ($('#QuoteSearch option:selected').text()=='Equity')
			{
				
				$("#keyword").show();
				$("#fokeyword").hide();
				$("#cidkeyword").hide();
				$("#comdkeyword").hide();

			}
			 if ($('#QuoteSearch option:selected').text()=='Equity Derivatives')
			{
				$("#keyword").hide();
				$("#fokeyword").show();
				$("#cidkeyword").hide();
				$("#comdkeyword").hide();
			}
			 if ($('#QuoteSearch option:selected').text()=='Currency Derivatives')
			{
				$("#keyword").hide();
				$("#fokeyword").hide();
				$("#cidkeyword").show();
				$("#comdkeyword").hide();
			}
			if ($('#QuoteSearch option:selected').text()=='Commodity Derivatives')
			{
				$("#keyword").hide();
				$("#fokeyword").hide();
				$("#cidkeyword").hide();
				$("#comdkeyword").show();
			}
		});

		loadIndicesData();
		getNifty();
		//autoSuggest();
		addSupraNav();
		addGlobalNav(page[0]);
		
			if($(".rhs_nav"))
			{
				if(page[1] == 'products' || page[1] == 'invest' || page[1] == 'education' || page[1] == 'membership' || page[1] == 'gettingListed' || page[1] == 'global' || page[1] == 'supra' || page[1] == 'Equity'  ) //added global 02Jun2011
				{
					addRhs(page[0],page[1]);
				}
			}
		footer();
		$("#footer").html("");
		}catch(e){	
		}
		$("#container").show();
		
		
		/*$(".main_content .lhs_nav h3").click(function(){	alert(2);
			$(this).next("ul").slideToggle(300).siblings("ul").slideUp("");
			$(this).toggleClass("active"); return false;
		});*/
		
		$(".tabContent").hide();
		$("#tab1Content").show();
		$("#tab7Content").show();
		$("#tab9Content").show();
		$("#tab14Content").show();
		$("#tab20Content").show();
		$("#tab26Content").show();
		$("#tab27Content").show();
		$("#tab31Content").show();
		
		$("ul.tabs li").click(function()
		{		
			var index=$(".tabs li").index(this);
			$("ul.tabs").siblings('.tabContent').hide();
			$("ul.tabs").siblings('.tabContent').eq(index).show();
			$("ul.tabs").find("li").removeClass('sel');
			$(this).addClass('sel');	
		});	
		
		$("ul.tab li a").click(function(){			
			id=this.id;	
			$("#" + id).addClass("sel").parent().siblings("ul.tab li").children().removeClass("sel");
			$("#" + id + "Content").show().siblings(".tabContent").hide();				
		});	

		$('.show_hide_content').hide(); 
		$('#show-hide h5').click(function(){
			$(this).toggleClass('active').next().slideToggle(800); 
			return false; 
		});
	
		$(".close").click(function(e){
			e.stopPropagation();
			$(this).parent().slideUp(500);
			$(this).parents('.footerSlide').removeClass("active");
		});
	
		$(".slidingDiv").hide();
		$("#footer_nav .footerSlide a").click(function(){
			id=this.id;

			$("#" + id).toggleClass(function() {
				  return 'active';
			});
			$("#" + id).parent().siblings(".footerSlide").children().removeClass("active");
			$("#" + id + "Content").slideToggle().siblings(".slidingDiv").hide();

		});

		$("#slide01Content a.close").click(function(){
			$("#slide01").removeClass("active");
			
		});

		$("#slide03Content a.close").click(function(){
			$("#slide03").removeClass("active");
		});
			
		$("#footerec p.closefoot a").click(function(){
			$("#slide01").removeClass("active");
			$("#slide03").removeClass("active");
		});
		
		
		
		$(".closefoot a").toggle(
		  function () {
			$(this).parent().parent("div").animate({width:40});
			$(this).parent().parent("div").find(".slidingDiv").hide();
			$(this).removeClass("hide");
			$(this).addClass("show");
			$(this).parent().addClass("show");
			$(this).parent().parent().find('ul').hide();     //updated by sagar 26nov13
			$(this).html("&nbsp;");
			
		  },
		  function () {
			$(this).parent().parent("div").animate({width:1020});
			$(this).removeClass("show");
			$(this).addClass("hide");
			$(this).parent().removeClass("show");
			setTimeout(function(){				// updated by sagar 26nov13
				$("#footerec ul").show();
			},450)
			$(this).html("Hide");
		  }
		)
		
		
		/*Hover Functionality */
		$("#main_menu>ul>li").hover(function(){
			//$(this).find(".innerNav").fadeIn();
			if($(this).find(".innerNav").length)
			{
				//$(".black_overlay").stop(true, true).fadeIn();
				$(this).find(".innerNav").stop(true, true).fadeIn();
				$(this).addClass("hoverbg");
				//$(".black_overlay").css({'height':$(".content_big").height()});//date:29 Mar,2011 Sonal
			}
		},
		function()
		{
			$(".black_overlay").stop(true, true).fadeOut();					
			$(this).find("div.innerNav").stop(true, true).hide();			
			$(this).removeClass("hoverbg");			
		});	
		
		/*Hover Functionality */
		$(".accordian_down h3 span.click").click(function(){
			$(this).parent().toggleClass("active");
			$(this).parent().next().slideToggle();
		});
		
		$(".accordian h3").click(function(){
			$(this).toggleClass("active");
			$(this).next().slideToggle();
		});
		$(".accordian .other_peers a").click(function(){
			$(".other_peers").slideUp();
			$(".tabContent .accordian h3").removeClass("active");
		});
		/* More Contracts to More Janak Start*/
		$(".accordian_top_Default h3 span").click(function(){
			$(this).toggleClass("active");
			$(this).parent().prev('.accordian_content_Default').slideToggle(500);
			if(($(this).html())=="Less")
			{
				$(this).html("More");
			}
			else{
				$(this).html("Less");	
			}
		});
		/* More Contracts to More Janak End*/
		$(".accordian_top h3 span").click(function(){
			$(this).toggleClass("active");
			$(this).parent().prev('.accordian_content').slideToggle(500);			
			if(($(this).html())=="Less Contracts")
			{
				$(this).html("More Contracts");
			}
			else{
				$(this).html("Less Contracts");	
			}
		});
		$(".aboutUs_content ul.links li.morelink a").click(function(){
			$(this).toggleClass("active");
			$(this).parent().parent().prev('.more_in').slideToggle(500);			
			if(($(this).html())=="Less")
			{
				$(this).html("More");
			}
			else{
				$(this).html("Less");	
			}
		});
		$(".accordian_stock h3").click(function(){
			$(this).toggleClass("active");
			$(this).next('.accordian_content').slideToggle();
		});
		$(".indfaq_accordion h3 span").click(function(){
			$(this).parent().toggleClass("active");
			$(this).parent().next('.indfaq_format_content').slideToggle();
		});
		
		$(function() {
			$(".expandall").click(function(){
				$(this).parent().next(".file_format_accordion").children(".file_format_content").slideDown(500,function(){$(this).prev().addClass("active");});
				return false;
			});
		 
			$(".collapseall").click(function(){
				$(this).parent().next(".file_format_accordion").children(".file_format_content").slideUp(500,function(){$(this).prev().removeClass("active");});
				return false;
			});
			$(".expandcollapsebtm .expandall").click(function(){
			$(this).parent().prev(".file_format_accordion").children(".file_format_content").slideDown(500,function(){$(this).prev().addClass("active");});
			return false;
			});
	 
		$(".expandcollapsebtm .collapseall").click(function(){
			$(this).parent().prev(".file_format_accordion").children(".file_format_content").slideUp(500,function(){$(this).prev().removeClass("active");});
			return false;
		});
		});
		
	  $(function() {
			$(".expandall").click(function(){
			$(this).parent().next(".indfaq_accordion").children(".indfaq_format_content").slideDown(500,function(){$(this).prev().addClass("active");});
			return false;
			});
			
			$(".collapseall").click(function(){
			$(this).parent().next(".indfaq_accordion").children(".indfaq_format_content").slideUp(500,function(){$(this).prev().removeClass("active");});
			return false;
			});
			$(".expandcollapsebtm .expandall").click(function(){
			$(this).parent().prev(".indfaq_accordion").children(".indfaq_format_content").slideDown(500,function(){$(this).prev().addClass("active");});
			return false;
			});
	 
		$(".expandcollapsebtm .collapseall").click(function(){
			$(this).parent().prev(".indfaq_accordion").children(".indfaq_format_content").slideUp(500,function(){$(this).prev().removeClass("active");});
			return false;
		});
	  });
	  $(function() {
			$(".expandall").click(function(){
			$(this).parent().next(".products_accordion").children(".accordian_content").slideDown(500,function(){$(this).prev().addClass("active");});
			return false;
			});
	 
			$(".collapseall").click(function(){
				$(this).parent().next(".products_accordion").children(".accordian_content").slideUp(500,function(){$(this).prev().removeClass("active");});
				return false;
			});
			$(".expandcollapsebtm .expandall").click(function(){
				$(this).parent().prev(".products_accordion").children(".accordian_content").slideDown(500,function(){$(this).prev().addClass("active");});
				return false;
				});
		 
			$(".expandcollapsebtm .collapseall").click(function(){
				$(this).parent().prev(".products_accordion").children(".accordian_content").slideUp(500,function(){$(this).prev().removeClass("active");});
				return false;
			});
			
			$(".expandall").click(function(){
			$(this).parent().next(".mmb_accordion").children(".accordian_content").slideDown(500,function(){$(this).prev().addClass("active");});
			return false;
			});
			$(".collapseall").click(function(){
				$(this).parent().next(".mmb_accordion").children(".accordian_content").slideUp(500,function(){$(this).prev().removeClass("active");});
				return false;
			});
			$(".expandcollapsebtm .expandall").click(function(){
				$(this).parent().prev(".mmb_accordion").children(".accordian_content").slideDown(500,function(){$(this).prev().addClass("active");});
				return false;
				});
		 
			$(".expandcollapsebtm .collapseall").click(function(){
				$(this).parent().prev(".mmb_accordion").children(".accordian_content").slideUp(500,function(){$(this).prev().removeClass("active");});
				return false;
			});
			$(".rhslnk .divgraph a").click(function(){
				$(this).next("#showdiv").slideToggle(500);
				return false;
			});
			$(".rhslnk .close_graph").click(function(){
				$(".rhslnk #showdiv").slideUp(500);
				return false;
			});
		});
		$("a").each(function()
		{
			var href=$(this).attr("href");
			if(href && (href.match(".pdf") == ".pdf" || href.match(".xls") == ".xls" || href.match(".doc") == ".doc" || href.match(".docx") == ".docx" || href.match(".xlsx") == ".xlsx" || href.match(".zip") == ".zip" || href.match(".csv") == ".csv"))
			{
				$(this).attr("target", "_blank");
			}
		});
		var right = ($(window).width() - $("#footer_nav").width()) /2  ; //updated by sagar 26nov13
		$("#footerec").css("right",right)       //updated by sagar 26nov13
		
		$(window).resize(function(){
			var right = ($(window).width() - $("#footer_nav").width()) /2  ; //updated by sagar 26nov13
			$("#footerec").css("right",right)
		})
});
function show_div(a)
{	
	for(var i=1; i<=22; i++)
	{
		if(i == a){								
			document.getElementById('showdiv'+i).className = "DB";
			document.getElementById('lst'+i).className = "act";
			
		}
		else{								
			document.getElementById('showdiv'+i).className = "DN";
			document.getElementById('lst'+i).className = "";
			
		}
	}
}

function showhide(_id)
{
	var div_id  = document.getElementById(_id);
	if (div_id.style.display == 'none')
	{
		$(div_id).show('fast');
	}
	else
	{
		$(div_id).hide('fast');
	}
}

jQuery(document).ready(function(){
	$("#accordian li span.index a").click(function(event)
	{
		event.preventDefault();
		
		var index = $("#accordian li span.index a").index(this);
		
		$("#accordian li span.index a").each(function(i)
		{
			if ($(this).parent().parent().find(".index_info").css("display") == "block") 
			{
				if (index != i) 
				{
					$(this).parent().parent().find(".index_info").slideUp();
					$(this).parent().parent().removeClass("selected");
				}
			}
		});
		if ($(this).parent().parent().find(".index_info").css("display") != "block")
		{
			try{
					//load image...
					var imPath = $(this).parent().parent().find(".imPath").text();
					//var img = $(this).parent().parent().find(".index_info").find(".floatleft");
					//img.attr("src","/graphimages/"+imPath);
					var ifrm='';
					var lUrl="/charts/webtame/webchart.jsp?CDSymbol="+escape(imPath)+"&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp";
					if(imPath.indexOf("Pre Open")>-1){
						var sym = $.trim(imPath.replace("Pre Open",""));
						lUrl="/charts/webtame/webchart.jsp?CDSymbol="+escape(sym)+"&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_preopen_intraday_closing.jsp";
					}
					else{
						lUrl='/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp';
					}
					ifrm='<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="'+lUrl+'" width="100%" height="215px" ></iframe>';
					document.getElementById("iframe"+imPath).innerHTML=ifrm;
				}catch(e){}
			$(this).parent().parent().find(".index_info").slideDown();
			$(this).parent().parent().addClass("selected");
		}
		return false;
	});
	
	//sectoral Accordian
$("#accordianSector li span.index a").click(function(event)
		{
			event.preventDefault();
			
			var index = $("#accordianSector li span.index a").index(this);
			
			$("#accordianSector li span.index a").each(function(i)
			{
				if ($(this).parent().parent().find(".index_info").css("display") == "block") 
				{
					if (index != i) 
					{
						$(this).parent().parent().find(".index_info").slideUp();
						$(this).parent().parent().removeClass("selected");
					}
				}
			});
			if ($(this).parent().parent().find(".index_info").css("display") != "block")
			{				
				try{
					//load image...
					var imPath = $(this).parent().parent().find(".imPath").text();
					//var img = $(this).parent().parent().find(".index_info").find(".floatleft");
					//img.attr("src","/graphimages/"+imPath);
					var ifrm='<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp" width="100%" height="215px" ></iframe>';
					document.getElementById("iframe"+imPath).innerHTML=ifrm;
				}catch(e){}
				$(this).parent().parent().find(".index_info").slideDown();
				$(this).parent().parent().addClass("selected");
				
			}
			return false;
		});


		$(".broadMarket tbody tr").click(function(event)
		{
			
				try{
					
					//load image...
					var imPath =$(this).find("span.index a").attr('id').split('indexName')[1];
					getGraph('other',imPath);
					//var img = $(this).parent().parent().find(".index_info").find(".floatleft");
					//img.attr("src","/graphimages/"+imPath);

					if(imPath.indexOf("Pre Open")>-1){
						var sym = $.trim(imPath.replace("Pre Open",""));
						lUrl="/charts/webtame/webchart.jsp?CDSymbol="+escape(sym)+"&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_preopen_intraday_closing.jsp";
					}
					/*Added by Ruchira on 2/14/2014 for Vix homepage chart starts*/
					else if(imPath.indexOf("VIX")> -1){
						
						lUrl='/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=Vix_tame_intraday_home_indices_closing_redgreen.jsp';
					}
					/*Added by Ruchira on 2/14/2014 for Vix homepage chart ends*/
					else{
						lUrl='/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp';
					}


					var ifrm='<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src='+lUrl+' width="100%" height="215px" ></iframe>';
					document.getElementById("iframe"+imPath).innerHTML=ifrm;


				}catch(e){/*console.log(e)*/}
				
			
			return false;
		});


		$(".sector tbody tr").click(function(event)
		{
			
				try{
					
					//load image...
					var imPath =$(this).find("span.index a").attr('id').split('indexName')[1];
					getGraph('other',imPath);
					//var img = $(this).parent().parent().find(".index_info").find(".floatleft");
					//img.attr("src","/graphimages/"+imPath);

					if(imPath.indexOf("Pre Open")>-1){
						var sym = $.trim(imPath.replace("Pre Open",""));
						lUrl="/charts/webtame/webchart.jsp?CDSymbol="+escape(sym)+"&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_preopen_intraday_closing.jsp";
					}
					else{
						lUrl='/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp';
					}


					var ifrm='<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp" width="100%" height="215px" ></iframe>';
					document.getElementById("iframe"+imPath).innerHTML=ifrm;


				}catch(e){/*console.log(e)*/}
				
			
			return false;
		});


		$(".other tbody tr").click(function(event)
		{
			
				try{
					
					//load image...
					var imPath =$(this).find("span.index a").attr('id').split('indexName')[1];
					getGraph('other',imPath);
					//var img = $(this).parent().parent().find(".index_info").find(".floatleft");
					//img.attr("src","/graphimages/"+imPath);

					if(imPath.indexOf("Pre Open")>-1){
						var sym = $.trim(imPath.replace("Pre Open",""));
						lUrl="/charts/webtame/webchart.jsp?CDSymbol="+escape(sym)+"&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_preopen_intraday_closing.jsp";
					}
					else{
						lUrl='/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp';
					}


					var ifrm='<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="/charts/webtame/webchart.jsp?CDSymbol='+escape(imPath)+'&Segment=OI&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp" width="100%" height="215px" ></iframe>';
					
					document.getElementById("iframe"+imPath).innerHTML=ifrm;
				}catch(e){}
				
			
			return false;
		});

});


function getGraph(type, indice)
{
	if(indice=='NIFTY Pre Open')indice='CNX NIFTY Pre Open';
	var indexText='';
			indexText +='<li class="selected"'+
			'	<span class="index" >'+
			'		<a href="javascript:void(0)" style="display:none" id="indexName"'+indice+'>--</a>'+
			'	</span>'+ 
			'	<span id="im'+indice+'" style="display:none" class="imPath"></span>'+
			'	<span id="lastPrice'+indice+'" class="number">--</span> '+
			'	<span id="change'+indice+'" class="number green">'+
			'	<img src="#" width="8" height="4" alt="" />&nbsp;&nbsp;'+
			'		--'+
			'	</span> '+
			'	<span class="number green" id="pChange'+indice+'">--% </span>'+
			'	<div  class="index_info" style="display:block">'+
			'		<div id="iframe'+indice+'"></div>'+
			'	<div>'+
				'	<span></span>'+
			'	</div>'+
			'</li>';

			$("#accordianSector").html(indexText);
			
			var link = getStockWatchIndexLink(indice);
			if(link && link!="")
			{
				$("#stockwatch_indices a").attr("href",link);
				$("#stockwatch_indices").show();
			}
			else
			{
				$("#stockwatch_indices").hide();
			}	

			/*added by RM */
			var avail = isMarketMapAvail(indice);
			if(avail && avail!="")
			{
				//$("#stockwatch_indices a").attr("href",link);
				$("#map_of_market").show();
			}
			else
			{
				$("#map_of_market").hide();
			}	


			

			updateIndicesDynamic(indice);
}






/*homepagetop-search equity- Rahul Patil -Start*/
function getFocusEquity()
{
	 getFocus('keyword');
}
function getFocusDerivative()
{
	 getFocus('fokeyword');
}
function getFocusCurrency()
{
	 getFocus('cidkeyword');
}
function getFocusCommodity()
{
	 getFocus('comdkeyword');
}
function getFocus(keyword)
{
	$("#"+keyword).focus();
}
/*homepagetop-search equity- Rahul Patil -End*/

function header()
{
var headerDiv = "<div class='logo'><a href='/index_nse.htm'><img src='/common/images/logo.jpg' alt='NSE'></a> ";



//headerDiv += "		   </div>   ";
headerDiv += "	</div>";
headerDiv += "    <div class='topSearch'>           ";
headerDiv += "    	<div class='topLinks'>           ";
headerDiv += "			 <a  href='/global/content/about_us/about_us.htm'>About Us</a>           ";
headerDiv += "			 <a  href='/global/content/investor_rel/corporate_structure.htm'>Investor Relations</a>           ";
headerDiv += "			 <a  href='/global/content/media/nse_news.htm'>Media</a>           ";
headerDiv += "			 <a href='https://www.nseindia.com/resources/exchange-communication-circulars'>Circulars</a>            ";
headerDiv += "			 <a  href='/global/content/market_timings_holidays/market_timings_holidays.htm'>Holidays</a>           ";
headerDiv += "			 <a  href='https://www.nseindia.com/regulation'>Regulations</a>            ";
//headerDiv += "			 <a href='/global/content/faqs/faqs.htm'>FAQs</a>           "
headerDiv += "			 <a  href='https://www.nseindia.com/contact/contact-us' class='last'>Contact Us</a>           ";
headerDiv += "			 <!-- input type='text' value='Search NSE' name='search' class='arrow searchNSC' -->           ";
headerDiv += "           ";
headerDiv += "			 <input id='searchBox' class='arrow searchNSC' type='text' onblur=\"inserttext('Search NSE',this);\" onfocus=\"cleartext('Search NSE',this);\" onkeypress=\"if(event.keyCode==13){searchCheck();}\" value='Search NSE'></input>           ";
headerDiv += "		 </div>           ";
headerDiv += "		 <div class='clear'></div>           ";
headerDiv += "			<div class='search'>           ";
headerDiv += "				<div class='equity'>           ";
headerDiv += "					<div class='selectVal arrow'>Equity</div>           ";
headerDiv += "               <!--      <ul class='equityUl'>			provided by Indigo to handle cross browser issue           ";
headerDiv += "                    	<li>Equity</li>           ";
headerDiv += "                        <li>Equity Derivatives</li>           ";
headerDiv += "                        <li>Currency Derivatives</li>           ";
headerDiv += "                    </ul> -->           ";
headerDiv += "                               ";
headerDiv += "					<select id='QuoteSearch'>           ";
headerDiv += "						<option>Equity</option>           ";
headerDiv += "						<option>Equity Derivatives</option>           ";
headerDiv += "						<option>Currency Derivatives</option>           ";
headerDiv += "						<option>Commodity Derivatives</option>				";
headerDiv += "					</select>            ";
headerDiv += "                               ";
headerDiv += "                               ";
headerDiv += "				</div>           ";
headerDiv += "				<!-- Quote RM 19NOV213 starts-->           ";
headerDiv += "				<input type='text' class='arrow' onblur=\"inserttext('Enter company name or symbol',this);\" onfocus=\"cleartext('Enter company name or symbol',this);\" value='Enter company name or symbol' autocomplete='off' name='companyED' onkeydown=\"if(event.keyCode==13) return false;\" onkeyup=\"onKeyUp(event,&quot;keyword&quot;);\" id='keyword'>           ";
headerDiv += "				<input type='text' class='arrow' onblur=\"inserttext('Enter company name or symbol',this);\" onfocus=\"cleartext('Enter company name or symbol',this);\" value='Enter company name or symbol' autocomplete='off' name='companyED' onkeydown=\"if(event.keyCode==13) return false;\" onkeyup=\"onKeyUp(event,&quot;EDkeyword&quot;);\" id='fokeyword'>           ";
headerDiv += "				<input type='text' class='arrow' onblur=\"inserttext('Enter company name or symbol',this);\" onfocus=\"cleartext('Enter company name or symbol',this);\" value='Enter company name or symbol' autocomplete='off' name='CIDkeyword' onkeydown=\"if(event.keyCode==13) return false;\" onkeyup=\"onKeyUp(event,&quot;CIDkeyword&quot;);\" id='cidkeyword'>         ";
headerDiv += "				<input type='text' class='arrow' onblur=\"inserttext('Enter company name or symbol',this);\" onfocus=\"cleartext('Enter company name or symbol',this);\" value='Enter company name or symbol' autocomplete='off' name='COMDkeyword' onkeydown=\"if(event.keyCode==13) return false;\" onkeyup=\"onKeyUp(event,&quot;COMDkeyword&quot;);\" id='comdkeyword'>    ";
headerDiv += "				<span id='ajax_response' style='width: 280px; '></span>           ";
headerDiv += "				<!-- input type='text' value='Enter company name or symbol' name='search' class='arrow' -->           ";
headerDiv += "				<!-- Quote RM 19NOV213 starts-->           ";
headerDiv += "			</div>           ";
headerDiv += "    </div>           ";
headerDiv += "    <!-- Nifty corner starts here Added by RM 21112013-->           ";
headerDiv += "    <div class='topRightText'>           ";
headerDiv += "	<div id='niftyDiv'>           ";
headerDiv += "		</div>           ";
headerDiv += "		<div>           ";
headerDiv += "		           ";
headerDiv += "		           ";
headerDiv += "			<p class='notification' style='width:250px; float: left;'>           ";
headerDiv += "			</p>            ";
headerDiv += "			           ";
headerDiv += "		<p style='padding:2px 3px 0px 0px; float:right; font-size:1.1em; font-weight:bold;'>(All prices in <img alt='' src='/common/images/rupee_symbol.gif'>) </p>           ";
headerDiv += "		           ";
headerDiv += "		<!--p id='trdDt' style='padding:2px 20px 10px 5px; float:left; font-size:1.1em; font-weight:bold;'></p -->           ";
headerDiv += "		</div>           ";
headerDiv += "	</div>       ";

  $("#wrapper").prepend(headerDiv);
}

function footer(){


	var linkVar = "";
	linkVar += "<div class='clear'></div>           ";
	linkVar += "<div class='height40'></div>		           ";
	linkVar += "<div class='mediyaIcons'>           ";
	linkVar += "	<div class='m_LeftPannel'>           ";
	linkVar += "    	<ul>           ";
	linkVar += "        	<li class='first'>NSE group companies</li>           ";
	linkVar += "            <li>NSE Clearing</li>           ";
	linkVar += "            <li>NSETECH</li>           ";
	linkVar += "            <li>NSE Indices</li>           ";
	linkVar += "            <li>NSE Data &amp; Analytics</li>           ";
	linkVar += "            <li>NSEIT</li>           ";
	linkVar += "            <li>NSE Investments</li>           ";
	linkVar += "        </ul>           ";
	linkVar += "        <div class='clear'></div>           ";
	linkVar += "        <p><a href='/copyright.htm''><font color='#F68B1F'>Copyright &copy; 2017</font></a> National Stock Exchange of India Ltd. All rights reserved.&nbsp&nbsp&nbsp&nbsp Best viewed in IE8+ and 1024 x 768 resolution.</p>           ";
	linkVar += "    </div>           ";
	linkVar += "    <div class='m_rightPannel'>	           ";
	/*linkVar += "    	<ul>		           ";
	linkVar += "        <li class='first'><p style='padding: 9px 3px 0 0;'>Follow NSE</p></li>	<!-- Issues ID 29 changed by RM on 12/23/2013-->           ";
	linkVar += "            <li class='facebook'><a target='_blank' href='https://www.facebook.com/NationalStockExchange'>&nbsp;</a></li>           ";
	linkVar += "            <li class='twitter'><a target='_blank' href='https://twitter.com/NSEIndia'>&nbsp;</a></li>           ";
	linkVar += "        </ul >           ";*/
	linkVar += "        <div class='clear'></div>           ";
	linkVar += "        <div class='bottom_links'  style='padding-top: 38px'><a href='/global/content/termsofuse.htm'>Terms of Use</a> | <a href='/global/content/disclaimer.htm'>Disclaimer</a> | <a href='/sitemap.htm'>Sitemap</a></div>           ";
	linkVar += "    </div>           ";
	linkVar += "    <div class='clear'></div>           ";
	linkVar += "</div>";
	linkVar += "<div class='height40'></div>		           ";

	$(".footer_nav_main").before().after(linkVar);









	//<li><a href='/disclaimer.htm#Privacy'>Privacy Policy</a></li>
	var privfooter = "<ul><li><a href='/global/content/termsofuse.htm'>Terms of Use</a></li><li><a href='/global/content/disclaimer.htm'>Disclaimer</a></li><li><a href='/sitemap.htm'>Sitemap</a></li><li>Best viewed in IE8+ and 1024 x 768 resolution.</li></ul><p><a href='/copyright.htm'>Copyright  2013</a> National Stock Exchange of India Ltd. All rights reserved.&nbsp;&nbsp;</p>";
	var footerdiv = "<div id='footerec'>" +
						   "	<p class='closefoot'>" +
						   "		<a href='javascript:void(0);' class='hide' >" +
						   "			Hide" +
						   "		</a>" +
						   "	</p>" +
						  /* "	<ul class='left'>" +        //updated by sagar 26nov13
						 
						   "		<li class='footerSlide'>" +
						   "			<a href='javascript:void(0)' id='slide02'>" +
						   "				Recently Viewed Quotes" +
						   "			</a>" +
						   "		</li>" +
						   
						   "	</ul>" +
						   */     //updated by sagar 26nov13
						   "	<ul class='left' style='width: 420x;'>" +
								 "		<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"https://www.ncfm-india.com/ORE/OREloginPage.jsp\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide04' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				NCFM Online" +
							"			</a>" +
							"		</li>" +
							"   <li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"http://www1.nseindia.com/emerge\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide06' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				EMERGE" +
							"			</a>" +
							"		</li>" +

							"		<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"/emerge_itp/emerge_itp.htm\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide08' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				EMERGE-ITP" +
							"			</a>" +
							"		</li>" +

							"		<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"https://www.nsekra.com\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide05' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				KRA" +
							"			</a>" +
							"		</li>" +

						/*	"<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"/global/content/media/finance_blogs.htm\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide07' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				Blogs" +
							"			</a>" +
							"		</li>" +
							"<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"http://www.nsergess.com/\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide07' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				RGESS" +
							"			</a>" +
							"		</li>" +
							"<li class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'>" +
							"			<a href='javascript:var printpopup=window.open(\"/global/content/social_media.htm\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide07' class='hide' style='background:none;padding: 0 0 2px 0;'>" +
							"				SOCIAL MEDIA" +
							"			</a>" +
							"		</li>" +*/
							
							
							//"<li  class='' style='border-right: 1px solid #424240;    color: #F0F0F0;    float: left;    font-size: 1.2em;    font-weight: bold;    width: auto;    z-index: 100;'><a href='javascript:var printpopup=window.open(\"http://www.nseindia.com/emerge\",\"printpopup\",\"location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=1200,height=800,screenX=0,screenY=0,left=0,top=0\");printpopup.focus()' id='slide06' class='hide' style='background:none;padding: 0 0 2px 0;'>EMERGE</a></li>" +
							

						   "	</ul>" +
						   "	<ul class='right'>" +
						   "		<li class='footerSlide'>" +
						   "			<a href='javascript:void(0)' id='slide03' class='hide' style='background: url(/common/images/arrow.png) no-repeat 0 0;background-position: 140px -64px;'>" +
						   "				Recently Viewed Quotes" +
						   "			</a>" +
						   "		</li>" +
						   
						   "		<li class='first footerSlide'>" +
						   "			<a href='javascript:loadTickerData();' id='slide01' class='hide' style='background: url(/common/images/arrow.png) no-repeat 0 0;background-position: 37px -64px;'>" +
						   "				Ticker" +
						   "			</a>" +
						   "		</li>" +
						   
						   "	</ul>" +
						   
						   "	<div class=\"slidingDiv\" id=\"slide01Content\"><a href=\"javascript:void(0);\" class=\"close\"><img src=\"/common/images/close.gif\" alt=\"Close\" height=\"16\" width=\"16\"/></a>"+
						   "	<p>"+
						   "			<select name=\"tickerSel\" id=\"tickerSel\"  style=\"display: none;\">"+
						   "				<option value=\"CM\" selected=\"selected\">Equities</option>"+
						   "			<option value=\"FUTIDX\">FUTIDX</option>"+
						   "			<option value=\"FUTSTK\">FUTSTK</option>"+
						   "			<option value=\"OPTIDX\">OPTIDX</option>"+
			 			   "			<option value=\"OPTSTK\">OPTSTK</option>"+
						   "		</select>"+
						   "		<ul>"+
						   "			<li><a id=\"aCM\" onclick=\"$('#tickerSel').val('CM');loadTickerData();\" href=\"javascript:void(0);\">EQ</a></li>"+
						   "			<li><a id=\"aFUTIDX\" onclick=\"$('#tickerSel').val('FUTIDX');loadTickerData();\" href=\"javascript:void(0);\">FUTIDX</a></li>"+
						   "			<li><a id=\"aFUTSTK\" onclick=\"$('#tickerSel').val('FUTSTK');loadTickerData();\" href=\"javascript:void(0);\">FUTSTK</a></li>"+
						   "			<li><a id=\"aOPTIDX\" onclick=\"$('#tickerSel').val('OPTIDX');loadTickerData();\" href=\"javascript:void(0);\">OPTIDX</a></li>"+
						   "			<li class=\"last\"><a id=\"aOPTSTK\" onclick=\"$('#tickerSel').val('OPTSTK');loadTickerData();\" href=\"javascript:void(0);\">OPTSTK</a></li>"+
						   "		</ul>"+	
						   "	</p><p style=\"clear:both;\">"+
						   "	<div id=\"tickerData\"></div></p>"+	
						   "</div>"+
						  
						   "	<div class='slidingDiv sliding02' id='slide02Content'>" +
						   "		<a href='javascript:void(0)' class='close'>" +
						   "			<img src='/common/images/close.gif' alt='Close' height=\"16\" width=\"16\"/>" +
						   "		</a>" +
						   "	</div> " +
						   "	<div class='slidingDiv sliding03' id='slide03Content'>" +
						   "	<ul id=\"recentQuotesD\"></ul>"+
						   "		<a href='javascript:void(0)' class='close'>" +
						   "			<img src='/common/images/close.gif' alt='Close' height=\"16\" width=\"16\"/>" +
						   "		</a>" +
						   "	</div>" +
						   "</div>";
	//$('#footer').html(privfooter);
	$('#footer_nav').html(footerdiv);
	getRecentQuoteText();
	
	
};
/*Changed as on 24/03/2011*/
function addRhs(page,xml){
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
if(xml == 'liveMarket')
{
 var rhs = "<h4>Recently Viewed Quotes</h4><ul><li><a href='#'>HDFCBANK - EQ</a></li><li><a href='#'>AXISBANK - EQ</a></li><li><a href='#'>RCOM - EQ</a></li><li><a href='#'>HCLTECH - EQ</a></li></ul>"
}
else
{
	 var rhs = ""
}
 
xmlhttp.open("GET","/common/xml/"+xml+"Nav.xml",false);
xmlhttp.send();
xmlDocument=xmlhttp.responseXML;

xmlhttp.open("GET","/common/xml/"+xml+"RHS.xml",false);
xmlhttp.send();
xmlRelDocument=xmlhttp.responseXML;

var parent=$(xmlDocument).find("#"+page);

var subSecId = xml;
var mainSecId = parent.attr("id");
var secId ="";
var indPage = page.indexOf('_');
if(indPage>-1){
	var subStr =page.substring(0,indPage+1);
		if(subStr=="eq_" || page=="Equity" || subStr=="ind_"  || subStr=="mut_" || page=="mut" || subStr=="etf_" || subStr=="ipo_" || subStr=="slbs_" || subStr=="ofs_" || subStr=="ipp_" ){
		secId = "Equity";
	}
	else if(subStr=="eqder_" || subStr=="currder_" || subStr=="currdev_" || subStr=="irf_"){
	secId = "Derivative";
	}
	else if(subStr=="rdm_" || subStr=="wdm_" || subStr=="cb_" ){
	secId = "rdm";
	}
	}
else if(page=="Equity" ||  page=="ind" || page=="mut" || page=="etf" || page=="ipo" || page=="slbs" || page=="ipp_hm" || page=="ofs" || page=="ipp")
	{
	secId = "Equity";
}
else if(page=="Derivative" || page=="currdev" || page=="gi" || page=="irf"){
secId = "Derivative";
}
else if(page=="wdm_cmr" || page=="cb" || page=="ebp"){
secId = "rdm";
}
//pagewdm_cmr
else{
	secId=page;
	}
var relArray=xmlRelDocument.getElementsByTagName("sections");
for(var i=0; i<relArray.length; i++)
{
	var subRelArray = relArray[i].getElementsByTagName("subsection");
}
for(var i=0; i<subRelArray.length; i++)
{
	if ( (subSecId == subRelArray[i].getAttribute("id") && subRelArray[i].getAttribute("belongto") == "Related links") || (secId == subRelArray[i].getAttribute("id") && subRelArray[i].getAttribute("belongto") == "Related links")) 
	{ 
		rhs +="<h4>"+subRelArray[i].getAttribute("belongto")+"</h4>";

		for(j=0;j<subRelArray[i].getElementsByTagName("item").length;j++)
		{
			var itemSec = subRelArray[i].getElementsByTagName("item")[j];
			rhs +="<h5>"+itemSec.getAttribute('title')+"</h5>";
			rhs +="<ul>";
			for (k=0;k<itemSec.getElementsByTagName("link").length;k++)
			{
				var linkLi = itemSec.getElementsByTagName("link")[k];
				//modified by pradyumna 
				if(linkLi.getAttribute('hlink')=="/homepage/nse_mkt_trd_detail.htm"){
				rhs +="<li><a href='"+linkLi.getAttribute('hlink')+"' target=\"_blank\" >"+linkLi.getAttribute('title')+"  </a></li>";
				}
				else{
				rhs +="<li><a href='"+linkLi.getAttribute('hlink')+"'>"+linkLi.getAttribute('title')+"</a></li>";
				}
				//modified by pradyumna
			}
			rhs +="</ul>";
		}
	}
}
var intParent=$(xmlDocument).find("#"+page);
//var intSubSecId = intParent.parents("submenu").attr("id");
var intSubSecId = xml;
//var intSecId = parent.attr("id");
var intSecId = "";
var indPage = page.indexOf('_');
if(indPage>-1){
	var subStr =page.substring(0,indPage+1);
//	alert("subStr",+subStr);
		if(subStr=="eq_" || page=="Equity" || subStr=="ind_"  || subStr=="mut_" || page=="mut" || subStr=="etf_" || subStr=="ipo_" || subStr=="slbs_" || subStr=="ofs_" || subStr=="ipp_"){
		intSecId = "Equity";
	}
	else if(subStr=="eqder_" || subStr=="currder_" || subStr=="currdev_" || subStr=="irf_"){
	intSecId = "Derivative";
	}
	else if(subStr=="rdm_" || subStr=="wdm_" || subStr=="cb_" ){
	intSecId = "rdm";
	}
	}
else if(page=="Equity" ||  page=="ind" || page=="mut" || page=="etf" || page=="ipo" || page=="slbs" || page=="ipp_hm" || page=="ofs" || page=="ipp")
	{
	intSecId = "Equity";
}
else if(page=="Derivative" || page=="currdev" || page=="gi" || page=="irf" ){
intSecId = "Derivative";
}
else if(page=="wdm_cmr" || page=="cb" || page=="ebp"){
intSecId = "rdm";
}
//pagewdm_cmr
else{
	intSecId=page;
	}
var intRelArray=xmlRelDocument.getElementsByTagName("sections");
for(var i=0; i<intRelArray.length; i++)
{
	var intSubRelArray = intRelArray[i].getElementsByTagName("subsection");
}

for(var i=0; i<intSubRelArray.length; i++)
{
	if ( (intSubSecId == intSubRelArray[i].getAttribute("id") && intSubRelArray[i].getAttribute("belongto") == "You may also be interested in:") || (intSecId == subRelArray[i].getAttribute("id") && intSubRelArray[i].getAttribute("belongto") == "You may also be interested in:" )) 
	{ 
		rhs +="<h4>"+intSubRelArray[i].getAttribute("belongto")+"</h4>";
		for(j=0;j<intSubRelArray[i].getElementsByTagName("item").length;j++)
		{
			var intItemSec = intSubRelArray[i].getElementsByTagName("item")[j];
			rhs +="<h5>"+intItemSec.getAttribute('title')+"</h5>";
			rhs +="<ul>";
			for (k=0;k<intItemSec.getElementsByTagName("link").length;k++)
			{
				var intLinkLi = intItemSec.getElementsByTagName("link")[k];
				rhs +="<li><a href='"+intLinkLi.getAttribute('hlink')+"'>"+intLinkLi.getAttribute('title')+"</a></li>";
			}
			rhs +="</ul>";
		}
	}

}

//xmlhttp.open("GET","/common/xml/didYouKnow.xml",false);
//xmlhttp.open("GET","/didYouKnow.jsp",false);
//xmlhttp.send(null);
//xmlDocu=xmlhttp.responseXML;
//desc=xmlhttp.responseText;

/*var dykArray=xmlDocu.getElementsByTagName("dyk");
for(var i=0; i<dykArray.length; i++)
{
	var id = dykArray[i].getAttributeNode("id").nodeValue;
	if(id == xml)
	{
		/*** Modified on 26/04/2011 start** /
		if($(dykArray[i]).attr("imgsrc"))
		{
			
			rhs += "<div class='did_you_know'><p class='title'>"+dykArray[i].getAttribute("title")+"</p><p><img src='"+dykArray[i].getAttribute("imgsrc")+"' alt='"+dykArray[i].getAttribute("imgalt")+"'/></p><p>"+dykArray[i].getAttribute("description")+"</p><p><a href='"+dykArray[i].getAttribute("linkURL")+"'>"+dykArray[i].getAttribute("linktext")+"</a></p></div>";	
		}
		else
		{
			rhs += "<div class='did_you_know'><p class='title'>"+dykArray[i].getAttribute("title")+"</p><p>"+dykArray[i].getAttribute("description")+"</p><p><a href='"+dykArray[i].getAttribute("linkURL")+"'>"+dykArray[i].getAttribute("linktext")+"</a></p></div>";	
		}
		/*** Modified on 26/04/2011 end** /	
	}
	else if (id == subSecId)
	{
		rhs += "<div class='did_you_know'><p class='title'>"+dykArray[i].getAttribute("title")+"</p><p>"+dykArray[i].getAttribute("description")+"</p><p><a href='"+dykArray[i].getAttribute("linkURL")+"'>"+dykArray[i].getAttribute("linktext")+"</a></p></div>";
	}
}*/
//rhs += "<div class='did_you_know'><p class='title'>Did You Know</p><p>"+desc+"</p></div>";
rhs += "<div class='did_you_know'><p class='title'>Did You Know</p><p id='didYouKnowP'>The first stock ticker was invented by Edward A. Calahan in 1867.</p></div>";	
/* Coding for Did we know section in RHS*/
$('.rhs_nav').html(rhs);
$.get("/didYouKnow.jsp",function(html){
	$("#didYouKnowP").html(html);
}
);
}

/*Changed as on 24/03/2011*/
function popup(linkname) {
	//window.open(linkname,'NSE', 'height=600, width=980, scrollbars=yes, resizable=1,top=0,left=0')
	var pageName=linkname;
	var split_pageName=pageName.split('.');
	
	newwindow=window.open(linkname,split_pageName[0],'height=600,width=730, scrollbars=yes, resizable=1,top=0,left=0');
	if (window.focus) {newwindow.focus()}
	
}

function cleartext(page,formEl) 
{
	if(formEl.value == page)
	{
		formEl.value='';
	}
}
function inserttext(page,formEl) 
{
	if(formEl.value=='')
	{
		formEl.value = page;
	}
}


/*
Commented for Press Release 
function showbox(a)
	{	
		for(var i=1; i<=3; i++)
		{
			if(i == a){								
				document.getElementById('tabnav'+i).style.display="block" ;
				document.getElementById('lst'+i).className = "sel";
				
			}
			else{								
				document.getElementById('tabnav'+i).style.display="none";
				document.getElementById('lst'+i).className = "";
				
			}
		}
	}

*/

function showbox(a)
	{	
		for(var i=1; i<=2; i++)
		{
			if(i == a){								
				document.getElementById('tabnav'+i).style.display="block" ;
				document.getElementById('lst'+i).className = "sel";
				
			}
			else{								
				document.getElementById('tabnav'+i).style.display="none";
				document.getElementById('lst'+i).className = "";
				
			}
		}
	}

jsInclude("/javaScript/nifty.js");
//cssInclude("/autosuggest/css/style.css");
jsInclude("/autosuggest/js/script.js");
//jsInclude("/autosuggest/js/fosuggestscript.js");
jsInclude("/live_market/resources/js/ticker.js");
jsInclude("/javaScript/cookie_operations.js");
jsInclude("/javaScript/recentQuotes.js");
