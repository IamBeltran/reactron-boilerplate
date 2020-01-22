import React from 'react';
import ReactDom from 'react-dom';

const portalRoot04 = document.getElementById('portal-root-04');

const Portal04 = props => {
  const { children } = props;
  return ReactDom.createPortal(
    <React.Fragment key="portal-04">{children}</React.Fragment>,
    portalRoot04,
  );
};

export default Portal04;
