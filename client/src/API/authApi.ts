import {
  FormAuthType,
  FormChangePassType,
  FormKeyResetPassType,
  FormResetPassType,
  IAuthApi,
} from '../types/authTypes'
import axiosApp, { ResponseType } from './indexApi'

export class ApiAuth {
  static async register(formAuth: FormAuthType) {
    const res = await axiosApp.post<ResponseType<IAuthApi>>('/auth/registration', formAuth)
    localStorage.setItem('token', res.data.data.accessToken)
    return res.data
  }

  static async login(formAuth: FormAuthType) {
    const res = await axiosApp.post<ResponseType<IAuthApi>>('/auth/login', formAuth)
    localStorage.setItem('token', res.data.data.accessToken)
    return res.data
  }
  static async logout() {
    const res = await axiosApp.get('/auth/logout')
    localStorage.removeItem('token')
    return res.data
  }

  static async initApp() {
    const res = await axiosApp.get<ResponseType<IAuthApi>>('/auth/refresh')
    localStorage.setItem('token', res.data.data.accessToken)
    return res.data
  }

  static async changePassword(formData: FormChangePassType) {
    const res = await axiosApp.post<ResponseType>(
      '/auth/changePass',
      formData
    )
    return res.data
  }

  static async getKeyResetPassword(formData: FormKeyResetPassType) {
    const res = await axiosApp.post<ResponseType>(
      '/auth/password/reset/key',
      formData
    )
    return res.data
  }

  static async resetPassword(formData: FormResetPassType) {
    const res = await axiosApp.post<ResponseType>(
      '/auth/password/reset',
      formData
    )
    return res.data
  }
}
