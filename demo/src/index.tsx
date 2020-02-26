import { render } from 'react-dom';
import App from './app/components/App';
import React from 'react';

const container: HTMLElement = document.getElementById('app');

render(<App />, container);
