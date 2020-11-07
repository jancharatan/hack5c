import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers-counties.json';

const Map = () => (
  <div className="w-50 h-100">
    <div>
      <ComposableMap projection="geoAlbersUsa" width={800} height={600}>
        <Geographies geography={geoUrl}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#F00" />)}
        </Geographies>
      </ComposableMap>
    </div>
  </div>
);
export default Map;
