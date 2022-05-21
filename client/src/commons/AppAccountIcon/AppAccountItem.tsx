import React from 'react'
import { Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'



type AccountItemProps = {
  path?: string
  children?: React.ReactNode
  title?: string
  onClick? (e: React.MouseEvent<HTMLElement>): void
}


export const AppAccountItem: React.FC<AccountItemProps> = ({ path, children, title, ...props }) => {
  if (path) {
    return (
      <Link to={path || '/'} style={{ color: '#222' }}>
        <MenuItem {...props}>
          <ListItemIcon>{children}</ListItemIcon>
          {title}
        </MenuItem>
      </Link>
    )
  }

  return (
    <MenuItem {...props}>
      <ListItemIcon>{children}</ListItemIcon>
      {title}
    </MenuItem>
  )
}
