import json
from channels.generic.websocket import AsyncWebsocketConsumer

class InventoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add(
            "inventory_updates",
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "inventory_updates",
            self.channel_name
        )

    async def inventory_update(self, event):
        print("Sending inventory update:", event)  # Debug log
        await self.send(text_data=json.dumps({
            "item_id": event["item_id"],
            "item_name": event["item_name"],
            "new_stock": event["new_stock"],
        }))