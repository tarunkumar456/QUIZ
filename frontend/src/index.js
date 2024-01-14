import { ChakraProvider } from '@chakra-ui/react';
import './index.css'
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
root.render(
  // <StrictMode>

  <ChakraProvider>
    {/* <ColorModeSwitcher /> */}
    <AlertProvider template={AlertTemplate}{...options}>
      <App />
    </AlertProvider>
  </ChakraProvider>

  // </StrictMode>
);


