//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const graphql = require('graphql');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { buildSchema } = graphql;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const schema = buildSchema(`

  # SECTION: TYPE INPUTS
  input CreateBookInput {
    title: String!
    author: String!
  }

  input UpdateBookInput {
    id: ID!
    title: String!
    author: String!
  }

  input DeleteBookInput {
    id: ID!
  }
  # !SECTION

  # SECTION: TYPE OUTPUTS
  type CreateBookOutput {
    ok: Boolean!
    error: String
    book: Book
  }

  type GetBookOutput {
    ok: Boolean!
    error: String
    book: Book
  }
  # !SECTION

  # SECTION: TYPE OUTPUTS
  # This "Book" type can be used in other type declarations.
  type Book {
    id: ID!
    title: String!
    author: String!
    createAt: String!
    updatedAt: String!
  }

  type Error {
    name: String!
    message: String!
  }

  # SECTION: QUERY
  type Query {
    books: [Book]
    getBook(id: ID!): Book
  }
  # !SECTION

  # SECTION: MUTATIONS
  type Mutation {
    createBook(input: CreateBookInput): Book
    updateBook(input: UpdateBookInput): Book
    deleteBook(input: DeleteBookInput): [Book]
  }
  # !SECTION
`);

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = schema;
