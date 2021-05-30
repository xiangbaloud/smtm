from django.db import models

# Create your models here.
class StockData(models.Model):
    stock_id = models.CharField(max_length=64)
    stock_name = models.CharField(max_length=64)
    price_after = models.CharField(max_length=64)
    print_pre = models.CharField(max_length=64)
