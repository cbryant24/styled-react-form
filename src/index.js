import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from '@cbryant24/styled-react';
import theme from './theme';
import GlobalStyle from './globalStyle';

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </ErrorBoundary>, 
  document.getElementById('root'))
;