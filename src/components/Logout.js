
import React, { useEffect } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        AuthService.logout()
        navigate('/login')
    });

    return <div></div>;
}