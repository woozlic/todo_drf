from rest_framework.viewsets import ModelViewSet

from todo.models import Todo, Project
from todo.serializers import TodoSerializer, ProjectSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
