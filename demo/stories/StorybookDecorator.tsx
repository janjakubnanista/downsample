import { DecoratorFunction } from '@storybook/addons';
import { GithubCorner } from './components/GithubCorner';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const StorybookDecorator: DecoratorFunction<React.ReactElement> = (storyFn) => {
  return (
    <Container>
      <StorybookDefaultStyle />
      <GithubCorner />

      {storyFn()}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const StorybookDefaultStyle = createGlobalStyle`
  html {
    font-family: 'Source Sans Pro', sans-serif;
    color: #34495e;
  }

  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: #008489;

    &:hover {
      color: #484848
    }
  }

  code {
    padding: 0.2em;
    margin: 0;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    color: #e96900;
  }

  * {
    box-sizing: border-box;
  }
`;
