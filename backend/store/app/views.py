from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Add_Product
from .serializer import ProductSerializer

# Create your views here.

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