import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Slider, DatePicker } from 'antd';
import moment from 'moment';
import { toggleMapType, toggleCasesNoDeaths, setDate } from '../map/mapSlice';
import { getData } from '../data/dataSlice';
import 'antd/dist/antd.css';

const Controls = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.mapSlice.date);
  const handleDatePickerChange = (date, dateString) => {
    dispatch(setDate(dateString));
    dispatch(getData({ fips: 'states', date: selectedDate || '2020-11-05', aggregate: true }));
  };

  const setDisabledDate = (current) => {
    const startDate = '2020-03-17';
    const endDate = '2020-11-06';
    return current && (current < moment(startDate, 'YYYY-MM-DD') || current > moment(endDate, 'YYYY-MM-DD'));
  };

  return (
    <div className="w-100 h-100 rounded border p-3">
      <div style={{ fontWeight: 'bold', fontSize: 30 }}> Controls </div>
      <DatePicker
        format="YYYY-MM-DD"
        disabledDate={setDisabledDate}
        onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
      />
      <Button className="m-2" onClick={() => dispatch(toggleMapType())}>
        Toggle Map Type
      </Button>
      <Button className="m-2" onClick={() => dispatch(toggleCasesNoDeaths())}>
        Cases or Deaths
      </Button>
      <Slider range defaultValue={[25, 75]} />
    </div>
  );
};

export default Controls;
