/* eslint-disable react/prop-types */
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

const CaseDeath = ({ value, setValue }) => (
  <div className="ml-2">
    <ToggleButtonGroup type="checkbox" value={value} onChange={setValue}>
      <ToggleButton style={{ boxShadow: 'none' }} value disabled={value}>
        Show Cases
      </ToggleButton>
      <ToggleButton style={{ boxShadow: 'none' }} value={false} disabled={!value}>
        Show Deaths
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
);

export default CaseDeath;
