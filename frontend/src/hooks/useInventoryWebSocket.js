// frontend/src/hooks/useInventoryWebSocket.js

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const useInventoryWebSocket = () => {
  const queryClient = useQueryClient()
  
  useEffect(() => {
    let socket
    try {
      socket = new WebSocket('ws://localhost:8000/ws/inventory/')
      
      socket.onopen = () => {
        console.log('WebSocket connected')
      }
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('WebSocket message received:', data)
        queryClient.setQueryData(['item', data.item_id], (oldData) => ({
          ...oldData,
          current_stock: data.new_stock
        }))
        queryClient.invalidateQueries({ queryKey: ['items'] })
      }
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
      
      socket.onclose = () => {
        console.log('WebSocket disconnected')
      }
    } catch (error) {
      console.error('WebSocket initialization error:', error)
    }
    
    return () => {
      if (socket) {
        socket.close()
      }
    }
  }, [queryClient])
}