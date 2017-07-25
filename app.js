import React from 'react';
import ReactDOM from 'react-dom';

import style from './style.css';

import Dashboard from './Dashboard.js';

const App = ({ path = '' }) => {
  return (
    <Dashboard />
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('root'))
  );
});
