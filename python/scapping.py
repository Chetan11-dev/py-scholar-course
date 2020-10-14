from selenium import webdriver
from time import sleep
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC


def getdriver():
    options = webdriver.ChromeOptions()
    options.add_argument("start-maximized")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(
        options=options, executable_path=r'/home/hari/Downloads/chromedriver')
    driver.execute_script(
        "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_cdp_cmd('Network.setUserAgentOverride', {
        "userAgent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.53 Safari/537.36'})
    print(driver.execute_script("return navigator.userAgent;"))
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined
    })
  """
    })
    return driver


def ff():
    driver = getdriver()

    # webdriver.Firefox('')
    driver.get(
        'https://www1.nseindia.com/products/content/equities/equities/eq_security.htm')
    # sleep(2)

    symbol = driver.find_element_by_class_name('reporttitle1')
    symbol.send_keys('RELIANCE')
    # symbol.is_selected
    # print(emg)
    # emg.parent.click()
    # driver.execute_async_script("document.getElementById('submitMe').click()")
    print(symbol.is_selected(), 'ss')

    # driver.find_element_by_xpath(
    #     '//a[@href="https://www.nseindia.com/contact/contact-us"]').click()

    # btn = driver.find_element_by_xpath(
    #     "//input[@id='submitMe']")
    # btn.click()

    ell = driver.find_element_by_class_name('getdata-button')
    print(ell.tag_name)
    print(symbol.is_selected(), 'ss')
    # <a href="https://www.nseindia.com/contact/contact-us" class="last">Contact Us</a>
    sleep(50)
    return

    # el =  driver.find_element_by_class_name("class_of_element")
    # 'download-data-link'
    # driver.fin
    # reporttitle1

    symbol = driver.find_element_by_class_name('reporttitle1')
    symbol.send_keys('RELIANCE')

    series = driver.find_element_by_xpath(
        "//select[@name='series']/option[text()='EQ']")
    series.click()
    # driver.find_element_by_xpath("//img[@class="getdata-button" and not(@disabled)]'")
    # symbol.clear()
    # onclick=""
    # ('//input[@id="createFolderCreateBtn" and not(@disabled)]')
    # get_dat_bt = driver.find_element_by_class_name("getdata-button")
    # print(get_dat_bt)
    # # print(symbol, symbol.text, 'don')
    # get_dat_bt.click()
    # driver.find_element_by_xpath(
    #     "//input[@src='/images/btn_next.png' and @type='image']").click()

    # sleep(5)  # Time in seconds
    btn = driver.find_element_by_xpath(
        "//img[@class='getdata-button' and not(@disabled)]")

    # btn = driver.find_element_by_xpath(
    #     "//input[@id='submitMe' and not(@disabled)]")
    # btn.click()
    # p
    # driver.execute_script("document.getElementById('submitMe').click()")

    # driver.execute_script("submitData();")

    # driver.close()
    # <span class="download-data-link"><a download="" target"_blank"="" style="cursor:pointer">Download file in csv format</a></span>


    # <span class="download-data-link"><a download="" target"_blank"="" style="cursor:pointer">Download file in csv format</a></span>
ff()
