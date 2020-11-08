/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import Controls from '../controls/Controls';
import Map from '../map/Map';
import FancyTitle from '../text/FancyTitle';
import MapKey from '../map/MapKey';

const Main = () => {
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  const NYTdata = <a href="https://github.com/nytimes/covid-19-data">NYT Covid dataset</a>;
  const censusData = <a href="https://github.com/ryanschaub/US-Census-Demographic-Data">Census demographics dataset</a>;

  return (
    <div className="w-100 h-100 d-flex flex-row">
      <div className="w-50 h-100 d-flex flex-column">
        <FancyTitle />
        <MapKey />
        <Map mapType={selectedMapType} />
        <div className="ml-5">
          For this project, we used data from the {NYTdata} and a {censusData}.
        </div>
      </div>
      <div className="w-50 h-100 overflow-hidden pr-5 py-5">
        <div className="d-flex flex-column h-100 w-100 overflow-hidden">
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default Main;
