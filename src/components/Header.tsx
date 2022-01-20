import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LocationSelect from './FractionColumn/LocationSelect';

export default function HeaderMenu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}></IconButton>
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            Sauron Eye{' '}
          </Typography>

          <LocationSelect />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
