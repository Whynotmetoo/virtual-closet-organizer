# users_app/serializers.py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'preferred_style')
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        #password = validated_data.pop('password', None)
        user = super().create(validated_data)
        user.save()
        return user