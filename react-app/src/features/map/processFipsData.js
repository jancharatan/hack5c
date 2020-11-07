// eslint-disable-next-line import/prefer-default-export
export const getMaximums = (fipsData) => {
  let maxCases = 0;
  let maxDeaths = 0;
  Object.values(fipsData).forEach(([cases, deaths]) => {
    maxCases = Math.max(maxCases, cases);
    maxDeaths = Math.max(maxDeaths, deaths);
  });
  return [maxCases, maxDeaths];
};
