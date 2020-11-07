/* eslint-disable react/prop-types */
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const CaseDeath = ({ value, setValue }) => (
  <div className="ml-2">
    <ToggleButtonGroup type="checkbox" value={value} onChange={setValue}>
      <ToggleButton value disabled={value}>
        Show Cases
      </ToggleButton>
      <ToggleButton value={false} disabled={!value}>
        Show Deaths
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

export default CaseDeath;
