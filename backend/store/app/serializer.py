from rest_framework import serializers
from .models import Add_Product, Cart

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Add_Product
        fields = '__all__'  
        
class CartSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="product.product_name")
    price = serializers.DecimalField(source="product.product_price", max_digits=10, decimal_places=2)
    image = serializers.CharField(source="product.product_image")
    brand = serializers.CharField(source="product.product_brand")
    color = serializers.CharField(source="product.product_colour")

    class Meta:
        model = Cart
        fields = ["id", "name", "price", "image", "brand", "color", "product_quantity"]