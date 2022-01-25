import { React, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './HomePage'
import Header from './components/Header'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Logout from './components/Logout'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RelativeTablePage from './components/RelativeTablePage'
import { UserContext } from './UserContext'

const [user, setUser] = useState(null)
const value = useMemo(() => ({ user, setUser }), [user, setUser]);
const routing = (

  <Router>
    <React.StrictMode>
      <Header />
      <UserContext.Provider value={value}>
          <Routes>
          <Route exact path="/" element={<App/>} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/table/:url" element={<RelativeTablePage />} />
        </Routes>
      </UserContext.Provider>
    </React.StrictMode>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
