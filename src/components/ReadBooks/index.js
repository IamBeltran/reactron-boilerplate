// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// ▶ Import css file
import './ReadBooks.css';

const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

const sortedBy = value => (a, b) => {
  if (a[`${value}`] > b[`${value}`]) {
    return 1;
  }
  if (b[`${value}`] > a[`${value}`]) {
    return -1;
  }
  return 0;
};

const ReadBooks = props => {
  const { onClosePortal02 } = props;
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error}`}</p>;
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
              {data.books.sort(sortedBy('title')).map(({ id, title, author }) => (
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
