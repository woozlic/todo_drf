from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.views import UserViewSet
from todo.views import TodoViewSet, ProjectViewSet


router = DefaultRouter()
router.register('users', UserViewSet)
router.register('todos', TodoViewSet, basename='todo')
router.register('projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
