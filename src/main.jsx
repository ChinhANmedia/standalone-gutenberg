import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import App from './App'
import { registerCoreBlocks } from "@wordpress/block-library";

import '@wordpress/components/build-style/style.css';

const container = document.getElementById('root');
const root = createRoot(container);

registerCoreBlocks();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
