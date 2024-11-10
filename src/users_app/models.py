# users_app/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    preferred_style = models.TextField(null=True, blank=True)

