import { AuthType, FormAuth } from '../types/authTypes'
import axiosApp from './indexApi'



export class ApiAuth {
  static async register(formAuth: FormAuth) {
    const res = await axiosApp.post<AuthType>('/auth/register', formAuth)
    localStorage.setItem('token', res.data.tokens.accessToken)
    return res.data
  }

  static async login(formAuth: FormAuth) {
    const res = await axiosApp.post<AuthType>('/auth/login', formAuth)
    localStorage.setItem('token', res.data.tokens.accessToken)
    return res.data
  }
  static async logout() {
    const res = await axiosApp.get('/auth/logout')
    localStorage.clear()
    return res.data
  }

  static async initApp() {
    const res = await axiosApp.get<AuthType>('/auth/refresh')
    localStorage.setItem('token', res.data.tokens.accessToken)
    return res.data
  }
}
