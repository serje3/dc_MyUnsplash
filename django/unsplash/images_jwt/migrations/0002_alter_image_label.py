# Generated by Django 3.2.7 on 2021-10-04 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='label',
            field=models.CharField(default='Unnamed', max_length=100),
        ),
    ]