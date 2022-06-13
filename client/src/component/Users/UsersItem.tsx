import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import { AppAvatar } from '../../commons/AppAvatar/AppAvatar'
import { AppButton } from '../../commons/AppButton/AppButton'
import { userManipulation } from '../../redux/reducers/usersReducer'
import { getUsersState } from '../../redux/selectors/usersSelector'
import st from './Users.module.scss'
import { IUserApi } from '../../types/usersType'

type ItemTextType = (a: boolean, b: boolean) => string

export const UsersItem: React.FC<IUserApi> = (props) => {
  const { id, fullName, photoUrl, followedByIs, followerIs } = props
  const { processes } = useSelector(getUsersState)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const manipulation = () => {
    dispatch(userManipulation(id, followedByIs))
  }
  const itemText: ItemTextType = (followedByIs, followerIs) => {
    if (!followedByIs && followerIs) return 'Також стежити'
    if (followedByIs) return 'Не стежити'
    else return 'Стежити'
  }

  return (
    <ListItem
      className={st.listItem}
      secondaryAction={
        followedByIs !== null && (
          <AppButton
            edge="end"
            variant={'error'}
            onClick={manipulation}
            disabled={followedByIs === null || processes.some((i) => i === id)}
          >
            <ListItemText children={itemText(followedByIs, followerIs)} />
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
