import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL + '/api',
  withCredentials: true,
})

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) {
    // req.headers.common.Authorization = `Bearer ${token}`
    req.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  return req
})

export default instance
