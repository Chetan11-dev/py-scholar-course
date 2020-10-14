var isProcessing=false;
var NO_OF_SYMBOLS_HISTORY=5;
GET_QUOTE_PATH = "/live_market/dynaContent/live_watch/get_quote";
function setValue(divId,value){
	var obj = document.getElementById(divId+'');
	if(obj)
		obj.innerHTML = value;
}

//for recent quotes
function getRecentQuoteText()
{
	//alert('1-->'+navigator.cookieEnabled);
	var RecentQuoteHist="";
	 if(navigator.cookieEnabled)
	{
		 
		var ptr=readCookie('pointer');
		//alert('2');
		if(ptr!=null)
		{
			RecentQuoteHist="";
			var tmp=ptr;
			for(var i=1;i<=NO_OF_SYMBOLS_HISTORY;i++)
			{
				var sym=readCookie('sym'+tmp);
				if(sym!=null)
				{
					RecentQuoteHist=RecentQuoteHist+'<li><a href="'+GET_QUOTE_PATH+'/GetQuote.jsp?symbol='+escape(sym)+'" >'+sym+' - EQ</a></li>';				
				}
				tmp=parseInt(tmp)-1;
				if(tmp==0)
					tmp=NO_OF_SYMBOLS_HISTORY;
			}
		}
		RecentQuoteHist=RecentQuoteHist+'';		
	}
	else
	{
		RecentQuoteHist=" <li><a href='#'>Enable Browser Coockie</a></li>";
	}
	
	 setValue('recentQuotes', RecentQuoteHist);
	 setValue('recentQuotesD', RecentQuoteHist);
}

function addQuoteToCookie()
{
	if(navigator.cookieEnabled)
	{
		if(!isProcessing){
			isProcessing=true;
		
			var ptr=readCookie('pointer');
			if(ptr==null)
			{
				createCookie('pointer',1,365);
				createCookie('sym1',glb_symbol.toUpperCase(),365);
			}
			else
			{
				var flag=0;

				ptr=parseInt(ptr)+1;
				if(ptr==(NO_OF_SYMBOLS_HISTORY+1))
					ptr=1;
				//alert('after incr ptr->'+ptr);
				for(var i=1;i<=NO_OF_SYMBOLS_HISTORY;i++)
				{
					var sym=readCookie('sym'+i);
					//alert(sym +"::"+glb_symbol);
					if(sym!=null && sym.length>1)
					{
						if(sym.toUpperCase()==glb_symbol.toUpperCase())
						{
							flag=1;break;
						}
					}				
				}
				//alert('flag='+flag+':ptr='+ptr);
				if(flag==0)
				{
					createCookie('sym'+ptr,glb_symbol.toUpperCase(),365);
					createCookie('pointer',ptr,365);
				}
				isProcessing=false;
			} 
		}//isProcessing
	}
}