# ！/usr/bin/env python
# -*-coding:utf-8-*-
"""
@Author  : xiaofeng
@Time    : 2018/12/25 10:26
@Desc : Less interests,More interest.
@Project : python_appliction
@FileName: you-get.py
@Software: PyCharm
@Blog    ：https://blog.csdn.net/zwx19921215
"""
# import sys
# import you_get


#
# def download(url, path):
#     sys.argv = ['you-get', '-o', path, url]
#     you_get.main()
#
#
# if __name__ == '__main__':
#     # 视频网站的地址
#     url = 'https://www.bilibili.com/video/BV1A64y1m7Sh?p=3&spm_id_from=pageDriver'
#     # 视频输出的位置
#     path = 'G:/test'
#     download(url, path)
#
import sys

import you_get

url = 'https://www.bilibili.com/video/BV1A64y1m7Sh?'
# 视频输出的位置
path = 'G:/test2'
# sys.argv = ['you-get','-i',url]
# sys.argv = ['you-get','--url',url]
# sys.argv = ['you-get','--format=dash-flv720',url]
# sys.argv = ['you-get','--url','--format=dash-flv720',url]
sys.argv = ['you-get','--format=flv',url]
# sys.argv = ['you-get','--url','--format=flv',url]
you_get.main()


