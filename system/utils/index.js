//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE UTILS MODULES.                                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const sendNotification = require('./sendNotification');
const installExtensions = require('./installExtensions');

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
const utils = (module.exports = exports = {}); // eslint-disable-line no-multi-assign

// » Main Modules
utils.sendNotification = sendNotification;
utils.installExtensions = installExtensions;
