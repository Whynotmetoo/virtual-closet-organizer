# outfit_app/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from closet_app.serializers import ClothingSerializer
from .models import Outfit, OutfitHistory
from .serializers import OutfitSerializer, OutfitHistorySerializer
from django.shortcuts import render

class OutfitViewSet(viewsets.ModelViewSet):
    serializer_class = OutfitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Outfit.objects.filter(user=self.request.user)

    @action(detail=False, methods=['POST'])
    def suggest(self, request):
        activity = request.data.get('activity')
        feeling = request.data.get('feeling')
        
        
        clothes = self.request.user.clothes.all()
        
        
        suggested_clothes = {
            'top': clothes.filter(category='TOP').first(),
            'bottom': clothes.filter(category='BOTTOM').first(),
            'shoes': clothes.filter(category='SHOES').first(),
        }
        
        serializer = ClothingSerializer(
            [item for item in suggested_clothes.values() if item], 
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)