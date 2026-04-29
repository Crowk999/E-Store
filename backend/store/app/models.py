from django.db import models

# Create your models here.

class Add_Product(models.Model):
    product_name = models.CharField(max_length = 50,  null=False, blank=False)
    product_price = models.IntegerField(null=False, blank=False)
    product_description = models.CharField(max_length = 200, null=False, blank=False)   
    product_image = models.URLField( null=True, blank=True)

    def __str__(self):
        return self.product_name