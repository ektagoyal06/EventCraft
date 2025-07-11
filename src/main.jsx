import React from 'react';
import ReactDOM from 'react-dom/client';
// ✅ Use HashRouter for GitHub Pages
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
);
