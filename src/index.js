import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarwarsProvider from './context/StarwarsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StarwarsProvider>
    <App />
  </StarwarsProvider>,
);
