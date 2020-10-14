from openpyxl import load_workbook
import pandas as pd
import requests

from bs4 import BeautifulSoup
from nsetools.datemgr import mkdate
from nsetools.utils import byte_adaptor, js_adaptor
from nsetools.utils import js_adaptor
from nsetools.utils import byte_adaptor
from nsetools.bases import AbstractBaseExchange
from dateutil import parser
import io
import zipfile
import json
import re
import ast
import six
from pprint import pprint
from nsetools import Nse
from datetime import date
from nsepy import get_history
import src.templates as templates
# from .src import templates
# python3 -m pip install selenium

python - m pip install YahooFinancials


# from .templates import day_7
# import paths differ in python 2 and python 3
if six.PY2:
    from urllib2 import build_opener, HTTPCookieProcessor, Request
    from urllib import urlencode
    from cookielib import CookieJar
elif six.PY3:
    from urllib.request import build_opener, HTTPCookieProcessor, Request
    from urllib.parse import urlencode
    from http.cookiejar import CookieJar


def write_data_to_sheet(sheet_name, data, writer):
    data.to_excel(writer, sheet_name)


def getText(p):
    return (p.text).strip()


def processColumn(p):
    tds = p.findChildren('td')
    ls = list(map(getText, tds))
    return ls


unableToFetch = []


class StockExchange():

    # def __init__(self):
    #     print('initated')

    def nse_opener(self):
        """
        builds opener for urllib2
        :return: opener object
        """
        cj = CookieJar()
        return build_opener(HTTPCookieProcessor(cj))

    def processData(self, data, stock_name):
        soup = BeautifulSoup(data, features="lxml")
        tr = soup.find_all('tr')
        rows_raw = tr.pop(0)
        cols = list(map(getText, rows_raw.findChildren('th')))
        rows = list(map(processColumn, tr))
        # print(rows, cols)
        # if cols[0] == '* Click on old symbol or company name to view history':
        #     unableToFetch.append(stock_name)
        #     return pd.DataFrame()
        # print('ss', cols, rows)
        df = pd.DataFrame(data=rows, columns=cols)
        return df

    def stock_day_7_eq(self, stock, template_url):
        url = template_url.format(stock)
        url = 'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm'

        req = Request(url, None, {'Accept': '*/*',
                                  'Accept-Language': 'en-US,en;q=0.5',
                                  'Host': 'www1.nseindia.com',
                                  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
                                  'X-Requested-With': 'XMLHttpRequest'
                                  })

        res = self.nse_opener().open(req)

        print(res.read())
        res = byte_adaptor(res)
        print(res)
        raise "sss"
        data = pd.read_csv(res)

        print(data)
        return data

    def new_stock_day_7_eq(self, stock, template_url):
        url = 'https://www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol={0}&segmentLink=3&symbolCount=2&series=EQ&dateRange=12month&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE'.format(
            stock)
        # url = 'https://www1.nseindia.com/products/dynaContent/common/productsSymbolMapping.jsp?symbol={0}&segmentLink=3&symbolCount=2&series=EQ&dateRange=12month&fromDate=&toDate=&dataType=PRICEVOLUMEDELIVERABLE'.format(
        #     stock)

        # print(url)
        payload = {}
        headers = {
            'Host': 'www1.nseindia.com',
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': '_ga=GA1.2.2013251874.1602480296; _gid=GA1.2.1692976718.1602480296; sym1=RELIANCE; sym2=AAVAS; pointer=2; NSE-TEST-1=1910513674.20480.0000; JSESSIONID=5F22568DFFCB43D81F825353AC937CA6.tomcat2; RT="z=1&dm=nseindia.com&si=b3da7662-9a3e-4eb0-8c81-ad9c76169b69&ss=kg7jvawv&sl=1&tt=10f&bcn=%2F%2F684d0d36.akstat.io%2F&ld=1dw"; bm_mi=309EFDCE09FF616E4D6154F78261EAB7~Kp1HClNXrdz9gI+3bgtMhgFnQlwUEpfQuUTmSOluUxSrgKVLWkxV1fAaEfWCcScQnqUBT8WPYTI+otp4Jgr6BUGPVN6iJe/S+VLbP1tGQFSWP+w5IXVzFNUUODd3lf1GMM+NAgFjuI9n7QAGkiagncQPMa/DcQpg1lWo4sCs81sGpvBNVzYPiH2PFkzmQKKELD/k3u6tnSg2opCv2vlRDbnWVt1TbhxR4rJBl5R26y3y/EuXyDnamYqaBkjPsb7W2PysHr8LqHNtDfPPk85AuA==; ak_bmsc=45599E539CF2CD1DEAB924D8ABB6A7E717D4054D9B260000E83D855F02E3AE67~plKu3DD8IBYReNLrhqoJJamNU3CG4mBvvK73jo0rsRrfQcGZI6wPEhSdUn2uq8ehbUypd8C7muk8zcgPjBHmKn8SKuIBRjGqzGAUXK+2sO1jHgiHJle1HqhgihuABvuT2/QRhU2sZzX4qIH0+Oq1TVT6EsVEQfOm73QEi9G00bswd5lIE7NoUVTIEPQvVReu09Zze0LYYfwPsUuWmidsMlC/3k7r91ZWDjU0umWEzUpM+/9uGuMvS1RGmpodCGn7aF; bm_sv=A37AF0E2A8510965296307BD6411E5E7~tVSZ2eJi7RFJd0QzOWBfeWvwgIJmA662ttDeebphCyw2Lk94ScFjmnHVx0iyLV+LU4jC/qsXmvTX8rswNtfRIKOyJGKzR8UUimZt+GX/ez7Q5qeKJX5OBLY4FchcWndQ/CKdUBoD1n3Fi4fkWSEjvnWaGooPZa3w025dujHjpiI=',
            'symbol': 'TCS',
            'segmentLink': '3',
            'symbolCount': '2',
            'series': 'ALL',
            'dateRange': 'day',
            'fromDate': '',
            'toDate': '',
            'dataType': 'PRICEVOLUMEDELIVERABLE'
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        # print('Got response')
        # print(response.text.encode('utf8'))
        return self.processData(response.text.encode('utf8'), stock)


filename = 'nse_eq.xlsx'
stockExchange = StockExchange()
writer = pd.ExcelWriter(filename)


def print_stock_price(stock_name):
    try:
        print('Getting for', stock_name)
        data = stockExchange.new_stock_day_7_eq(stock_name, templates.day_7)
        # if not data:
        #     return
        #     pass

        # if len(data) != 5 and stock_name not in ['SYMBOL', '3PLAND']:
        #     8/0
        #     pass
        print('Got', len(data), ' records from ', stock_name)
        print(data)

        write_data_to_sheet(stock_name, data, writer)
    except:
        unableToFetch.append(stock_name)


nse = Nse()
stocks = list(nse.get_stock_codes())
print(len(stocks), stocks)
print(stocks)
# 8/0
# stocks = ['AIONJSW', 'AAVAS', 'HDFC', 'SBIN', 'TCS']
result = list(map(print_stock_price, stocks))
writer.save()

print('Saved to ', filename)
print('unableToFetch', unableToFetch)
