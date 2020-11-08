/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DatePicker } from 'antd';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
  toggleMapType,
  toggleCasesNoDeaths,
  setDate,
  setMapType,
  setCaseDeathType,
  setTitleAndCaption,
} from '../map/mapSlice';
import { getData, setDataByFips, setDataFetchInProgress } from '../data/dataSlice';
import 'antd/dist/antd.css';
import Filter from './Filter';
import FilterCategory from './FilterCategory';
import StateCounty from './StateCounty';
import CaseDeath from './CaseDeath';
import { getBaseUrl, START_DAY } from '../../environment';
import LinkControls from '../links/LinkControls';

const Controls = (props) => {
  const dispatch = useDispatch();

  const [income, setIncome] = useState([0, 124]);
  const [white, setWhite] = useState([0, 100]);
  const [black, setBlack] = useState([0, 86]);
  const [hispanic, setHispanic] = useState([0, 100]);
  const [asian, setAsian] = useState([0, 42]);
  const [nativeAm, setNativeAm] = useState([0, 93]);
  const [pacific, setPacific] = useState([0, 36]);

  useEffect(() => {
    // Disclaimer: This is not how you're supposed to do this.
    // This retrieves the saved visualization from the server if there is one.
    const key = (props?.location?.pathname ?? '').slice(1);
    if (key) {
      dispatch(setDataFetchInProgress(true));
      // lmao it's an inline fetch
      fetch(`${getBaseUrl()}/load-vis-link`, {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'POST',
        body: JSON.stringify({
          key,
        }),
      })
        .then((r) => {
          if (r.ok) {
            return r.json();
          }
          // TODO: Make a modal/404
          // eslint-disable-next-line no-alert
          alert('Invalid visualization URL.');
          return undefined;
        })
        .then((json) => {
          // lmao this is so bad but whatever
          const { result, settings } = json;

          // make the chart data correct
          dispatch(setDataByFips(result));
          dispatch(setDataFetchInProgress(false));

          // make the sliders correct
          setIncome(settings.Income);
          setHispanic(settings.Hispanic);
          setWhite(settings.White);
          setBlack(settings.Black);
          setAsian(settings.Asian);
          setNativeAm(settings.Native);
          setPacific(settings.Pacific);
          dispatch(setDate(settings.date));
          dispatch(setMapType(settings.type === 'states'));
          dispatch(setCaseDeathType(settings.dataType === 'cases'));
          dispatch(
            setTitleAndCaption({
              title: settings?.title ?? '',
              caption: settings?.caption ?? '',
            })
          );
        })
        .catch(() => {
          // eslint-disable-next-line no-alert
          alert('Something went wrong: Invalid visualization URL.');
        });
    } else {
      dispatch(
        getData({
          type: 'states',
          date: START_DAY,
          aggregate: true,
        })
      );
    }
  }, []);

  const disabled = useSelector((state) => state.mapSlice.dataFetchInProgress);
  const mapType = useSelector((state) => state.mapSlice.mapType);
  const displayType = useSelector((state) => state.mapSlice.casesNoDeaths);
  const date = useSelector((state) => state.mapSlice.date);
  const title = useSelector((state) => state.mapSlice.title);
  const caption = useSelector((state) => state.mapSlice.caption);

  const getSelection = () => ({
    date,
    type: mapType ? 'states' : 'counties',
    dataType: displayType ? 'cases' : 'deaths',
    Hispanic: hispanic,
    White: white,
    Black: black,
    Asian: asian,
    Native: nativeAm,
    Pacific: pacific,
    Income: income.map((x) => x * 1000),
    title,
    caption,
  });

  const useFilters = () => {
    const selection = getSelection();
    dispatch(getData(selection));
  };

  const handleDatePickerChange = (a, dateString) => {
    dispatch(setDate(dateString));
  };

  const setDisabledDate = (current) => {
    const startDate = '2020-03-17';
    const endDate = '2020-11-06';
    return current && (current < moment(startDate, 'YYYY-MM-DD') || current > moment(endDate, 'YYYY-MM-DD'));
  };

  return (
    <>
      <div className="d-flex flex-grow-1 overflow-hidden">
        <div className="w-100 h-100 rounded border p-3 overflow-y-scroll" style={{ backgroundColor: 'white' }}>
          <h1>Visualization Controls</h1>
          <div className="d-flex flex-row mb-3">
            <DatePicker
              disabled={disabled}
              format="YYYY-MM-DD"
              disabledDate={setDisabledDate}
              onChange={(newDate, dateString) => handleDatePickerChange(newDate, dateString)}
              defaultValue={moment(START_DAY, 'YYYY-MM-DD')}
            />
            <CaseDeath value={displayType} setValue={() => dispatch(toggleCasesNoDeaths())} />
            <StateCounty value={mapType} setValue={() => dispatch(toggleMapType())} />
          </div>
          <Button onClick={useFilters} className="btn-striped w-100 mb-5" size="lg">
            <h1 className="m-0">Visualize!</h1>
          </Button>
          <div className="d-flex flow-row">
            <h2>Filters</h2>
          </div>
          <FilterCategory title="Income" className="py-2">
            <Filter
              value={income}
              setValue={(newValue) => setIncome(newValue)}
              min={0}
              max={124}
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
              max={86}
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
              max={42}
              units="%"
              title="Asian American Population"
            />
            <Filter
              value={nativeAm}
              setValue={(newValue) => setNativeAm(newValue)}
              min={0}
              max={93}
              units="%"
              title="Native American Population"
            />
            <Filter
              value={pacific}
              setValue={(newValue) => setPacific(newValue)}
              min={0}
              max={36}
              units="%"
              title="Pacific Islander Population"
            />
          </FilterCategory>
        </div>
      </div>
      <LinkControls getSelection={getSelection} />
    </>
  );
};

export default withRouter(Controls);
