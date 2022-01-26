import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import SignUp from './components/SignUp';
import SignIn from './components/Login';
import HomePage from './HomePage';

function App() {

    const {
        user,
        setUser} = useFindUser();

    return (
        <Router>
            <UserContext.Provider value={{ user, setUser }}>
                <Switch>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/table/:url" element={<RelativeTablePage />} />
                </Switch>
            </UserContext.Provider>
        </Router>
    );
}

export default App;