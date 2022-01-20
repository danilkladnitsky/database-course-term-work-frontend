import { CheckBoxOutlineBlank, CheckCircleOutlined } from '@material-ui/icons';
import {
  Avatar,
  formLabelClasses,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useContext, useState } from 'react';
import ICommonHero from '../../common/ICommonHero';
import SauronContext from '../../context/SauronContext';

function HeroItem({ hero }: { hero: ICommonHero }) {
  const [enable, setEnable] = useState(true);
  const {
    actions: { toggleHero },
  } = useContext(SauronContext);

  const renderArtifact = () => {
    if (hero.artifact) {
      return `Artifact: ${hero.artifact.name} / ${hero.artifact.power}`;
    } else {
      return `No artifact`;
    }
  };

  const renderAbility = () => {
    if (hero.ability) {
      return `(Ability: ${hero.ability.name} / ${hero.ability.power})`;
    } else {
      return `(No ability)`;
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Grid item>
          <ToggleButton
            value='check'
            selected={enable}
            onChange={() => setEnable(!enable)}
            onClick={() => toggleHero(hero.fraction.name, hero.id)}>
            {enable ? 'Disable' : 'Enable'}
          </ToggleButton>
        </Grid>
      }>
      <ListItemAvatar>
        <Avatar
          style={{
            opacity: enable ? '1' : '0.3',
            border: '2px solid #FFD700',
            boxSizing: 'border-box',
          }}
          sx={{ height: '55px', width: '55px' }}
          src={hero.thumbnail}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${hero.name}`}
        secondary={`${renderArtifact()} ${renderAbility()}`}
        style={{ paddingLeft: '15px' }}
      />
    </ListItem>
  );
}

export default HeroItem;
