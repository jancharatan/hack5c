import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { setSelectedCountyFips, setSelectedUsState } from './mapSlice';

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

  const getColorCases = (number) => {
    if (number > 400000) {
      return '#DC1C13';
    }
    if (number > 300000) {
      return '#EA4C46';
    }
    if (number > 200000) {
      return '#F07470';
    }
    if (number > 100000) {
      return '#F1959B';
    }
    return '#F6BDC0';
  };

  const getColorDeaths = (number) => {
    if (number > 10000) {
      return '#0000FF';
    }
    if (number > 8000) {
      return '#1F1FFF';
    }
    if (number > 6000) {
      return '#4949FF';
    }
    if (number > 4000) {
      return '#7879FF';
    }
    if (number > 2000) {
      return '#A3A3FF';
    }
    return '#BFBFFF';
  };

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
                      fill: casesNoDeaths ? getColorCases(fipsCases) : getColorDeaths(fipsDeaths),
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
