import React from 'react';
import { useSelector } from 'react-redux';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { Spinner } from 'react-bootstrap';
import { getMaximums } from './processFipsData';
import stateMap from './topoJsons/us-albers.json';
import countyMap from './topoJsons/us-albers-counties.json';
import { CASE_COLORS, DEATH_COLORS } from '../../environment';

const Map = ({ mapType }) => {
  const casesNoDeaths = useSelector((state) => state.mapSlice.casesNoDeaths);
  const fipsData = useSelector((state) => state.dataSlice.dataByFips);
  if (!fipsData) {
    return (
      <div className="w-100 h-50">
        <div className="mt-100 d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <Spinner animation="border" />
            <div>Loading data...</div>
          </div>
        </div>
      </div>
    );
  }

  const [maxCases, maxDeaths] = getMaximums(fipsData);
  const colorScaleCases = scaleLinear().domain([0, maxCases]).range(CASE_COLORS);
  const colorScaleDeaths = scaleLinear().domain([0, maxDeaths]).range(DEATH_COLORS);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup>
        <Geographies geography={mapType ? stateMap : countyMap}>
          {
            ({ geographies }) =>
              geographies.map((geo) => {
                const curFips = mapType ? parseInt(geo.properties.fips_state, 10) : parseInt(geo.properties.fips, 10);
                const curFipsData = fipsData[curFips];
                const fipsCases = curFipsData ? curFipsData[0] : 0;
                const fipsDeaths = curFipsData ? curFipsData[1] : 0;

                let fill = '#ffffff';
                const strokeWidth = 0.75;
                let stroke = '#bbbbbb';
                if (curFipsData) {
                  stroke = '#000000';
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
                        stroke,
                        strokeWidth,
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
