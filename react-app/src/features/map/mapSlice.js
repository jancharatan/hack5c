/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const editorSlice = createSlice({
  name: 'mapSlice',
  initialState: {
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
  },
});

export const { setSelectedUsState, setSelectedCountyFips } = editorSlice.actions;

export default editorSlice.reducer;
