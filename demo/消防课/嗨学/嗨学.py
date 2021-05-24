import json
import csv
import requests
from bs4 import BeautifulSoup

url = "https://lite.haixue.com/lite/video/v1/detail?appId=wx8b0ee5cc068def66&goodsId=948500&videoId=92909&goodsCatalogId=3306091"
url2 = 'https://lite.haixue.com/lite/goodsmodule/v1/detail?appId=wx8b0ee5cc068def7f&source=VIDEO&goodsId=948500&goodsCatalogId=3306091&goodsModuleId=20017'
headers = {
    'Host': 'lite.haixue.com',
    'Connection': 'keep-alive',
    'cookie': 'csrf_token=bC5rNU;__jsluid_s=41e9440a17900bafcccfe6b399a19bec;security_refresh=1322afebefc64d1ea9978c03cb20ef1d.32470103.1621677433762.app.ef59b0a4b892f84da5d7ae694470c9fc;pass_sec=1322afebefc64d1ea9978c03cb20ef1d.32470103.1621677433762.app.ef59b0a4b892f84da5d7ae694470c9fc;JSESSIONID=C53B457CE31ECBAEF72258380C4D0A32;security_access=eyJhbGciOiJSUzUxMiJ9.eyJ1aWQiOjMyNDcwMTAzLCJzdWIiOiJhcHAiLCJpc3MiOiJwYXNzcG9ydCIsImV4cCI6MTYyMTg0NDcwMCwiaWF0IjoxNjIxODQ0NDAwLCJqdGkiOiIwMDA1ZGIzMi03ZjkwLTQ0YTUtODU1OS02OWJkZWJhZmVjMjIifQ.WMFfs1Eko9jb-kPnHYwVCjM4Js5bRdo-JEVgMDkMIwQTD-LSlaQ_5EcrxqpYhmVHoyCAbver1KmeKJwVGk1NHHnR-al57cdvEqDb81vH_-DphzkSZTV9ULQ5xvL2s2xwYmTEca1b6WNBMN1z9tiMMMKQMbCE6ECLBHuygY67rLM',
    'x-device-platform': 'android',
    'charset': 'utf-8',
    'x-requested-with': 'XMLHttpRequest',
    'csrf_token': 'bC5rNU',
    'content-type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Le X820 Build/FEXCNFN5801809292S; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2796 MMWEBSDK/200401 Mobile Safari/537.36 MMWEBID/8288 MicroMessenger/7.0.14.1660(0x27000E36) Process/appbrand0 NetType/WIFI Language/zh_TW ABI/arm64 WeChat/arm32',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'Referer': 'https://servicewechat.com/wx8b0ee5cc068def7f/2/page-frame.html'

}
html = requests.get(url2, headers=headers).content.decode()
soup = BeautifulSoup(html, 'lxml')
data = (soup.text)
print(data)
data1 = json.loads(data)
# print(data1)
data2 = (data1['data'])
# print(data2)
videos = data2['videos']
# print(videos)

for i in videos:
    # print(i)
    goodsCatalogId = (i['goodsCatalogId'])
    # print(i['goodsCatalogVideoId'])
    videoId = (i['videoId'])
    # print(i['videoName'])

    url3 = 'https://lite.haixue.com/lite/video/v1/detail?appId=wx8b0ee5cc068def7f&goodsId=948500&videoId=' + str(videoId) + '&goodsCatalogId=' + str(goodsCatalogId)

    html = requests.get(url3, headers=headers).content.decode()
    soup3 = BeautifulSoup(html, 'lxml')
    data3 = (soup3.text)
    # print(data3)
    data4 = json.loads(data3)
    data5 = (data4['data'])
    videoName = data5['videoName']
    videoPath = data5['videoPath']
    print(videoPath+videoName)
    with open('D:\python\wangye\demo\消防课\嗨学\嗨学消防.txt', 'a', encoding='utf-8', ) as f:
        f.write('\n'+ str(videoName) + ',' + videoPath)

    with open('D:\python\wangye\demo\消防课\嗨学\嗨学消防.csv', 'a')as f:
        f_csv = csv.writer(f)
        f_csv.writerow([videoName] + [videoName])