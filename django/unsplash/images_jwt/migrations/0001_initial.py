# Generated by Django 3.2.7 on 2021-10-04 17:32

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_height', models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(4096)])),
                ('image_width', models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(4096)])),
                ('img_file', models.ImageField(blank=True, height_field='image_height', upload_to='', verbose_name='Image file', width_field='image_width')),
                ('img_url', models.URLField(verbose_name='Image url')),
                ('label', models.CharField(db_index=True, default='Unnamed', max_length=100)),
                ('date_uploaded', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]