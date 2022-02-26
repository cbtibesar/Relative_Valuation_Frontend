import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from '../services/useAuth.js'

export default function Logout() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    useEffect(() => {
        logout()
        navigate('/login')
    }, [])

    return <div></div>;
}