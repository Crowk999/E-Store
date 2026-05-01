from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Add_Product
from .serializer import ProductSerializer
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

def random_token(length=16):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

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
    serializer = ProductSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    
    return Response(serializer.errors)