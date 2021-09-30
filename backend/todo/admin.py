from django.contrib import admin

from todo.models import Project, Todo


admin.site.register(Project)
admin.site.register(Todo)
