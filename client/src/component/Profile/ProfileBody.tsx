import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  profileManipulation,
  ProfileStateType,
} from '../../redux/reducers/profileReducer'
import st from './Profile.module.scss'

type PropsType = Omit<ProfileStateType, 'isLoading'>

export const ProfileBody: React.FC<PropsType> = (props) => {
  const {
    id,
    fullName,
    lookingForAJob,
    readrsCount,
    toFollowCount,
    waitFollowed,
    followedByIs,
    owner,
    aboutMe,
  } = props

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const manipulation = () => {
    if (id) {
      dispatch(profileManipulation(id, followedByIs))
    }
  }

  const selectTextFollow = (followed: boolean) =>
    followed ? 'Не стежити' : 'Стежити'

  return (
    <div className={st.body}>
      <div className={st.header}>
        <h1>{fullName}</h1>
        {owner ? (
          <Button variant="outlined" onClick={() => navigate('/settings/profile')}>
            Налаштувати профіль
          </Button>
        ) : null}
      </div>

      <div className={st.analytics}>
        <div>
          <span>0</span> Дописи
        </div>
        <div>
          Читачі: <span>{readrsCount || 0}</span>
        </div>
        <div>
          Стежить: <span>{toFollowCount || 0}</span>
        </div>
      </div>
      <p className={st.description}>Про мене: {aboutMe}</p>

      <p className={st.description}>
        Я шукаю роботу: {lookingForAJob ? 'Yes' : 'No'}
      </p>

      {owner ? null : (
        <Button onClick={manipulation} disabled={waitFollowed} variant={'contained'}>
          {selectTextFollow(followedByIs)}
        </Button>
      )}
    </div>
  )
}
