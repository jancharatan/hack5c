import React from 'react';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3-scale';
import { getMaximums } from './processFipsData';

const MapKey = () => {
  const fipsData = useSelector((state) => state.dataSlice.dataByFips);
  const selectedMapType = useSelector((state) => state.mapSlice.casesNoDeaths);
  if (!fipsData) {
    return <div>No data was sent from the server!</div>;
  }
  const [maxCases, maxDeaths] = getMaximums(fipsData);
  const colorScaleCases = scaleLinear().domain([0, maxCases]).range(['#ffedea', '#ff5233']);
  const colorScaleDeaths = scaleLinear().domain([0, maxDeaths]).range(['#BFBFFF', '#0000FF']);

  const colorFunction = selectedMapType ? colorScaleCases : colorScaleDeaths;
  const maxValue = selectedMapType ? maxCases : maxDeaths;
  const text = selectedMapType ? 'Cases' : 'Deaths';

  const numGradations = 5;
  const content = [];
  for (let i = 0; i < numGradations; i += 1) {
    const value = i * (maxValue / (numGradations - 1));
    content.push(
      <>
        <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorFunction(value) }} />
        <div>{Math.round(value * 100000) / 100}</div>
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
