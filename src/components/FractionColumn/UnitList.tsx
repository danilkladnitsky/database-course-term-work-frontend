import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { DeleteForever } from '@material-ui/icons';
import UnitItem from './UnitItem';
import ICommonUnit from '../../common/ICommonUnit';
import { Card, Typography } from '@mui/material';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function UnitList({ units }: { units: ICommonUnit[] | null }) {
  return (
    <Card>
      <Typography
        variant='inherit'
        component='div'
        sx={{ padding: '5px 20px', textAlign: 'center' }}>
        units
      </Typography>
      <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Demo>
              <List dense={true}>
                {units?.map((unit) => (
                  <UnitItem key={unit.id} unit={unit} />
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
