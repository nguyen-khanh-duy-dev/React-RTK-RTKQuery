import axios from "axios"

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
})

// Ở đây sử dụng interceptor để đánh chặn trước khi request được gửi về server. Trc khi gửi thì nó sẽ đính kèm header

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") // Or wherever you store your token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

const get = async (path, config) => {
    const response = await httpClient.get(path, config)
    return response.data
}

const post = async (path, data, config) => {
    const response = await httpClient.post(path, data, config)
    return response.data
}

const put = async (path, data, config) => {
    const response = await httpClient.put(path, data, config)
    return response.data
}

const patch = async (path, data, config) => {
    const response = await httpClient.patch(path, data, config)
    return response.data
}

const del = async (path, config) => {
    const response = await httpClient.delete(path, config)
    return response.data
}

export const http = { get, post, patch, put, del }

export default httpClient
