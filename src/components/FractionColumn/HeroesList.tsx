import {
  CheckCircleOutline,
  CheckCircleOutlined,
  HelpRounded,
} from '@material-ui/icons';
import { CheckCircleRounded, CheckroomTwoTone } from '@mui/icons-material';
import {
  Avatar,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import ICommonHero from '../../common/ICommonHero';
import HeroItem from './HeroItem';

function HeroesList({ heroes }: { heroes: ICommonHero[] | null }) {
  return (
    <Card>
      <Typography
        variant='inherit'
        component='div'
        sx={{ padding: '5px 20px', textAlign: 'center' }}>
        hero
      </Typography>
      <Box>
        {heroes?.map((hero) => (
          <HeroItem hero={hero} />
        ))}
      </Box>
    </Card>
  );
}

export default HeroesList;
