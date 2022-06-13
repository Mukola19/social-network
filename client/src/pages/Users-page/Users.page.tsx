import React, { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { cleaningUsers, requestUsers } from '../../redux/reducers/usersReducer'
import {
  getUsersFilter,
  getUsersState,
} from '../../redux/selectors/usersSelector'
import { UserList } from '../../component/Users/UserList'
import transformer from '../../utils/transformer'
import { useAppDispatch, useAppSelector } from '../../hooks/typingHooks'
import { UsersParamsType } from '../../types/usersType'

type ParamsTypes = {
  term: string
  page: number
  friend: boolean | null
}

export const UsersPage: React.FC = memo(() => {
  const { users, isLoading, page, totalCount } = useAppSelector(getUsersState)
  const { term, friend } = useAppSelector(getUsersFilter)
  const [query, setQuery] = useSearchParams()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const params = Object.fromEntries(query)
    const actualParams: UsersParamsType = { page, filter: { friend, term } }
    if (params.friend) actualParams.filter.friend = params.friend
    if (params.term) actualParams.filter.term = params.term
    if (params.page) actualParams.page = Number(params.page)

    dispatch(requestUsers(actualParams))

    return (): void => {
      dispatch(cleaningUsers())
    }
  }, [])

  useEffect(() => {
    let params: ParamsTypes | any = {}
    if (term) params.term = term
    if (friend !== null) params.friend = friend
    if (page !== 1) params.page = page
    setQuery(params)
  }, [term, friend, page])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    // return () => document.removeEventListener('scroll', scrollHandler)
  }, [])

  const scrollHandler = (e: Event) => {
    console.log('scroll');
    
  }

  return (
    <UserList users={users} isLoading={isLoading} totalCount={totalCount}  />
  )
})
