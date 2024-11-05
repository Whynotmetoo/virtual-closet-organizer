# closet_app/models.py
from django.db import models
from django.conf import settings

class Clothing(models.Model):
    CATEGORY_CHOICES = [
        ('TOP', 'Top'),
        ('BOTTOM', 'Bottom'),
        ('DRESS', 'Dress'),
        ('OUTERWEAR', 'Outerwear'),
        ('SHOES', 'Shoes'),
        ('ACCESSORIES', 'Accessories'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='clothes')
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='clothing_images/')
    color = models.CharField(max_length=50)
    season = models.CharField(max_length=20)
    occasion = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    last_worn = models.DateTimeField(null=True, blank=True)