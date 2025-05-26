# procurement/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'purchase-requests', views.PurchaseRequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]