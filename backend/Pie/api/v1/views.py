from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import SAFE_METHODS
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from api.v1.serializers import (
    TaskGetSerializer, ThemeSerializer, UserSerializer,
    TaskPostPutPatchDeleteSerializer,
)
from api.v1.filters import UserNameFilter
from core.utils import get_user_by_ip, user_objects_filter
from main.models import Task, Theme
from users.models import User


@api_view(['GET'])
def login(request):
    user = get_user_by_ip(request)
    auth_token = Token.objects.get_or_create(user=user)[0]
    return Response(
        {'auth_token': f'{str(auth_token.key)}'},
        status=status.HTTP_201_CREATED
    )


def greetengs(request):
    pass
'''
#    my_str = request.META.get('HTTP_X_FORWARDED_FOR')
    remote_ip = request.META.get('REMOTE_ADDR')
    username = get_object_or_404(User, ip=remote_ip)
    if not username:
        username = 'Anonymous'
    return HttpResponse(username)
'''

class TaskViewSet(viewsets.ModelViewSet):
    filter_backends = filters.SearchFilter, DjangoFilterBackend
    filterset_class = UserNameFilter
    search_fields = 'theme__slug', 'end'

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return TaskGetSerializer
        return TaskPostPutPatchDeleteSerializer

    def get_queryset(self):
        user = get_user_by_ip(self.request)
        authors = user_objects_filter(User.objects.all(), user)
        return Task.objects.filter(Q(performer__in=authors) | Q(author__in=authors))

    def perform_create(self, serializer):
        serializer.save(author=get_user_by_ip(self.request))
    
    def perform_update(self, serializer):
        username = self.request.data.get('performer')
        instance = self.get_object()
        if not username:
            instance.performer = None
        else:
            instance.performer = User.objects.get(username = username)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    lookup_field = 'slug'


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = get_user_by_ip(self.request)
        return user_objects_filter(User.objects.all(), user)
