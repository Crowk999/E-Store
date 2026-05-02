from django.db import models

# Create your models here.

class Add_Product(models.Model):
    product_name = models.CharField(max_length = 50,  null=False, blank=False)
    product_price = models.IntegerField(null=False, blank=False)
    product_description = models.CharField(max_length = 200, null=False, blank=False)   
    product_image = models.URLField( null=True, blank=True)
    product_brand = models.CharField(default="")
    product_colour = models.CharField(default="")

    def __str__(self):
        return self.product_name

class Cart(models.Model):
    user_id = models.CharField(max_length=255)
    product = models.ForeignKey("Add_Product", on_delete=models.CASCADE)
    product_quantity = models.IntegerField(null=False)
    