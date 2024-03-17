from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.views import TaskViewSet, ThemeViewSet, UserViewSet, login

#app_name = 'api'

router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='tasks')
router.register('themes', ThemeViewSet, basename='themes')
router.register('users', UserViewSet, basename='users')
#router.register('', greetengs, basename='index')

auth_urls = [
    path('login/', login),
]

urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', include(auth_urls)),
]
