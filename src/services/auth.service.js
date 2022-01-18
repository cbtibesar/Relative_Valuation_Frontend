
import axiosInstance from '../axios';

const baseURL = 'http://127.0.0.1:8000/api/';

class AuthService {
    login(email, password){
        return axiosInstance
            .post(`token/`, {
                email: email,
                password: password
            })
            .then((res) => {
                if (response.data.accessToken) {
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + localStorage.getItem('access_token');
                }
                return response.data
            })
    }

    logout(){
        axiosInstance
            .post('user/logout/blacklist/', {
                refresh_token: localStorage.getItem('refresh_token'),
            });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
    }

    register(username, email, password){
        return axiosInstance
            .post(`user/register/`, {
                    email: email,
                    username: username,
                    password: password,
                })
            .then(() => {
                    navigate('/login')
            });
    }
}