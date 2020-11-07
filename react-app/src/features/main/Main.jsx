import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Controls from '../controls/Controls';
import { getData } from '../data/dataSlice';
import Map from '../map/Map';
import FancyTitle from '../text/FancyTitle';
import MapKey from '../map/MapKey';

const Main = () => {
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  const selectedDate = useSelector((state) => state.mapSlice.date);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData({ fips: 'states', date: selectedDate || '2020-11-05', aggregate: true }));
  }, []);

  return (
    <div className="w-100 h-100 d-flex flex-row">
      <div className="w-50 h-100 d-flex flex-column">
        <FancyTitle />
        <MapKey />
        <Map mapType={selectedMapType} />
      </div>
      <div className="w-50 h-100 p-5 overflow-hidden">
        <Controls />
      </div>
    </div>
  );
};

export default Main;
