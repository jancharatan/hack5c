import React from 'react';
import PropTypes from 'prop-types';

const CaptionOverlay = ({ title, caption }) => (
  <div style={{ position: 'absolute', top: 0, left: 0 }}>
    <div>{title}</div>
    <div>{caption}</div>
  </div>
);

CaptionOverlay.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default CaptionOverlay;
