// eslint-disable-next-line import/no-commonjs
require('dotenv').config();

// eslint-disable-next-line import/prefer-default-export
export const getBaseUrl = () => process.env.REACT_APP_BASE_URL ?? 'http://localhost:5000';
