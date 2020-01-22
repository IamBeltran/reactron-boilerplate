import React from 'react';
import ReactDom from 'react-dom';

const portalRoot05 = document.getElementById('portal-root-05');

const Portal05 = props => {
  const { children } = props;
  return ReactDom.createPortal(
    <React.Fragment key="portal-05">{children}</React.Fragment>,
    portalRoot05,
  );
};

export default Portal05;
