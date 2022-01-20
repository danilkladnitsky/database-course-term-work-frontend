import axios from 'axios';
import { Fractions } from '../common/Fractions';
import ICommonResult from '../common/ICommonResult';

export const API_URL = 'http://127.0.0.1:4040/';

export const getUnits = async (fractionName: Fractions) => {
  return await (
    await axios.get(`${API_URL}units/getByFraction/${fractionName}/`)
  ).data;
};

export const getHeroes = async (fractionName: Fractions) => {
  return await (
    await axios.get(`${API_URL}heroes/getByFraction/${fractionName}/`)
  ).data;
};

export const getLocations = async () => {
  return await (
    await axios.get(`${API_URL}locations/`)
  ).data;
};

export const saveHistory = async (data: ICommonResult) => {
  return await (
    await axios.post(`${API_URL}history/save`, { data })
  ).data;
};
