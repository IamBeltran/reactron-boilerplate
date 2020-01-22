// ▶ Import react dependecies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// ▶ Import components

// ▶ Import css file
import './CreateBook.css';

// ▶ Import Electron
const {
  electron: { ipcRenderer },
} = window;

const CreateBook = props => {
  const { onClosePortal01 } = props;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const resetInputs = () => {
    setTitle('');
    setAuthor('');
  };

  const onSubmit = event => {
    event.preventDefault();
    ipcRenderer.send('send-create-book', { title, author });
  };

  useEffect(() => {
    ipcRenderer.on('create-book-reply-success', (event, listener) => {
      resetInputs();
      setSuccess(listener);
      setTimeout(() => setSuccess(false), 1500);
    });
    return () => ipcRenderer.removeAllListeners(['create-book-reply-success']);
  }, [success]);

  useEffect(() => {
    ipcRenderer.on('create-book-reply-error', (event, listener) => {
      resetInputs();
      setError(listener);
      setTimeout(() => setError(false), 1500);
    });
    return () => ipcRenderer.removeAllListeners(['create-book-reply-error']);
  }, [error]);

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
        {/* <div className="error-wrapper contrast">Soy error</div> */}
        {error && <div className="error-wrapper">{error}</div>}
        {success && <div className="success-wrapper">{success}</div>}
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  onClosePortal01: PropTypes.func.isRequired,
};

export default CreateBook;
