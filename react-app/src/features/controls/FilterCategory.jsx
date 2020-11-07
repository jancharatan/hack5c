import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const FilterCategory = ({ title, children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div {...props}>
    <div className="rounded border p-3">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  </div>
);

FilterCategory.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

FilterCategory.defaultProps = {
  children: null,
};

export default FilterCategory;
