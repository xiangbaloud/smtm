from django.shortcuts import render
from django.urls import reverse
from django.contrib import auth
from django.http import HttpResponseRedirect, HttpResponse

from .utility import *

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
