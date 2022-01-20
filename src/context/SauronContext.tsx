import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  getHeroes,
  getLocations,
  getUnits,
  saveHistory,
} from '../api/backendAPI';
import { Fractions } from '../common/Fractions';
import { FractionTypes } from '../common/FractionTypes';
import ICommonFraction from '../common/ICommonFraction';
import ICommonHero from '../common/ICommonHero';
import ICommonLocation from '../common/ICommonLocaton';
import ICommonUnit from '../common/ICommonUnit';

interface Heroes {
  userHeroes: ICommonHero[];
  botHeroes: ICommonHero[];
}

export interface Score {
  myScore: number;
  enemyScore: number;
}

const SauronContext = React.createContext<{
  troops: { myUnits: ICommonUnit[] | null; enemyUnits: ICommonUnit[] | null };
  heroes: Heroes | null;
  fractions: ICommonFraction[];
  locations: ICommonLocation[] | null;
  scores: Score;
  selectedLocation: ICommonLocation | null;
  showModal: boolean;
  actions: {
    handleUnitRemove: (id: number, fraction: Fractions) => void;
    handleUnitAdd: (id: number, fraction: Fractions) => void;
    randomizeUnits: () => void;
    toggleHero: (type: Fractions, id: number) => void;
    setSelectedLocation: (location: ICommonLocation | null) => void;
    setFractions: (fractions: ICommonFraction[]) => void;
    submitBattle: () => void;
    setScores: (score: Score) => void;
    setShowModal: (status: boolean) => void;
  };
}>({
  troops: { myUnits: [], enemyUnits: [] },
  heroes: { userHeroes: [], botHeroes: [] },
  locations: null,
  showModal: false,
  selectedLocation: null,
  scores: { myScore: 0, enemyScore: 0 },
  fractions: [],
  actions: {
    handleUnitRemove: () => {},
    handleUnitAdd: () => {},
    randomizeUnits: () => {},
    toggleHero: () => {},
    setSelectedLocation: () => {},
    setFractions: () => {},
    submitBattle: () => {},
    setScores: () => {},
    setShowModal: () => {},
  },
});

interface SauronContextProviderProps {
  children: React.ReactNode;
}

export function PopupContextProvider(
  props: SauronContextProviderProps
): React.ReactElement {
  const { children } = props;

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [myUnits, setMyUnits] = React.useState<ICommonUnit[] | null>(null);

  const [enemyUnits, setEnemyUnits] = React.useState<ICommonUnit[] | null>(
    null
  );

  const [heroes, setHeroes] = useState<Heroes | null>(null);

  const [locations, setLocations] = useState<ICommonLocation[] | null>(null);

  const [scores, setScores] = useState<Score>({ myScore: 0, enemyScore: 0 });

  const [showModal, setShowModal] = useState(false);

  const [fractions, setFractions] = React.useState<ICommonFraction[]>([
    {
      id: 0,
      name: Fractions.GONDOR,
      type: FractionTypes.USER,
    },
    {
      id: 1,
      name: Fractions.URUK_HAI,
      type: FractionTypes.BOT,
    },
  ]);

  const [selectedLocation, setSelectedLocation] =
    useState<ICommonLocation | null>(null);

  useEffect(() => {
    const userFraction = fractions[0].name;
    const botFraction = fractions[1].name;

    const renderUnits = async () => {
      const myUnits = await getUnits(userFraction);
      const botUnits = await getUnits(botFraction);

      setMyUnits(myUnits);
      setEnemyUnits(botUnits);
    };

    const renderHeroes = async () => {
      const userHeroes = await getHeroes(userFraction);
      const botHeroes = await getHeroes(botFraction);

      setHeroes({ userHeroes, botHeroes });
    };

    const renderLocation = async () => {
      const locations = await getLocations();
      setLocations(locations);
    };

    renderUnits();
    renderHeroes();
    renderLocation();
  }, [fractions]);

  /** Actions */
  const handleUnitRemove = (id: number, fraction: Fractions) => {
    const type = fractions.find((fr) => fr.name === fraction)?.type;

    const callback = (units: ICommonUnit[] | null) => {
      return units
        ? units.map((unit) =>
            unit.id === id
              ? { ...unit, count: unit.count > 0 ? unit.count - 1 : 0 }
              : unit
          )
        : units;
    };

    if (type === FractionTypes.USER) {
      setMyUnits(callback);
    }

    if (type === FractionTypes.BOT) {
      setEnemyUnits(callback);
    }
  };

  const handleUnitAdd = (id: number, fraction: Fractions) => {
    const type = fractions.find((fr) => fr.name === fraction)?.type;

    const callback = (units: ICommonUnit[] | null) => {
      return units
        ? units.map((unit) =>
            unit.id === id ? { ...unit, count: unit.count + 1 } : unit
          )
        : units;
    };

    if (type === FractionTypes.USER) {
      setMyUnits(callback);
    }

    if (type === FractionTypes.BOT) {
      setEnemyUnits(callback);
    }
  };

  const randomizeUnits = () => {
    setMyUnits((units) =>
      units
        ? units.map((unit) =>
            unit ? { ...unit, count: Math.ceil(Math.random() * 100) } : unit
          )
        : units
    );

    setEnemyUnits((units) =>
      units
        ? units.map((unit) =>
            unit ? { ...unit, count: Math.ceil(Math.random() * 100) } : unit
          )
        : units
    );

    enqueueSnackbar('Randomized!', { variant: 'success' });
  };

  const toggleHero = (fractionName: Fractions, id: number) => {
    const userFraction = fractions[0].name;

    setHeroes((heroes) =>
      fractionName === userFraction
        ? heroes
          ? {
              ...heroes,
              userHeroes: heroes.userHeroes.map((hero) =>
                hero.id === id ? { ...hero, disabled: !hero.disabled } : hero
              ),
            }
          : heroes
        : heroes
        ? {
            ...heroes,
            botHeroes: heroes.botHeroes.map((hero) =>
              hero.id === id ? { ...hero, disabled: !hero.disabled } : hero
            ),
          }
        : heroes
    );

    enqueueSnackbar(`Hero from ${fractionName} was toggled`, {
      variant: 'warning',
    });
  };

  const submitBattle = async () => {
    const userFraction = fractions[0];
    const botFraction = fractions[1];

    const army1 = {
      score: scores.myScore,
      fraction: userFraction,
      unitsCount:
        myUnits?.reduce((acc, unit) => acc + unit.count, 0) ||
        0 + (heroes?.userHeroes.filter((h) => !h.disabled)?.length || 0),
    };

    const army2 = {
      score: scores.enemyScore,
      fraction: botFraction,
      unitsCount:
        enemyUnits?.reduce((acc, unit) => acc + unit.count, 0) ||
        0 + (heroes?.botHeroes.filter((h) => !h.disabled)?.length || 0),
    };

    const result = {
      army1,
      army2,
      location: selectedLocation,
    };

    await saveHistory(result);

    setShowModal(true);
  };

  return (
    <SauronContext.Provider
      value={{
        troops: { myUnits, enemyUnits },
        heroes,
        fractions,
        locations,
        selectedLocation,
        scores,
        showModal,
        actions: {
          handleUnitRemove,
          handleUnitAdd,
          randomizeUnits,
          toggleHero,
          setSelectedLocation,
          setFractions,
          submitBattle,
          setScores,
          setShowModal,
        },
      }}>
      {children}
    </SauronContext.Provider>
  );
}

export default SauronContext;
