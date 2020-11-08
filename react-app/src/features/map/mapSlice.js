/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState: {
    date: '2020-11-05',
    mapType: true,
    casesNoDeaths: true,
    caption: undefined,
    title: undefined,
  },
  reducers: {
    setTitleAndCaption(state, { payload }) {
      const { title, caption } = payload;
      state.caption = caption;
      state.title = title;
    },
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

export const {
  toggleMapType,
  toggleCasesNoDeaths,
  setDate,
  setMapType,
  setCaseDeathType,
  setTitleAndCaption,
} = mapSlice.actions;

export default mapSlice.reducer;
