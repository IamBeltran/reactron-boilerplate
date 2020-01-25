// ▶ Import react dependecies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// ▶ Import components

// ▶ Import css file
import './CreateBook.css';

// ▶ Import Apollo modules
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput) {
    createBook(input: $input) {
      id
      title
      author
    }
  }
`;

const updateCache = (cache, { data }) => {
  const existingBooks = cache.readQuery({
    query: GET_BOOKS,
  });
  const NEW_BOOK = data.createBook;

  cache.writeQuery({
    query: GET_BOOKS,
    data: { books: [...existingBooks.books, NEW_BOOK] },
  });
};

const CreateBook = props => {
  const { onClosePortal01 } = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);

  const resetInputs = () => {
    setTitle('');
    setAuthor('');
  };

  const [createBook] = useMutation(CREATE_BOOK, { update: updateCache, onCompleted: resetInputs });

  const onSubmit = event => {
    event.preventDefault();
    createBook({
      variables: {
        input: {
          title,
          author,
        },
      },
    });
    setSuccess('Created Book');
    setTimeout(() => setSuccess(false), 1500);
  };

  const isDisabled = author === '' || title === '';

  return (
    <div id="create-book">
      <div id="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal01}>
          X
        </button>
      </div>
      <div id="main-wrapper">
        <form onSubmit={onSubmit} className="form-add-book">
          <legend className="legend-control">AGREGA UN LIBRO</legend>
          <div className="form-group">
            <label htmlFor="title" className="label-control">
              <span className="span-control">Titulo</span>
              <input
                className="input-control"
                name="title"
                onChange={event => setTitle(event.target.value)}
                value={title}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="author" className="label-control">
              <span className="span-control">Autor</span>
              <input
                className="input-control"
                name="author"
                onChange={event => setAuthor(event.target.value)}
                value={author}
              />
            </label>
          </div>
          <div className="submit-control">
            <button
              type="submit"
              disabled={isDisabled}
              className={`btn btn-submit ${isDisabled ? 'btn-disabled' : ''}`}
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
      <div id="alert-wrapper">
        {/* <div className="error-wrapper contrast">Soy error</div>
        {error && <div className="error-wrapper">{error}</div>} */}
        {success && <div className="success-wrapper">{success}</div>}
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  onClosePortal01: PropTypes.func.isRequired,
};

export default CreateBook;
