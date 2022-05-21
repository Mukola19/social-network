import { IProfile } from '../types/profileTypes'
import axiosApp from './indexApi'

export class ProfileApi {
  static async requestUsers(userId: number) {
    const res = await axiosApp.get<IProfile>(`/profile/${userId}`)
    return res.data
  }

  static async updateFoto(photoData: File | undefined) {
    if (!photoData) return ''
    const formData = new FormData()
    formData.append('photo', photoData)

    const res = await axiosApp.put<string>(`/profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  }

  static async deleteFoto() {
    const res = await axiosApp.delete(`/profile/photo`)
    return res.data
  }
}
