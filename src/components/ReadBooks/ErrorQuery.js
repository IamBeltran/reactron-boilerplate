// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
// ▶ Import Apollo modules

/**
 *  NOTE: Apollo Server provides a collection of predefined errors:
 *
 *    AuthenticationError:
 *         ForbiddenError:
 *         UserInputError:
 *            ApolloError: Generic
 *
 * */

const ErrorQuery = props => {
  const { onClosePortal02, error } = props;
  // console.log(Object.keys(error));
  // console.log(JSON.stringify(error, null, 2));
  return (
    <div id="read-books">
      <div className="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div className="modal-main-wrapper">
        <div className="query-errors">
          <p>{error.message}</p>
        </div>
      </div>
      <div className="modal-alert-wrapper">
        <div className="error-wrapper">Something wrong</div>
      </div>
    </div>
  );
};

ErrorQuery.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ErrorQuery;
