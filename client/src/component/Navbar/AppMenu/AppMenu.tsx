import React from 'react'
import ChatIcon from '@mui/icons-material/Chat'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import GroupIcon from '@mui/icons-material/Group'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { LinkItem } from './LinkItem'
import { Drawer } from '../../../commons/Drawer/Drawer'

type AppMenuProps = {
  open: boolean
  toggleDrawer(): void
}

export const AppMenu: React.FC<AppMenuProps> = ({ toggleDrawer, open }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <LinkItem path={'/chat'} title={'Чат'}>
          <ChatIcon />
        </LinkItem>

        <LinkItem path={'/news'} title={'Новини'}>
          <NewspaperIcon />
        </LinkItem>

        <LinkItem path={'/users'} title={'Користувачі'}>
          <GroupIcon />
        </LinkItem>
      </List>
    </Drawer>
  )
}
