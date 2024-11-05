# closet_app/views.py
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Clothing
from .serializers import ClothingSerializer
from django.shortcuts import render


class ClothingViewSet(viewsets.ModelViewSet):
    serializer_class = ClothingSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Clothing.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['GET'])
    def by_category(self, request):
        category = request.query_params.get('category')
        queryset = self.get_queryset()
        if category:
            queryset = queryset.filter(category=category)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)