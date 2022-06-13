export interface IUsersApi {
  totalCount: number
  items: IUserApi[]
}



export interface IUserApi {
  id: number
  fullName: string
  email: string
  followedByIs: boolean
  followerIs: boolean
  photoUrl: string
}



export type UsersParamsType =  {
  page: number
  filter: {
    term: string
    friend: string
  }
}


