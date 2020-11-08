import React from 'react';
import { useSelector } from 'react-redux';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { getMaximums } from './processFipsData';
import { CASE_COLORS, DEATH_COLORS } from '../../environment';

const geoUrlCounties =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json';

const geoUrlStates =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';

const Map = ({ mapType }) => {
  const casesNoDeaths = useSelector((state) => state.mapSlice.casesNoDeaths);
  const fipsData = useSelector((state) => state.dataSlice.dataByFips);
  if (!fipsData) {
    return <div>No data was sent from the server!</div>;
  }

  const [maxCases, maxDeaths] = getMaximums(fipsData);
  const colorScaleCases = scaleLinear().domain([0, maxCases]).range(CASE_COLORS);
  const colorScaleDeaths = scaleLinear().domain([0, maxDeaths]).range(DEATH_COLORS);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup>
        <Geographies geography={mapType ? geoUrlStates : geoUrlCounties}>
          {
            ({ geographies }) =>
              geographies.map((geo) => {
                const curFips = mapType ? parseInt(geo.properties.fips_state, 10) : parseInt(geo.properties.fips, 10);
                const curFipsData = fipsData[curFips];
                const fipsCases = curFipsData ? curFipsData[0] : 0;
                const fipsDeaths = curFipsData ? curFipsData[1] : 0;

                let fill = '#999999';
                if (curFipsData) {
                  fill = casesNoDeaths ? colorScaleCases(fipsCases) : colorScaleDeaths(fipsDeaths);
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#000"
                    style={{
                      default: {
                        fill,
                        stroke: '#000000',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            // eslint-disable-next-line react/jsx-curly-newline
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

Map.propTypes = {
  mapType: PropTypes.bool.isRequired,
};

export default Map;
