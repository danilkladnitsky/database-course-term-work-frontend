import { Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import SauronContext from '../context/SauronContext';

function StartButton() {
  const {
    actions: { submitBattle },
  } = useContext(SauronContext);
  return (
    <Grid alignItems='center' justifyContent='center' container item>
      <Button variant='contained' onClick={submitBattle}>
        Start battle!
        <img
          height='32px'
          style={{ position: 'relative', left: '7px' }}
          src='https://thumbs.gfycat.com/AptUnkemptBernesemountaindog-max-1mb.gif'
        />
      </Button>
    </Grid>
  );
}

export default StartButton;
