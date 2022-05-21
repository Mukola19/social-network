module.exports = class {
  constructor(model, userId) {
    this.id = model.id
    this.fullName = model.fullName
    this.email = model.email
    this.followed = false
    this.photoUrl = ''
    model.friends.forEach((friend) => {
      if (friend.friendId === this.id && friend.userId === userId) {
        this.followed = true
      }
    })
    if (this.id === userId) {
      this.followed = null
    }

    //photo

    if (model.photoName) {
      this.photoUrl = process.env.SERVER_URL + '/' + model.photoName
    }
  }
}
