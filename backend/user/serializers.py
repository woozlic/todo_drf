from rest_framework.serializers import Serializer, CharField, HyperlinkedModelSerializer, HyperlinkedRelatedField
from .models import User


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name']

