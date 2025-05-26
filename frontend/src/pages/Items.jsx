// frontend/src/pages/Items.jsx

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
  TextField
} from '@mui/material'
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '../hooks/useProcurement'

const Items = () => {
  const { data: items, isLoading } = useItems()
  const createItem = useCreateItem()
  const updateItem = useUpdateItem()
  const deleteItem = useDeleteItem()
  
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    name: '',
    description: '',
    current_stock: 0,
    minimum_stock: 0
  })
  
  const handleOpen = (item = null) => {
    if (item) {
      setCurrentItem(item)
      setEditMode(true)
    } else {
      setCurrentItem({
        name: '',
        description: '',
        current_stock: 0,
        minimum_stock: 0
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
    setCurrentItem(prev => ({
      ...prev,
      [name]: name === 'current_stock' || name === 'minimum_stock' ? parseInt(value) : value
    }))
  }
  
  const handleSubmit = () => {
    if (editMode) {
      updateItem.mutate({ id: currentItem.id, data: currentItem })
    } else {
      createItem.mutate(currentItem)
    }
    handleClose()
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteItem.mutate(id)
    }
  }
  
  if (isLoading) return <Typography>Loading...</Typography>
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Inventory Items</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add Item</Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Minimum Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.current_stock}</TableCell>
                <TableCell>{item.minimum_stock}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(item)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={currentItem.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={currentItem.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="current_stock"
            label="Current Stock"
            type="number"
            fullWidth
            value={currentItem.current_stock}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="minimum_stock"
            label="Minimum Stock"
            type="number"
            fullWidth
            value={currentItem.minimum_stock}
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

export default Items