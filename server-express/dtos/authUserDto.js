module.exports = class {
  constructor(model) {
    this.id = model.id
    this.fullName = model.fullName
    this.email = model.email
    this.photoUrl = ''
    if (model.photoName) {
      this.photoUrl = process.env.SERVER_URL + '/' + model.photoName
    }
  }
}
