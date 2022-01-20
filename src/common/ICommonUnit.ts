import { Fractions } from './Fractions';

export default interface ICommonUnit {
  id: number;
  name: string;
  power: number;
  fraction: Fractions;
  count: number;
  thumbnail: string;
}
