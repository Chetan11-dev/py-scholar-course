# input is a function that takes user input
# int is a function that transforms a string to integer
ca = int(input("Current Assets: "))
cl = int(input("Current Liabilities: "))

ratio = ca / cl
if ratio < 2:
    print('Non-Liquid Firm')
else:
    print('Liquid Firm')
print('Ratio is', ratio)
