import React from 'react';
import { useDispatch } from 'react-redux';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { setSelectedCountyFips } from './mapSlice';

const geoUrlCounties =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json';

const geoUrlStates =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';

const Map = ({ mapType }) => {
  const dispatch = useDispatch();
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={mapType === 'states' ? geoUrlStates : geoUrlCounties}>
        {
          ({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#000"
                style={{
                  default: {
                    fill: '#ECEFF1',
                    stroke: '#607D8B',
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
                onClick={() => dispatch(setSelectedCountyFips(geo.id))}
              />
            ))
          // eslint-disable-next-line react/jsx-curly-newline
        }
      </Geographies>
    </ComposableMap>
  );
};

Map.propTypes = {
  mapType: PropTypes.string.isRequired,
};

export default Map;
