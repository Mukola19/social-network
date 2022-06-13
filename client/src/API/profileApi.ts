import { IProfileApi, ProfileFormValue } from '../types/profileTypes'
import axiosApp, { ResponseType } from './indexApi'

export class ProfileApi {
  static async requestUsers(userId: number) {
    const res = await axiosApp.get<ResponseType<IProfileApi>>(
      `/profile/${userId}`
    )
    return res.data
  }

  static async updateFoto(photoData: File | undefined) {
    if (!photoData)
      return { message: 'Cталась помилка', data: {} } as ResponseType<{
        photoUrl: string
      }>
    const formData = new FormData()
    formData.append('photo', photoData)

    const res = await axiosApp.put<ResponseType<{ photoUrl: string }>>(
      `/profile/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return res.data
  }

  static async deleteFoto() {
    const res = await axiosApp.delete<ResponseType>(`/profile/photo`)
    return res.data
  }

  static async upadeteProfile(data: ProfileFormValue) {
    const formData = new FormData()
    data.photo && formData.append('photo', data.photo)
    formData.append('fullName', data.fullName)
    formData.append('aboutMe', data.aboutMe)
    formData.append('email', data.email)
    formData.append('lookingForAJob', JSON.stringify(data.lookingForAJob))

    const res = await axiosApp.put<ResponseType<IProfileApi>>(
      `/profile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return res.data
  }
}
