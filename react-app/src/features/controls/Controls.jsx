import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Slider } from 'antd';
import { toggleMapType } from '../map/mapSlice';
import 'antd/dist/antd.css';

const Controls = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-100 h-100 rounded border p-3">
      <div> Controls </div>
      <Button onClick={() => dispatch(toggleMapType())}>Toggle Map Type</Button>
      <Slider range defaultValue={[25, 75]} />
    </div>
  );
};

export default Controls;
