import { Avatar } from '@mui/material'
import { MUIStyledCommonProps } from '@mui/system'
import React from 'react'

type AppAvatarProps = {
  src?: string
  name?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  disabled?: boolean
  className?: string
  sx:MUIStyledCommonProps
}

export const AppAvatar: React.FC<any> = ({ src, name, ...props }) => {
  if (src) {
    return <Avatar src={src} {...props} />
  }

  if (!name) {
    return <Avatar {...props} />
  }
  return <Avatar {...props}>{name[0].toLocaleUpperCase()}</Avatar>
}
