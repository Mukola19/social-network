const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  linkId: { type: DataTypes.STRING }, //для активації пошти
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false }, // чи активована пошта
  photoName: { type: DataTypes.STRING, defaultValue: '' },
  fullName: { type: DataTypes.STRING },
  aboutMe: { type: DataTypes.STRING, defaultValue: '' },
  lookingForAJob: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Contacts = sequelize.define('contacts', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  link: { type: DataTypes.STRING },
})

const Token = sequelize.define('token', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING },
})

const Friend = sequelize.define('friend', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasMany(
  Friend,
  {
    foreignKey: 'friendId',
  },
  { as: 'friends' }
)
Friend.belongsTo(User)

User.hasMany(Contacts, { as: 'contacts' })
Contacts.belongsTo(User)

module.exports = {
  User,
  Token,
  Friend,
  Contacts,
}
