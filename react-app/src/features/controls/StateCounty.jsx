/* eslint-disable react/prop-types */
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const StateCounty = ({ value, setValue }) => (
  <ToggleButtonGroup type="checkbox" value={value} onChange={setValue}>
    <ToggleButton value disabled={value}>
      Show States
    </ToggleButton>
    <ToggleButton value={false} disabled={!value}>
      Show Counties
    </ToggleButton>
  </ToggleButtonGroup>
);

export default StateCounty;
