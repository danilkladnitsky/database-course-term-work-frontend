import ICommonFort from '../components/FractionColumn/ICommonFort';

export default interface ICommonLocation {
  id: number;
  name: string;
  thumbnail: string;
  fort?: ICommonFort;
}
