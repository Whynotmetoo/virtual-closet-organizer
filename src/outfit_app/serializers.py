# outfit_app/serializers.py
from rest_framework import serializers
from .models import Outfit, OutfitHistory
from closet_app.serializers import ClothingSerializer

class OutfitSerializer(serializers.ModelSerializer):
    clothes = ClothingSerializer(many=True, read_only=True)

    class Meta:
        model = Outfit
        fields = ('id', 'name', 'clothes', 'occasion', 'season', 'created_at', 
                 'last_worn', 'rating')
        read_only_fields = ('created_at', 'last_worn')

class OutfitHistorySerializer(serializers.ModelSerializer):
    outfit = OutfitSerializer(read_only=True)

    class Meta:
        model = OutfitHistory
        fields = ('id', 'outfit', 'date_worn', 'occasion', 'weather')
        read_only_fields = ('date_worn',)