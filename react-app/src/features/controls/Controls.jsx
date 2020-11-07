import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import { toggleMapType, toggleCasesNoDeaths, setDate } from '../map/mapSlice';
import { getData } from '../data/dataSlice';
import 'antd/dist/antd.css';
import Filter from './Filter';
import FilterCategory from './FilterCategory';

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
    <div className="w-100 h-100 rounded border p-3 overflow-y-scroll">
      <h1>Controls</h1>
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

      <h2>Filters</h2>
      <FilterCategory title="Income" className="py-2">
        <Filter min={0} max={400} units="k USD" title="Median Annual Household Income" />
      </FilterCategory>
      <FilterCategory title="Race and Ethnicity" className="pt-2">
        <Filter min={0} max={100} units="%" title="White Population" />
        <Filter min={0} max={100} units="%" title="Black/African American Population" />
        <Filter min={0} max={100} units="%" title="Hispanic Population" />
        <Filter min={0} max={100} units="%" title="Asian American Population" />
        <Filter min={0} max={100} units="%" title="Native American Population" />
      </FilterCategory>
    </div>
  );
};

export default Controls;
