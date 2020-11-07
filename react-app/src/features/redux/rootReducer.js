import { combineReducers } from '@reduxjs/toolkit';
import mapSlice from '../map/mapSlice';

const rootReducer = combineReducers({
  mapSlice,
});

export default rootReducer;
