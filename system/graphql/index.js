//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE GRAPHQL MODULES.                                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const schema = require('./schema');
const rootValue = require('./rootValue');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const graphQL = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// » Main Modules
graphQL.schema = schema;
graphQL.rootValue = rootValue;
