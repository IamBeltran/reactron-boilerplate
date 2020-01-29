// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
// ▶ Import Apollo modules

const LoadingQuery = props => {
  const { onClosePortal02 } = props;

  return (
    <div id="read-books">
      <div className="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div className="modal-main-wrapper" />
      <div className="modal-alert-wrapper">
        <div className="loading-wrapper">Loading...</div>
      </div>
    </div>
  );
};

LoadingQuery.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
};

export default LoadingQuery;
