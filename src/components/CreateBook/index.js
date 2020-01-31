// ▶ Import react dependecies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// ▶ Import components
// ▶ Import Apollo modules
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

// » Mutation CreateBook
const CREATE_BOOK = gql`
  mutation CreateBook($input: CreateBookInput) {
    createBook(input: $input) {
      id
      title
      author
    }
  }
`;

const currentYear = new Date().getFullYear();

const CreateBook = props => {
  const { onClosePortal01 } = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(currentYear);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorQuery, setErrorQuery] = useState(false);

  const resetInputs = () => {
    setSuccess('Success Created Book');
    setTimeout(() => setSuccess(false), 1500);
    setTitle('');
    setAuthor('');
    setYear(currentYear);
    setCountry('');
    setLanguage('');
  };

  const setError = err => {
    setErrorQuery(err.message);
    setTimeout(() => setErrorQuery(false), 1500);
  };

  const [createBook] = useMutation(CREATE_BOOK, {
    // update: updateCache,
    onError: err => setError(err),
    onCompleted: resetInputs,
  });

  const onSubmit = event => {
    event.preventDefault();
    createBook({
      variables: {
        input: {
          title,
          author,
          year,
          country,
          language,
        },
      },
    });
  };

  const hasAuthor = author !== '';
  const hasTitle = title !== '';
  const hasYear = year !== '';
  const hasCountry = country !== '';
  const hasLanguage = language !== '';
  const isDisabled = !hasAuthor || !hasTitle || !hasYear || !hasCountry || !hasLanguage;

  return (
    <div id="create-book">
      <div className="modal-control">
        <button type="button" className="btn-modal" onClick={onClosePortal01}>
          X
        </button>
      </div>
      <div className="modal-main-wrapper">
        <form onSubmit={onSubmit} className="form-add-book">
          <legend className="legend-control">AGREGA UN LIBRO</legend>
          <div className="form-group">
            <label htmlFor="title" className="label-control">
              <span className="span-control">Titulo</span>
              <input
                type="text"
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
                type="text"
                className="input-control"
                name="author"
                onChange={event => setAuthor(event.target.value)}
                value={author}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="year" className="label-control">
              <span className="span-control">Year</span>
              <input
                type="number"
                className="input-control"
                name="year"
                onChange={event => setYear(parseInt(event.target.value, 10))}
                value={year}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="country" className="label-control">
              <span className="span-control">Country</span>
              <input
                type="text"
                className="input-control"
                name="country"
                onChange={event => setCountry(event.target.value)}
                value={country}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="language" className="label-control">
              <span className="span-control">Language</span>
              <input
                type="text"
                className="input-control"
                name="language"
                onChange={event => setLanguage(event.target.value)}
                value={language}
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
      <div className="modal-alert-wrapper">
        {/*  <div className="error-wrapper contrast">Soy error</div> */}
        {errorQuery && <div className="error-wrapper">{errorQuery}</div>}
        {success && <div className="success-wrapper">{success}</div>}
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  onClosePortal01: PropTypes.func.isRequired,
};

export default CreateBook;
