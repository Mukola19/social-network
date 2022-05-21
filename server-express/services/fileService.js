const { v4 } = require('uuid')
const { unlink } = require('fs')
const path = require('path')

class FileService {
  save(photo) {
    const photoName = v4() + '.jpg'

    if (!photo) return 'Немає фото'
    photo.mv(path.join(__dirname, '..', 'static', photoName))

    return photoName
  }

  delete(photoName) {
    unlink(path.join(__dirname, '..', 'static', photoName), (err) => {
      if (err) return 'Помилка'
    })
    return 'foto deleted'
  }
}

module.exports = new FileService()
