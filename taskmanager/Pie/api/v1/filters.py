from django.db.models import Q, Count, Value
from django.db.models.functions import Concat
from django_filters.rest_framework import FilterSet, filters
from main.models import Task


class UserNameFilter(FilterSet):
    """
    Фильтр для поиска по ФИО.
    Фильтрация осуществлена по первым введённым буквам имени
    или фамилии.
    """
    performer = filters.CharFilter(method='filter_name',)

    def filter_name(self, queryset, _, value):
        """
        Filters the specified `queryset` of queries based on the match with
        the part of the full_name = 'first_name last_name'.
        """
        queryset = queryset.annotate(
            full_name=Concat(
                'performer__first_name',
                Value(' '),
                'performer__last_name')
            ).filter(full_name__icontains=value)

        return queryset
