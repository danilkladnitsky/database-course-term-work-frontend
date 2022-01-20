import { Card, Grid } from '@mui/material';
import React from 'react';
import Fraction from '../components/FractionColumn/Fraction';
import HeaderMenu from '../components/Header';

import '../App.css';
import StartButton from '../components/StartButton';
import { FractionTypes } from '../common/FractionTypes';
import Versus from '../components/Versus';
import RandomizeButton from '../components/RandomizeButton';
import LocationSelect from '../components/FractionColumn/LocationSelect';
import ResultModal from '../components/Results';

function Main() {

  
  return (
    <Grid justifyContent='center' alignItems='center'>
      <HeaderMenu />
      <Grid container spacing={2} className='main'>
        <Fraction side={FractionTypes.USER} />
        <Fraction side={FractionTypes.BOT} />
      </Grid>
      <Grid container justifyContent='center' spacing={4}>
        <Grid item>
          <RandomizeButton />
        </Grid>
        <Grid item>
          <StartButton />
        </Grid>
      </Grid>

      <ResultModal />
    </Grid>
  );
}

export default Main;
