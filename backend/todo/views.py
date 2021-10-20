from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import Response
from rest_framework import status
from rest_framework.permissions import DjangoModelPermissions

from todo.models import Todo, Project
from todo.serializers import TodoSerializer, ProjectSerializer
from todo.filters import ProjectFilter, TodoFilter


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_class = TodoFilter
    permission_classes = [DjangoModelPermissions]

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except Exception as e:
            return Response({"error": e})
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter
    permission_classes = [DjangoModelPermissions]
