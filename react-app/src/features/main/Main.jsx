import React from 'react';
import Controls from '../controls/Controls';
import Map from '../map/Map';

const Main = () => (
  <div className="w-100 h-100 d-flex flex-row">
    <div className="w-50 h-100">
      <Map mapType="states" />
    </div>
    <div className="w-50 h-100 p-5">
      <Controls />
    </div>
  </div>
);

export default Main;
