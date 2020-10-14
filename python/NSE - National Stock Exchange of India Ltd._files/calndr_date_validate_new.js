// this js only check the date format in dd-mm-yyy and fromdate should not be 
//greater than todate

var _MS_PER_DAY = 1000*60*60*24;

function checkNumerals(numer)
{
	var num=parseInt(numer.length);
	for(i=0;i<num;++i)
	{
		var str=numer.substring(i,i+1);
		if(!( str>="0" && str<="9")) 
		{
				return false;
				break;

		} // end of inner if

	} //end of for

	return true;

}// checkNumerals

// function to check "From Date" should not be greater than "To Date" 
function compareDate(tdate, fdate)
{
	
	var tday=tdate.substring(0,2);
	var tmonth=tdate.substring(3,5);
	var tyear =tdate.substring(6,tdate.length);

	var fday=fdate.substring(0,2);
	var fmonth=fdate.substring(3,5);
	var fyear =fdate.substring(6,fdate.length);

	
    var tdate_int = eval(tyear+tmonth+tday);
	var fdate_int = eval(fyear+fmonth+fday);
	
		
	// "From Date" should not be greater than "To Date" 
	if(tdate_int < fdate_int)
	{
	   alert("From Date can't be greater than To Date");
	   return false;
	}
	else
	{
	   //alert("----inside else");
	
		//Azhar start
		var daysinyear=dateDiffInDays(tdate,fdate);
		//alert("differnece in days  "+daysinyear);
		if(daysinyear<366){
			//alert("files can be checkded.");
			return true;
		}else{
			alert("Please select date range not more than 365 days");
				 return false;
		}
		//Azhar end
	
	   return true;
	}	 
}



//Azhar start
function GetDate(str) {
	var arr = str.split('-');
	var formatddate = arr[1]  + '/' + arr[0] + '/' + arr[2];
	return formatddate;
 }
 
function dateDiffInDays(tDt,fDt){

	var formatTDate = new Date(GetDate(tDt));
	var formatFrmDate = new Date(GetDate(fDt));

	var utc1 = Date.UTC(formatTDate.getFullYear(), formatTDate.getMonth(), formatTDate.getDate());
	var utc2 = Date.UTC(formatFrmDate.getFullYear(), formatFrmDate.getMonth(), formatFrmDate.getDate());
	return Math.floor((utc1-utc2)/_MS_PER_DAY);
}
//Azhar end 


function compareDate1(tdate, fdate)
{
	
	var tday=tdate.substring(0,2);
	var tmonth=tdate.substring(3,5);
	var tyear =tdate.substring(6,tdate.length);

	var fday=fdate.substring(0,2);
	var fmonth=fdate.substring(3,5);
	var fyear =fdate.substring(6,fdate.length);

	
    var tdate_int = eval(tyear+tmonth+tday);
	var fdate_int = eval(fyear+fmonth+fday);
	
		
	// "From Date" should not be greater than "To Date" 
	if(tdate_int < fdate_int)
	{
	   return false;
	}
	else
	{
	   //alert("----inside else");
	   return true;
	}	 
}


////////////////////////////////////////////////////////

function date_validator(datevalue) {

	if(datevalue.length==10) {

	if(datevalue.charAt(2)=="-" && datevalue.charAt(5)=="-")
		{
		var date=datevalue.substring(0,2);
		var month=datevalue.substring(3,5);
		var year =datevalue.substring(6,datevalue.length);
	
	    if (checkNumerals(date) && checkNumerals(month) && checkNumerals(year)) 
		{
		 //check for other characters...
		 var date_int = eval(date);
		 var month_int = eval(month);
		 var year_int= eval(year);

			if(month_int <= 12) 
			{
             if(date_int!=0 && month_int!=0 && year_int!=0)
			  {
				//check for month with 30 days
			   if((month_int==4||month_int==6||month_int==9||month_int==11)&& date_int > 30)
				 {
                     errMsg = "This month cannot have more than 30 days";
                     return errMsg;
				 }

               else 
				{
				  //check for feb
               	  if(month_int==2)
				  {
                    if((year_int % 4 !=0 && year_int % 400 !=0) && date_int > 28)
					{
                      errMsg = "February cannot have more than 28 days in this year.";
                      return errMsg;

					}
                    else
					{
     					if ((year_int % 4 ==0 || year_int % 400 ==0) && date_int > 29) 
						{
						 errMsg = "February cannot have more than 29 days in this year.";
              			 return errMsg;
						}
                      
						else
						{
        						errMsg = "";
								return errMsg;
						}

					}//else
					}//if

				  else 
				  {
                    if(date_int > 31) {
       					errMsg = "A month cannot have more than 31 days.";
						return errMsg;
					}
					else {
						errMsg = "";
						return errMsg;
					}//else
     			  }//outer else

				}

			}// date or month or year greater than  zero

						else {

							errMsg = "Enter valid date";

							return errMsg;

						}

			}//if for cheking valid month

			else {
    			errMsg = "Not a valid month";
				return errMsg;
			}

		}//3rd if (to check only numbers are entered for date)

		else {
			errMsg = "No letters or other characters allowed. Enter date in dd-mm-yyyy format";
			return errMsg;
		}

	}//2nd  if (to check space between date feilds)

    else 
	{
	  errMsg = "Enter date in dd-mm-yyyy format only";
	  return errMsg;
	}

	}// 1st if over (id 10 char not in date)

		else
		{
			errMsg = "Enter date in dd-mm-yyyy format only ";
			return errMsg;
		}



if(datevalue.length==11) {

	if(datevalue.charAt(2)==" " && datevalue.charAt(6)==" ") 
		{
		var date=datevalue.substring(0,2);
		var month=datevalue.substring(3,5);
		var year =datevalue.substring(6,datevalue.length);
	
	    if (checkNumerals(date) && checkNumerals(month) && checkNumerals(year)) 
		{
		 //check for other characters...
		 var date_int = eval(date);
		 var month_int = eval(month);
		 var year_int= eval(year);

			if(month_int <= 12) 
			{
             if(date_int!=0 && month_int!=0 && year_int!=0)
			  {
				//check for month with 30 days
			   if((month_int==4||month_int==6||month_int==9||month_int==11)&& date_int > 30)
				 {
                     errMsg = "This month cannot have more than 30 days";
                     return errMsg;
				 }

               else 
				{
				  //check for feb
               	  if(month_int==2)
				  {
                    if((year_int % 4 !=0 && year_int % 400 !=0) && date_int > 28)
					{
                      errMsg = "February cannot have more than 28 days in this year.";
                      return errMsg;

					}
                    else
					{
     					if ((year_int % 4 ==0 || year_int % 400 ==0) && date_int > 29) 
						{
						 errMsg = "February cannot have more than 29 days in this year.";
              			 return errMsg;
						}
                      
						else
						{
        						errMsg = "";
								return errMsg;
						}

					}//else
					}//if

				  else 
				  {
                    if(date_int > 31) {
       					errMsg = "A month cannot have more than 31 days.";
						return errMsg;
					}
					else {
						errMsg = "";
						return errMsg;
					}//else
     			  }//outer else

				}

			}// date or month or year greater than  zero

						else {

							errMsg = "Enter valid date";

							return errMsg;

						}

			}//if for cheking valid month

			else {
    			errMsg = "Not a valid month";
				return errMsg;
			}

		}//3rd if (to check only numbers are entered for date)

		else {
			errMsg = "No letters or other characters allowed. Enter date in dd-mm-yyyy format";
			return errMsg;
		}

	}//2nd  if (to check space between date feilds)

    else 
	{
	  errMsg = "Enter date in dd-mm-yyyy format";
	  return errMsg;
	}

	}// 1st if over (id 10 char not in date)

		else
		{
			errMsg = "Enter date in dd-mm-yyyy format";
			return errMsg;
		}

}//end of date validator function

////////////////////////////////////////////////////
// function to check the period between the dates

function checkPeriod(stdate, enddate, interval) {

	var sday=stdate.substring(0,2);
	var smonth=stdate.substring(3,5);
	var syear=stdate.substring(6,stdate.length);

	var eday=enddate.substring(0,2);
	var emonth=enddate.substring(3,5);
	var eyear=enddate.substring(6,enddate.length);
	
	var sday_int=eval(sday);
	var smonth_int=eval(smonth);
	var syear_int=eval(syear);

	var eday_int=eval(eday);
	var emonth_int=eval(emonth);
	var eyear_int=eval(eyear);

	
    var sdate_int = eval(syear+smonth+sday);
	var edate_int = eval(eyear+emonth+eday);
	
		
	// "start Date" should not be greater than "end Date" 
	if(sdate_int > edate_int)
	{
	   //alert(sdate_int - edate_int)
	   alert("Start Date can't be greater than End Date");
	   return false;
	}
	else
	{


      if(syear_int == eyear_int)
		{
    		if(smonth_int == emonth_int)
			{
               if(eday_int - sday_int < interval-1)
				{
				 alert('Please select at least a ' +interval+ ' day period');
				 return false;
			    }
		    }

	       else if(emonth_int - smonth_int == 1)
		   {
			 var mthdays = 0;
			 if(smonth_int == 2) 
			 {
				if(syear_int % 4 == 0 || syear_int % 400 == 0)
					mthdays = 29;
				else 
					mthdays = 28;
			 }
			 else if (smonth_int==4 || smonth_int==6 || smonth_int==9 || smonth_int==11)  {
				mthdays = 30;
			  }
			 else 
			  {
				mthdays = 31;
			  }
			 if(mthdays - sday_int + eday_int < interval-1) 
			  {
				alert('Please select at least a ' +interval+ ' day period');
				return false;
			  }
		    }//else if(emonth - smonth == 1)

	    }//if(syear == eyear)
	  
	  else if(eyear_int - syear_int == 1)
	   {
		 if(smonth == 12 && emonth == 1)
		  {
			if(31 - sday_int + eday_int < interval-1)
			 {
				alert('Please select at least a ' +interval+ ' day period');
				return false;
			 }
		  }
	   }

	}	
	
}// fun checkPeriod over


//Added by sanjesh on 15-Feb-2010
//this function will return the no of days between the given dates
function returnNoOfDays(stdate, enddate) 
{
	var sday=stdate.substring(0,2);
	var smonth=stdate.substring(3,5);
	var syear=stdate.substring(6,stdate.length);
	//coverting to yyyy/mm/dd format
	var sDtStr = syear+"/"+smonth+"/"+sday;
	var stDtObj = new Date(sDtStr);


	var eday=enddate.substring(0,2);
	var emonth=enddate.substring(3,5);
	var eyear=enddate.substring(6,enddate.length);
	//coverting to yyyy/mm/dd format
	var eDtStr = eyear+"/"+emonth+"/"+eday;
	var edDtObj = new Date(eDtStr);
	
	// The number of milliseconds in one day
    var msIn1Day = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var startDateInMs = stDtObj.getTime()
    var endDateInMs = edDtObj.getTime()
    // Calculate the difference in milliseconds
    var diffInMs = Math.abs(endDateInMs - startDateInMs)
    
    // Convert back to days and return
    return Math.round(diffInMs/msIn1Day)
    
}// fun  over
	