import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import './input.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  // <StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </ReduxProvider>
  // </StrictMode>
);
