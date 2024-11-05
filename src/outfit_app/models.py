# outfit_app/models.py
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from closet_app.models import Clothing

class Outfit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='outfits')
    name = models.CharField(max_length=100)
    clothes = models.ManyToManyField(Clothing, related_name='outfits')
    occasion = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    last_worn = models.DateTimeField(null=True, blank=True)
    rating = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        null=True, blank=True
    )

class OutfitHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)
    date_worn = models.DateTimeField(auto_now_add=True)
    occasion = models.CharField(max_length=50)
    weather = models.CharField(max_length=50)