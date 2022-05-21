import { User } from 'src/users/users.model'

export class ResUserAuthDto {
  readonly user: Promise<User>
  readonly tokens: {
    refreshToken: string
    accessToken: string
  }
}
