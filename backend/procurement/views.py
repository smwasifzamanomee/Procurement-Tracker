# procurement/views.py

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Supplier, Item, PurchaseRequest
from .serializers import SupplierSerializer, ItemSerializer, PurchaseRequestSerializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class PurchaseRequestViewSet(viewsets.ModelViewSet):
    queryset = PurchaseRequest.objects.all().select_related('item', 'supplier')
    serializer_class = PurchaseRequestSerializer
    
    def perform_create(self, serializer):
        serializer.save(status='pending')
    
    @action(detail=True, methods=['post'])
    def receive(self, request, pk=None):
        purchase_request = self.get_object()
        if purchase_request.status != 'approved':
            return Response(
                {'error': 'Only approved requests can be received'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        with transaction.atomic():
            item = purchase_request.item
            item.current_stock += purchase_request.quantity
            item.save()
            
            purchase_request.status = 'completed'
            purchase_request.save()
            
            # Notify via WebSocket
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "inventory_updates",
                {
                    "type": "inventory.update",
                    "item_id": item.id,
                    "item_name": item.name,
                    "new_stock": item.current_stock,
                }
            )
        
        return Response({
            'status': 'received', 
            'new_stock': item.current_stock
        })