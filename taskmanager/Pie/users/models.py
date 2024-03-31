from django.contrib.auth.models import AbstractUser
from django.db import models

class Role(models.Model):
    """
    Должность сотрудника.
    """
    title = models.CharField(
        verbose_name='Должность',
        max_length=64,
        default='Инженер',
    )

    def __str__(self):
        return self.title


class Department(models.Model):
    """
    Структурное подразделение (отдел, цех и т.д).
    """
    slug = models.SlugField(
        unique=True,
        verbose_name='Номер подразделения',
    )
    title = models.CharField(
        max_length=250,
        verbose_name='Название подразделения',
        default='-'
    )
    boss = models.OneToOneField(
        'User',
        on_delete=models.SET_NULL,
        null=True,
        related_name = 'department_for_boss'
    )
    sub_boss = models.OneToOneField(
        'User',
        on_delete=models.SET_NULL,
        null=True,
        related_name = 'department_for_sub_boss'
    )
    def __str__(self):
        return self.slug

    class Meta:
        ordering = ('slug',)


class DepSubLvl1(models.Model):
    """
    Часть подразделения (сектор, лаборатория и т.д.).
    """
    slug = models.SlugField(
        unique=True,
        verbose_name='Номер',
    )
    title = models.CharField(
        max_length=250,
        verbose_name='Название подразделения',
        default='-'
    )
    boss = models.OneToOneField(
        'User',
        on_delete=models.SET_NULL,
        null=True,
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        verbose_name='Подразделение',
    )

    def __str__(self):
        return self.slug

    class Meta:
        ordering = ('slug',)
        default_related_name = 'department_lvl_1'


class DepSubLvl2(models.Model):
    """
    Наименьшая часть подразделения (группа, бюро и т.д.).
    """
    slug = models.SlugField(
        unique=True,
        verbose_name='Номер',
    )
    title = models.CharField(
        max_length=250,
        verbose_name='Название подразделения',
        default='-'
    )
    boss = models.OneToOneField(
        'User',
        on_delete=models.SET_NULL,
        null=True,
    )
    department = models.ForeignKey(
        DepSubLvl1,
        on_delete=models.PROTECT,
        verbose_name='Подразделение',
    )

    def __str__(self):
        return self.slug

    class Meta:
        ordering = ('slug',)
        default_related_name = 'department_lvl_2'


class User(AbstractUser):

    ip = models.GenericIPAddressField(
        default='127.0.0.1',
        unique=True,
    )

    email = models.EmailField(
        blank=True,
        unique=True,
    )

    role =  models.ForeignKey(
        Role,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Должность',
    )

    department = models.ForeignKey(
        DepSubLvl2,
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        verbose_name='Подразделение',
    )

    @property
    def is_group_boss(self):
        return self.role.title == 'Начальник группы'

    @property
    def full_name(self):
        return self.first_name + ' ' + self.last_name

    def __str__(self):
        return self.username

    class Meta:
        default_related_name = 'users'
