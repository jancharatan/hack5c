import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Controls from '../controls/Controls';
import { getData } from '../data/dataSlice';
import Map from '../map/Map';
import FancyTitle from '../text/FancyTitle';
import MapKey from '../map/MapKey';
import { START_DAY } from '../../environment';

const Main = () => {
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getData({
        type: 'states',
        date: START_DAY,
        aggregate: true,
      })
    );
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
          <Controls />
        </div>
      </div>
    </div>
  );
};

export default Main;
