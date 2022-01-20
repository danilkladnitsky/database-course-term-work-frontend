import { Card, Grid, Typography } from '@mui/material';
import { useContext } from 'react';

import '../../styles/Fraction.style.css';
import UnitList from './UnitList';
import UnitsStats from './UnitsStats';
import SauronContext from '../../context/SauronContext';
import { FractionTypes } from '../../common/FractionTypes';
import HeroesList from './HeroesList';
import FractionSelect from './FractionSelect';
import GppGoodIcon from '@mui/icons-material/GppGood';

function Fraction({ side }: { side: FractionTypes }) {
  const {
    troops: { myUnits, enemyUnits },
    heroes,
    selectedLocation,
    fractions,
  } = useContext(SauronContext);

  const fraction = fractions.find((fr) => fr.type === side);

  const renderUnits = () => {
    return side === FractionTypes.USER ? myUnits : enemyUnits;
  };

  const renderHeroes = () => {
    return side === FractionTypes.USER
      ? heroes?.userHeroes || null
      : heroes?.botHeroes || null;
  };

  const renderFort = () => {
    if (side !== FractionTypes.USER) {
      return;
    }

    return selectedLocation?.fort ? (
      <>
        {`(${selectedLocation.fort.name} / +${selectedLocation.fort.defenseScore}
        )`}
        <GppGoodIcon
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }}
        />
      </>
    ) : (
      ''
    );
  };

  return (
    <Grid className='wrapper' item xs>
      <Card className='fraction_name'>
        <Typography
          variant='inherit'
          component='div'
          fontWeight='bold'
          style={{ position: 'relative' }}>
          {fraction?.name} {renderFort()}
        </Typography>
        <FractionSelect fractionType={side} />
      </Card>
      <Grid style={{ maxHeight: '450px', overflowY: 'auto' }}>
        <UnitList units={renderUnits()} />
        {heroes && <HeroesList heroes={renderHeroes()} />}
      </Grid>

      <UnitsStats units={renderUnits()} heroes={renderHeroes()} side={side} />
    </Grid>
  );
}

export default Fraction;
