import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toggleMapType } from '../map/mapSlice';

const Controls = () => {
  const dispatch = useDispatch();
  return (
    <div className="w-100 h-100 rounded border p-3">
      <div> Controls </div>
      <Button onClick={() => dispatch(toggleMapType())}> Toggle Map Type </Button>
    </div>
  );
};

export default Controls;
