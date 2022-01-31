import './App.css'
import useAuth from './services/useAuth.js'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import RelativeTablePage from './pages/RelativeTablePage'
import Header from './components/Header'

function RequireAuth({ children }) {
    const { user } = useAuth();

    return user ? (
        children
    ) : (
        <Navigate to="/login" />
    );
}

const App = () => (
  <>
    <Header />
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route exact path="/" element={
            <RequireAuth>
                <HomePage />
            </RequireAuth>
        } />
        <Route path="/table/:url" element={
            <RequireAuth>
                <RelativeTablePage />
            </RequireAuth>
        } />
    </Routes>
  </>
)

export default App
