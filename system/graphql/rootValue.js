//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const database = require('../store');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { createBook, readBooks, readBookById, updateBookById, deleteBookById } = database;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const properties = ['id', 'title', 'author', 'year', 'country', 'language'];

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const isValidProperties = propertie => properties.includes(propertie);

const filter = (array, { key = null, value = null, exclude = false } = {}) => {
  const hasKey = !!key;
  const hasValue = !!value;
  const hasFilters = hasKey || hasValue;
  const isPropertie = isValidProperties(key);
  const regex = new RegExp(`${value}`, 'i');
  if (!hasFilters) {
    return array;
  }
  if (!isPropertie) {
    return array;
  }
  if (exclude) {
    return array.filter(item => !regex.test(item[`${key}`]));
  }
  return array.filter(item => regex.test(item[`${key}`]));
};

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

const getPagination = (array, { results = null, page = null } = {}) => {
  const count = array.length;
  const dividend = results === null ? count : results;
  const division = count / dividend;
  const pages = parseInt(division, 10) === division ? division : parseInt(division, 10) + 1;
  const currentPage = page === null ? 1 : page > pages ? pages : page; // eslint-disable-line no-nested-ternary
  const hasPreviousPage = !(currentPage <= 1);
  const hasNextPage = !(currentPage >= pages);
  const previousPage = hasPreviousPage ? currentPage - 1 : null;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const offset = hasPreviousPage ? (currentPage - 1) * results : 0;
  const limit = hasNextPage ? offset + results : count;
  const result = array.slice(offset, limit);
  return {
    info: {
      count,
      pages,
      hasNextPage,
      hasPreviousPage,
      nextPage,
      currentPage,
      previousPage,
    },
    books: result,
  };
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - ROOTVALUE.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 *  NOTE: Resolvers
 *         resolver:  (parent, args, context, info) => data;
 *           parent:  An object that contains  the result returned from the  resolver  on
 *                    the parent type.
 *             args:  An object that contains the arguments passed to the field
 *          context:  An  object  shared by all resolvers in a GraphQL operation. We  use
 *                    the context  to  contain  per-request state  such as authentication
 *                    information and access our data sources.
 *             info:  Information about the execution state of the operation which should
 *                    only be used in advanced cases
 * */
const rootValue = {
  getBooks: async ({ input }) => {
    const hasInputFilter = !!input.filter;
    const hasInputSortBy = !!input.sortBy;
    const hasInputPagination = !!input.pagination;
    return readBooks()
      .then(books => (hasInputFilter ? filter(books, input.filter) : books))
      .then(books => (hasInputSortBy ? books.sort(sortBy(input.sortBy)) : books))
      .then(books => (hasInputPagination ? getPagination(books, input.pagination) : { books }))
      .catch(err => err);
  },
  getBook: async ({ id }) => {
    return readBookById(id)
      .then(book => book[0])
      .catch(err => err);
  },
  createBook: async ({ input }) => {
    return createBook(input)
      .then(book => book)
      .catch(err => err);
  },
  updateBook: async ({ input }) => {
    return updateBookById(input)
      .then(book => book)
      .catch(err => err);
  },
  deleteBook: async ({ id }) => {
    return deleteBookById(id)
      .then(books => books)
      .catch(err => err);
  },
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = rootValue;
