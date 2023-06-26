import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL:"http://192.168.100.70:8080/api"
});

export default AxiosInstance;