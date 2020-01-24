import axios from 'axios';

const backendAPI = axios.create({
    baseURL : 'https://metroliteapp.pythonanywhere.com',
    timeout : 10000,
})

export default backendAPI;