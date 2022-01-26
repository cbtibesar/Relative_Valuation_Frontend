
import { useContext } from 'react';
import axiosInstance from '../axios';
import { UserContext } from '../UserContext';

const baseURL = 'http://127.0.0.1:8000/api/';

const { setUser } = useContext(UserContext)

class AuthService {

    async login(email, password){
        const res = await axiosInstance
            .post(`token/`, {
                email: email,
                password: password
            });
        if (response.data.accessToken) {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');
        }
        setUser(res.data.accessToken);
        return response.data;
    }

    logout(){
        axiosInstance
            .post('user/logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        setUser(null)
    }

    async register(username, email, password){
        await axiosInstance
            .post(`user/register/`, {
                email: email,
                username: username,
                password: password,
            });
        navigate('/login');
    }
}