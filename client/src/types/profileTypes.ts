export interface IProfileApi {
  id: number
  email: string
  fullName: string
  photoUrl: string
  aboutMe: string
  lookingForAJob: string
  readrsCount: number
  toFollowCount: number
  followedByIs: null
  followerIs: null
  owner: boolean
}

export type ProfileFormValue = {
  email: string
  fullName: string
  aboutMe: string
  photo: File | null
  lookingForAJob: boolean
}
