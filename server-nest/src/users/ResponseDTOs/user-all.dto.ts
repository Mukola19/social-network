import { User } from '../users.model'

export class UserAllDto {
  id: number
  email: string
  fullName: string
  photoName: string
  followerIs: boolean | null
  followedByIs: boolean | null

  constructor(model: User, userId: number) {
    this.id = model.id
    this.email = model.email
    this.fullName = model.fullName
    this.photoName = model.photoName

    this.followerIs = false
    this.followedByIs = false

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
      this.followedByIs = null
      this.followerIs = null
    }
  }
}
