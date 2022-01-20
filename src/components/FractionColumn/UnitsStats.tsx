import { Card } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { FractionTypes } from '../../common/FractionTypes';
import ICommonHero from '../../common/ICommonHero';
import ICommonUnit from '../../common/ICommonUnit';
import SauronContext, { Score } from '../../context/SauronContext';

function UnitsStats({
  units,
  heroes,
  side,
}: {
  units?: ICommonUnit[] | null;
  heroes?: ICommonHero[] | null;
  side?: FractionTypes;
}) {
  const {
    actions: { setScores },
    selectedLocation,
    scores,
  } = useContext(SauronContext);

  const calculateStats = () => {
    const unitsPower =
      units?.reduce((acc, curr) => acc + curr.power * curr.count, 0) || 0;

    const heroesUnits = heroes?.filter((hero) => !hero.disabled);
    const heroesPower =
      heroesUnits?.reduce((acc, curr) => acc + curr.power, 0) || 0;

    const heroesAbility =
      heroesUnits?.reduce((acc, curr) => acc + curr.ability?.power, 0) || 0;

    const heroesArtifact =
      heroesUnits?.reduce((acc, curr) => acc + curr.artifact?.power, 0) || 0;

    const defense =
      (side === FractionTypes.USER
        ? selectedLocation?.fort?.defenseScore
        : 0) || 0;

    return (
      unitsPower +
      heroesPower +
      heroesAbility +
      heroesArtifact +
      (defense ? defense + unitsPower : 0)
    );
  };

  const calculateUnitsCount = () => {
    return (
      (units?.reduce((acc, curr) => acc + curr.count, 0) || 0) +
      (heroes?.filter((h) => !h.disabled).reduce((acc) => acc + 1, 0) || 0)
    );
  };

  const updateScore = () => {
    const update =
      side === FractionTypes.USER
        ? { myScore: calculateStats(), enemyScore: scores.enemyScore }
        : { enemyScore: calculateStats(), myScore: scores.myScore };

    setScores(update);
  };

  useEffect(() => {
    updateScore();
  }, [heroes, units, side]);

  return (
    <Card className='stat'>
      {`power: ${calculateStats()}`} / {`count: ${calculateUnitsCount()}`}
    </Card>
  );
}

export default UnitsStats;
