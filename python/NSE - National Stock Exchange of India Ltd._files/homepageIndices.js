/*Global Vars*/
/*DevName - Sonal
reason for change - test cases 
date - 15/02/2011**/
/* starts [changed the array sequence ]**/
//var MAJOR_INDICES = ["SMETCS","SMERCOM","SMEACC", "SMESBIN","SMEHDFC"];
var MAJOR_INDICES = ["SMETCS","SMERCOM","SMEACC", "SMESBIN","SMEHDFC"];
var SECTORAL_INDICES = ["BANK NIFTY","CNX AUTO","CNX ENERGY","CNX FMCG","CNX INFRA","CNX IT",
						"CNX MEDIA","CNX METAL","CNX MNC","CNX PHARMA","CNX PSE","CNX PSU BANK","CNX REALTY",
						"CNX SERVICE"
                        ];//"CNX IT",
						
/*ends sonal**/
var stockWatchIndices=["S&P CNX NIFTY Pre Open","S&P CNX NIFTY","CNX NIFTY JUNIOR","NIFTY MIDCAP 50","CNX IT",
					   "BANK NIFTY","CNX REALTY","CNX INFRA","CNX ENERGY","CNX FMCG","CNX MNC","CNX PHARMA",
					   "CNX PSE","CNX PSU BANK","CNX SERVICE"];
var stockWatchIndicesLink=["/live_market/dynaContent/live_watch/pre_open_market/pre_open_market.htm",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=N",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=J",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=N5",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=C",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=B",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CR",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CI",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CE",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CF",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CM",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CP",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CSE",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CSU",
							"/live_market/dynaContent/live_watch/equities_stock_watch.htm?cat=CS"];//against ftr:108 date 03/03/2011 sonal
var twitterIndices=["S&P CNX NIFTY","CNX NIFTY JUNIOR","INDIA VIX"];
var twitterIndicesLink=["http://twitter.com/NSE_NIFTY",
						"http://twitter.com/NSE_JRNIFTY",
						"http://twitter.com/NSE_India_VIX"
					   ];

var renameIndices=["S&P CNX NIFTY Pre Open"];
var renameIndicesName=["NIFTY Pre Open"];

function isTwitterIndex(indexName){
	for(var t=0;t<twitterIndices.length;t++){
		if(twitterIndices[t]==indexName)
			return true;
	}
	return false;
}
function getTwitterIndicesLink(indexName){
	for(var t=0;t<twitterIndices.length;t++){
		if(twitterIndices[t]==indexName)
			return twitterIndicesLink[t];
	}
	return "javascript:void(0);";
}

function isStockWatchIndex(indexName){
	for(var t=0;t<stockWatchIndices.length;t++){
		if(stockWatchIndices[t]==indexName)
			return true;
	}
	return false;
}

function getStockWatchIndexLink(indexName){
	for(var t=0;t<stockWatchIndices.length;t++){
		if(stockWatchIndices[t]==indexName)
			return stockWatchIndicesLink[t];
	}
	return "javascript:void(0);";
}

function getIndicesName(indexName){
	for(var t=0;t<renameIndices.length;t++){
		if(renameIndices[t]==indexName)
			return renameIndicesName[t];
	}
	return indexName;
}

function setValue(divId,value){
	var obj = document.getElementById(divId+'');
	if(obj)
		obj.innerHTML = value;
}
var indexObjs =null; //to get image path
function loadIndicesData(sync){
	
	//$.get("/emerge/homepage/indices.json",
	//$.get("/content/SME/homepage/indices.json",
	$.get("/homepage/Indices1.json",
			function(json){
				try{ indexObjs = eval('('+json+')'); }catch(e){indexObjs = json;}
				showIndicesData();
				updateNotification(indexObjs);
		},sync
	);
}

function updateNotification(){
	var mktOpen = false; 
	$.get("/emerge/homepage/smeNormalMktStatus.json",
	   function(html){
			try{ var statusObj = eval('('+html+')');}catch(e){var statusObj = html;}
			var status = $.trim(statusObj.NormalMktStatus);
			setNotification(status);
		});	
}

function setNotification(mktOpen)
{
	if(mktOpen!=''){
		if(mktOpen=="open"){
			text="<span class='green' style='margin-left:-1px;'>Normal Market is Open</span>";
		} else {
			text = "<span class='red' style='margin-left:-1px;'>Normal Market has Closed</span>";
		}
	}
	$("p.mktStatus").html(text);
}

function showIndicesData(){
	for(var i=0;i<indexObjs.data.length;i++){
		var indexObj = indexObjs.data[i];
		updateIndices(i,indexObj);	
		//updateNotification(indexObjs);
	}
	setValue("marketWatchlastUpdate","As on "+indexObjs.time+" IST");
}

function updateIndices(i,indexObj){
	try{
	var ifrm=//'<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="/charts/webtame/webchart.jsp?CDSymbol='+escape(indexObj.name)+'&Segment=SM&Series=EQ&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_home_indices_closing_redgreen.jsp" width="100%" height="215px" ></iframe>';
	//'<iframe style="" frameborder=0 vspace=0 hspace=0 marginwidth=0 marginheight=0 scrolling=no id=LyrIntrumentSelector name=LyrIntrumentSelector src="/charts/webtame/webchart.jsp?CDSymbol='+escape(indexObj.name)+'&Segment=SM&Series=SM&CDExpiryMonth=&FOExpiryMonth=&IRFExpiryMonth=&CDDate1=&CDDate2=&PeriodType=2&Periodicity=1&Template=tame_intraday_closing.jsp" width="100%" height="215px" ></iframe>';
	setValue("indexName"+indexObj.name,""+getIndicesName(indexObj.name)+"");		
	
	var css="";
	var imgSrc="";
	if(indexObj.pChange && indexObj.pChange<0){
		css="class=\"change red2\"";
		//imgSrc="<img src=\"/common/images/ico_arr_dwn_red.gif\" width=\"8\" height=\"4\" alt=\"\" />&nbsp;&nbsp;";
	}
	else if(indexObj.pChange && indexObj.pChange>0){
		css="class=\"change green2\"";
		//imgSrc="<img src=\"/common/images/ico_arr_up_grn.gif\" width=\"8\" height=\"4\" alt=\"\" />&nbsp;&nbsp;";
	} else if(indexObj.pChange && indexObj.pChange==0){
		css="class=\"change black\"";
		//imgSrc="<img src=\"/common/images/ico_arr_up_grn.gif\" width=\"8\" height=\"4\" alt=\"\" />&nbsp;&nbsp;";
	}
	setValue("lastPrice"+indexObj.name,"<span "+css+">"+indexObj.lastPrice+" </span>");	
	setValue("pChange"+indexObj.name,"<span "+css+">"+indexObj.pChange+" %</span>");
	
	var pchng="";
	if(indexObj.pChange && indexObj.pChange<0 && indexObj.change>0)
		pchng="-";
	setValue("change"+indexObj.name,"<span "+css+">"+pchng+indexObj.change+'&nbsp;'+imgSrc+"</span>");
	
	//setValue("im"+indexObj.name,indexObj.imgFileName);
	setValue("im"+indexObj.name,indexObj.name);
	//alert(ifrm);
	if(indexObj.name==MAJOR_INDICES[0] || indexObj.name==SECTORAL_INDICES[0]){	
		var img = document.getElementById("image"+indexObj.name);
		var tc = document.getElementById("iframe"+indexObj.name);
		//Stc.innerHTML=ifrm;
/*	if(img)
			img.src="graphimages/"+indexObj.imgFileName;*/
	}
	}catch(err){
		//console.log('error in homepageIndices.js - updateIndices');
	} 
}

function loadIndexImage(i)
{
	var indexObj = indexObjs.data[i];
	var img = document.getElementById("image"+indexObj.name);
	if(img)
		img.src="graphimages/"+indexObj.imgFileName;
}

/* START - 20-OCT-2011 - for Next Trading Date WRR-1691*/
 function getNextTrdDate()
 {
   $.get("/homeNextDate.htm",
	   function(html){
			$("#trdDt").show();
			$("#trdDt").html(html);
		});
 }
 /*added by Sonal on 11-Nov-2011 for mkt turnover details*/
 function popupUrl()
{	//alert(type);
	
	var url = '/homepage/nse_mkt_trd_detail.htm';
	var printpopup = window.open( url,'printpopup','location=no,menubar=yes,toolbar=no,resizable=no,scrollbars=yes,status=yes,maximizable=no,width=700,height=350,screenX=0,screenY=0,left=0,top=0');printpopup.focus();
	//location.href = url;
	//return printpopup;
}
/* END - 20-OCT-2011 - for Next Trading Date WRR-1691 */
