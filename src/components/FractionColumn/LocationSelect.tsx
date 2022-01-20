import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Fractions } from '../../common/Fractions';
import SauronContext from '../../context/SauronContext';
import { Grid } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function LocationSelect() {
  const {
    locations,
    actions: { setSelectedLocation },
  } = React.useContext(SauronContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [location, setLocation] = React.useState('');

  React.useEffect(() => {
    if (locations) {
      setLocation(locations[0].name);
      setSelectedLocation(locations[0]);
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.value as string;
    const location = locations?.find((location) => location.name === name);

    setLocation(name);

    if (location) {
      setSelectedLocation(location);
    }

    enqueueSnackbar(`Location was changed to ${name}`, {
      variant: 'info',
    });
  };

  return (
    <Box
      sx={{ minWidth: 120, margin: '12px', marginTop: '18px' }}
      className='select_location'
      color='#fff'>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Locations</InputLabel>
        <Select value={location} label='Fraction' onChange={handleChange}>
          {locations?.map((l) => (
            <MenuItem value={l.name} key={l.id}>
              {l.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
