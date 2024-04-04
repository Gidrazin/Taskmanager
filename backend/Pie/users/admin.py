from django.contrib import admin

from users.models import User, Role, Department, DepSubLvl1, DepSubLvl2


class UserAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'username',
        'first_name',
        'last_name',
        'ip',
        'role',
        'department',
    )


class RoleAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
    )


class DepartmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',
        'title',
        'boss',
        'sub_boss'
    )

class DepSubLvl1Admin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',
        'title',
        'boss'
    )

class DepSubLvl2Admin(admin.ModelAdmin):
    list_display = (
        'id',
        'slug',
        'title',
        'boss'
    )


admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(DepSubLvl1, DepSubLvl1Admin)
admin.site.register(DepSubLvl2, DepSubLvl2Admin)
