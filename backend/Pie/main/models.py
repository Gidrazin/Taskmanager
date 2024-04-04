from django.db import models
from django.utils import timezone

from users.models import User


class Theme(models.Model):
    slug = models.SlugField(
        unique=True,
        verbose_name='Номер темы (индекс изделия)',
    )
    title = models.CharField(
        max_length=150,
        verbose_name='Название изделия',
        default='-'
    )

    def __str__(self):
        return f'{self.slug} - {self.title}'

    class Meta:
        ordering = ('slug',)


class Task(models.Model):
    ANNOUNCED = 'announced'
    IN_PROGRESS = 'in progress'
    DONE = 'done'
    CANCELED = 'canceled'
    STATUSES = [
        (ANNOUNCED, 'Запланирована'),
        (IN_PROGRESS, 'В работе'),
        (DONE, 'Выполнена'),
        (CANCELED, 'Отменена'),
    ]

    title = models.CharField(
        max_length=300,
        verbose_name='Наименование работы',
    )

    performer = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks',
        verbose_name='Исполнитель',
    )

    theme = models.ForeignKey(
        Theme,
        on_delete=models.SET_NULL,
        null=True,
        related_name='tasks',
        verbose_name='Тема',
    )

    start = models.DateTimeField(
        verbose_name='Начало',
        default=timezone.now,
    )

    end = models.DateTimeField(
        verbose_name='Срок',
    )

    report = models.CharField(
        max_length=150,
        blank=True,
        null=True,
        verbose_name='Листок запуска/Извещение',
    )

    pages = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        verbose_name='Количество листов',
    )

    status = models.CharField(
        verbose_name='Статус работы',
        max_length=16,
        choices=STATUSES,
        default=ANNOUNCED,
    )

    author = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name='task_author',
        verbose_name='Исполнитель',
    )

    @property
    def duration(self):
        return self.end - self.start

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ('-end', 'theme__slug', 'performer',)
