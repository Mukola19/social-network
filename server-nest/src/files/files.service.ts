import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg'

      // console.log(path.extname(file))

      const filePath = path.resolve(__dirname, '..', 'static')

      if (!(await this.exists(filePath))) {
        await fs.mkdir(filePath, { recursive: true })
      }

      await fs.writeFile(path.join(filePath, fileName), file.buffer)
      return fileName
    } catch (e) {
      console.log(e)

      throw new HttpException(
        'Сталася помилка при записі файла',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async deleteFile(fileName: string): Promise<boolean> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static')

      if (!(await this.exists(filePath))) {
        throw new HttpException(
          'Сталася помилка при видалині ',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }

      await fs.unlink(path.join(filePath, fileName))

      return true
    } catch (e) {
      throw new HttpException(
        'Сталася помилка при видалині файла',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async exists(path) {
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
  }
}
