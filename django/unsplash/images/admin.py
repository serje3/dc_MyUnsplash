from django.contrib import admin

# Register your models here.
from .models import Image


class ImageAdmin(admin.ModelAdmin):

    list_display = ('label', 'owner', 'date_uploaded')
    list_display_links = ('label', )
    ordering = ('-date_uploaded',)
    list_per_page = 60


admin.site.register(Image, ImageAdmin)
