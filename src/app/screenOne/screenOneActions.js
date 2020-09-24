import { LOCATIONS_DATA } from './screenOneTypes';

export const getLocationDataAction = (data) => {
  return {
    type: LOCATIONS_DATA,
    payload: [...data],
  }
};