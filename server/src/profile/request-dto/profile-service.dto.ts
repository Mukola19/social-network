import { IsString, IsEmail, IsBoolean } from 'class-validator'

export class ProfileServiceDto {
  readonly fullName: string

  readonly email: string

  readonly aboutMe: string

  readonly lookingForAJob: boolean
}
