export interface IProfile {
  id: number | null
  aboutMe: string
  contacts: IContact[]
  lookingForAJob: string
  photoUrl: string
  fullName: string
  followed: boolean
  readrsCount: number
  toFollowCount: number
  owner: boolean
}

export interface IContact {
  id: number
  name: string
  link: string
}
