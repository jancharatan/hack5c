import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

// eslint-disable-next-line react/prop-types
const DateSlider = ({ defaultValue, title, props, setValue, value }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <div>{title}</div>
    <div className="px-3 pb-2">
      <Slider value={value} onChange={setValue} defaultValue={defaultValue} />
    </div>
  </div>
);

Slider.propTypes = {
  units: PropTypes.string,
  title: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

Slider.defaultProps = {
  units: '',
};

export default DateSlider;
