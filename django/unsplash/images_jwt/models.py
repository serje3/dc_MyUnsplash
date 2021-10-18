from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator
from django.db import models
from .utils.exceptions import ImageModelException
from django.core.files import File
from urllib.request import urlopen
from tempfile import NamedTemporaryFile


def get_allowed_extension(content_type):
    extensions = {
        'image/jpeg': 'jpg',
        'image/png': 'png'
    }

    return extensions.get(content_type, None)


# Create your models here.

class Image(models.Model):
    image_height = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4096)])
    image_width = models.PositiveIntegerField(default=0, validators=[MaxValueValidator(4096)])
    img_file = models.ImageField(upload_to='photos/%Y/%m/%d',
                                 verbose_name="Image file",
                                 height_field='image_height',
                                 width_field='image_width',
                                 blank=True)
    img_url = models.URLField(verbose_name='Image url', blank=False, null=False)

    label = models.CharField(max_length=100, default="Unnamed", db_index=True)
    date_uploaded = models.DateTimeField(auto_now_add=True, )
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.img_url and not self.img_file:
            img_temp = NamedTemporaryFile(delete=True)
            with urlopen(self.img_url) as img_file:
                img_temp.write(img_file.read())
                img_temp.flush()
                ext = get_allowed_extension(img_file.getheader('Content-Type'))
            if ext:
                self.img_file.save(f"unsplash_{self.label}_serje3.{ext}", File(img_temp), save=False)
            else:
                raise ImageModelException("Invalid image extension(img_url). Only jpg, png are allowed")
        elif not self.img_url and not self.img_file:
            raise ImageModelException("The img_url field is not set")

        super(Image, self).save(*args, **kwargs)

    def __str__(self):
        return self.label.__str__()
