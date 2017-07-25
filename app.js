import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ path = '' }) => {
  return (
    <div className='App'>
      App
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('root'))
  );
});
