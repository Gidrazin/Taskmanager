# Generated by Django 4.2.5 on 2023-10-03 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='hui',
            field=models.CharField(default='pizda', max_length=150),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='ip',
            field=models.GenericIPAddressField(unique=True),
        ),
    ]
