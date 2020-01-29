// ▶ Import react dependecies
import React, { useState } from 'react';

// ▶ Import components
import CreateBook from '../CreateBook';
import ReadBooks from '../ReadBooks';

// ▶ Import containers
import Portal01 from '../../containers/Portal01';
import Portal02 from '../../containers/Portal02';

// ▶ Import Electron
const {
  electron: { ipcRenderer },
} = window;

const Footer = () => {
  const [isOpenPortal01, setIsOpenPortal01] = useState(false);
  const [isOpenPortal02, setIsOpenPortal02] = useState(false);
  const date = new Date();
  const year = date.getFullYear();

  const onOpenPortal01 = () => {
    setIsOpenPortal01(true);
  };

  const onClosePortal01 = () => {
    setIsOpenPortal01(false);
  };

  const onOpenPortal02 = () => {
    setIsOpenPortal02(true);
  };

  const onClosePortal02 = () => {
    setIsOpenPortal02(false);
  };

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
    <footer id="footer-wrapper">
      {isOpenPortal01 && (
        <Portal01>
          <CreateBook onClosePortal01={onClosePortal01} />
        </Portal01>
      )}
      {isOpenPortal02 && (
        <Portal02>
          <ReadBooks onClosePortal02={onClosePortal02} />
        </Portal02>
      )}
      <div id="copyright">© Copyright {year} All rights reserved.</div>
      <div id="portals-wrapper">
        <div>Portals:</div>
        <button type="button" className="btn btn-portal" onClick={onOpenPortal01}>
          Portal 01
        </button>
        <button type="button" className="btn btn-portal" onClick={onOpenPortal02}>
          Portal 02
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
