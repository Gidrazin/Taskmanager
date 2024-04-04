from django.urls import path

from . import views

app_name = 'main'

urlpatterns = [
    # path('', views.index, name='index'),
    path('xlsx/', views.make_xls, name='make_xlsx')
]
