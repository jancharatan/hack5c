import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json';

const Map = () => (
  <div style={{ width: '90%' }}>
    <ComposableMap>
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  </div>
);
export default Map;
