function stopTickerData(){
	document.getElementById("tickerMarquee").stop();
}
function loadTickerData(){
	var val = $("#tickerSel").val();
	tickerData(val);	
}
function tickerData(val){		
	
	$.get('/TickerFeed',{type:val},
		function(html){
		
			$("#footer_nav .slidingDiv ul li a").each(
				function(index){
					$(this).removeClass("sel");
				}
			);				
			
			var out='&nbsp;&nbsp;';
			var timestamp;
			var spl = html.split("|");
			if(spl.length == 0)
				return;
			timestamp=$.trim(spl[1]);
			var lt = timestamp;
			try{lt=timestamp.substring(3,6)+' '+timestamp.substring(0,2)+', '+ timestamp.substring(6);}catch(e){}
			var size=parseInt(spl[2]);
			out+= '&nbsp;&nbsp; As On '+lt+'----&nbsp;&nbsp;';
			if(val=='CM')
			{		
				for(var i=3;i<size+3;i++)
				{
					var data = spl[i].split(",");
					var css="";
					var img="";
					var name='<a href="/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='+escape(data[0])+'">'+data[0]+'</a>&nbsp;&nbsp;';
					var ltp=data[1];
					var chng=data[2];
					if(chng>0){
						css="class=\"green\"";
						img="<img src=\"/common/images/arrow_up.gif\" alt=\"\" />";
					}
					else if(chng<0){
						css="class=\"red\"";
						img="<img src=\"/common/images/arrow_dwn.gif\" alt=\"\" />";
					}
					out+=name+'<span '+css+'>'+ltp+' ('+chng+'%) '+img+'</span>&nbsp;&nbsp;&nbsp;';						
				}
			}
			else if(val=='FUTIDX' || val=='FUTSTK')
			{
				for(var i=3;i<size+3;i++)
				{
					var data = spl[i].split(",");
					//Code by Mahendra 
					var datas = data[1].split("");
					var year = datas[4].concat(datas[5]);
					year = '20'.concat(year);
					var month = datas[2].concat(datas[3]);
					var date = datas[0].concat(datas[1]);
					var completeDate;
					
					if(month=='01')
					{
					month='JAN';
					}
					else if(month=='02')
					{
					month='FEB';
					}
					else if(month=='03')
					{
					month='MAR';
					}
					else if(month=='04')
					{
					month='APR';
					}
					else if(month=='05')
					{
					month='MAY';
					}
					else if(month=='06')
					{
					month='JUN';
					}
					else if(month=='07')
					{
					month='JUL';
					}
					else if(month=='08')
					{
					month='AUG';
					}
					else if(month=='09')
					{
					month='SEP';
					}
					else if(month=='10')
					{
					month='OCT';
					}
					else if(month=='11')
					{
					month='NOV';
					}
					else if(month=='12')
					{
					month='DEC';
					}

					var yrmonth=month.concat(year);
					completeDate=date.concat(yrmonth);
					//Code by Mahendra 
					
					var css="";
					var img="";
					var url ='/live_market/dynaContent/live_watch/get_quote/GetQuoteFO.jsp?underlying='+escape(data[0])+'&instrument='+val+'&expiry='+completeDate;
					var name='<a href="'+url+'">'+data[0]+'-'+data[1]+'</a>&nbsp;&nbsp;';
					var ltp=data[2];
					var chng=data[3];
					if(chng>0){
						css="class=\"green\"";
						img="<img src=\"/common/images/arrow_up.gif\" alt=\"\" />";
					}
					else if(chng<0){
						css="class=\"red\"";
						img="<img src=\"/common/images/arrow_dwn.gif\" alt=\"\" />";
					}
					out+=name+'<span '+css+'>'+ltp+' ('+chng+'%) '+img+'</span>&nbsp;&nbsp;&nbsp;';					
				}
			}
			else if(val=='OPTIDX' || val=='OPTSTK')
			{
				for(var i=3;i<size+3;i++)
				{
					var data = spl[i].split(",");
					//Code by Mahendra 
					var datas = data[1].split("");
					var year = datas[4].concat(datas[5]);
					year = '20'.concat(year);
					var month = datas[2].concat(datas[3]);
					var date = datas[0].concat(datas[1]);
					var completeDate;
					
					if(month=='01')
					{
					month='JAN';
					}
					else if(month=='02')
					{
					month='FEB';
					}
					else if(month=='03')
					{
					month='MAR';
					}
					else if(month=='04')
					{
					month='APR';
					}
					else if(month=='05')
					{
					month='MAY';
					}
					else if(month=='06')
					{
					month='JUN';
					}
					else if(month=='07')
					{
					month='JUL';
					}
					else if(month=='08')
					{
					month='AUG';
					}
					else if(month=='09')
					{
					month='SEP';
					}
					else if(month=='10')
					{
					month='OCT';
					}
					else if(month=='11')
					{
					month='NOV';
					}
					else if(month=='12')
					{
					month='DEC';
					}

					var yrmonth=month.concat(year);
					completeDate=date.concat(yrmonth);
					data[2]=data[2].concat(".00");
					//Code by Mahendra 

					var css="";
					var img="";
					var url='/live_market/dynaContent/live_watch/get_quote/GetQuoteFO.jsp?underlying='+escape(data[0])+'&instrument='+val+'&expiry='+completeDate+'&type='+data[3]+'&strike='+data[2];
					var name='<a href="'+url+'">'+data[0]+'-'+data[1]+'&nbsp;&nbsp;'+data[2]+data[3]+'</a>&nbsp;&nbsp;';
					var ltp=data[4];
					var chng=data[5];
					if(chng>0){
						css="class=\"green\"";
						img="<img src=\"/common/images/arrow_up.gif\" alt=\"\" />";
					}
					else if(chng<0){
						css="class=\"red\"";
						img="<img src=\"/common/images/arrow_dwn.gif\" alt=\"\" />";
					}
					out+=name+'<span '+css+'>'+ltp+' ('+chng+'%) '+img+'</span>&nbsp;&nbsp;&nbsp;';
				}
			}
			else if(val=='FUTINT')
			{
				for(var i=3;i<size+3;i++)
				{
					var data = spl[i].split(",");
					var css="";
					var img="";
					if(data[2]>0){
						css="class=\"green\"";
						img="<img src=\"/common/images/arrow_up.gif\" alt=\"\" />";
					}
					else if(data[2]<0){
						css="class=\"red\"";
						img="<img src=\"/common/images/arrow_dwn.gif\" alt=\"\" />";
					}
					out+=data[0]+'<span '+css+'>'+data[1]+' ('+data[2]+'%) '+img+'</span>&nbsp;&nbsp;&nbsp;';
				}
			}
			
			//$("#tickerData").html("<marquee id='tickerMarquee' onmouseover='this.stop();' onmouseout='this.start();'><nobr>"+out+"</nobr></marquee>");
			$("#tickerData").html('<marquee id="tickerMarquee" onmouseover="this.stop();" onmouseout="this.start();" truespeed="" scrollamount="1" scrolldelay="15" direction="left" loop="repeat"><nobr>'+out+'</nobr></marquee>');
			$("#a"+val).addClass("sel");
		}
	);
}