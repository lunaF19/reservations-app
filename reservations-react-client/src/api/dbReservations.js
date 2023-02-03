import axios from 'axios'
import { URL_API } from '../config'

const dbReservations = axios.create({
    baseURL: URL_API,
})

dbReservations.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const { userId: uid } = user || {}
    console.log( { user })
    console.log( { type:"From interceptor", "config.body": config.body})
    config.headers = {
        ...config.headers,
        access_token: localStorage.getItem('token'),
        uid
    }
    return config
})

export default dbReservations;