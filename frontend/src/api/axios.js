import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true //ci serve per i cookue di sessione
});

export default instance;