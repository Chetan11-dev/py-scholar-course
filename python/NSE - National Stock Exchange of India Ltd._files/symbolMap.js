/*
Author = Sanjesh Verma
Date = 17-Nov-2009
Description = This js has the following functionality
              - validation functions
			  - ajax function
			  - form submit logic
			  - mouse position logic 

*/


//function to create elements object
function getObj(name)
{
  if (document.getElementById)
  {
	this.obj = document.getElementById(name); 
  }
  else if (document.all)
  {
     this.obj = document.all[name];
  }
  else if (document.layers)
  {
     this.obj = document.layers[name];	
  }

}// function over



function createRequestObject()
{
  var xmlhttp;
  
  if (window.XMLHttpRequest)
  { 
     xmlhttp = new XMLHttpRequest();
  }
  else if (window.ActiveXObject)
  {
     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  } 
	return  xmlhttp;
}// function over




function fillSymbolHelpDiv(symbol)
{
  var xmlHttpObj = createRequestObject();
  if (xmlHttpObj == null)
  {
     alert ("Your browser does not support AJAX!");
     return false;
  } 
  
  symbol = escape(symbol);
  var url="/marketinfo/sym_map/symbolHelp.jsp?symbol="+symbol;
  //alert ("symbol help urel is-->"+url);
  xmlHttpObj.onreadystatechange=function()
  {
  	if(xmlHttpObj.readyState == 4 || xmlHttpObj.readyState == "complete") 
	{  
	  if (xmlHttpObj.status == 200 ) 
	  {
	    var s = xmlHttpObj.responseText;
		s = trimSpaces(s);
		//alert("rrererrer"+s);
		if(s != "no")
		{
	       var divBoxObj = new getObj('symHelp');
           divBoxObj.obj.innerHTML = s;
		}
	  }
    } 
  }
  xmlHttpObj.open("GET",url,true);
  xmlHttpObj.send(null);

}// fun populateDiv over




function getSymbolCount(symbol)
{
  var xmlHttpObj = createRequestObject();
  if (xmlHttpObj == null)
  {
     alert ("Your browser does not support AJAX!");
     return false;
  } 
   
  symbol = escape(symbol);
  var url="/marketinfo/sym_map/symbolCount.jsp?symbol="+symbol;
  //alert("url symbol count is----"+url); 
  xmlHttpObj.open("GET",url,false);
  xmlHttpObj.send(null);
  
  var count = xmlHttpObj.responseText;
  count = trimSpaces(count);
   //alert ("sss->"+count);
  return count;
 
}// fun over


//function submitSymMapping(section,fieldName,formName)
function validateSymMapping(fieldName,formName)
{
  //var sectionObj = new getObj("section");
  //var countObj = new getObj("count");
 
  //var frmObj = new getObj(formName);
  var frmObj = document.getElementById(formName);
  //var fieldObj = new getObj(fieldName);
  var fieldObj = document.getElementById(fieldName);
  //var symbol  = fieldObj.obj.value;
  var symbol  = fieldObj.value;
  //alert(fieldObj.value);
  symbol = trimSpaces(symbol.toUpperCase());
  if(fieldName != "symbol")
  {
    /*Setting the value of hidden parameter (symbol) required 
	  to pass symbol mapping jsp if it is not present in form
	*/

	frmObj.symbol.value = symbol;
	//alert('filesd-->'+frmObj.obj.symbol.value);
  }
  
  
  
  //alert ('going to intermediate page');
  if( validateSym (symbol))
  {
   
	var count = getSymbolCount(symbol);
	//alert(count);
	//frmObj.obj.symbolCount.value = count;
	frmObj.symbolCount.value = count;
	
    //alert ('section value iss->'+frmObj.obj.section.value);
	//alert ('symbol count is iss->'+frmObj.obj.count.value);
	if (count == 0)
    {
	  alert("Symbol or company name doesn't exist");
	  fieldObj.focus();
	  return false;
    }
	
	 
	return true;
	 
  }//if 
  else
  {
    fieldObj.focus();
	return false;
  }
  
}//function over


function validateSym (sym)
{
  var symbol = trimSpaces(sym);
  if (symbol == "")
  {
	  alert('Please enter the symbol.');
	  return false;

  }
  if (symbol.length < 2 )
  {
	  alert('Kindly enter 2 or more characters');
	  return false;

  }

  if(validChars(symbol))
	  return true;
  else 
	  return false;
 
}//function over


function trimSpaces(strToTrim)
{
  return strToTrim.replace(/^\s+|\s+$/g,"");
}//function over



//function to validate  characters
function validChars(sym)
{
  var symbol=sym;
  
  for(var i = 0; i < symbol.length; i++) 
  {
    var myChar = symbol.charAt(i);
	if ((myChar >= 0 && myChar <= 9) || (myChar >= "a" && myChar <= "z") || (myChar >= "A" && myChar <= "Z") || myChar == " " || myChar == "-" || myChar == "_" || myChar == "&" || myChar == "(" || myChar == ")" ) 
	{
		  
	} 
	else
	{
	  alert('Invalid Character at symbol :'+myChar);
	  return false;
	}					
  }//for
 
  return true;
}//function over





var isCancelHideDivFunctionCalled = false;

function hideDiv()
{
  var cssString = 'display:none;';
  var divObj = document.getElementById('historyDiv');
  
  divObj.style.cssText = cssString;
  divObj.setAttribute('style',cssString);
  isCancelHideDivFunctionCalled = false;

//alert('inside hide div'+callFunctionFlag);
}


var timeoutId = -1;

function cancelHideDiv()
{
  clearTimeout(timeoutId);
  isCancelHideDivFunctionCalled = true;
  //setTimeout("hideDiv()",9000);
}

function callHideDiv()
{
  //this function is used bcoz mouseout event dont work 
  //properly with table 
  if(isCancelHideDivFunctionCalled == true)
  {
   hideDiv();
  }
  //alert('hi');
}

function getChangeHistory(event,symCode,type)
{  
  hideDiv();
  //alert('111');
  timeoutId = setTimeout("hideDiv()",4000);
  //alert('222')
  //clearTimeout(timeoutId);
  //alert('333');

  //alert('if--->'+callFunctionFlag);
  var xmlHttpObj = createRequestObject();
   
  if (xmlHttpObj == null)
  {
    alert ("Your browser does not support AJAX!");
    return false;
  } 
  
  var url = "/marketinfo/sym_map/";

  if(type==1)
  { //type=1 means check history for symbol
     url +="symbolList.jsp?symCode="+symCode;
  }
  else
  {
    //type=2 means check history for company name
    url +="companyNameList.jsp?symCode="+symCode;
  }
	 
  xmlHttpObj.onreadystatechange=function()
  {
    
	if(xmlHttpObj.readyState == 4 || xmlHttpObj.readyState == "complete") 
	{  
	  if (xmlHttpObj.status == 200 ) 
	  {
	    //alert('heee');
	    var divBoxObj = new getObj('historyDiv');
        divBoxObj.obj.innerHTML=xmlHttpObj.responseText;
	  }
    }
	else
	{
	  var divBoxObj = new getObj('historyDiv');
      divBoxObj.obj.innerHTML='<img src="/marketinfo/sym_map/loading.gif" border="0">';
	}
  }
 
  xmlHttpObj.open("GET",url,true);
  xmlHttpObj.send(null);
  
  //alert('hii')
  getMousePosition(event,type);
  
}// fun populateDiv over



function getMousePosition(event,type)
{
  var IE = document.all?true:false
  var x=0;
  var y=0;
	
  if(IE)
  {
	x=event.clientX;
	y=event.clientY;
	//alert('hhiii');
	if (x < 0){x = 0;}
	if (y < 0){y = 0;} 
	displayDivIE(x,y,type);
  }
  else
  {
	x= event.clientX;
	y= event.clientY;
	
	if (x < 0){x = 0;}
	if (y < 0){y = 0;} 
	displayDivOther(x,y,type);
  }

}//function over



function displayDivIE(xx,yy,type)
{
  //alert('inside display div before getting data');
  var x= 'left:'+xx+'px;';
  var y= 'top:'+yy+'px;';
  var p = 'position:absolute;';
      
  var cssString = p+x+y;
  var divObj = document.getElementById('historyDiv');

  divObj.style.cssText = cssString;
  
  var tableHeight = 0;
  var tableWidth = 0;
  if(type == 1 )
  { //if data is for symbol
    tableWidth=220;
	tableHeight = 90;
  }
  else
  {
    //if data is for company name
	tableWidth=330;
	tableHeight = 120;
  }
  //alert(tableWidth);
  var windowHt = document.body.clientHeight;
  var windowWidth = document.body.clientWidth;

  //alert(document.body.scrollTop);
  if ( (xx+tableWidth) >= (windowWidth))
  {  
	xx=xx - ((xx+tableWidth) - windowWidth );
	xx=xx-10;
  }
  
  
  yy=yy+10;
  if ( (yy+tableHeight) >= (windowHt))
  {  
	yy=yy-tableHeight;
	yy=yy-20;
  }
	//}
  yy=yy+document.body.scrollTop;
  if(xx < 0)
	  xx=0;
  if(yy < 0)
	  yy=0;

  var x = 'left:'+xx+'px;';
  var y = 'top:'+yy+'px;';
  var p = 'position:absolute;';
  var v = 'display:visible;';
  var b = 'border-style:groove;border-width:2px;';
  var bg = 'background-color:#FFFFFF;';
  var w='';
  if(type == 1)
  {
	  w =  'width:auto;max-width:220px;height:auto;max-height:120px;';
  }
  else
  {
     w =  'width:auto;max-width:330px;height:auto;max-height:170px;';
  }

  var cssString = p+x+y+v+b+bg+w;

  divObj.style.cssText = cssString;
   
}//function over
  
function displayDivOther(xx,yy,type)
{
  //alert('inside display div before getting data');
  var x= 'left:'+xx+'px;';
  var y= 'top:'+yy+'px;';
  var p = 'position:fixed;';
  
  var cssString = p+x+y;
  var divObj = document.getElementById('historyDiv');
 //alert('2');
  divObj.setAttribute('style',cssString);	

  var tableHeight = 0;
  var tableWidth = 0;
  if(type == 1 )
  { //if data is for symbol
    tableWidth=220;
	tableHeight = 90;
  }
  else
  {
    //if data is for company name
	tableWidth=330;
	tableHeight = 120;
  }
  //alert('table height'+tableHeight);
 
  var windowHt = document.body.clientHeight;
  var windowWidth = document.body.clientWidth;

  if ( (xx+tableWidth) >= (windowWidth))
  {  
	xx=xx - ((xx+tableWidth) - windowWidth );
	xx=xx-10;
  }
  
  yy=yy+10;
  if ( (yy+tableHeight) >= (windowHt))
  {  
	yy=yy-(tableHeight);
	yy=yy-20;
	
  }
  

  if(xx < 0)
	  xx=0;
  if(yy < 0)
	  yy=0;

  
  var x= 'left:'+xx+'px;';
  var y= 'top:'+yy+'px;';

  var p = 'position:fixed;';
  var v = 'display:visible;';
  var b ='border-style:groove;border-width:2px;';
  var bg ='background-color:#FFFFFF;';
   
  var w='';
  if(type == 1)
  {
	  w =  'width:auto;max-width:220px;height:auto;max-height:120px;';
  }
  else
  {
     w =  'width:auto;max-width:330px;height:auto;max-height:170px;';
  }   



var cssString = p+x+y+v+b+bg+w;

//alert (cssString );
//divObj.style.cssText = cssString;
divObj.setAttribute('style',cssString);	

}


//this function do nothing
function doNothing()
{
}
  
