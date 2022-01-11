import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Header from './components/Header'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Logout from './components/Logout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RelativeTablePage from './components/RelativeTablePage'


const routing = (
  <Router>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route exact path="/" element={<App/>} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/table/:url" element={<RelativeTablePage />} />
      </Routes>
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
