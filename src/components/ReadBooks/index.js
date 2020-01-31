// ▶ Import react dependecies
import React from 'react';
import PropTypes from 'prop-types';

// ▶ Import Apollo modules
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

// ▶ Import components
import LoadingQuery from './LoadingQuery';
import ErrorQuery from './ErrorQuery';

// » Querie GetBooks
const GET_BOOKS = gql`
  query GetBooks($input: GetBooksInput) {
    getBooks(input: $input) {
      info {
        count
        pages
        hasNextPage
        hasPreviousPage
        nextPage
        currentPage
        previousPage
      }
      books {
        id
        title
        author
      }
    }
  }
`;

const ReadBooks = props => {
  const { onClosePortal02 } = props;
  const { data, fetchMore, loading, error } = useQuery(GET_BOOKS, {
    variables: {
      input: {
        sortBy: {
          key: 'title',
          asc: true,
        },
        pagination: {
          results: 10,
          page: 1,
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <LoadingQuery onClosePortal02={onClosePortal02} />;
  if (error) return <ErrorQuery onClosePortal02={onClosePortal02} error={error} />;

  const {
    getBooks: {
      info: { count, currentPage, hasNextPage, hasPreviousPage, nextPage, pages, previousPage },
      books,
    },
  } = data;

  const onClickPrev = async () => {
    fetchMore({
      variables: {
        input: {
          sortBy: {
            key: 'title',
            asc: true,
          },
          pagination: {
            results: 10,
            page: previousPage,
          },
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  };

  const onClickNext = () => {
    fetchMore({
      query: GET_BOOKS,
      variables: {
        input: {
          sortBy: {
            key: 'title',
            asc: true,
          },
          pagination: {
            results: 10,
            page: nextPage,
          },
        },
      },
      updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
    });
  };

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
              {books.map(({ id, title, author }) => (
                <tr key={id}>
                  <td>{title}</td>
                  <td>{author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <div className="pagination-legend">
            Books: <span>{count}</span> - Page: <span>{currentPage}</span> of <span>{pages}</span>
          </div>
          <button
            type="button"
            className={`btn-pagination ${!hasPreviousPage ? 'btn-disabled' : ''}`}
            onClick={onClickPrev}
            disabled={!hasPreviousPage}
          >
            Prev
          </button>
          <button
            type="button"
            className={`btn-pagination ${!hasNextPage ? 'btn-disabled' : ''}`}
            onClick={onClickNext}
            disabled={!hasNextPage}
          >
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
