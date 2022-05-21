import React from 'react'
import MailIcon from '@mui/icons-material/Mail'
import { AppHeaderIcon } from '../../../commons/AppHeader/AppHeaderIcon'
import { AppHeaderTitle } from '../../../commons/AppHeader/AppHeaderTitle'
import { AccountMenu } from './AccountMenu'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { AppBar } from '../../../commons/AppBar/AppBar'

type HeaderProps = {
  open: boolean
  toggleDrawer: () => void
}

export const Header: React.FC<HeaderProps> = ({ open, toggleDrawer }) => {
  return (
    <AppBar position="absolute"  open={open}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <AppHeaderTitle title={'Network'} />

        <AppHeaderIcon badgeContent={0}>
          <MailIcon />
        </AppHeaderIcon>

        <AppHeaderIcon badgeContent={0}>
          <NotificationsIcon />
        </AppHeaderIcon>

        <AccountMenu />
      </Toolbar>
    </AppBar>
  )
}
