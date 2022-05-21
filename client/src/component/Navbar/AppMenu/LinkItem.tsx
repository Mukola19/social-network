import React from 'react'
import { Link } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'



type LinkItemProps = {
  title: string
  path: string
  children: React.ReactNode
}

export const LinkItem: React.FC<LinkItemProps> = ({ title, path, children }) => {
  return (
    <Link to={path}>
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </Link>
  )
}
