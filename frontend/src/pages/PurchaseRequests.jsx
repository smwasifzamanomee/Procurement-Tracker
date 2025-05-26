// frontend/src/pages/PurchaseRequests.jsx

import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import {
  usePurchaseRequests,
  useCreatePurchaseRequest,
  useUpdatePurchaseRequest,
  useDeletePurchaseRequest,
  useReceivePurchaseRequest,
  useItems,
  useSuppliers
} from '../hooks/useProcurement'

const PurchaseRequests = () => {
  const { data: purchaseRequests, isLoading } = usePurchaseRequests()
  const { data: items } = useItems()
  const { data: suppliers } = useSuppliers()
  const createPurchaseRequest = useCreatePurchaseRequest()
  const updatePurchaseRequest = useUpdatePurchaseRequest()
  const deletePurchaseRequest = useDeletePurchaseRequest()
  const receivePurchaseRequest = useReceivePurchaseRequest()

  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentRequest, setCurrentRequest] = useState({
    item: '',
    quantity: 1,
    supplier: '',
    status: 'pending',
    expected_delivery_date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const handleOpen = (request = null) => {
    if (request) {
      setCurrentRequest({
        ...request,
        item: request.item.id,
        supplier: request.supplier.id
      })
      setEditMode(true)
    } else {
      setCurrentRequest({
        item: '',
        quantity: 1,
        supplier: '',
        status: 'pending',
        expected_delivery_date: new Date().toISOString().split('T')[0],
        notes: ''
      })
      setEditMode(false)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentRequest(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    const requestData = {
      item: currentRequest.item,
      quantity: parseInt(currentRequest.quantity),
      supplier: currentRequest.supplier,
      status: currentRequest.status,
      expected_delivery_date: currentRequest.expected_delivery_date,
      notes: currentRequest.notes
    }

    if (editMode) {
      updatePurchaseRequest.mutate({
        id: currentRequest.id,
        data: requestData
      })
    } else {
      createPurchaseRequest.mutate(requestData)
    }
    handleClose()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      deletePurchaseRequest.mutate(id)
    }
  }

  const handleReceive = (id) => {
    if (window.confirm('Mark this request as received and update inventory?')) {
      receivePurchaseRequest.mutate(id)
    }
  }

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Purchase Requests</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>New Request</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expected Delivery</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseRequests?.map(request => (
              <TableRow key={request.id}>
                <TableCell>{request.item.name}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.supplier.name}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.expected_delivery_date}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(request)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(request.id)}>Delete</Button>
                  {request.status === 'approved' && (
                    <Button color="success" onClick={() => handleReceive(request.id)}>Receive</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editMode ? 'Edit Purchase Request' : 'New Purchase Request'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Item</InputLabel>
            <Select
              name="item"
              value={currentRequest.item}
              onChange={handleChange}
              label="Item"
            >
              {items?.map(item => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            name="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={currentRequest.quantity}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Supplier</InputLabel>
            <Select
              name="supplier"
              value={currentRequest.supplier}
              onChange={handleChange}
              label="Supplier"
            >
              {suppliers?.map(supplier => (
                <MenuItem key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={currentRequest.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            name="expected_delivery_date"
            label="Expected Delivery Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={currentRequest.expected_delivery_date}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            name="notes"
            label="Notes"
            fullWidth
            multiline
            rows={4}
            value={currentRequest.notes}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{editMode ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PurchaseRequests