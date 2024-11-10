# outfit_app/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from closet_app.serializers import ClothingSerializer
from .models import Outfit, OutfitHistory
from .serializers import OutfitSerializer, OutfitHistorySerializer, OutfitSuggestionSerializer
from django.shortcuts import render

class OutfitViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'suggest' or self.action == 'list':
            return OutfitSuggestionSerializer
        return OutfitSerializer
    
    def get_queryset(self):
        return Outfit.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        return self.suggest(request, *args, **kwargs)

    @action(detail=False, methods=['GET', 'POST'])
    def suggest(self, request):
        if request.method == 'GET':
            # Return empty form
            serializer = OutfitSuggestionSerializer()
            return Response(serializer.data)
            
        # POST handling
        serializer = OutfitSuggestionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
            
        activity = serializer.validated_data.get('activity')
        feeling = serializer.validated_data.get('feeling')
        
        clothes = self.request.user.clothes.all()
        
        suggested_clothes = {
            'top': clothes.filter(category='TOP').first(),
            'bottom': clothes.filter(category='BOTTOM').first(),
            'shoes': clothes.filter(category='SHOES').first(),
        }
        
        clothing_serializer = ClothingSerializer(
            [item for item in suggested_clothes.values() if item], 
            many=True,
            context={'request': request}
        )
        return Response(clothing_serializer.data)