# Generated by Django 4.2.5 on 2023-10-06 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_ip'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='hui',
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('Worker', 'Работник'), ('Group boss', 'Начальник группы')], default='Worker', max_length=16, verbose_name='Должность'),
        ),
    ]
