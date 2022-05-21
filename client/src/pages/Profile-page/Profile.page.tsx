import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CircularProgress, Paper } from '@mui/material'
import { ProfileAva } from '../../component/Profile/ProfileAva'
import { ProfileBody } from '../../component/Profile/ProfileBody'
import { getUser } from '../../redux/reducers/profileReducer'
import { getUserProfile } from '../../redux/selectors/profileSelector'
import { useAppSelector } from '../../hooks/typingHooks'
import st from './Profile.page.module.scss'

type QuizParams = {
  userId: string
}

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const { isLoading, ...user } = useAppSelector(getUserProfile)
  const { userId } = useParams<QuizParams>()

  useEffect(() => {
    dispatch(getUser(Number(userId)))
  }, [userId])

  if(!user.id) return <></>

  return (
    <Paper sx={{ height: 250 }}>
      {isLoading ? (
        <CircularProgress className={st.loader} />
      ) : (
        <div className={st.profile}>
          <ProfileAva photoUrl={user.photoUrl} owner={user.owner} />
          <ProfileBody {...user} />
        </div>
      )}
    </Paper>
  )
}
