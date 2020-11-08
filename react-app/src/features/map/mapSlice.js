/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState: {
    date: '2020-11-05',
    mapType: true,
    casesNoDeaths: true,
  },
  reducers: {
    setMapType(state, { payload }) {
      state.mapType = payload;
    },
    setCaseDeathType(state, { payload }) {
      state.casesNoDeaths = payload;
    },
    toggleMapType(state) {
      state.mapType = !state.mapType;
    },
    toggleCasesNoDeaths(state) {
      state.casesNoDeaths = !state.casesNoDeaths;
    },
    setDate(state, { payload }) {
      state.date = payload;
    },
  },
});

export const { toggleMapType, toggleCasesNoDeaths, setDate, setMapType, setCaseDeathType } = mapSlice.actions;

export default mapSlice.reducer;
