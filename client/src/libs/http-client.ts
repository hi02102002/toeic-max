import axios from 'axios'

export const http_client = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: import.meta.env.VITE_API_URL,
})

http_client.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

http_client.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        return Promise.reject(error)
    },
)
