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
      year: {
        type: 'number',
      },
      country: {
        type: 'string',
      },
      language: {
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
    required: ['id', 'title', 'author', 'year', 'country', 'language', 'createAt', 'updatedAt'],
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
/**
 * @author        Victor Giovanni Beltrán Rodríguez
 * @name          getBsonObjectID
 * @description   Function that return a string BsonObjectID
 * @returns       {string} BsonObject - Date information
 */
const getBsonObjectID = () => ObjectID().toHexString();

/**
 * @author        Victor Giovanni Beltrán Rodríguez
 * @name          dateToISOString
 * @description   Function that return a object with date information
 * @param         {Date} date - Date for return of the object with date information
 * @returns       {{ datetime: string, date: string, time: string }} ISOString - Date information
 */
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
//  │ SET MAIN MODULE - DATASTORE.                                                      │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// NOTE: CRUD - CREATE READ UPDATE DELETE
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

  updateDatabase(database, operation) {
    try {
      // NOTE: save database to JSON file
      this.set('database', database);
      this.database = this.get('database');
      // NOTE: returning 'this' allows method chaining
      return this;
    } catch (error) {
      throw new Error(`${operation}_BOOK`);
    }
  }

  createBook({ title = '', author = '', year = '', country = '', language = '' } = {}) {
    try {
      const hasTitle = !!title;
      const hasAuthor = !!author;
      const hasYear = !!year;
      const hasCountry = !!country;
      const hasLanguage = !!language;
      if (!hasTitle && !hasAuthor) throw new Error('EMPTY_VALUES_CREATEBOOK');
      if (!hasTitle) throw new Error('TITLE_EMPTY');
      if (!hasAuthor) throw new Error('AUTHOR_EMPTY');
      if (!hasYear) throw new Error('YEAR_EMPTY');
      if (!hasCountry) throw new Error('COUNTRY_EMPTY');
      if (!hasLanguage) throw new Error('LANGUAGE_EMPTY');

      const CREATE_BOOK = {
        id: getBsonObjectID(),
        title,
        author,
        year,
        country,
        language,
        createAt: dateToISOString().datetime,
        updatedAt: dateToISOString().datetime,
      };
      const { books } = this.database;
      const database = {
        ...this.database,
        books: [...books, CREATE_BOOK],
      };
      this.updateDatabase(database, 'CREATE');
      return CREATE_BOOK;
    } catch (error) {
      throw new StoreError(error.message);
    }
  }

  readBooks() {
    try {
      return this.database.books;
    } catch (error) {
      return new StoreError('READ_BOOKS');
    }
  }

  readBookById(id) {
    try {
      const hasId = !!id;
      if (!hasId) throw new Error('ID_EMPTY');
      const { books } = this.database;
      const bookExists = books.findIndex(book => book.id === id) !== -1;
      if (!bookExists) throw new Error('INVALID_ID_BOOK');
      return books.filter(book => book.id === id);
    } catch (error) {
      throw new StoreError(error.message);
    }
  }

  updateBookById({
    id = '',
    title = '',
    author = '',
    year = '',
    country = '',
    language = '',
  } = {}) {
    try {
      const hasId = !!id;
      const hasTitle = !!title;
      const hasAuthor = !!author;
      const hasYear = !!year;
      const hasCountry = !!country;
      const hasLanguage = !!language;
      if (!hasId && !hasTitle && !hasAuthor && !hasYear && !hasCountry && !hasLanguage) {
        throw new Error('EMPTY_VALUES_UPDATEBOOKBYID');
      }
      if (!hasId) throw new Error('ID_EMPTY');
      if (!hasTitle) throw new Error('TITLE_EMPTY');
      if (!hasAuthor) throw new Error('AUTHOR_EMPTY');
      if (!hasYear) throw new Error('YEAR_EMPTY');
      if (!hasCountry) throw new Error('COUNTRY_EMPTY');
      if (!hasLanguage) throw new Error('LANGUAGE_EMPTY');

      const { books } = this.database;
      const bookExists = books.findIndex(book => book.id === id) !== -1;
      if (!bookExists) throw new Error('INVALID_ID_BOOK');
      const bookIndex = books.findIndex(book => book.id === id);
      books[bookIndex].title = title;
      books[bookIndex].author = author;
      books[bookIndex].year = year;
      books[bookIndex].country = country;
      books[bookIndex].language = language;
      books[bookIndex].updatedAt = dateToISOString().datetime;
      const database = {
        ...this.database,
        books,
      };
      this.updateDatabase(database, 'UPDATE');
      return books[bookIndex];
    } catch (error) {
      throw new StoreError(error.message);
    }
  }

  deleteBookById(id) {
    try {
      const hasId = !!id;
      if (!hasId) throw new Error('ID_EMPTY');
      const { books } = this.database;
      const bookExists = books.findIndex(book => book.id === id) !== -1;
      if (!bookExists) throw new Error('INVALID_ID_BOOK');
      const NEW_BOOKS = books.filter(book => book.id !== id);
      const database = {
        ...this.database,
        books: NEW_BOOKS,
      };
      this.updateDatabase(database, 'DELETE');
      return this.database.books;
    } catch (error) {
      throw new StoreError(error.message);
    }
  }
}

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ STORE.                                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const store = new DataStore();

// NOTE: the callback is (newValue, oldValue)
// store.onDidChange('database.books', () => {
//   loggerWithLabel('Success', 'Update books in store');
// });

const createBook = book => {
  return new Promise((resolve, reject) => {
    try {
      const createdBook = store.createBook(book);
      return resolve(createdBook);
    } catch (error) {
      return reject(error);
    }
  });
};

const readBooks = () => {
  return new Promise((resolve, reject) => {
    try {
      const books = store.readBooks();
      return resolve(books);
    } catch (error) {
      return reject(error);
    }
  });
};

const readBookById = id => {
  return new Promise((resolve, reject) => {
    try {
      const book = store.readBookById(id);
      return resolve(book[0]);
    } catch (error) {
      return reject(error);
    }
  });
};

const updateBookById = book => {
  return new Promise((resolve, reject) => {
    try {
      const updated = store.updateBookById(book);
      return resolve(updated);
    } catch (error) {
      return reject(error);
    }
  });
};

const deleteBookById = id => {
  return new Promise((resolve, reject) => {
    try {
      const books = store.deleteBookById(id);
      return resolve(books);
    } catch (error) {
      return reject(error);
    }
  });
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const database = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

database.path = store.path;
database.createBook = createBook;
database.readBooks = readBooks;
database.readBookById = readBookById;
database.updateBookById = updateBookById;
database.deleteBookById = deleteBookById;
