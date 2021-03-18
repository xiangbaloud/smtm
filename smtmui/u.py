#!/usr/bin/env python3

# import numpy as np
import requests
import pandas as pd
import datetime
import json
# import matplotlib.pyplot as pp
import time
# import pymongo
import sys
import os

MONGO_HOST = 'localhost'
MONGO_DB = 'TwStock'
MONGO_COLLETION = 'twse'
# from pymongo import MongoClient

def connect_mongo():  #連線資料庫
    global collection
    client = MongoClient(MONGO_HOST, 27017)
    db = client[MONGO_DB]
    collection = db[MONGO_COLLETION]

def transform_date(date):   #民國轉西元
        y, m, d = date.split('/')
        return str(int(y)+1911) + '/' + m  + '/' + d
    
def transform_data(data):   #將證交所獲得資料進行資料格式轉換
    data[0] = datetime.datetime.strptime(transform_date(data[0]), '%Y/%m/%d')
    data[1] = int(data[1].replace(',', ''))#把千進位的逗點去除
    data[2] = int(data[2].replace(',', ''))
    data[3] = float(data[3].replace(',', ''))
    data[4] = float(data[4].replace(',', ''))
    data[5] = float(data[5].replace(',', ''))
    data[6] = float(data[6].replace(',', ''))
    data[7] = float(0.0 if data[7].replace(',', '') == 'X0.00' else data[7].replace(',', ''))  # +/-/X表示漲/跌/不比價
    data[8] = int(data[8].replace(',', ''))
    return data

def transform(data):   #讀取每一個元素進行資料格式轉換，再產生新的串列
    return [transform_data(d) for d in data]

def genYM(smonth, syear, emonth, eyear):  #產生從syear年smonth月到eyear年emonth月的所有年與月的tuple
    start = 12 * syear + smonth
    end = 12 * eyear + emonth
    for num in range(int(start), int(end) + 1):
        y, m = divmod(num, 12)
        yield y, m

def fetch_data(year: int, month: int, stockno):  #擷取從year-month開始到目前為止的所有交易日資料
    raw_data = []
    today = datetime.datetime.today()
    for year, month in genYM(month, year, today.month, today.year): #產生year-month到今天的年與月份，用於查詢證交所股票資料
        if month < 10:
            date = str(year) + '0' + str(month) + '01'  #1到9月
        else:
            date = str(year) + str(month) + '01'   #10月
        data = get_stock_history(date, stockno)
        for item in data:  #取出每一天編號為stockno的股票資料
            if collection.find({    #找尋該交易資料是否不存在
                    "date": item[0],
                    "stockno": stockno
                } ).count() == 0:
                element={'date':item[0], 'stockno':stockno, 'shares':item[1], 'amount':item[2], 'open':item[3], 'close':item[4], 
                     'high':item[5], 'low':item[6], 'diff':item[7], 'turnover':item[8]};  #製作MongoDB的插入元素
                print(element)
                collection.insert_one(element)  #插入元素到MongoDB
        time.sleep(10)  #延遲5秒，證交所會根據IP進行流量統計，流量過大會斷線

def get_stock_history(date, stock_no, retry = 5):   #從www.twse.com.tw讀取資料
    _date = datetime.date.today().strftime("%Y%m%d")
    _proxies = {
        'http': 'http://192.168.0.150:8080',
        'https': 'http://192.168.0.150:8080',
    }
    _url = "http://www.twse.com.tw/exchangeReport/STOCK_DAY_ALL?response=open_data"
    # _url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?date=%s&stockNo=%s' % ( _date, stock_no)
    _s_data = '/tmp/s.date'
    if os.path.isfile(_s_data) is True:
        _res_data = requests.get(_url)
        # _res_data = requests.get(_url, proxies = _proxies)
        _res_data = _res_data.text
        with open(_s_data, 'w') as f:
            f.write(_res_data)
    else:
        with open(_s_data, 'w') as f:
            f.write('')

    with open(_s_data, 'r') as f:
        _line = f.readlines()
        _RowDF = {}
        _col0, _col1, _col2, _col3, _col4, _col5, _col6, _col7, _col8, _col9 = [], [], [], [], [], [], [], [], [], []
        for i in _line:
            i = i.rstrip()
            i = i.strip('"')
            i = i.replace('","', ',')
            i = i.split(',')
            if len(i) == 10:
                if i[0] == '證券代號' or i[4] == '':
                    pass
                else:
                    _col0.append(i[0])
                    _col1.append(i[1])
                    _col2.append(int(i[2]))
                    _col3.append(int(i[3]))
                    _col4.append(float(i[4]))
                    _col5.append(float(i[5]))
                    _col6.append(float(i[6]))
                    _col7.append(float(i[7]))
                    _col8.append(float(i[8]))
                    _col9.append(int(i[9]))
            else:
                continue
        _RowDF['證券代號'] = _col0
        _RowDF['證券名稱'] = _col1
        _RowDF['成交股數'] = _col2
        _RowDF['成交金額'] = _col3
        _RowDF['開盤價'] = _col4
        _RowDF['最高價'] = _col5
        _RowDF['最低價'] = _col6
        _RowDF['收盤價'] = _col7
        _RowDF['漲跌價差'] = _col8
        _RowDF['成交筆數'] = _col9
        pd.set_option('display.max_rows', 100)
        df = pd.DataFrame(_RowDF)
        df = df.sort_values(by = ['成交金額'], ascending = False)
        df['成交股數'] = df['成交股數'].map('{:,}'.format)
        df['成交金額'] = df['成交金額'].map('{:,}'.format)
        df = df.head(50)
        print(df.to_string(index = False))

    sys.exit()

    if _res_data:
        _res_stat = _res_data.json()['stat']
    else:
        print(1)
    if _res_stat == 'OK':
        _res_date = _res_data.json()['date']
        _res_title = _res_data.json()['title']
        _res_fields = _res_data.json()['fields']
        _res_Rdata = _res_data.json()['data']
        print(_res_date)
        print(_res_title)
        print(_res_fields)
        for i in _res_Rdata:
            print(i)
    else:
        print(1)

get_stock_history('yolo', 'yolo')
