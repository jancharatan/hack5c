import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { setSelectedCountyFips, setSelectedUsState } from './mapSlice';
import { getMaximums } from './processFipsData';

const geoUrlCounties =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json';

const geoUrlStates =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';

const Map = ({ mapType }) => {
  const dispatch = useDispatch();
  const selectedMapType = useSelector((state) => state.mapSlice.mapType);
  const casesNoDeaths = useSelector((state) => state.mapSlice.casesNoDeaths);
  const fipsData = useSelector((state) => state.dataSlice.dataByFips);
  if (!fipsData) {
    return <div>No data was sent from the server!</div>;
  }

  const [maxCases, maxDeaths] = getMaximums(fipsData);
  const colorScaleCases = scaleLinear().domain([0, maxCases]).range(['#ffedea', '#ff5233']);
  const colorScaleDeaths = scaleLinear().domain([0, maxDeaths]).range(['#BFBFFF', '#0000FF']);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={mapType ? geoUrlStates : geoUrlCounties}>
        {
          ({ geographies }) =>
            geographies.map((geo) => {
              const curFips = parseInt(geo.properties.fips_state, 10);
              const fipsCases = fipsData[curFips][0];
              const fipsDeaths = fipsData[curFips][1];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#000"
                  style={{
                    default: {
                      fill: casesNoDeaths ? colorScaleCases(fipsCases) : colorScaleDeaths(fipsDeaths),
                      stroke: '#000000',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#607D8B',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#FF5722',
                      stroke: '#607D8B',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                  }}
                  onClick={
                    selectedMapType
                      ? () => () => dispatch(setSelectedUsState(geo.id))
                      : dispatch(setSelectedCountyFips(geo.id))
                  }
                />
              );
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      </Geographies>
    </ComposableMap>
  );
};

Map.propTypes = {
  mapType: PropTypes.bool.isRequired,
};

export default Map;
