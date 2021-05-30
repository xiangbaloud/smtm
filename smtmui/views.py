from django.shortcuts import render
from django.urls import reverse
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .utility import *

import json

def smtm_login(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('main'))

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = auth.authenticate(username=username, password=password)
            if user is not None and user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect(reverse('main'))
            else:
                return HttpResponseRedirect(reverse('login'))
        except Exception as err:
            print(err)

    return render(request, 'login.html')

def smtm_logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('login'))

def smtm_main(request):
    if request.user.is_authenticated:
        request.user = str(request.user).title()
        return render(request, 'main.html', {
            'title': 'SMTM',
            'data': get_stock_history('yolo', 'yolo')
        })
    else:
        return HttpResponseRedirect(reverse('login'))

def smtm_querydata(database='smtm-worker/data.db'):
    conn = create_connection(database)
    with conn:
        return select_all_tasks(conn)

@csrf_exempt
def smtm_get_all_data(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    else:
        if request.method == 'POST':
            all_data = smtm_querydata()
            lst_new = []
            for i in range(0, len(all_data)):
                dict_stock_data = {}
                _stock_data = all_data[i]
                dict_stock_data['id'] = _stock_data[0]
                dict_stock_data['SecurityCode'] = _stock_data[1]
                dict_stock_data['SecurityName'] = _stock_data[2]
                dict_stock_data['TradingVolume'] = _stock_data[3]
                dict_stock_data['TransactionAmount'] = _stock_data[4]
                dict_stock_data['OpeningPrice'] = _stock_data[5]
                dict_stock_data['HighestPrice'] = _stock_data[6]
                dict_stock_data['LowestPrice'] = _stock_data[7]
                dict_stock_data['ClosingPrice'] = _stock_data[8]
                dict_stock_data['PriceDifference'] = _stock_data[9]
                dict_stock_data['NumberofTransactions'] = _stock_data[10]
                lst_new.append(dict_stock_data)

            new_data = {}
            new_data["data"] = lst_new
            return HttpResponse(json.dumps(new_data))
        else:
            return HttpResponseRedirect(reverse('login'))
