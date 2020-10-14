  
 /**** Author : Prashant Gama *****/
 

    function exportDivToCSV (csvContent, fileName) 
	{
		if (typeof fileName == 'undefined') 
		{
			fileName='data.csv'
		}
		csvContent = csvContent.replace(/:/g, "\n");

	  if (window.navigator.msSaveOrOpenBlob) 
		 { 
				// for IE 10 and above
				var blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
				type: "text/csv;charset=utf-8;"
				});
				navigator.msSaveBlob(blob, fileName);
		 }
		 else   if ( navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.search("Trident") >= 0) 
		{
				 // for IE < 10 
					/* 
				 alert("IE 8");
				$("body").append("<form name='csvform' id='csvform' autocomplete='off' action='/csv/csvdownload.jsp'  method='post'><div><INPUT TYPE='hidden' NAME='datacsv' ID='datacsv'></div></form>");
				
				$("#datacsv").val( csvContent );
				$("#csvform").submit();
				*/
			

					var oWin = window.open("about:blank", "_blank", 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10000, top=10000, width=10, height=10, visible=none', '');
					oWin.document.open("application/csv", "replace");
					oWin.document.charset = "utf-8";
					oWin.document.write('sep=,\r\n'+csvContent);
					oWin.document.close();
					var success = oWin.document.execCommand('SaveAs', true, fileName);
					oWin.close(); 
		  }

		else { // for other browsers	

					var csvUri = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvContent);
					$(this).attr
					({
						 'download'	: fileName,
						 'href'		: csvUri,
						 'target'	: '_blank'
					});
		   }

    }












  function exportTableToCSV($table, filename) 
  {

        var $rows = $table.find('tr:has(td)'),

            // Temporary delimiter characters unlikely to be typed by keyboard
            // This is to avoid accidentally splitting the actual contents
            tmpColDelim = String.fromCharCode(11), // vertical tab character
            tmpRowDelim = String.fromCharCode(0), // null character

            // actual delimiter characters for CSV format
            colDelim = '","',
            rowDelim = '"\r\n"',

            // Grab text from table into CSV formatted string
            csv = '"' + $rows.map(function (i, row) 
			{
                var $row = $(row),
                $cols = $row.find('td');

                return $cols.map(function (j, col) 
				{
                    var $col = $(col),
                    text = $col.text();

                    return text.replace(/"/g, '""'); // escape double quotes

                }).get().join(tmpColDelim);

            }).get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim) + '"',
			csvUri = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        $(this).attr
		({
				'download'	: filename,
                'href'		: csvUri,
                'target'	: '_blank'
        });
    }
