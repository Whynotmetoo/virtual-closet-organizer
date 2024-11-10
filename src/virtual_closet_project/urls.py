"""
URL configuration for virtual_closet_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# virtual_closet_project/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users_app.views import UserViewSet
from closet_app.views import ClothingViewSet
from outfit_app.views import OutfitViewSet

# Default view
@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    return Response({
        'message': 'Welcome to the Virtual Closet API',
        'authentication': {
            'obtain_token': request.build_absolute_uri('api/auth/token/'),
            'refresh_token': request.build_absolute_uri('api/auth/token/refresh/'),
            'instructions': 'To authenticate, input the username and password:'
        },
        'endpoints': {
            'users': request.build_absolute_uri('api/users/'),
            'clothes': request.build_absolute_uri('api/clothes/'),
            'outfits': request.build_absolute_uri('api/outfits/')
        },
        'admin_interface': request.build_absolute_uri('admin/'),
    })

# Registering viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'clothes', ClothingViewSet, basename='clothing')
router.register(r'outfits', OutfitViewSet, basename='outfit')

urlpatterns = [
    path('', api_root, name='root'),
    path('admin/', admin.site.urls), #Admin page
    path('api/', include(router.urls)), #API endpoints

    path('api/auth/', include('rest_framework.urls')),

    # Authentication endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)