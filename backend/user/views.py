from rest_framework.viewsets import GenericViewSet
# from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.pagination import LimitOffsetPagination
from .serializers import UserSerializer
from .models import User


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    pagination_class = UserLimitOffsetPagination
