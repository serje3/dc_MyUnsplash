from djoser.conf import User
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.reverse import reverse


class ImageAPITestCase(APITestCase):
    def setUp(self):
        # создайте нового пользователя, отправив запрос к конечной точке djoser
        self.user = self.client.post('/auth/users/', data={'username': 'mario', 'password': 'i-keep-jumping'})
        # получить веб-токен JSON для вновь созданного пользователя
        response = self.client.post('/auth/jwt/create/', data={'username': 'mario', 'password': 'i-keep-jumping'})
        self.token = response.data['access']
        self.api_authentication()

        self.img_url = "https://sun9-20.userapi.com/impf/VA7o4oKgvYpE5wzGawCctWLmBvJOKqj3TPooTg/-x2_tI2sW2A.jpg?size" \
                       "=1066x737&quality=96&sign=f0c5fb54ac7b76b98833eb6ab5c73ea3&type=album "

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token)

    def test_api_image_create_and_get(self):
        length = 10
        response = [self.client.post('/api/image',
                                     data={
                                         'img_url': self.img_url,
                                         'label': 'Test from test_api.py',
                                     }) for _ in range(length)][0]
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get('/api/image')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(length, len(response.data))

    def test_api_post_get_serializer_fields(self):
        post_keys = ('label', 'img_url', 'img_file')
        get_keys = ('pk', 'label', 'img_file', 'height', 'width', 'date_uploaded')

        response = self.client.post('/api/image',
                                    data={
                                        'img_url': self.img_url,
                                        'label': 'Test from test_api.py',
                                    })
        self.assertEqual(tuple(response.data.keys()), post_keys)

        response = self.client.get('/api/image')
        self.assertIsNotNone(response.data)

        self.assertEqual(tuple(map(str, response.data[0])), get_keys)

    def test_api_ordering(self):
        [self.client.post('/api/image',
                          data={
                              'img_url': self.img_url,
                              'label': 'Test from test_api.py',
                          }) for _ in range(10)]
        response_list = self.client.get('/api/image')
        self.assertIsNotNone(response_list.data)
        sorted_response_list = sorted(response_list.data, key=lambda item: item['date_uploaded'], reverse=True)

        self.assertEqual(sorted_response_list, response_list.data)

    def test_delete(self):
        self.client.post('/api/image', data={
            "img_url": self.img_url,
            "label": "Test from test_api.py"
        })
        response = self.client.delete(f'/api/image/delete/{1}', data={
            'username': 'mario',
            'password': 'i-keep-jumping'
        })
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
