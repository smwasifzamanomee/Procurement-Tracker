// frontend/src/components/NavBar.jsx

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const NavBar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/items">
          <ListItemIcon><InventoryIcon /></ListItemIcon>
          <ListItemText primary="Inventory" />
        </ListItem>
        <ListItem component={Link} to="/suppliers">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Suppliers" />
        </ListItem>
        <ListItem component={Link} to="/purchase-requests">
          <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
          <ListItemText primary="Purchase Requests" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default NavBar