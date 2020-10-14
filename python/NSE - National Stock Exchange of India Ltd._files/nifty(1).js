/**
* parameter : isAsync 
* value : true/false
* true : synchronous call
* false : asynchronous call
*/
function getNifty(isAsync){
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
function populateNiftyDivs(responseText)
{	
	var nobj = document.getElementById("niftyDiv");
	try{var indexObjs = eval('('+responseText+')');}catch(e){var indexObjs = responseText;}
	var niftyData=indexObjs.data;
	var mktt=''
	//var sym = "S&P CNX NIFTY"; //Not Used. Nifty index 1
	var ltp='-';//niftyData[1].lastPrice;
	var ch='-';//niftyData[1].change;
	var pch=0;//niftyData[1].pChange;
	var dt="-";//
	var text="";
	
	try{
		mktt = indexObjs.time;
		ltp=niftyData[1].lastPrice;
		ch=niftyData[1].change;
		pch=niftyData[1].pChange;
		sch=pch+'%';
	//	alert('>>>>>>'+pch);

	var chStr='<span '+((pch>0)?'class="green" style=\"margin-left: 5px; margin-right: 2px;\" ':((pch<0)?'class="red" style=\"margin-left: 5px; margin-right: 2px;\"':''))+'>'+ch+'</span><span '+((pch>0)? 'class="arrowGreen" ':((pch<0)?'class="arrowRed"':''))+'> </span><span '+((pch>0)?'class="green"':((pch<0)?'class="red"':''))+'>'+sch+'</span>&nbsp;';

	//	alert('>>>chStr>>>'+chStr);
		text = ' <div class="top_curve"></div>'+
				   ' <p class="left" style="border-right: 1px dotted grey;">'+
	' 	<span><img src=\"/common/images/nifty50-logo.gif\" alt="Nifty 50 Logo" border=\"0\"/></p><p class="right" style="padding-top:16px"><font style=\"font-weight:bold;color:black;font-size:2.3em;line-height: 20px;margin-right:16px;\"><nobr>'+ltp+'</nobr></font></span><br /> '+
				   '<p ><font style=\"font-weight:bold;color:black;font-size:1.3em;line-height: 20px;\"><nobr>' +chStr+'</nobr></font></p><br />'+

				   ' </p>';
	}catch(e){}
		nobj.innerHTML=text;
}

/**

<p class="left" style="border-right: 1px solid grey;">'+
	' 	<span><img src=\"/common/images/nifty50-logo.gif\" border=\"0\"/></p><p class="right" style="padding-top:16px"><font style=\"font-weight:bold;color:black;font-size:2.3em;line-height: 20px;margin-right:26px;\"><nobr>'+ltp+'</nobr></font></span><br /> '+
				   '<p ><font style=\"font-weight:bold;color:black;font-size:1.3em;line-height: 20px;\"><nobr>' +chStr+'</nobr></font></p><br />'+


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