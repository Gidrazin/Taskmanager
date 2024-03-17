from django.contrib import admin

from main.models import Task, Theme


class ThemeAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',
        'title',
    )

class TaskAdmin(admin.ModelAdmin):
    list_display = (
        'author',
        'title',
        'performer', 
        'theme', 
        'start', 
        'end', 
        'report', 
        'pages',
        'status',
    )

admin.site.register(Theme, ThemeAdmin)
admin.site.register(Task, TaskAdmin)
