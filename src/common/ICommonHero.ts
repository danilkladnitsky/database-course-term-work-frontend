import { Fractions } from './Fractions';
import ICommonAbility from './ICommonAbility';
import ICommonArtifact from './ICommonArtifact';
import ICommonFraction from './ICommonFraction';

export default interface ICommonHero {
  id: number;
  name: string;
  power: number;
  fraction: ICommonFraction;
  ability: ICommonAbility;
  artifact: ICommonArtifact;
  thumbnail: string;
  disabled: boolean;
}
