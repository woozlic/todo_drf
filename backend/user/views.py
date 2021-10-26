from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.pagination import LimitOffsetPagination
from .serializers import UserSerializerV1, UserSerializerV2
from .models import User


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 100


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    queryset = User.objects.all()
    pagination_class = UserLimitOffsetPagination

    def get_serializer_class(self):
        if self.request.version == 'V2':
            return UserSerializerV2
        return UserSerializerV1
