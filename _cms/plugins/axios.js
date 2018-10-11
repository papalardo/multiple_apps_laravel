import axios from 'axios'

const configAxios = axios.interceptors.response.use(
    res => {
        return res
    },
    error => {
        if (error.response && 401 === error.response.status && error.response.config.url.search('auth/refresh') > -1) {
            window.location = '/logout';
        } else {
            return Promise.reject(error);
        }
});

export default configAxios
