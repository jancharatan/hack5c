import React from 'react';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { getMaximums } from './processFipsData';
import { CASE_COLORS, DEATH_COLORS } from '../../environment';

const MapKey = () => {
  const fipsData = useSelector((state) => state.dataSlice.dataByFips);
  const selectedMapType = useSelector((state) => state.mapSlice.casesNoDeaths);
  if (!fipsData) {
    return <div className="ml-5" />;
  }
  const [maxCases, maxDeaths] = getMaximums(fipsData);
  const colorScaleCases = scaleLinear().domain([0, maxCases]).range(CASE_COLORS);
  const colorScaleDeaths = scaleLinear().domain([0, maxDeaths]).range(DEATH_COLORS);

  const colorFunction = selectedMapType ? colorScaleCases : colorScaleDeaths;
  const maxValue = selectedMapType ? maxCases : maxDeaths;
  const text = selectedMapType ? 'Cases (per 100,000)' : 'Deaths (per 100,000)';

  const numGradations = 5;
  const content = [];
  for (let i = 0; i < numGradations; i += 1) {
    const value = i * (maxValue / (numGradations - 1));
    content.push(
      <>
        <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorFunction(value) }} />
        <div>{Math.round(value * 10000000) / 100}</div>
      </>
    );
  }

  return (
    <div className="mx-5 px-2 border rounded" style={{ backgroundColor: 'white' }}>
      <div className="d-flex flex-row" style={{ fontWeight: 'light' }}>
        <div style={{ fontWeight: 'bold' }}>{text}</div>
        {content}
      </div>
    </div>
  );
};

export default MapKey;
