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
import { useSuppliers, useCreateSupplier, useUpdateSupplier, useDeleteSupplier } from '../hooks/useProcurement'

const Suppliers = () => {
  const { data: suppliers, isLoading } = useSuppliers()
  const createSupplier = useCreateSupplier()
  const updateSupplier = useUpdateSupplier()
  const deleteSupplier = useDeleteSupplier()
  
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentSupplier, setCurrentSupplier] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: ''
  })
  
  const handleOpen = (supplier = null) => {
    if (supplier) {
      setCurrentSupplier(supplier)
      setEditMode(true)
    } else {
      setCurrentSupplier({
        name: '',
        contact_person: '',
        email: '',
        phone: ''
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
    setCurrentSupplier(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = () => {
    if (editMode) {
      updateSupplier.mutate({ id: currentSupplier.id, data: currentSupplier })
    } else {
      createSupplier.mutate(currentSupplier)
    }
    handleClose()
  }
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      deleteSupplier.mutate(id)
    }
  }
  
  if (isLoading) return <Typography>Loading...</Typography>
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Suppliers</Typography>
        <Button variant="contained" onClick={() => handleOpen()}>Add Supplier</Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers?.map(supplier => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact_person}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(supplier)}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(supplier.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={currentSupplier.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="contact_person"
            label="Contact Person"
            fullWidth
            value={currentSupplier.contact_person}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentSupplier.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={currentSupplier.phone}
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

export default Suppliers