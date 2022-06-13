import { IUsersApi, UsersParamsType } from '../types/usersType'
import axiosApp, { ResponseType } from './indexApi'

type ParamsTypes = UsersParamsType & {
  count: number
}

export class UsersApi {
  static async requestUsers(usersParams: ParamsTypes) {
    const {
      filter: { term, friend },
      page,
      count,
    } = usersParams

    let params: any = {}
    if (page !== 1) params.page = page
    if (count !== 10) params.count = count
    if (term) params.term = term
    params.friend = friend

    const res = await axiosApp.get<ResponseType<IUsersApi>>('/users', { params })
    return res.data
  }

  static async follow(userId: number) {
    const res = await axiosApp.post<ResponseType<boolean>>(`/friends/${userId}`)
    return res.data
  }
  static async unfollow(userId: number) {
    const res = await axiosApp.delete<ResponseType<boolean>>(`/friends/${userId}`)
    return res.data
  }
}
