import axios from 'axios';

const apiSpace = axios.create({
    baseURL: 'http://localhost:3003'
});

export default apiSpace;