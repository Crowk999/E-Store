from rest_framework import serializers
from .models import Add_Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Add_Product
        fields = '__all__'  
        