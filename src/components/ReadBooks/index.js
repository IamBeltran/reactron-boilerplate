// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import Apollo modules
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// ▶ Import components
import LoadingQuery from './LoadingQuery';
import ErrorQuery from './ErrorQuery';

const GET_BOOKS = gql`
  query Books {
    books {
      id
      title
      author
    }
  }
`;

const ReadBooks = props => {
  const { onClosePortal02 } = props;
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <LoadingQuery onClosePortal02={onClosePortal02} />;
  if (error) return <ErrorQuery onClosePortal02={onClosePortal02} error={error} />;

  return (
    <div id="read-books">
      <div className="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div className="modal-main-wrapper">
        <div className="scrollable">
          <table className="table-control">
            <caption>The 100 best books of all time</caption>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {data.books.slice(0, 10).map(({ id, title, author }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-legend">Page: 1 of 7</div>
          <button type="button" className="btn-pagination">
            Prev
          </button>
          <button type="button" className="btn-pagination">
            Next
          </button>
        </div>
      </div>
      <div className="modal-alert-wrapper">
        {/* <div className="loading-wrapper">Loading...</div> */}
      </div>
    </div>
  );
};

ReadBooks.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
};

export default ReadBooks;
