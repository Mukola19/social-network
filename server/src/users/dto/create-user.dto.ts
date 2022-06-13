export class CreateUserDto {
  readonly fullName: string
  readonly email: string
  readonly password: string
  readonly linkId?: string
}
