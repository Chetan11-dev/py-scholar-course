var KEY_ESCAPE=27;
var KEY_ENTER=13;
var KEY_UP_ARROW=38;
var KEY_DOWN_ARROW=40;

$(document).ready(function(){
	//$("#ajax_response").css("left", "250px");
	$(document).click(function(){
		$("#ajax_response").fadeOut('slow');
	});
	//$("#fokeyword").focus();
	//var offset = $("#fokeyword").offset();
	//var width = $("#fokeyword").width()-2;
	//Start Janak
	var left = 910; //250; 
	var width = 310;
	var top = 69;
	//End Janak
	//$("#ajax_response").css("left",offset.left); 
	$("#ajax_response").css("left",left); 
	$("#ajax_response").css("width",width);
	$("#ajax_response").css("top",top);
	$("#ajax_response").hide();

	$("#ajax_response").mouseover(function(){
		$(this).find("li a:first-child").mouseover(function () {
			  $(this).addClass("selected");
		});
		$(this).find("li a:first-child").mouseout(function () {
			  $(this).removeClass("selected");
		});
		$(this).find("li a:first-child").click(function () {
			  $("#fokeyword").val($(this).find("span[class='symbol']").text());
			  $("#ajax_response").fadeOut("slow");
		});
	});

});

function onKeyUp(event, keyword)
{
	var keyId="keyword";
	var url="/emerge/live_market/dynaContent/live_watch/get_quote_SME/ajaxSMECompanySearch.jsp";
	var fokeyword = $("#"+keyId).val();
	//alert(fokeyword);
	 if(fokeyword.length >=2)
	 {
		 if(event.keyCode != 40 && event.keyCode != 38 && event.keyCode != 13 && event.keyCode != KEY_ESCAPE)
		 {
			 $("#loading").css("visibility","visible");
			 //var out=matches(fokeyword);
			// alert("url>>>"+url);
			 $.get(url,
					 {search:fokeyword, time:new Date().getTime()},
					function(out){
						$("#ajax_response").html(out);
						$("#ajax_response").css("display","block");
						$("#loading").css("visibility","hidden");
						$("#ajax_response ol li:first").addClass("selected");
					}
				);
		 }
		 else
		 {
			 var found=0;
			switch (event.keyCode)
			{
			 case 40:
				  found = 0;
				  $("#ajax_response ol li").each(function(){
					 if($(this).attr("class") == "selected")
						found = 1;
				  });
				  if(found == 1)
				  {
					var sel = $("#ajax_response ol li[class='selected']");
					sel.next().addClass("selected");
					sel.removeClass("selected");
				  }
				  else
					$("#ajax_response ol li:first").addClass("selected");
			 break;
			 case 38:
				  found = 0;
				  $("#ajax_response ol li").each(function(){
					 if($(this).attr("class") == "selected")
						found = 1;
				  });
				  if(found == 1)
				  {
					var sel = $("#ajax_response ol li[class='selected']");
					sel.prev().addClass("selected");
					sel.removeClass("selected");
				  }
				  else
					$("#ajax_response ol li:last").addClass("selected");
				  break;
			 case 13:
				$("#ajax_response").fadeOut("slow");
				found = 0;
				  $("#ajax_response ol li").each(function(){
					 if($(this).attr("class") == "selected")
						found = 1;
				  });
				  if(found == 1){
						var sel = $("#ajax_response ol li[class='selected']");
						var sym=sel.find("a span[class='symbol']").text();
						$("#"+keyId).val(sym);
						var symNT=sel.find("a.notTraded span[class='symbol']").text();
						if (symNT&&symNT.length>0)
						{
							$("#"+keyId).parent().find(".button").focus();
							alert('Symbol not traded today');
						}
						else if(sym && sym.length>0){
							var link=$("#ajax_response ol li[class='selected'] a").attr("href");
							getQuote(link,keyId);
						}
						else
							alert('Symbol Not Found');
				  }
				  else{
						var sym=$("#ajax_response ol li:first a span[class='symbol']").text();
						$("#"+keyId).val(sym);
						if(sym && sym.length>0){
						  var link=$("#ajax_response ol li:first a").attr("href");
						  getQuote(link,keyId);
						}
						else
							alert('Symbol Not Found');
				  }
			 break;
			 case KEY_ESCAPE:
				$("#ajax_response").fadeOut("slow");
				$("#"+keyId).val('');
			 break;
			}
		 }
	 }
	 else
		$("#ajax_response").fadeOut("slow");

}

function getQuote(link,key)
{
	var comp=$("#"+key).val();
	if(comp=='Enter company name or symbol'){
		return false;
	}
	if(comp.length < 2)
	{
		alert('Kindly enter 2 or more characters');
		$("#"+key).focus();
	 }
	 else{
		document.location=link;
	 }	 
}