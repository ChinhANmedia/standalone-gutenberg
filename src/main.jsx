import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App'
import { RegistryProvider } from "@wordpress/data";

import '@wordpress/components/build-style/style.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RegistryProvider>
      <App />
    </RegistryProvider>
  </React.StrictMode>,
);
