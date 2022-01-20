import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';
import '../styles/Versus.style.css';

function Versus() {
  return (
    <Grid container spacing={4} justifyContent='center' className='versus'>
      <Grid item>
        <Avatar sx={{ width: 56, height: 56 }} />
      </Grid>
      <Grid item>
        <Typography variant='h6' className='versus_phrase'>
          Versus
        </Typography>
      </Grid>
      <Grid item>
        <Avatar sx={{ width: 56, height: 56 }} />
      </Grid>
    </Grid>
  );
}

export default Versus;
