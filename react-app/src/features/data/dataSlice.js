/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBaseUrl } from '../../environment';

let dataController;
let dataPromise;

export const getData = createAsyncThunk('getData', async (fips, date, aggregate) => {
  // Cancel the last data fetch.
  if (dataPromise) {
    dataController.abort();
  }
  dataController = new AbortController();

  // Fetch the data.
  dataPromise = fetch(`${getBaseUrl()}/get-data`, {
    headers: new Headers({
      'content-type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify({
      fips,
      date,
      aggregate,
    }),
    signal: dataController.signal,
  });
  const result = await dataPromise;
  if (result.ok) {
    return result.json();
  }
  throw new Error('Fetching data failed.');
});

let filterController;
let filterPromise;

export const getMatchingFips = createAsyncThunk('getMatchingFips', async (filters, type) => {
  // Cancel the last call.
  if (filterPromise) {
    filterController.abort();
  }
  filterController = new AbortController();

  // Fetch the matching FIPS codes.
  filterPromise = fetch(`${getBaseUrl()}/get-matching-fips`, {
    headers: new Headers({
      'content-type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify({
      filters,
      type,
    }),
    signal: filterController.signal,
  });
  const result = await filterPromise;
  if (result.ok) {
    return result.json();
  }
  throw new Error('Getting matching FIPS failed.');
});

const dataSlice = createSlice({
  name: 'dataSlice',
  initialState: {
    // Data
    dataFetchInProgress: false,
    dataError: undefined,
    dataByFips: undefined,

    // Matching FIPS
    matchingFipsInProgress: false,
    matchingFips: undefined,
    matchingFipsError: undefined,
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
    [getMatchingFips.pending]: (state) => {
      state.matchingFipsInProgress = true;
      state.matchingFipsError = undefined;
    },
    [getMatchingFips.fulfilled]: (state, { payload }) => {
      state.matchingFipsInProgress = false;
      state.matchingFips = payload;
    },
    [getMatchingFips.rejected]: (state) => {
      state.matchingFipsInProgress = false;
      state.matchingFipsError = true;
    },
  },
});

export default dataSlice.reducer;
