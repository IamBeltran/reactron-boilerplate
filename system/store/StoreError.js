//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const storeErrors = {
  // SECTION: OPERATIONS
  CREATE_BOOK: 'Error to create book',
  UPDATE_BOOK: 'Error to update book',
  DELETE_BOOK: 'Error to delete book',
  READ_BOOKS: 'Error to read books',
  READ_BOOK: 'Error to read book with that id',
  // !SECTION

  // SECTION: PARAMS
  INVALID_ID_BOOK: 'Error, no book found with that id',
  EMPTY_VALUES_CREATEBOOK: 'Error, require author and title',
  EMPTY_VALUES_UPDATEBOOKBYID: 'Error, require id book, author and title',
  ONLY_AUTHOR: 'Error, require id book and title',
  ONLY_TITLE: 'Error, require id book and author',
  ONLY_ID: 'Error, require author and title',
  ID_EMPTY: 'Error, require id Book value',
  AUTHOR_EMPTY: 'Error, require author value',
  TITLE_EMPTY: 'Error, require title value',
  YEAR_EMPTY: 'Error, require year value',
  COUNTRY_EMPTY: 'Error, require country value',
  LANGUAGE_EMPTY: 'Error, require language value',
  // !SECTION
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - STOREERROR.                                                     │
//  └───────────────────────────────────────────────────────────────────────────────────┘
/**
 * @author        Victor Giovanni Beltrán Rodríguez
 * @version       2.0.0
 * @description   Create a new StoreError
 * @class         StoreError
 * @extends       {Error}
 */
class StoreError extends Error {
  /**
   * @param   {String} [error='Default error message'] - Name of error
   * @param   {Object} addInfo - Additional error information
   */
  constructor(error = 'Default error message', addInfo) {
    super();
    const ERRORS = storeErrors;
    const message = ERRORS[`${error}`] ? ERRORS[`${error}`] : error;
    this.name = 'StoreError';
    this.message = message;
    const $this = this;
    if (addInfo && Object.entries(addInfo).length !== 0 && addInfo.constructor) {
      Object.getOwnPropertyNames(addInfo).forEach(value => {
        if (value === 'name') {
          $this.originalNameError = addInfo[value];
        } else if (value === 'stack') {
          $this.originalStackError = addInfo[value];
        } else {
          $this[value] = addInfo[value];
        }
      });
    }
  }
}

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = StoreError;
