from rest_framework.serializers import HyperlinkedModelSerializer, ValidationError
from django.utils import timezone

from todo.models import Project, Todo


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    def validate_title(self, value):
        if len(value) < 5 or len(value) > 100:
            raise ValidationError("Заголовок не должен быть меньше 5 и больше 100 символов")
        return value

    def validate_repository_url(self, value):
        if value.startswith("http://") or value.startswith("https://"):
            return value
        else:
            raise ValidationError("Url должен начинаться с http:// или https://")


class TodoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['project', 'user_owner', 'text', 'is_active', 'created_datetime', 'updated_datetime']

    def validate_created_datetime(self, value):
        if value > timezone.now():
            raise ValidationError("Время создания не может быть в будущем")
        return value

    def validate_updated_datetime(self, value):
        if value > timezone.now():
            raise ValidationError("Время обновления не может быть в будущем")
        return value
