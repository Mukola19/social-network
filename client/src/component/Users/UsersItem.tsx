import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { AppAvatar } from '../../commons/AppAvatar/AppAvatar'
import { AppButton } from '../../commons/AppButton/AppButton'
import { userManipulation } from '../../redux/reducers/usersReducer'
import { getUsersState } from '../../redux/selectors/usersSelector'
import st from './Users.module.scss'
import { IUser } from '../../types/usersType'

export const UsersItem: React.FC<IUser> = ({
  id,
  fullName,
  photoUrl,
  followed,
}) => {
  const { processes } = useSelector(getUsersState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const manipulation = () => {
    dispatch(userManipulation(id, followed))
  }

  return (
    <ListItem
      className={st.listItem}
      secondaryAction={
        followed !== null && (
          <AppButton
            edge='end'
            variant={'error'}
            onClick={manipulation}
            disabled={followed === null || processes.some((i) => i === id)}
          >
            <ListItemText children={followed ? 'Не стежити' : 'Стежити'} />
          </AppButton>
        )
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        dense
        onClick={() => navigate('/profile/' + id)}
      >
        <AppAvatar
          src={photoUrl}
          name={fullName}
          sx={{ height: 35, width: 35, marginRight: 1 }}
          color={'secondary'}
        />
        <ListItemText children={fullName} />
      </ListItemButton>
    </ListItem>
  )
}
