from rest_framework.test import APIClient, APITestCase, APIRequestFactory, force_authenticate
from django.test import TestCase
from rest_framework import status
from mixer.backend.django import mixer
from user.models import User
from user.views import UserViewSet


class TestUser(APITestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        User.objects.create_superuser(username='woozlic', email='1@ma.ru', password='123')

    def test_no_credentials(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_list(self):
        user = mixer.blend(User)
        self.client.login(username='woozlic', password='123')
        resp = self.client.get('/api/users/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data['results']), 2)
        self.client.logout()

    def test_profile(self):
        user = mixer.blend(User)
        self.client.login(username='woozlic', password='123')
        resp = self.client.get('/api/users/1/')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.client.logout()


class TestFactoryUser(TestCase):
    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.user = User.objects.create_superuser(username='woozlic', email='1@ma.ru', password='123')

    def test_update_user(self):
        user = mixer.blend(User)
        request = self.factory.put('/api/users/2', {'username': 'tester', 'first_name': 'Test', 'last_name': 'LastTest','email': 'changed@mail.ru'})
        force_authenticate(request, self.user)
        view = UserViewSet.as_view({'put': 'update'})
        response = view(request, pk=2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
