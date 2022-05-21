import React from 'react'
import Typography from '@mui/material/Typography'

 type HeaderTitleProps = {
   title: string
 }



export const AppHeaderTitle: React.FC<HeaderTitleProps> = ({ title }) => {
  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      {title}
    </Typography>
  )
}
