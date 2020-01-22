import React from 'react';
import ReactDom from 'react-dom';

const portalRoot03 = document.getElementById('portal-root-03');

const Portal03 = props => {
  const { children } = props;
  return ReactDom.createPortal(
    <React.Fragment key="portal-03">{children}</React.Fragment>,
    portalRoot03,
  );
};

export default Portal03;
