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
// const bookProperties = ['id', 'title', 'author', 'year', 'country', 'language'];

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// const isValidProperties = propertie => bookProperties.includes(propertie);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
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
  createBook: async ({ input }) => {
    return createBook(input)
      .then(book => book)
      .catch(err => err);
  },
  books: async () => {
    return readBooks()
      .then(books => books)
      .catch(err => err);
  },
  getBook: async ({ id }) => {
    return readBookById(id)
      .then(book => book[0])
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
