// ▶ Import react dependecies
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

const portalRoot01 = document.getElementById('portal-root-01');

const Portal01 = props => {
  const { children } = props;
  return ReactDom.createPortal(
    <React.Fragment key="portal-01">{children}</React.Fragment>,
    portalRoot01,
  );
};

Portal01.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Portal01;
