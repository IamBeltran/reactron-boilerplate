/* eslint-disable import/no-extraneous-dependencies */
//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE THIRDPARTY DEPENDENCIES MODULES.                                          │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE ELECTRON DEPENDENCIES MODULES.                                            │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const electron = require('electron');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE NODEJS DEPENDENCIES MODULE.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ PATH OF FILES.                                                                    │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ REQUIRE MY DEPENDENCIES MODULES.                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { APP_ICON, APP_NAME } = require('../../configurations');

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DESTRUCTURING DEPENDENCIES.                                                       │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const { app, Menu, Tray } = electron;

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF CONSTANTS-VARIABLES.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘
// Keep a global reference of the appIcon object, if you don't, the appIcon will
// be closed automatically when the JavaScript object is garbage collected.
let appIcon = null;
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Cerrar',
    type: 'normal',
    click: () => {
      app.quit();
    },
  },
]);

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ DECLARATION OF AUXILIARY FUNCTIONS.                                               │
//  └───────────────────────────────────────────────────────────────────────────────────┘

//  ┌───────────────────────────────────────────────────────────────────────────────────┐
//  │ SET MAIN MODULE - [NAME-MODULE].                                                  │
//  └───────────────────────────────────────────────────────────────────────────────────┘
const createTray = () => {
  appIcon = new Tray(APP_ICON);
  appIcon.setToolTip(APP_NAME);
  appIcon.setContextMenu(contextMenu);
};

//  ──[ EXPORT MODULE ]──────────────────────────────────────────────────────────────────
module.exports = createTray;
