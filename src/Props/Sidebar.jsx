import { Box, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Home, Settings, NetworkCheck } from '@mui/icons-material';

export default function SidebarProp() {
  const navItems = [
    { name: 'Home', icon: <Home /> },
    { name: 'Network', icon: <NetworkCheck /> },
    { name: 'Settings', icon: <Settings /> },
  ];

  return (
    <Box
      sx={{
        width: 80,
        height: '100vh',
        bgcolor: 'grey.900',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 2,
      }}
    >
      <List>
        {navItems.map((item, index) => (
          <Tooltip key={index} title={item.name} placement="right">
            <ListItem button sx={{ justifyContent: 'center' }}>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
}
