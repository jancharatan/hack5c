import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

// eslint-disable-next-line react/prop-types
const Filter = ({ min, max, units, title, props, setValue, value }) => {
  const marks = {
    [min]: `${min}${units}`,
    [max]: `${max}${units}`,
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div {...props}>
      <div>{title}</div>
      <div className="px-3 pb-2">
        <Slider
          range
          value={value}
          onAfterChange={setValue}
          marks={marks}
          min={min}
          max={max}
          defaultValue={[min, max]}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  units: PropTypes.string,
  title: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
};

Filter.defaultProps = {
  units: '',
};

export default Filter;
