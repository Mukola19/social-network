import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { AppAccountMenu } from '../../../commons/AppAccountIcon/AppAccountMenu'
import { AppAccountItem } from '../../../commons/AppAccountIcon/AppAccountItem'
import { getAuth } from '../../../redux/selectors/authSelector'
import { useAppDispatch, useAppSelector } from '../../../hooks/typingHooks'
import { logout } from '../../../redux/reducers/authReducer'
import { AppAvatar } from '../../../commons/AppAvatar/AppAvatar'

export const AccountMenu: React.FC = () => {
  const { id, fullName, photoUrl } = useAppSelector(getAuth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/auth')

  }

  if (!id) {
    return (
      <AppAccountMenu>
        <AppAccountItem title={'Війти'} onClick={() => navigate('/auth')}>
          <LogoutIcon />
        </AppAccountItem>
      </AppAccountMenu>
    )
  }

  return (
    <AppAccountMenu userAvatar={<AppAvatar name={fullName} src={photoUrl} />}>
      <AppAccountItem title={'Профіль'} path={'/profile/' + id}>
        <AccountCircleIcon />
      </AppAccountItem>
      <AppAccountItem title={'Настройкі'} path={'/settings/profile'}>
        <SettingsIcon />
      </AppAccountItem>

      <AppAccountItem title={'Вийти'} onClick={logoutHandler}>
        <LogoutIcon />
      </AppAccountItem>
    </AppAccountMenu>
  )
}
