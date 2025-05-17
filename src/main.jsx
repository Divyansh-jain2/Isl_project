import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';   // Assuming you wrote your component in App.jsx
import './style.css';          // If you have custom styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);