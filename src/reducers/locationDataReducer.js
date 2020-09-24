import { LOCATIONS_DATA } from '../app/screenOne/screenOneTypes';

export const locationsData = (state = [], action) => {
  switch (action.type) {
    case LOCATIONS_DATA:
      return action.payload;
    default:
      return state;
  }
};