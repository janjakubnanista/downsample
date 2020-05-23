import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const AppLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <StorybookDefaultStyle />

      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const StorybookDefaultStyle = createGlobalStyle`
  html {
    font-family: Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;
