// eslint-disable-next-line import/no-commonjs
require('dotenv').config();

export const getBaseUrl = () => process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000';

export const getFrontendBaseUrl = () => process.env.REACT_APP_FRONTEND_BASE_URL ?? 'http://localhost:3000';
