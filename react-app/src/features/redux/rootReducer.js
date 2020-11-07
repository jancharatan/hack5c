import { combineReducers } from '@reduxjs/toolkit';
import mapSlice from '../map/mapSlice';
import dataSlice from '../data/dataSlice';

const rootReducer = combineReducers({
  mapSlice,
  dataSlice,
});

export default rootReducer;
