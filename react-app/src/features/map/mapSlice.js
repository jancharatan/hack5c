/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState: {
    date: '2020-11-05',
    mapType: true,
    selectedUsState: undefined,
    selectedCountyFips: undefined,
    casesNoDeaths: true,
  },
  reducers: {
    setSelectedUsState(state, { payload }) {
      state.selectedUsState = payload;
    },
    setSelectedCountyFips(state, { payload }) {
      state.selectedCountyFips = payload;
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

export const {
  setSelectedUsState,
  setSelectedCountyFips,
  toggleMapType,
  toggleCasesNoDeaths,
  setDate,
} = mapSlice.actions;

export default mapSlice.reducer;
