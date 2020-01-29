// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
// ▶ Import Apollo modules
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// ▶ Import dummie data
// import books from './bookDummie';

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
  // const [loadingQuery, setLoadingQuery] = useState(false);
  // const [errorQuery, setErrorQuery] = useState(false);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  // console.log(data.books);

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
            <caption>Lista de libros</caption>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
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
        {/*
          <div className="loading-wrapper">Loading...</div>
          {errorQuery && <div className="error-wrapper">{errorQuery}</div>}
          {loadingQuery && <div className="loading-wrapper">Loading...</div>}
        */}
      </div>
    </div>
  );
};

ReadBooks.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
};

export default ReadBooks;
