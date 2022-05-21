import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestUsers } from '../../redux/reducers/usersReducer'
import { SearchByTerm } from './SearchByTerm'
import { SearchForFriends } from './SearchForFriends'
import { getUsersFilter } from '../../redux/selectors/usersSelector'

import st from './Users.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/typingHooks'






export const SearchUsers: React.FC  = () => {
  const { term, friend } = useAppSelector(getUsersFilter)
  const dispatch = useAppDispatch()

  const doSearchByTerm = (data: string) => {
    dispatch(requestUsers({ filter: { friend, term: data }, page: 1 }))
  }

  const doSearchByFriends = (data: string) => {
    dispatch(requestUsers({ filter: { term, friend: data }, page: 1 }))
  }

  return (
    <div className={st.searchForm}>
      <SearchByTerm doSearch={doSearchByTerm} term={term} />
      <SearchForFriends doSearch={doSearchByFriends} friend={friend} />
    </div>
  )
}
