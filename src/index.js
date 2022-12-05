import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StarwarsProvider from './context/StarwarsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter>
  <StarwarsProvider>
    <App />
  </StarwarsProvider>,
  // </BrowserRouter>,
);
