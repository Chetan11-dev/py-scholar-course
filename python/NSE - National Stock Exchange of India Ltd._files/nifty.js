/**
* parameter : isAsync 
* value : true/false
* true : synchronous call
* false : asynchronous call
*/

function getNiftyForSME(isAsync){
	var async=false;
	if(isAsync)
		async=true;
$.ajax({
	url:'/homepage/Indices1.json',
		success:function(html){
			populateNiftyDivs(html);
		}
		//,async:async
	});
}
function getNiftySMEForSME(isAsync){
	var async=false;
	if(isAsync)
		async=true;
$.ajax({
	url:'/live_market/dynaContent/live_watch/stock_watch/niftysmeemergeStockWatch.json',
		success:function(html){
			populateNiftySMEDivs(html);
		}
		//,async:async
	});
}
function populateNiftyDivs(responseText)
{	
	var nobj = document.getElementById("niftyDiv");
	try{var indexObjs = eval('('+responseText+')');}catch(e){var indexObjs = responseText;}
	var niftyData=indexObjs.data;
	var mktt=''
	var sym = "S&P CNX NIFTY";
	var ltp='-';//niftyData[1].lastPrice;
	var ch='-';//niftyData[1].change;
	var pch=0;//niftyData[1].pChange;
	var dt="-";//
	var text="";
	loadIndicesData(true);
	try{
		mktt = indexObjs.time;
		ltp=niftyData[1].lastPrice;
		
		ch=niftyData[1].change;
		pch=niftyData[1].pChange;
		sch=pch.replace('-','')+'%';
		//var chStr='<span '+((pch>0)?'class="green"':((pch<0)?'class="red"':''))+'>'+ch.replace('-','')+'</span><span '+((pch>0)?'class="up"':((pch<0)?'class="down"':''))+'>'+sch+'</span>&nbsp;';
		var chStr='<span '+((pch>0)?'class="green"':((pch<0)?'class="red"':''))+'>&nbsp;&nbsp;&nbsp;&nbsp;'+ch.replace('-','')+'</span><span '+((pch>0)?'class="up2"':((pch<0)?'class="down2"':''))+'>&nbsp;&nbsp;'+sch+'</span>&nbsp;';

		//var flagIndi = '<span '+((pch>0)?'class="up3"':((pch<0)?'class="down3"':''))+'>'++'</span>'; 
		
		if(pch>0)
		{
			var flagIndi = '<img border="0" src="/emerge/common/images/bank_up.jpg"></a>';
		}
		else
		{
			var flagIndi = '<img border="0" src="/emerge/common/images/bank_down.jpg"></a>';
		}

		/*
		text = ' <div class="top_curve"></div>'+
			   ' <p class="left" style=\"margin-left: 10px;margin-top:5px; \">'+ 
	           ' <span><img src=\"/common/images/nifty50-logo.gif\" border=\"0\"/><font style=\"font-weight:bold;font-size:1.6em;line-height: 20px;vertical-align:top;\"><nobr>'+ltp+'&nbsp;&nbsp;</nobr></font><br /> '+
			   '<nobr><div style="margin-top:-7px; margin-left: 25px;" align=center>' +chStr+'</nobr><br /></span></div><br>'+
			   ' </p>';
	    */
		/*text = '<p class="notification" style="font-size:110%;width:120px;"></p>'+
			   '<p class="left" style=\"margin-left: 10px;margin-top:5px; \">'+ 
	           ' <span><font style=\"font-weight:bold;font-size:1.6em;line-height:20px;vertical-align:bottom;\"><nobr>&nbsp;&nbsp;&nbsp;&nbsp&nbsp;'+ltp+'&nbsp;&nbsp;</nobr></font><br /> '+
			   '<nobr><div style="margin-top:-1px; margin-left: 1px;" align=left>' +chStr+'</div><br>'+
			   ' </p></span>';*/
			  

		text = '<span style="float:left">'+
				//'<p class="notification" style="font-size:110%;width:120px;margin-left:15px;margin-top:2px;"></p>'+
			   '<p class="left" style=\"margin-left: 31px;margin-top:7px; \">'+ 
	           '<span><font style=\"font-weight:bold;font-size:1.6em;line-height:20px;vertical-align:bottom;\">'+ltp+' '+flagIndi+
			   '</font><br /> '+
			   '<nobr><div style="margin-top:-2px; margin-left: 1px;margin-top: 5px; padding:3px" align=left>' +chStr+'</div><br>'+
			   '</p></span>';
		//alert(text);
	}catch(e){}
		nobj.innerHTML=text;
}

function populateNiftySMEDivs(responseText)
{	
	var nobj = document.getElementById("niftySMEDiv");
	try{var indexObjs = eval('('+responseText+')');}catch(e){var indexObjs = responseText;}
	var niftyData=indexObjs.latestData;
	var mktt=''
	var sym = "S&P CNX NIFTY";
	var ltp='-';//niftyData[1].lastPrice;
	var ch='-';//niftyData[1].change;
	var pch=0;//niftyData[1].pChange;
	var dt="-";//
	var text="";
	//loadIndicesData(true);
	try{
		mktt = indexObjs.time;
		ltp=niftyData[0].ltp;
		
		ch=niftyData[0].ch;
		pch=niftyData[0].per;
		sch=pch.replace('-','')+'%';
		sch=parseFloat(sch)+'%';
		//var chStr='<span '+((pch>0)?'class="green"':((pch<0)?'class="red"':''))+'>'+ch.replace('-','')+'</span><span '+((pch>0)?'class="up"':((pch<0)?'class="down"':''))+'>'+sch+'</span>&nbsp;';
		var chStr='<span '+((pch>0)?'class="green"':((pch<0)?'class="red"':''))+'>&nbsp;&nbsp;&nbsp;&nbsp;'+ch.replace('-','')+'</span><span '+((pch>0)?'class="up2"':((pch<0)?'class="down2"':''))+'>&nbsp;&nbsp;'+sch+'</span>&nbsp;';

		//var flagIndi = '<span '+((pch>0)?'class="up3"':((pch<0)?'class="down3"':''))+'>'++'</span>'; 
		
		if(pch>0)
		{
			var flagIndi = '<img border="0" src="/emerge/common/images/bank_up.jpg"></a>';
		}
		else
		{
			var flagIndi = '<img border="0" src="/emerge/common/images/bank_down.jpg"></a>';
		}

		/*
		text = ' <div class="top_curve"></div>'+
			   ' <p class="left" style=\"margin-left: 10px;margin-top:5px; \">'+ 
	           ' <span><img src=\"/common/images/nifty50-logo.gif\" border=\"0\"/><font style=\"font-weight:bold;font-size:1.6em;line-height: 20px;vertical-align:top;\"><nobr>'+ltp+'&nbsp;&nbsp;</nobr></font><br /> '+
			   '<nobr><div style="margin-top:-7px; margin-left: 25px;" align=center>' +chStr+'</nobr><br /></span></div><br>'+
			   ' </p>';
	    */
		/*text = '<p class="notification" style="font-size:110%;width:120px;"></p>'+
			   '<p class="left" style=\"margin-left: 10px;margin-top:5px; \">'+ 
	           ' <span><font style=\"font-weight:bold;font-size:1.6em;line-height:20px;vertical-align:bottom;\"><nobr>&nbsp;&nbsp;&nbsp;&nbsp&nbsp;'+ltp+'&nbsp;&nbsp;</nobr></font><br /> '+
			   '<nobr><div style="margin-top:-1px; margin-left: 1px;" align=left>' +chStr+'</div><br>'+
			   ' </p></span>';*/
			  

		text = '<span style="float:left">'+
				//'<p class="notification" style="font-size:110%;width:120px;margin-left:15px;margin-top:2px;"></p>'+
			   '<p class="left" style=\"margin-left: 31px;margin-top:7px; \">'+ 
	           '<span><font style=\"font-weight:bold;font-size:1.6em;line-height:20px;vertical-align:bottom;\">'+ltp+' '+flagIndi+
			   '</font><br /> '+
			   '<nobr><div style="margin-top:-2px; margin-left: 1px;margin-top: 5px; padding:3px" align=left>' +chStr+'</div><br>'+
			   '</p></span>';
		//alert(text);
	}catch(e){}
		nobj.innerHTML=text;
}

/**
* For Notification - don not use this function
*/
function getNotification(isAsync){
	var async=false;
	if(isAsync)
		async=true;
$.ajax({
	url:'/homepage/notification.htm',
		success:function(html){
			//$("#wrapper #header .right_clm .header_btm p").html(html);
			$("p.notification").html(html);
		},
		async:async
	});
}
