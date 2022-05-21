export interface FormAuth {
  fullName?: string
  email: string
  password: string
}

export interface AuthType {
  id: number
  email: string
  fullName: string
  photoUrl: string
  tokens: {
    accessToken: string
    refreshToken: string
  }
}
