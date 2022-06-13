import axios from 'axios'
import { IAuthApi } from '../types/authTypes'

export type ResponseType<T = {}> = {
  message: string
  statusCode?: number
  data: T
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + '/api',
  withCredentials: true,
})

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    req.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  return req
})

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        const res = await axios.get<ResponseType<IAuthApi>>(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/refresh`,
          { withCredentials: true }
        )
        localStorage.setItem('token', res.data.data.accessToken)

        return instance.request(originalRequest)
      } catch (e) {
        return {
          message: 'Не авторизований',
          statusCode: error.response.status,
        }
      }
    }

    throw error
  }
)

instance.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data)
    }

    if (err.request) {
      return Promise.reject(err.request)
    }

    return Promise.reject(err.message)
  }
)

export default instance
