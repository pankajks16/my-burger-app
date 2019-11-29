import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-789.firebaseio.com/'
});

export default instance;