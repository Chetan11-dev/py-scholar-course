


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





function makeReadonly()
	{
		if(document.forms['histForm']['rdPeriod'][0].checked ){
		//alert("here");
			$('#fromDate').val('');
			$('#toDate').val('');
			document.forms['histForm']['fromDate'].disabled=true;
			document.forms['histForm']['toDate'].disabled=true;
			document.forms['histForm']['dateRange'].disabled=false;
			$(".calendarbtn").attr('disabled',true);
		}
		else{
			$('#dateRange').val('unselected');
			document.forms['histForm']['fromDate'].disabled=false;
			document.forms['histForm']['toDate'].disabled=false;
			$(".calendarbtn").attr('disabled',false);
			document.forms['histForm']['dateRange'].disabled=true;
		}		
	}

//addCalendar("Calendar1", "select Date", "fromDate", "histForm");
//addCalendar("Calendar2", "select Date", "toDate", "histForm");

//setWidth(90, 1, 15, 1);
//to set the format of date in dd-mm-yyyy
//setFormat("dd-mm-yyyy");
	function validate(){
		if(document.forms['histForm']['rdPeriod'][0].checked ){
			var period = $('#dateRange').val();
			if(period=='unselected'){
				alert('Select Period');
				$('#dateRange').focus();
				return false;
			}
	}else{
			document.forms['histForm']['dateRange'][0].disabled=true;
  if(validateSymMapping('symbol','histForm')){	
	frmDtObj = document.getElementById('fromDate');
	toDtObj = document.getElementById('toDate');
	var frmDt = trimSpaces(frmDtObj.value);
	var toDt = trimSpaces(toDtObj.value);
	if( frmDt == "" && toDt == "" ) {
	  return true;
	}	
	if( (frmDt != "" && toDt == "" ) || (frmDt == "" && toDt != "")){		
		alert("Please enter the both dates.");
		frmDtObj.focus();
		return false;
    }//if
	else{
	  if( frmDt == ""){
		alert("Please enter the From Date.");
		frmDtObj.focus();
		return false;
      }//if
	  else {
   	    errMsg=date_validator(frmDt);
	    if(errMsg != ""){
		  alert("Error in From Date : " + errMsg)
		  frmDtObj.focus();
		  return false;
        }
	  }//else
	  if(toDt == ""){
	    alert("Please enter the To Date.");
	    toDtObj.focus();
	    return false;
      }//if
      else {
	     errMsg=date_validator(toDt);
	     if(errMsg != "") {
		    alert("Error in To Date : " + errMsg)
		    toDtObj.focus();
		    return false;
         }//if
      }//else
    }//else
	
	//to check "From Date" should not be greater than "To Date"
	return ( compareDate(toDt, frmDt) ) ;  	
  }//if
  else{
      document.histForm.symbol.focus();
	  return false;
  }
	}
}//function validate over

function highlightData(){
	var trIndex=0;
	var tdIndex=0;
	var highP=0.0;
	var lowP=0.0;
	var htrIndex=0;
	var ltrIndex=0;
	var htdIndex=0;
	var ltdIndex=0;
	$("#historicalData table tr").each(function(tri){
		$(this).find("td").each(function(tdi){
				if(tdi==1){	
					var td=$(this).text();
					td = td.replace(',','');
					var tdN = parseFloat(td);									
					if(highP < tdN){
						highP=tdN;
						htrIndex=tri;
						htdIndex=tdi;
					}
				}
				else if(tdi==2){
					var td=$(this).text();
					td = td.replace(',','');
					var tdN = parseFloat(td);					
					if(lowP==0){
						lowP=highP;
						ltrIndex=tri;
						ltdIndex=tdi;
					}
					if(lowP > tdN){
						lowP=tdN;
						ltrIndex=tri;
						ltdIndex=tdi;	
					}				
				}			
			}
		
		);
		
		}
	);
	
	//alert(highP+"==="+lowP);
	//for highlighting
	var htr=$("#historicalData table tr").get(htrIndex);
	var htd = htr.getElementsByTagName("td")[1];
	$(htd).removeClass("high-sel");
	$(htd).removeClass("low-sel");
	$(htd).addClass("low-sel"); //Sonal date:23/03/2011

	var ltr=$("#historicalData table tr").get(ltrIndex);
	var ltd = ltr.getElementsByTagName("td")[2];
	$(ltd).removeClass("high-sel");
	$(ltd).removeClass("low-sel");
	$(ltd).addClass("high-sel");	//Sonal date:23/03/2011
}
$(document).ready(function() {
	$("#historicalData").hide();	
	$("#indicator").hide();
});

function submitData(){
if(validate()){
	var symbol= $("#symbol").val();
	var segmentLink=$("#segmentLink").val();
	var symbolCount=$("#symbolCount").val();
	var series=$("#series").val();
	var dateRange=$("#dateRange").val();
	var fromDate=$("#fromDate").val();
	var toDate=$("#toDate").val();
/*	var dataType1 = document.getElementsByName("dataType");
	
	for(i=0;i<dataType1.length;i++){		
		if(dataType1[i].checked){
			dataType=dataType1[i].value.toUpperCase();	
			//alert(dataType);
		}
	}	
*/
    var nameObj = new getObj('dataType').obj;
	var dataType = nameObj.value.toUpperCase();

	if(dataType=="PRICEVOLUMEDELIVERABLE"){
		$("#historicalData").css({"width":"967px"});
		
	}else{
	$("#historicalData").css({"width":"780px"});
	}
		$('#historicalData').html("<img src='/images/loading_trades.gif' align=\"center\" border=\"0\">");
		$.get('/products/dynaContent/common/productsSymbolMapping.jsp',{symbol:symbol,segmentLink:segmentLink,symbolCount:symbolCount,
		series:series,dateRange:dateRange,fromDate:fromDate,toDate:toDate,dataType:dataType},
		function(html){
			html=$.trim(html);
			$("#historicalData").html(html);
			$("#historicalData tr:even").addClass('alt');
			$("#historicalData").show();

			    $(".download-data-link > a").click(function (event) {
					exportDivToCSV.apply( $(this), [$("#csvContentDiv").html(),$(csvFileName).val()]);
				});


		});
	}
}

function loadData(urlRdm){
	$("#historicalData").show();
	$('#historicalData').html("<img src='/images/loading_trades.gif' align=\"center\" border=\"0\">");
	$.ajax({
		url: urlRdm,
		success : function(data, textStatus, XMLHttpRequest) {
			//alert(data);
			$('#historicalData').html(data);
			$('tr:even').addClass("alt");
			$('#historicalData  tr:nth-child(3)').removeClass('alt');
					
		}
	});
}
