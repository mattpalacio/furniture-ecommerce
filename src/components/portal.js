import React from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

const Portal = ({ children }) => {
  const portalRoot =
    document !== undefined ? document.getElementById('portal') : null;

  return createPortal(<Wrapper>{children}</Wrapper>, portalRoot);
};

export default Portal;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
