import React from 'react';
import { useSelector } from 'react-redux';
import Controls from '../controls/Controls';
import Map from '../map/Map';

const Main = () => {
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  return (
    <div className="w-100 h-100 d-flex flex-row">
      <div className="w-50 h-100">
        <Map mapType={selectedMapType} />
      </div>
      <div className="w-50 h-100 p-5">
        <Controls />
      </div>
    </div>
  );
};

export default Main;
