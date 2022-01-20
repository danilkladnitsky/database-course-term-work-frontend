import { Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import SauronContext from '../context/SauronContext';

import { useSnackbar } from 'notistack';

function RandomizeButton() {
  const {
    actions: { randomizeUnits },
  } = useContext(SauronContext);

  return (
    <Grid alignItems='center' justifyContent='center' container item>
      <Button variant='contained' onClick={randomizeUnits}>
        Randomize
        <img
          height='32px'
          style={{ position: 'relative', left: '7px' }}
          src='https://media.baamboozle.com/uploads/images/90021/1622492468_56762_gif-url.gif'
        />
      </Button>
    </Grid>
  );
}

export default RandomizeButton;
