import django_cleanup.cleanup
from django.contrib.auth.models import User
from ..utils.exceptions import ImageModelException
from django.test import TestCase
from ..models import Image


# Create your tests here.
class ImageTestCase(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user('test', password='32323232SDSDDdsdsdssSDDSD')
        self.user.save()

    def test_str(self):
        img_url = "https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg"
        obj1 = Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')
        self.assertEqual(obj1.__str__(), 'Test from test_models.py')
        obj1.save()

    def test_url_image(self):
        width = 1280
        height = 853
        img_url = "https://s1.1zoom.ru/big0/697/Love_Night_Moon_Trees_Silhouette_Two_Dating_576752_1280x853.jpg"
        image = Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')
        self.assertIsNotNone(image)
        self.assertEqual(image.image_height, height)
        self.assertEqual(image.image_width, width)

    def test_url_image_2(self):
        width = 1270
        height = 1024
        img_url = "https://s1.1zoom.ru/big0/235/Poppies_Summer_Grasslands_Trees_562184_1270x1024.jpg"
        image = Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')
        self.assertIsNotNone(image)
        self.assertEqual(image.image_height, height)
        self.assertEqual(image.image_width, width)

    def test_url_image_3(self):
        width = 1066
        height = 737
        img_url = "https://sun9-20.userapi.com/impf/VA7o4oKgvYpE5wzGawCctWLmBvJOKqj3TPooTg/-x2_tI2sW2A.jpg?size" \
                  "=1066x737&quality=96&sign=f0c5fb54ac7b76b98833eb6ab5c73ea3&type=album "

        image = Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')
        self.assertIsNotNone(image)
        self.assertEqual(image.image_height, height)
        self.assertEqual(image.image_width, width)

    def test_url_image_4(self):
        width = 768
        height = 768
        img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon" \
                  ".png "

        image = Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')
        self.assertIsNotNone(image)
        self.assertEqual(image.image_height, height)
        self.assertEqual(image.image_width, width)

    def test_url_image_exception(self):
        # gif and other not available extensions test
        img_url = "https://upload.wikimedia.org/wikipedia/commons/a/aa/SmallFullColourGIF.gif"

        with self.assertRaises(ImageModelException):
            Image.objects.create(img_url=img_url, owner_id=self.user.pk, label='Test from test_models.py')

