/* eslint-disable react/prop-types */
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const StateCounty = ({ value, setValue }) => (
  <div className="ml-2">
    <ToggleButtonGroup type="checkbox" value={value} onChange={setValue}>
      <ToggleButton value disabled={value}>
        Show States
      </ToggleButton>
      <ToggleButton value={false} disabled={!value}>
        Show Counties
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

export default StateCounty;
