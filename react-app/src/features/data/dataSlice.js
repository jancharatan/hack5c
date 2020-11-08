/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseUrl } from '../../environment';

let dataController;
let dataPromise;

export const getData = createAsyncThunk('getData', async (selection) => {
  // Cancel the last data fetch.
  if (dataPromise) {
    dataController.abort();
  }
  dataController = new AbortController();

  // Fetch the data.
  dataPromise = fetch(`${getBaseUrl()}/data`, {
    headers: new Headers({
      'content-type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify({
      selection,
    }),
    signal: dataController.signal,
  });
  const result = await dataPromise;
  if (result.ok) {
    return result.json();
  }
  throw new Error('Fetching data failed.');
});

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    dataFetchInProgress: false,
    dataError: undefined,
    dataByFips: undefined,
  },
  reducers: {
    setDataFetchInProgress(state, { payload }) {
      state.dataFetchInProgress = payload;
    },
    setDataByFips(state, { payload }) {
      state.dataByFips = payload;
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.dataFetchInProgress = true;
      state.dataError = undefined;
    },
    [getData.fulfilled]: (state, { payload }) => {
      state.dataFetchInProgress = false;
      state.dataByFips = payload;
    },
    [getData.rejected]: (state) => {
      state.dataFetchInProgress = false;
      state.dataError = true;
    },
  },
});

export const { setDataFetchInProgress, setDataByFips } = dataSlice.actions;

export default dataSlice.reducer;
