from django.shortcuts import render

from core.utils import get_user_by_ip, export_tasks_to_xls


# def index(request):
#     user = get_user_by_ip(request)
#     context = {
#         'first_last_name': f'{user.last_name} {user.first_name}',
#         'department': f'{user.department.department.department.title.split()[0]}: {user.department.department.department.slug}',
#     }
#     template = 'index.html'
#     return render(request, template, context)


def make_xls(request):
    return export_tasks_to_xls(request)
