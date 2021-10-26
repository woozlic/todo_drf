from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.permissions import AllowAny
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView

from user.views import UserViewSet
from todo.views import TodoViewSet, ProjectViewSet


schema_view = get_schema_view(
    openapi.Info(
        title="Todos",
        default_version="0.1",
        description="Documentation to todos project",
        contact=openapi.Contact(email="sampaccs@mail.ru"),
        license=openapi.License(name="MIT License")
    ),
    public=True,
    permission_classes=(AllowAny,)
)


router = DefaultRouter()
router.register('users', UserViewSet)
router.register('todos', TodoViewSet, basename='todo')
router.register('projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    path('', TemplateView.as_view(template_name='index.html'))
]
