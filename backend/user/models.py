from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.CharField(max_length=64, unique=True)
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    password = models.CharField(max_length=88)

    def __str__(self):
        return f'{self.username}'
