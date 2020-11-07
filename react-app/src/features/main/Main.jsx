import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Controls from '../controls/Controls';
import { getData } from '../data/dataSlice';
import Map from '../map/Map';
import FancyTitle from '../text/FancyTitle';
import MapKey from '../map/MapKey';
import LinkControls from '../links/LinkControls';
import { START_DAY } from '../../environment';

const Main = () => {
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  const selectedDate = useSelector((state) => state.mapSlice.date);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData({ fips: 'states', date: selectedDate || START_DAY, aggregate: true }));
  }, []);

  return (
    <div className="w-100 h-100 d-flex flex-row">
      <div className="w-50 h-100 d-flex flex-column">
        <FancyTitle />
        <MapKey />
        <Map mapType={selectedMapType} />
      </div>
      <div className="w-50 h-100 overflow-hidden p-5">
        <div className="d-flex flex-column h-100 w-100 overflow-hidden">
          <div className="d-flex flex-grow-1 overflow-hidden">
            <Controls />
          </div>
          <LinkControls />
        </div>
      </div>
    </div>
  );
};

export default Main;
