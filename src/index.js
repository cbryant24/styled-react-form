import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from '@cbryant24/styled-react';
import theme from './theme';

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ErrorBoundary>, 
  document.getElementById('root'))
;