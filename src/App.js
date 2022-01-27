import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import SignUp from './components/SignUp';
import SignIn from './components/Login';
import HomePage from './HomePage';
import { useContext, useState, useMemo } from 'react';
import PrivateRoute from './services/PrivateRoute';
import RelativeTablePage from './components/RelativeTablePage'


function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);
    return (
        <Router>
            <UserContext.Provider value={value}>
                <Routes>
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<SignIn />} />
                    {/* <PrivateRoute path="/table/:url" element={<RelativeTablePage />} /> */}
                    <Route exact path="/" element={<PrivateRoute components={<HomePage />} />} />
                </Routes>
            </UserContext.Provider>
        </Router>
    );
}

export default App;