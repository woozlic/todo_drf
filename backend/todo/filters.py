from django_filters import rest_framework as filters
from .models import Todo, Project


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ['title']


class TodoFilter(filters.FilterSet):
    project = filters.CharFilter()
    created_datetime = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = Todo
        fields = ['project']
