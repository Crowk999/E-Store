from django.shortcuts import render
from rest_framework.decorators import api_view
import requests
from rest_framework.response import Response
from .models import Add_Product, Cart, User
from .serializer import CartSerializer, ProductSerializer
import os
from dotenv import load_dotenv
load_dotenv() 
from imagekitio import ImageKit
# Create your views here.
import time
import hmac
import hashlib
import base64
import random
import string

from jose import jwt 
import json
from django.http import JsonResponse
import requests

SUPABASE_SECRET = os.getenv("SUPABASE_SECRET")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL").rstrip("/")

def random_token(length=16):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_user_from_token(token):
    res = requests.get(
        f"{SUPABASE_URL}/auth/v1/user",
        headers={
            "Authorization": f"Bearer {token}",
            "apikey": SUPABASE_ANON_KEY
        }
    ) 
    if not res:
        print("No Res")

    if res.status_code != 200:
        print("SUPABASE AUTH FAILED:", res.text)
        return None
    print(res)
    return res.json()

@api_view(["GET"])
def get_auth(request):
    token = random_token()
    expire = int(time.time()) + 2400  # 40 minutes

    private_key = os.getenv("IMAGEKIT_PRIVATE_KEY")

    # signature = HMAC-SHA1(token + expire, private_key)
    message = f"{token}{expire}".encode()
    secret = private_key.encode()

    signature = hmac.new(secret, message, hashlib.sha1).hexdigest()

    return Response({
        "token": token,
        "expire": expire,
        "signature": signature
    })


def get_db_user(request):
    if not request:
        print("No REQUEST")
        return None
    
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return Response({"error": "No token"}, status=401)

    token = auth_header.split(" ")[1]

    data = get_user_from_token(token)
    #print(data)
    if not data:  
        print("NO DATA")                      
        return None
    
    supabase_id = data["id"]
    email = data.get("email", "")

    if not supabase_id:
        print("NO id of SUPABASE....")
        return None

    user, _ = User.objects.get_or_create(
        supabase_id = supabase_id,
        defaults={
            "email":email,
            "role":"customer"
        }
    )
    #print(user)
    return user

@api_view(["GET"])
def get_products(request):
    products = Add_Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_product_detail(request, id):
    product = Add_Product.objects.get(id=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(["POST"])
def add_products(request):
    
    user = get_db_user(request)

    if not user:
        print("No USER")
        return Response({"error": "Unauthorized"}, status=401)

    print(user.role)
    if user.role != "customer":
        print("NOT ADMIN")
        return Response({"error": "You are not allowed"}, status=403)
    
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=user)
        print("SAVED:", serializer.data) 
        return Response(serializer.data)
    print("ERRORS:", serializer.errors)
    return Response(serializer.errors)
    

@api_view(["POST"])
def add_to_cart(request):

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return Response({"error": "No token"}, status=401)

    token = auth_header.split(" ")[1]

    user = get_user_from_token(token)

    if not user:
        return Response({"error": "Invalid token"}, status=401)

    user_id = user["id"]

    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity", 1)

    try:
        quantity = int(quantity)
    except:
        quantity = 1

    product = Add_Product.objects.get(id=product_id)

    cart_item, created = Cart.objects.get_or_create(
        user_id=user_id,
        product=product,
        defaults={"product_quantity": quantity}
    )

    if not created:
        cart_item.product_quantity += quantity
        cart_item.save()

    return Response({"message": "Added to cart"})

@api_view(["GET"])
def get_cart(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return Response({"error": "No token provided"}, status=401)

    try:
        token = auth_header.split(" ")[1]
    except IndexError:
        return Response({"error": "Invalid token format"}, status=401)

    user = get_user_from_token(token)

    cart_items = Cart.objects.filter(user_id=user["id"])

    serializer = CartSerializer(cart_items, many=True)

    return Response(serializer.data)

@api_view(["DELETE"])
def remove_from_cart(request, id):
    auth_header = request.headers.get("Authorization")
    #print("AUTH HEADER:", auth_header)
    if not auth_header:
        return Response({"error": "No token"}, status=401)

    token = auth_header.split(" ")[1]
    user = get_user_from_token(token)

    if not user:
        return Response({"error": "Invalid token"}, status=401)

    user_id = user["id"]

    Cart.objects.filter(id=id, user_id=user_id).delete()

    return Response({"message": "Removed"})