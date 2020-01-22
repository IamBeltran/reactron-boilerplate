// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
import books from './book.dummy';
// ▶ Import css file
import './ReadBooks.css';

const ReadBooks = props => {
  const { onClosePortal02 } = props;
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
              {books.map(({ id, title, author }) => (
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
