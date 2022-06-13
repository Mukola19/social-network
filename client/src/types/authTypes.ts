export type IAuthApi = {
  id: number
  email: string
  fullName: string
  photoUrl: string
  accessToken: string
}

export type FormAuthType = {
  fullName?: string
  email: string
  password: string
}

export type FormChangePassType = {
  oldPassword: string
  newPassword: string
  repeatNewPassword: string
}

export type FormResetPassType = {
  key: number
  newPassword: string
  repeatNewPassword: string
}




export type FormKeyResetPassType = {
  email: string

}


