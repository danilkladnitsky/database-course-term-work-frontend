import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useContext } from 'react';
import ICommonUnit from '../../common/ICommonUnit';
import SauronContext from '../../context/SauronContext';
import { height } from '@mui/system';

function UnitItem({ unit }: { unit: ICommonUnit }) {
  const {
    actions: { handleUnitRemove, handleUnitAdd },
  } = useContext(SauronContext);

  const removeUnit = () => {
    handleUnitRemove(unit.id, (unit as any).fraction.name);
  };

  const addUnit = () => {
    handleUnitAdd(unit.id, (unit as any).fraction.name);
  };

  return (
    <ListItem
      secondaryAction={
        <Grid>
          <IconButton edge='end' aria-label='remove' onClick={removeUnit}>
            <RemoveIcon />
          </IconButton>
          <IconButton edge='end' aria-label='add' onClick={addUnit}>
            <AddIcon />
          </IconButton>
        </Grid>
      }>
      <ListItemAvatar>
        <Avatar
          style={{ opacity: unit.count > 0 ? '1' : '0.3' }}
          sx={{ height: '55px', width: '55px' }}
          src={unit.thumbnail || ''}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${unit.name} x ${unit.count}`}
        secondary={`Strength: ${unit.power}`}
        style={{ paddingLeft: '15px', marginBottom: '15px' }}
      />
    </ListItem>
  );
}

export default UnitItem;
