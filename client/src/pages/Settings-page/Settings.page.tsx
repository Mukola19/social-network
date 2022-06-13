import React from 'react'
import { Outlet } from 'react-router-dom'
import { Grid, Paper, List, ListItemText } from '@mui/material'
import { useAppSelector } from '../../hooks/typingHooks'
import { getAuthId } from '../../redux/selectors/authSelector'
import { ListItemButtonLink } from '../../commons/Elements/ListItemButtonLink/ListItemButtonLink'
import st from './Settings.page.module.scss'



export const SettingsPage: React.FC = () => {

  return (
    <Grid className={st.container} container spacing={2} component={Paper}>
      <Grid item xs={3} className={st.menuList}>
        <List component="nav">
          <ListItemButtonLink to={'profile'} activeClassName={st.activePage}>
            <ListItemText primary="Редагувати профіль" />
          </ListItemButtonLink>

          <ListItemButtonLink
            to={'password/change'}
            activeClassName={st.activePage}
          >
            <ListItemText primary="Змінити пароль" />
          </ListItemButtonLink>
        </List>
      </Grid>

      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  )
}
