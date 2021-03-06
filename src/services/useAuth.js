import {createContext, useContext, React, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from './authHeader'

const authContext = createContext()


function useAuth() {
    const [user, setUser] = useState(()=>(
        localStorage.getItem('access_token') ? true : false
    ))
    const navigate = useNavigate()

    return {
        user,
        async login(email, password) {
            const res = await axiosInstance
                .post('token/', {
                    email: email,
                    password: password
                })
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token')
            setUser(true)
            return res.data
        },

        logout() {
            axiosInstance
                .post('user/logout/blacklist/', {
                    refresh_token: localStorage.getItem('refresh_token'),
                });
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            setUser(false)
        },

        async register(email, username, password) {
            const res = await axiosInstance
                .post(`user/register/`, {
                    email: email,
                    username: username,
                    password: password
                }).then(() => {
                    navigate('/login')
                })
        }

    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
