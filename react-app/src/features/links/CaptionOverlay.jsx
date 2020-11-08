import React from 'react';
import PropTypes from 'prop-types';
import '../text/FancyTitle.scss';

const CaptionOverlay = ({ title, caption }) => (
  <div style={{ position: 'absolute', top: 250, left: 50, maxWidth: 500 }}>
    <div className="heading" style={{ fontSize: '30pt', fontWeight: 'bolder' }}>
      {title}
    </div>
    <div style={{ backgroundColor: 'lightgrey' }}>{caption}</div>
  </div>
);

CaptionOverlay.propTypes = {
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

export default CaptionOverlay;
