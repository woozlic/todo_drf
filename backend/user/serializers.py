from rest_framework.serializers import Serializer, CharField, HyperlinkedModelSerializer, HyperlinkedRelatedField
from .models import User


class UserSerializerV1(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']


class UserSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_superuser', 'is_staff']
