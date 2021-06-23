import requests
from bs4 import BeautifulSoup

import json
# headers = {
#     'Host': 'service0.iiilab.com',
#     'Connection': 'keep-alive',
#     'Content-Length': '90',
#     'Accept': 'application/json, text/javascript, */*; q=0.01',
#     'Origin': 'https://bilibili.iiilab.com',
#     'X-Client-Data': '40973e3e94bd80807fffe9179481e9ff',
#     'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Le X820 Build/FEXCNFN5801809292S; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36 VivoBrowser/6.4.1.3',
#     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
#     'Referer': 'https://bilibili.iiilab.com/',
#     'Accept-Encoding': 'gzip, deflate',
#     'Accept-Language': 'zh-TW,en-US;q=0.9',
#     'Cookie': 'iii_Session=47hl27r56kur6ubcutdcns5b00; PHPSESSIID=663351624354; ppp0609=1; _gsp=GA5684c46893676766; _ga=GA1.2.1740904048.1624356337; _gid=GA1.2.144706074.1624356337; _gat=1'
#
# }


headers = {
    'Host': 'service0.iiilab.com',
    'Connection': 'keep-alive',
    'Content-Length': '123',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Origin': 'https://bilibili.iiilab.com',
    'X-Client-Data': '3f94ff69007de83c423fea1429c03f3f',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; Le X820 Build/FEXCNFN5801809292S; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36 VivoBrowser/6.4.1.3',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Referer': 'https://bilibili.iiilab.com/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-TW,en-US;q=0.9',
    'Cookie': 'iii_Session=47hl27r56kur6ubcutdcns5b00; PHPSESSIID=663351624354; ppp0609=1; _gsp=GA5684c46893676766; _ga=GA1.2.1740904048.1624356337; _gid=GA1.2.144706074.1624356337; _gat=1'
}
data = 'link=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1A64y1m7Sh%3Fp%3D2%26share_source%3Dcopy_web&r=6842118736963887&s=923665233'
url = 'https://service0.iiilab.com/video/web/bilibili'

html = requests.post(url,headers=headers,data=data).content.decode()
soup = BeautifulSoup(html,'lxml')
# print(soup)
data2 = (soup.p.text)
print(data2)
data3 = json.loads(data2)
data4 = (data3['data'])


title = (data4['text'])
img = (data4['cover'])
video_url = (data4['video'])
print(title)
print(img)
print(video_url)