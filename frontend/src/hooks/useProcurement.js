// frontend/src/hooks/useProcurement.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api'

// Suppliers
export const useSuppliers = () => useQuery({
  queryKey: ['suppliers'],
  queryFn: api.getSuppliers
})

export const useSupplier = (id) => useQuery({
  queryKey: ['supplier', id],
  queryFn: () => api.getSupplier(id)
})

export const useCreateSupplier = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })
}

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.updateSupplier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })
}

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    }
  })
}

// Items
export const useItems = () => useQuery({
  queryKey: ['items'],
  queryFn: api.getItems
})

export const useItem = (id) => useQuery({
  queryKey: ['item', id],
  queryFn: () => api.getItem(id)
})

export const useCreateItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    }
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    }
  })
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    }
  })
}

// Purchase Requests
export const usePurchaseRequests = () => useQuery({
  queryKey: ['purchase-requests'],
  queryFn: api.getPurchaseRequests
})

export const usePurchaseRequest = (id) => useQuery({
  queryKey: ['purchase-request', id],
  queryFn: () => api.getPurchaseRequest(id)
})

export const useCreatePurchaseRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.createPurchaseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-requests'] })
    },
    onError: (error) => {
      console.error('Purchase request failed:', error)
      // Add your error notification here
    }
  })
}

export const useUpdatePurchaseRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => api.updatePurchaseRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-requests'] })
    }
  })
}

export const useDeletePurchaseRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.deletePurchaseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-requests'] })
    }
  })
}

export const useReceivePurchaseRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.receivePurchaseRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-requests'] })
      queryClient.invalidateQueries({ queryKey: ['items'] })
    }
  })
}