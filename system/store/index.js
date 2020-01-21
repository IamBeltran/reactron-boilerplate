//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const Store = require('electron-store');
const ObjectID = require('bson-objectid');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const StoreError = require('./StoreError');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const nameStore = 'store';
const serialize = value => JSON.stringify(value, null, 2);
// const encryptionKey = 'oiV32mVp5lOwYneFESjrWq2xFByNOvNj';
const defaults = {
  database: {
    books: [],
  },
};

const bookShema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      title: {
        type: 'string',
      },
      author: {
        type: 'string',
      },
      createAt: {
        type: 'string',
        format: 'date-time',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
      },
    },
    additionalProperties: false,
    required: ['id', 'title', 'author', 'createAt', 'updatedAt'],
  },
};

const schema = {
  database: {
    type: 'object',
    properties: {
      books: bookShema,
    },
    additionalProperties: false,
    required: ['books'],
  },
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const getBsonObjectID = () => ObjectID().toHexString();
const dateToISOString = (date = new Date()) => {
  const tzOffSet = date.getTimezoneOffset() * 60000;
  const unixTime = date.getTime();
  const ISOString = new Date(unixTime - tzOffSet).toISOString();
  const ArrayISOString = ISOString.replace('Z', '').split('T');
  return {
    datetime: ISOString,
    date: ArrayISOString[0],
    time: ArrayISOString[1],
  };
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @author        Victor Giovanni Beltrán Rodríguez
 * @version       2.0.0
 * @description   Create a new Database, class for create
 * @class         Database
 * @extends       {Store}
 */
class DataStore extends Store {
  constructor() {
    super({
      name: nameStore,
      defaults,
      serialize,
      schema,
      // encryptionKey,
    });
    this.database = this.get('database');
  }

  updateDatabase(database) {
    try {
      // NOTE: save database to JSON file
      this.set('database', database);
      this.database = this.get('database');
      // NOTE: returning 'this' allows method chaining
      return this;
    } catch (error) {
      throw new StoreError('DATABASE_UPDATE');
    }
  }

  // NOTE: CRUD - CREATE READ UPDATE DELETE
  createBook(book) {
    try {
      const CREATE_BOOK = {
        id: getBsonObjectID(),
        ...book,
        createAt: dateToISOString().datetime,
        updatedAt: dateToISOString().datetime,
      };
      const { books } = this.database;
      const database = {
        ...this.database,
        books: [...books, CREATE_BOOK],
      };
      this.updateDatabase(database);
      return CREATE_BOOK;
    } catch (error) {
      throw new StoreError('CREATE_BOOK');
    }
  }

  readBooks() {
    return this.database.books;
  }

  readBookById(id) {
    const { books } = this.database;
    const bookExists = books.findIndex(book => book.id === id) !== -1;
    if (!bookExists) {
      throw new StoreError('NO_BOOK_FOUND');
    }
    return books.filter(book => book.id === id);
  }

  updateBookById({ id, title, author }) {
    try {
      const { books } = this.database;
      const bookExists = books.findIndex(book => book.id === id) !== -1;
      if (!bookExists) {
        throw new Error(`no book exists with id ${id}`);
      }
      const bookIndex = books.findIndex(book => book.id === id);
      books[bookIndex].title = title;
      books[bookIndex].author = author;
      books[bookIndex].updatedAt = dateToISOString().datetime;
      const database = {
        ...this.database,
        books,
      };
      this.updateDatabase(database);
      return books[bookIndex];
    } catch (error) {
      throw new Error('ERROR IN DELETE BOOK');
    }
  }

  deleteBookById(id) {
    try {
      const { books } = this.database;
      const bookExists = books.findIndex(book => book.id === id) !== -1;
      if (!bookExists) {
        throw new StoreError('NO_BOOK_FOUND');
      }
      const NEW_BOOKS = books.filter(book => book.id !== id);
      const database = {
        ...this.database,
        books: NEW_BOOKS,
      };
      this.updateDatabase(database);
      return this.database.books;
    } catch (error) {
      throw new StoreError('DELETE_BOOK');
    }
  }
}

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = DataStore;
