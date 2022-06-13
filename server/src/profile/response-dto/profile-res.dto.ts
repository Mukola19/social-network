import { User } from 'src/users/users.model'

export class ProfileResDto {
  id: number
  email: string
  fullName: string
  photoUrl = '' as string
  lookingForAJob: boolean
  aboutMe: string
  followerIs = false as boolean | null 
  followedByIs = false as boolean | null
  readrsCount = 0 as number
  toFollowCount = 0 as number
  owner = false as boolean

  constructor(model: User, userId: number) {
    this.id = model.id
    this.email = model.email
    this.fullName = model.fullName
    this.lookingForAJob = model.lookingForAJob
    this.aboutMe = model.aboutMe

    this.readrsCount = model.followedBy.length
    this.toFollowCount = model.follower.length

    model.follower.forEach((item) => {
      if (item.followedById === userId) {
        this.followerIs = true
      }
    })

    model.followedBy.forEach((item) => {
      if (item.followerId === userId) {
        this.followedByIs = true
      }
    })

    if (this.id === userId) {
      this.followerIs = null
      this.followedByIs = null
      this.owner = true
    }

    // photo
    if (model.photoName) {
      this.photoUrl = process.env.SERVER_URL + '/' + model.photoName
    }
  }
}
