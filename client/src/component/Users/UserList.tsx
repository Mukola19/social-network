import React from 'react'
import Paper from '@mui/material/Paper'
import { CircularProgress, List } from '@mui/material'
import { UsersItem } from './UsersItem'
import { UserAddBuutton } from './UserAddBuutton'
import { SearchUsers } from './SearchUsers'
import st from './Users.module.scss'
import { IUser } from '../../types/usersType'


type UserListProps = {
  users: IUser[]
  isLoading: boolean
  totalCount: number
}


export const UserList: React.FC<UserListProps> = ({ users, isLoading, totalCount }) => (
  <Paper className={st.paper}>
    {isLoading ? <CircularProgress className={st.loader} /> : null}
    <SearchUsers />

    {users.length ? (
      <List className={st.list}>
        {users?.map((item) => (
          <UsersItem {...item} key={item.id} />
        ))}
        {totalCount === users.length ? null : <UserAddBuutton />}
      </List>
    ) : null}
  </Paper>
)
