import axios from 'axios'

export const axiosInstance = axios.create({
    headers : {
        baseURL : 'http://localhost:8081',
        'Content-Type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})