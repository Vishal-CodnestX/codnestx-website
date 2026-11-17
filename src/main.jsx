import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/animations.css';

const rootEl = document.getElementById('react-vite-root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
