const { User, Friend, Contacts } = require('../models/models')
const UserDto = require('../dtos/userDto')
const fileService = require('../services/fileService')
const ProfileDto = require('../dtos/profileDto')
const sequelize = require('../db')
const ApiError = require('../ApiError/ApiError')
const { Op } = require('sequelize')

class ProfileService {
  async requestProfile(userId, profileId) {
    const user = await User.findOne({
      where: { id: profileId },
      include: [{ model: Contacts, as: 'contacts' }],
    })
    const friends = await Friend.findAll({
      where: {
        [Op.or]: [{ userId: profileId }, { friendId: profileId }],
      },
    })

    if (!user) throw ApiError.notFound()
    const profileDto = new ProfileDto(user, friends, userId)

    return profileDto
  }

  async updateProfile({ userId, fullName, aboutMe, lookingForAJob, contacts }) {
    const user = await User.findOne({ where: { id: userId } })
    if (!user) throw ApiError.badRequest('Не найдено профіль')
    user.fullName = fullName
    user.aboutMe = aboutMe
    user.lookingForAJob = lookingForAJob
    user.save()
    let contactsArray = []

    for (const { id, name, link } of contacts) {
      const contact = await Contacts.findOne({ where: { id, userId } })
      if (!contact) {
        const contactCreate = await Contacts.create({ name, link, userId })
        contactsArray.push(contactCreate)
      } else {
        contact.name = name
        contact.link = link
        contact.save()
        contactsArray.push(contact)
      }
    }

    user.contacts = contactsArray

    const profileDto = new ProfileDto(user)

    return profileDto
  }

  async updatePhoto(userId, photoData) {
    const user = await User.findOne({ where: { id: userId } })
    if (!user) throw ApiError.badRequest('Не найдено профіль')

    const photoName = fileService.save(photoData)

    user.photoName = photoName
    user.save()

    return process.env.SERVER_URL + '/' + photoName
  }
}

module.exports = new ProfileService()
