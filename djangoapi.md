# Django REST API Documentation

## Overview
This document outlines the REST API endpoints and integration requirements for the Virtual Closet application. The API handles user authentication, clothing management, and outfit organization.

## URLs
```
Base URL:
http://127.0.0.1:8000/

For authorization:
http://127.0.0.1:8000/api/auth/token 


```

The authorization is done with JWT, which works effectively with a React client. 

## API Endpoints

### User Management API

| Endpoint | Method | Request Format | Response Format | Description |
|----------|---------|----------------|-----------------|-------------|
| `/api/users/me/` | GET | N/A | User object | Get current user profile |

Parameters:
```json
fields = (
'id', # Int
'username', # String 
'email', # String
'profile_picture', # Image URL
'preferred_style' # String (category)
)
```

### Clothes Closet API

| Endpoint | Method | Request Format | Response Format | Description |
|----------|---------|----------------|-----------------|-------------|
| `/api/clothes/` | GET | N/A | Array of clothing objects | List user's clothes |
| `/api/clothes/` | POST | Multipart form data | Clothing object | Add new clothing |
| `/api/clothes/{id}/` | PUT/PATCH | Multipart form data | Clothing object | Update clothing |
| `/api/clothes/{id}/` | DELETE | N/A | N/A | Delete clothing |
| `/api/clothes/by_category/` | GET | Query param: category | Array of clothing objects | Filter by category |

The first four endpoints are part of a ViewSet (from the Django REST framework).

Add New Clothing Example Request (Multipart form data):
```
name: "Uniqlo T-Shirt"
category: "TOP"
image: [file]
color: "blue"
season: "summer"
occasion: "casual"
```

Add New Clothing Example Response:
```json
{
    "id": 1,
    "name": "Uniqlo T-Shirt",
    "category": "TOP",
    "image": "image",
    "image_url": "image_url",
    "color": "blue",
    "season": "summer",
    "occasion": "casual"
}
```

### Outfit Suggestion API

| Endpoint | Method | Request Format | Response Format | Description |
|----------|---------|----------------|-----------------|-------------|
| `/api/outfits/` | GET | N/A | Array of outfit objects | List user's outfits |
| `/api/outfits/` | POST | JSON | Outfit object | Create new outfit |
| `/api/outfits/{id}/` | PUT/PATCH | JSON | Outfit object | Update outfit |
| `/api/outfits/{id}/` | DELETE | N/A | N/A | Delete outfit |
| `/api/outfits/suggest/` | POST | JSON | Array of clothing objects | Get outfit suggestions |

The first four endpoints are part of a ViewSet (from the Django REST framework).

Get outfit Request:
```json
{
    "name": "Summer Set",
    "clothes": [1, 2, 3],
    "occasion": "casual",
    "season": "summer"
}
```

Returns a set of three clothing items, each with the same parameters as below:

Parameters:
```json
fields = (
'id', # Int
'username', # String 
'email', # String
'profile_picture', # Image URL
'preferred_style' # String (category)
)
```

## Image Specifications

1. Images must be sent as multipart form data
2. Supported formats: All standard image formats (JPEG, PNG, etc.)
3. Image field name must be "image" in the form data

## Error Handling

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

