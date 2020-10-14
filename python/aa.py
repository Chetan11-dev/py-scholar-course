import requests
# https: // www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol = HDFC & segmentLink = 3 & symbolCount = 2 & series = EQ & dateRange = week & fromDate = &toDate = &dataType = PRICEVOLUMEDELIVERABLE
# Request URL:
url = "https://www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol=KALPATPOWR&segmentLink=3&symbolCount=1&series=EQ&dateRange=week&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE"
url = 'https://www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol=KALPATPOWR&segmentLink=3&symbolCount=2&series=EQ&dateRange=week&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE'
payload = {}
headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Connection': 'keep-alive',
    'Cookie': '_ga=GA1.2.2013251874.1602480296; _gid=GA1.2.1692976718.1602480296; sym1=RELIANCE; sym2=AAVAS; pointer=2; bm_mi=EF1616098C6B3F0569A0C4C254FD5F0E~0JGbuiU6Kv/JBU2yQzdSX0mBAqbi/3YN/7TRovoF4B4PTlbFiV0L9hwcDf0qmSpKPRaXpa8+T4a6pR63oNmJEIv2kKkfqUKzmZzqOg80iTWNzBjAnn/wAl7HiGuNnE5FD6AYrQ4NVpXKNt6650j49wgFhdY6J3m7mR5sQL9rih1PSUf/4F5xFPkN5EWteapUuMLdyiPT0DTORiY2OEEqMVMbAPiG14BpAv6eiNRO60VW7PevDI10n9t7N0qev92uRT1m4SAWZ4lQDPHGSAFyvAO51gPtlAEf+wcW7E34EbQ=; ak_bmsc=3C365C0102D776130260FC6805EA271B173F6D04156600000F6E845FE601BC0B~plkcSrGWS9INEE2to6G1fGdSWZtlGhEA1ewPxKu7UD9yp63DayOhEyHtYHhxJzBmQhxjdB8iNbTERWm1jk9kMgMO0nDCxOndbLCsd6pjU4iEVzbjwwILhqYqCzvzbgWhneCjPOT7DHZUxRcbjA8h/i/sKESgyoyoFj1uzmyrYUp85qD8BzcYEN1n9Y6SWLe0J6hDdLajG1/2U1hoAzcwPqxSKh23clNBYwDS8PPLtd38pogb7YQGJjkAHb0H/RwuI4; JSESSIONID=1F379563473698C88AFAD1BDBD1DF613.tomcat1; NSE-TEST-1=1944068106.20480.0000; RT="z=1&dm=nseindia.com&si=b3da7662-9a3e-4eb0-8c81-ad9c76169b69&ss=kg6jfnza&sl=k&tt=e6n&bcn=%2F%2F684fc53e.akstat.io%2F"; bm_sv=B93B1D9656EE79E6EC40F4C7BF63DFA7~PaGg27TsDYO6vn05CwgbAT+bQ0iG/tOGd/ud8CG3eMl25bUu1NkoIY2SjZEg+LosK6ShTXTYPllR0/6rvqKp76qmblEUapyzerjXaJuwNfTPXXbXAKazfl3b3Xf9gYGmJCdqRyHKYh5KQZzZzScqQ1mJRtAA+XaYKEzS82s3Luw=',
    'Host': 'www1.nseindia.com',
    'Referer': 'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text.encode('utf8'))
