// eslint-disable-next-line import/prefer-default-export
export const getMaximums = (fipsData) => {
  let maxCases = 0;
  let maxDeaths = 0;
  Object.values(fipsData).forEach(([cases, deaths]) => {
    maxCases = Math.max(maxCases, cases);
    maxDeaths = Math.max(maxDeaths, deaths);
  });

  // Actually, just hard-code it so it's the same across everything.
  maxCases = 0.07;
  maxDeaths = 0.002;

  return [maxCases, maxDeaths];
};
