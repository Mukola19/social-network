import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/typingHooks'
import { IconButton } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { requestUsers } from '../../redux/reducers/usersReducer'
import { getUsersState } from '../../redux/selectors/usersSelector'
import st from './Users.module.scss'

export const UserAddBuutton: React.FC = () => {
  const { page, filter } = useAppSelector(getUsersState)
  const dispatch = useAppDispatch()

  return (
    <div className={st.addButton}>
      <IconButton
        size='large'
        color={'secondary'}
        onClick={() => dispatch(requestUsers({ page: page + 1, filter }))}
      >
        <AddOutlinedIcon />
      </IconButton>
    </div>
  )
}
