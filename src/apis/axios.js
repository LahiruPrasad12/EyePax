import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_ORIGINAL_URL,
});

if (localStorage.getItem('token')) {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
        'token'
    )}`;
}

export default api

