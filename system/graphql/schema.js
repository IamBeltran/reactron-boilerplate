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
//  │ SET MAIN MODULE - SCHEMA.                                                         │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const schema = buildSchema(`
  # SECTION: ENUM
  enum Key {
    id
    title
    author
    year
    country
    language
  }
  # !SECTION

  # SECTION: CUSTOM SCALAR
  scalar Value

  type Book {
    id: ID!
    title: String!
    author: String!
    createAt: String!
    updatedAt: String!
  }

  type Info {
    count: Int!
    pages: Int!
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    nextPage: Int
    currentPage: Int
    previousPage: Int
  }

  type Error {
    name: String!
    message: String!
  }
  # !SECTION

  # SECTION: INPUTS
  input Filter {
    key: Key!
    value: Value!
    exclude: Boolean!
  }

  input SortBy {
    key: Key!
    asc: Boolean!
  }

  input Pagination {
    results: Int
    page: Int
  }

  input GetBooksInput {
    filter: Filter
    sortBy: SortBy
    pagination: Pagination
  }

  input GetBookInput {
    id: ID!
  }

  input CreateBookInput {
    title: String!
    author: String!
    year: Int!,
    country: String!
    language: String!
  }

  input UpdateBookInput {
    id: ID!
    title: String!
    author: String!
    year: Int!,
    country: String!
    language: String!
  }

  input DeleteBookInput {
    id: ID!
  }
  # !SECTION

  # SECTION: OUTPUTS
  type GetBooksOutput {
    info: Info
    books: [Book]
  }
  # !SECTION

  # SECTION: QUERYS
  type Query {
    getBooks(input: GetBooksInput): GetBooksOutput
    getBook(input: GetBookInput): Book
  }
  # !SECTION

  # SECTION: MUTATIONS
  type Mutation {
    createBook(input: CreateBookInput): Book
    updateBook(input: UpdateBookInput): Book
    deleteBook(input: DeleteBookInput): [Book]
  }
  # !SECTION

  # SECTION: SCHEMA
  schema {
    query: Query
    mutation: Mutation
  }
  # !SECTION
`);
//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = schema;
