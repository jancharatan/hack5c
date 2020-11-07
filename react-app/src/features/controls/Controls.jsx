import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { toggleMapType, toggleCasesNoDeaths, setDate } from '../map/mapSlice';
import { getData } from '../data/dataSlice';
import 'antd/dist/antd.css';
import Filter from './Filter';
import FilterCategory from './FilterCategory';
import StateCounty from './StateCounty';
import CaseDeath from './CaseDeath';
import { START_DAY } from '../../environment';

const Controls = () => {
  const dispatch = useDispatch();

  const [income, setIncome] = useState([0, 400]);
  const [white, setWhite] = useState([0, 100]);
  const [black, setBlack] = useState([0, 100]);
  const [hispanic, setHispanic] = useState([0, 100]);
  const [asian, setAsian] = useState([0, 100]);
  const [nativeAm, setNativeAm] = useState([0, 100]);

  const disabled = useSelector((state) => state.mapSlice.dataFetchInProgress);

  const handleDatePickerChange = (date, dateString) => {
    dispatch(setDate(dateString));
    dispatch(getData({ fips: 'states', date: dateString || '2020-11-05', aggregate: true }));
  };

  const setDisabledDate = (current) => {
    const startDate = '2020-03-17';
    const endDate = '2020-11-06';
    return current && (current < moment(startDate, 'YYYY-MM-DD') || current > moment(endDate, 'YYYY-MM-DD'));
  };

  const mapType = useSelector((state) => state.mapSlice.mapType);
  const displayType = useSelector((state) => state.mapSlice.casesNoDeaths);

  const useFilters = () => {
    console.log(income);
    console.log(white);
    console.log(black);
    console.log(hispanic);
    console.log(asian);
    console.log(nativeAm);
  };

  return (
    <div className="w-100 h-100 rounded border p-3 overflow-y-scroll" style={{ backgroundColor: 'white' }}>
      <h1>Visualization Controls</h1>
      <div className="d-flex flex-row mb-4">
        <DatePicker
          disabled={disabled}
          format="YYYY-MM-DD"
          disabledDate={setDisabledDate}
          onChange={(date, dateString) => handleDatePickerChange(date, dateString)}
          defaultValue={moment(START_DAY, 'YYYY-MM-DD')}
        />
        <CaseDeath value={displayType} setValue={() => dispatch(toggleCasesNoDeaths())} />
        <StateCounty value={mapType} setValue={() => dispatch(toggleMapType())} />
      </div>
      <div className="d-flex flow-row">
        <h2>Filters</h2>
        <Button onClick={useFilters} className="ml-2" size="sm">
          {' '}
          Visualize using these filters
        </Button>
      </div>
      <FilterCategory title="Income" className="py-2">
        <Filter
          value={income}
          setValue={(newValue) => setIncome(newValue)}
          min={0}
          max={400}
          units="k USD"
          title="Median Annual Household Income"
        />
      </FilterCategory>
      <FilterCategory title="Race and Ethnicity" className="pt-2">
        <Filter
          value={white}
          setValue={(newValue) => setWhite(newValue)}
          min={0}
          max={100}
          units="%"
          title="White Population"
        />
        <Filter
          value={black}
          setValue={(newValue) => setBlack(newValue)}
          min={0}
          max={100}
          units="%"
          title="Black/African American Population"
        />
        <Filter
          value={hispanic}
          setValue={(newValue) => setHispanic(newValue)}
          min={0}
          max={100}
          units="%"
          title="Hispanic Population"
        />
        <Filter
          value={asian}
          setValue={(newValue) => setAsian(newValue)}
          min={0}
          max={100}
          units="%"
          title="Asian American Population"
        />
        <Filter
          value={nativeAm}
          setValue={(newValue) => setNativeAm(newValue)}
          min={0}
          max={100}
          units="%"
          title="Native American Population"
        />
      </FilterCategory>
    </div>
  );
};

export default Controls;
