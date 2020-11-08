// eslint-disable-next-line import/no-commonjs
require('dotenv').config();

export const getBaseUrl = () => process.env.REACT_APP_BASE_URL ?? 'https://covid-dash-api2.azurewebsites.net';

export const getFrontendBaseUrl = () => process.env.REACT_APP_FRONTEND_BASE_URL ?? 'http://localhost:3000';

export const START_DAY = '2020-11-05';

export const CASE_COLORS = ['#bbc94d', '#ff0000'];
export const DEATH_COLORS = ['#bbc94d', '#000000'];
