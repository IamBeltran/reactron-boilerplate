// ▶ Import react dependecies
import React from 'react';

// ▶ Import components

// ▶ Import Electron
const {
  electron: { ipcRenderer },
} = window;

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const openModal01 = () => {};
  const openModal02 = () => {};

  const sendInfoNotification = () => {
    ipcRenderer.send('send-info-notification', {
      title: 'Reactron',
      message: 'I am a Information Notification',
    });
    return ipcRenderer.removeAllListeners(['send-info-notification']);
  };

  const sendWarnNotification = () => {
    ipcRenderer.send('send-warn-notification', {
      title: 'Reactron',
      message: 'I am a Warning Notification',
    });
    return ipcRenderer.removeAllListeners(['send-warn-notification']);
  };

  const sendErrorNotification = () => {
    ipcRenderer.send('send-error-notification', {
      title: 'Reactron',
      message: 'I am a Error Notification',
    });
    return ipcRenderer.removeAllListeners(['send-error-notification']);
  };

  return (
    <footer id="footer-wrapper" className="">
      <div id="copyright">© Copyright {year} All rights reserved.</div>
      <div id="modals">
        <div>Modals:</div>
        <button type="button" className="btn btn-light" onClick={openModal01}>
          Modal 01
        </button>
        <button type="button" className="btn btn-light" onClick={openModal02}>
          Modal 02
        </button>
      </div>
      <div id="notifications">
        <div>Notifications:</div>
        <button type="button" className="btn btn-info" onClick={sendInfoNotification}>
          Information
        </button>
        <button type="button" className="btn btn-warn" onClick={sendWarnNotification}>
          Warning
        </button>
        <button type="button" className="btn btn-error" onClick={sendErrorNotification}>
          Error
        </button>
      </div>
    </footer>
  );
};

export default Footer;
