from django.contrib import admin
from .models import Supplier, Item, PurchaseRequest
# Register your models here.
admin.site.register(Supplier)
admin.site.register(Item)
admin.site.register(PurchaseRequest)
