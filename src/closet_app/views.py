# closet_app/views.py
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Clothing
from .serializers import ClothingSerializer
from django.shortcuts import render
from utils.image_utils import get_image_color
from PIL import Image
import clip
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device)

class ClothingViewSet(viewsets.ModelViewSet):
    serializer_class = ClothingSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Clothing.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        clothing_item = serializer.save(user=self.request.user)

        clothing_item.color = get_image_color(clothing_item.image.path)
        clothing_item.save()

    @action(detail=False, methods=['GET'])
    def by_category(self, request):
        category = request.query_params.get('category')
        queryset = self.get_queryset()
        if category:
            queryset = queryset.filter(category=category)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)