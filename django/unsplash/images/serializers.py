from rest_framework import serializers

from .models import Image


class ImagePOSTSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = ('label', 'img_url', 'img_file')


class ImageGETSerializer(serializers.HyperlinkedModelSerializer):
    height = serializers.IntegerField(source='image_height')
    width = serializers.IntegerField(source='image_width')

    class Meta:
        model = Image
        fields = ('pk', 'label', 'img_file', 'height', 'width', 'date_uploaded')


class ImageDELETESerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
