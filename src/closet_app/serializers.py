# closet_app/serializers.py
from rest_framework import serializers
from .models import Clothing

class ClothingSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Clothing
        fields = ('id', 'name', 'category', 'image', 'image_url', 'color', 'season', 
                 'occasion', 'created_at', 'last_worn')
        read_only_fields = ('created_at', 'last_worn')

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None