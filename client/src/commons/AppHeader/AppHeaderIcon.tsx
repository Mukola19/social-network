import React from 'react'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'



type HeaderIconProps = {
  badgeContent:number
  children: React.ReactNode
}



export const AppHeaderIcon: React.FC<HeaderIconProps> = ({ badgeContent, children, ...props }) => {
  return (
    <IconButton
      size='large'
      aria-label='show 17 new notifications'
      color='inherit'
      {...props}
    >
      <Badge badgeContent={badgeContent || null} color='error'>
        {children}
      </Badge>
    </IconButton>
  )
}
