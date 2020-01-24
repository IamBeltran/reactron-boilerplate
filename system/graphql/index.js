//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE GRAPHQLUTILS MODULES.                                                     │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const schema = require('./schema');
const rootValue = require('./rootValue');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const graphQLUtils = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// » Main Modules
graphQLUtils.schema = schema;
graphQLUtils.rootValue = rootValue;
