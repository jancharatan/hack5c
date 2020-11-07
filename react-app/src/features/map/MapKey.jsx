import React from 'react';
import { useSelector } from 'react-redux';
import { scaleLinear } from 'd3-scale';

const MapKey = () => {
  const colorScaleCases = scaleLinear().domain([0, 300000]).range(['#ffedea', '#ff5233']);
  const colorScaleDeaths = scaleLinear().domain([0, 18000]).range(['#BFBFFF', '#0000FF']);
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  return (
    <div className="px-5">
      {selectedMapType ? (
        <div className="d-flex flex-row">
          <div style={{ fontWeight: 'bold' }}>Cases</div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleCases(0) }} />
          <div style={{ fontWeight: 'light' }}> 0 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleCases(75000) }} />
          <div style={{ fontWeight: 'light' }}> 75000 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleCases(150000) }} />
          <div style={{ fontWeight: 'light' }}> 150000 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleCases(225000) }} />
          <div style={{ fontWeight: 'light' }}> 225000 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleCases(300000) }} />
          <div style={{ fontWeight: 'light' }}> 300000 </div>
        </div>
      ) : (
        <div className="d-flex flex-row">
          <div style={{ fontWeight: 'bold' }}>Deaths</div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleDeaths(0) }} />
          <div style={{ fontWeight: 'light' }}> 0 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleDeaths(4500) }} />
          <div style={{ fontWeight: 'light' }}> 4500 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleDeaths(9000) }} />
          <div style={{ fontWeight: 'light' }}> 9000 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleDeaths(13500) }} />
          <div style={{ fontWeight: 'light' }}> 13500 </div>
          <div className="m-2" style={{ width: '10px', height: '10px', backgroundColor: colorScaleDeaths(18000) }} />
          <div style={{ fontWeight: 'light' }}> 18000 </div>
        </div>
      )}
    </div>
  );
};

export default MapKey;
