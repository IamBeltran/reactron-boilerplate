/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const devtron = require('devtron');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

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

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const installerPromisify = extension => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  return new Promise((resolve, reject) => {
    installExtension(extension, forceDownload)
      .then(name => resolve(`Added Extension: ${name}`))
      .catch(err => reject(new Error(`Error installing ${extension} extension: ${err.message}`)));
  });
};

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const installExtensions = async () => {
  try {
    devtron.install();
    await installerPromisify(REACT_DEVELOPER_TOOLS).then(success => console.log(success));
    await installerPromisify(REDUX_DEVTOOLS).then(success => console.log(success));
  } catch (error) {
    console.error(error);
  }
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = installExtensions;
