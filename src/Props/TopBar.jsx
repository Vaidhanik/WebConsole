import { AppBar, Toolbar, InputBase, IconButton, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';

export default function TopBarProps() {
  return (
    <AppBar className='flex ' position="static" sx={{ bgcolor: 'grey.800', boxShadow:'initial' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
        <InputBase
          placeholder="Search…"
          sx={{
            bgcolor: 'grey.700',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            color: 'white',
            width: '30%',
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
