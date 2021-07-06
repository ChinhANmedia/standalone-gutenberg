import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import '@wordpress/components/build-style/style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
