import datetime

from django.db import models
from django.utils import timezone

from user.models import User


class Project(models.Model):
    title = models.CharField(max_length=64)
    repository_url = models.CharField(max_length=250)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.title


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='todos')
    text = models.TextField()
    created_datetime = models.DateTimeField(default=timezone.now)
    updated_datetime = models.DateTimeField(default=timezone.now)
    user_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField()

    def __str__(self):
        return self.text
