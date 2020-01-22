import React from 'react';
import ReactDom from 'react-dom';

const portalRoot02 = document.getElementById('portal-root-02');

const Portal02 = props => {
  const { children } = props;
  return ReactDom.createPortal(
    <React.Fragment key="portal-02">{children}</React.Fragment>,
    portalRoot02,
  );
};

export default Portal02;
