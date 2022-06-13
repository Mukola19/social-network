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
import { ListItemButtonLink } from '../../../commons/Elements/ListItemButtonLink/ListItemButtonLink'
import { ListItemIcon, ListItemText } from '@mui/material'

import st from './AppMenu.module.scss'

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
  

        <ListItemButtonLink to={'chat'} activeClassName={st.activePage}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Чат" />
        </ListItemButtonLink>

        <ListItemButtonLink to={'news'} activeClassName={st.activePage}>
          <ListItemIcon>
            <NewspaperIcon />
          </ListItemIcon>

          <ListItemText primary="Новини" />
        </ListItemButtonLink>

        <ListItemButtonLink to={'users'} activeClassName={st.activePage}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>

          <ListItemText primary="Користувачі" />
        </ListItemButtonLink>
      </List>
    </Drawer>
  )
}
