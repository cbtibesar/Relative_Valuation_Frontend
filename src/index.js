import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './services/useAuth'
import App from './App';


const routing = (
    <React.StrictMode>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));
