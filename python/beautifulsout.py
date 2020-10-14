from bs4 import BeautifulSoup
import csv
import pandas as pd

soup = BeautifulSoup(open("data.html"), features="lxml")
tr = soup.find_all('tr')
rows_raw = tr.pop(0)
# rows_raw.[].


def getText(p):
    return (p.text).strip()


def processColumn(p):
    tds = p.findChildren('td')
    ls = list(map(getText, tds))
    return ls

                                                                                                                                                                                                                                                                                                                                                               '4,509.00', '4,504.80', '4,501.17', '5,464', '2,45,94,367.85', '838', '2,818', '51.57'], ['HDFCMFGETF', 'EQ', '09-Oct-2020', '4,504.80', '4,589.00', '4,589.00', '4,533.05', '4,552.00', '4,550.10', '4,545.85', '4,709', '2,14,06,415.00', '551', '2,523', '53.58'], ['HDFCMFGETF', 'EQ', '12-Oct-2020', '4,550.10', '4,589.00', '4,595.00', '4,568.50', '4,588.00', '4,587.45', '4,584.20', '6,129', '2,80,96,589.30', '761', '3,569', '58.23']]
cols = list(map(getText, rows_raw.findChildren('th')))
rows = list(map(processColumn, tr))

print(rows, cols)

df = pd.DataFrame(data=rows, columns=cols)
return df
