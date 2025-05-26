// frontend/src/pages/Dashboard.jsx

import { Box, Typography, Paper, Grid } from '@mui/material'
import { useItems, usePurchaseRequests } from '../hooks/useProcurement'

const Dashboard = () => {
  const { data: itemsData, isLoading: itemsLoading } = useItems()
  const { data: purchaseRequestsData, isLoading: requestsLoading } = usePurchaseRequests()
  
  // Correct data access - DRF typically returns arrays directly
  const items = Array.isArray(itemsData) ? itemsData : []
  const purchaseRequests = Array.isArray(purchaseRequestsData) ? purchaseRequestsData : []
  
  const lowStockItems = items.filter(item => item.current_stock < item.minimum_stock)
  const pendingRequests = purchaseRequests.filter(req => req.status === 'pending')

  if (itemsLoading || requestsLoading) {
    return <Typography>Loading dashboard data...</Typography>
  }
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Low Stock Items</Typography>
            {lowStockItems.length > 0 ? (
              <ul>
                {lowStockItems.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.current_stock} / {item.minimum_stock}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No low stock items</Typography>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Pending Purchase Requests</Typography>
            {pendingRequests.length > 0 ? (
              <ul>
                {pendingRequests.map(req => (
                  <li key={req.id}>
                    {req.item?.name || 'Unknown Item'} - {req.quantity} units
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No pending requests</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard