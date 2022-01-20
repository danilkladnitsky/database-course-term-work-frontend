import { Fractions } from './Fractions';
import ICommonFraction from './ICommonFraction';
import ICommonHero from './ICommonHero';
import ICommonUnit from './ICommonUnit';

export default interface ICommonArmy {
  unitsCount: number;
  fraction: ICommonFraction;
}
