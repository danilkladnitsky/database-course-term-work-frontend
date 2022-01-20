import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Fractions } from '../../common/Fractions';
import SauronContext from '../../context/SauronContext';
import { FractionTypes } from '../../common/FractionTypes';
import ICommonFraction from '../../common/ICommonFraction';

export default function FractionSelect({
  fractionType,
}: {
  fractionType: FractionTypes;
}) {
  const {
    actions: { setFractions },
    fractions,
  } = React.useContext(SauronContext);

  const [fraction, setFraction] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const fractionName = event.target.value as Fractions;

    let update = [];

    if (fractionType === FractionTypes.USER) {
      update = [
        {
          id: 0,
          name: fractionName,
          type: fractionType,
        },
        {
          id: fractions[1].id,
          name: fractions[1].name,
          type: fractions[1].type,
        },
      ];
    } else {
      update = [
        {
          id: fractions[0].id,
          name: fractions[0].name,
          type: fractions[0].type,
        },
        {
          id: 1,
          name: fractionName,
          type: fractionType,
        },
      ];
    }

    setFraction(event.target.value as string);
    setFractions(update);
  };

  return (
    <Box sx={{ minWidth: 120, margin: '12px' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Fraction</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={fraction}
          label='Fraction'
          onChange={handleChange}>
          {Object.values(Fractions).map((fr) => (
            <MenuItem value={fr}>{fr}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
