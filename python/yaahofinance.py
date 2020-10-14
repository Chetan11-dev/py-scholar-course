from yahoofinancials import YahooFinancials
import yfinance as yf

msft = yf.Ticker("HDFC.NS")
# get stock info
print(msft.balance_sheet)
ticker = 'INTC'
yahoo_financials = YahooFinancials(ticker)

balance_sheet_data_qt = yahoo_financials.get_financial_stmts(
    'quarterly', 'balance')
# # import pandas as pd
# # import yfinance as yf
# from yahoofinancials import YahooFinancials
# # yf.
# hdfc = YahooFinancials('AAPL')
# # hdfc.get_financial_stmts()
# balance_sheet_data_qt = hdfc.get_stock_earnings_data()
# # print(balance_sheet_data_qt)

# # tsla_df = yf.download('HDFC.NS',
# #                       start='1800-01-01',
# #                       end='2020-12-31',
# #                       interval="1d",
# #                       progress=False)
# # tsla_df.head()
# # # tsla_df.empty()
# # print(tsla_df, tsla_df.empty)
