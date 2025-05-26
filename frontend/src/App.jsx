// frontend/src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import Suppliers from './pages/Suppliers'
import Items from './pages/Items'
import PurchaseRequests from './pages/PurchaseRequests'
import { useInventoryWebSocket } from './hooks/useInventoryWebSocket'

function App() {
  useInventoryWebSocket()
  
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/items" element={<Items />} />
            <Route path="/purchase-requests" element={<PurchaseRequests />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App