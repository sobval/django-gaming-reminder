from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.HomePage.as_view(), name='list'),
    url(r'^(?P<pk>\d+)/$', views.game_detail, name='detail'),
]