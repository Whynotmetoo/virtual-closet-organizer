# outfit_app/views.py
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from closet_app.serializers import ClothingSerializer
from .models import Outfit, OutfitHistory
from .serializers import OutfitSerializer, OutfitHistorySerializer, OutfitSuggestionSerializer
from django.shortcuts import render
from openai import OpenAI
from utils.outfit_utils import generate_openai_message
from dotenv import load_dotenv
import os
import json
from pydantic import BaseModel
from typing import List


load_dotenv()

client = OpenAI()

class ClothUnit(BaseModel):
    category: str
    id: int

class ChatResponse(BaseModel):
    reasoning: str
    outfit: List[ClothUnit]

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

        message = generate_openai_message(self.request.user, activity, feeling)
        
        # suggested_clothes = {
        #     'top': clothes.filter(category='TOP').first(),
        #     'bottom': clothes.filter(category='BOTTOM').first(),
        #     'shoes': clothes.filter(category='SHOES').first(),
        # }
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=message,
            response_format=ChatResponse,
        )
        # print(response)
        # print(response.choices[0].message.content)
        # clothing_serializer = ClothingSerializer(
        #     [item for item in suggested_clothes.values() if item], 
        #     many=True,
        #     context={'request': request}
        # )
        parsed_content = json.loads(response.choices[0].message.content)
        reasoning = parsed_content["reasoning"]

        outfit = parsed_content["outfit"]

        outfit_with_images = []
        for cloth_unit in outfit:
            clothing_item = clothes.filter(id=cloth_unit["id"]).first()  
            if clothing_item:
                image_url = request.build_absolute_uri(clothing_item.image.url) if clothing_item.image else None
                cloth_data = {
                    'category': cloth_unit["category"],
                    'image': image_url
                }
                outfit_with_images.append(cloth_data)

        response_data = {
            'reasoning': reasoning,
            'outfit': outfit_with_images
        }
        print(response_data)
        return Response(response_data)