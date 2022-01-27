import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const PrivateRoute = ({ children, ...rest }) => {
    let { user } = useContext(UserContext)
    return (
        !user ? <Navigate to="/login" /> : children
    )
}

export default PrivateRoute;