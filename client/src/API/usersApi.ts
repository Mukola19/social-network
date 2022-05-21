import { IUser, IUsersParams } from '../types/usersType'
import axiosApp from './indexApi'

interface IUsersApi {
  totalCount: number
  items: IUser[]
}

type ParamsTypes = {
  count: number
  page: number
  filter: {
    term: string
    friend: string
  }
}

export class UsersApi {
  static async requestUsers(usersParams: ParamsTypes) {
    const { filter: { term, friend }, page, count } = usersParams

    let params: any = {  }
    if (page !== 1) params.page = page
    if (count !== 10) params.count = count
    if (term) params.term = term
    params.friend = friend
    

    const res = await axiosApp.get<IUsersApi>('/users', { params })
    return res.data
  }

  static async follow(userId: number) {
    const res = await axiosApp.post<boolean>(`/follow/${userId}`)
    return res.data
  }
  static async unfollow(userId: number) {
    const res = await axiosApp.delete<boolean>(`/follow/${userId}`)
    return res.data
  }
}
