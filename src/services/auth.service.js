
import { useNavigate } from 'react-router-dom';
import axiosInstance from './authHeader';



class AuthService {


    login(e, p){
        return axiosInstance
            .post('token/', {
                email: e,
                password: p
            })
            .then((res) => {
                if(res.data.access){
                    localStorage.setItem('access_token', res.data.access)
                    localStorage.setItem('refresh_token', res.data.refresh)
                }
                return res.data;
            })
    }

    logout(){
        axiosInstance
            .post('user/logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        axiosInstance.defaults.headers['Authorization'] = null;
    }

    register(username, email, password){
        return axiosInstance
            .post(`user/register/`, {
                    email: email,
                    username: username,
                    password: password,
            })
    }
}

export default new AuthService()