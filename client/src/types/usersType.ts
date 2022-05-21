export interface IUser {
  id: number
  fullName: string
  email: string
  followed: boolean
  photoUrl: string
}

export interface IUsersParams {
  page: number
  filter: {
    term: string
    friend: string
  }
}
