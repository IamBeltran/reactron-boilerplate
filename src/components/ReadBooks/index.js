// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// ▶ Import css file
import './ReadBooks.css';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

const sortBy = ({ key, asc }) => (first, second) => {
  if (asc) {
    if (first[`${key}`] > second[`${key}`]) return 1;
    if (second[`${key}`] > first[`${key}`]) return -1;
  } else {
    if (first[`${key}`] > second[`${key}`]) return -1;
    if (second[`${key}`] > first[`${key}`]) return 1;
  }
  return 0;
};

const Loading = ({ onClosePortal02 }) => {
  return (
    <div id="read-books">
      <div id="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div id="main-wrapper">
        <p>Loading...</p>
      </div>
    </div>
  );
};

Loading.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
};

const QueryError = ({ error, onClosePortal02 }) => {
  return (
    <div id="read-books">
      <div id="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div id="main-wrapper">
        <p>{error}</p>
      </div>
    </div>
  );
};

QueryError.propTypes = {
  error: PropTypes.func.isRequired,
  onClosePortal02: PropTypes.func.isRequired,
};

const ReadBooks = props => {
  const { onClosePortal02 } = props;
  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: {
      cursor: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading onClosePortal02={onClosePortal02} />;
  if (error) return <QueryError error={error} onClosePortal02={onClosePortal02} />;
  // const { books } = data;  type: $type, offset: $offset, limit: $limit
  return (
    <div id="read-books">
      <div id="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal02}>
          X
        </button>
      </div>
      <div id="main-wrapper">
        <div className="scrollable">
          <table className="table-control scrollable-content">
            <caption>Lista de libros</caption>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Autor</th>
              </tr>
            </thead>
            <tbody>
              {data.books.sort(sortBy({ key: 'title', asc: true })).map(({ id, title, author }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ReadBooks.propTypes = {
  onClosePortal02: PropTypes.func.isRequired,
};

export default ReadBooks;
