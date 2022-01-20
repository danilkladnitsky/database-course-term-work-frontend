import ICommonArmy from './ICommonArmy';
import ICommonLocation from './ICommonLocaton';

export default interface ICommonResult {
  army1: ICommonArmy | null;
  army2: ICommonArmy | null;
  location: ICommonLocation | null;
}
