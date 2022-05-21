module.exports = class {
  constructor(user, friends, userId) {
    this.id = user.id
    this.email = user.email
    this.fullName = user.fullName
    this.photoUrl = ''
    this.lookingForAJob = user.lookingForAJob
    this.aboutMe = user.aboutMe
    this.contacts = user.contacts.map((contact) => new ContactsDto(contact))
    this.followed = false
    this.readrsCount = 0
    this.toFollowCount = 0
    this.owner = false

    friends.forEach((friend) => {
      if (friend.friendId === this.id && friend.userId === userId) {
        this.followed = true
      }

      if (this.id === friend.friendId) {
        this.readrsCount++
      }
      if (this.id === friend.userId) {
        this.toFollowCount++
      }
    })
    if (this.id === userId) {
      this.followed = null
      this.owner = true
    }


    // photo 
    if(user.photoName) {
      this.photoUrl =  process.env.SERVER_URL + '/' + user.photoName

    }
  }
}

class ContactsDto {
  constructor(model) {
    this.id = model.id
    this.name = model.name
    this.link = model.link
  }
}
