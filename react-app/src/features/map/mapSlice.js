/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState: {
    mapType: true,
    selectedUsState: undefined,
    selectedCountyFips: undefined,
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
  },
});

export const { setSelectedUsState, setSelectedCountyFips, toggleMapType } = mapSlice.actions;

export default mapSlice.reducer;
