import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { profileManipulation } from '../../redux/reducers/profileReducer'
import { IContact, IProfile } from '../../types/profileTypes'
import st from './Profile.module.scss'

interface IProfileBody {
  id: number | null
  aboutMe: string
  contacts: IContact[]
  lookingForAJob: string
  photoUrl: string
  fullName: string
  followed: boolean
  readrsCount: number
  toFollowCount: number
  owner: boolean
  waitFollowed: boolean
}

export const ProfileBody: React.FC<IProfileBody> = (props) => {
  const {
    id,
    fullName,
    lookingForAJob,
    contacts,
    followed,
    readrsCount,
    toFollowCount,
    waitFollowed,
    owner,
  } = props

  const dispatch = useDispatch()

  const manipulation = () => {
    if (id) {
      dispatch(profileManipulation(id, followed))
    }
  }

  const selectTextFollow = (followed: boolean) =>
    followed ? 'Не стежити' : 'Стежити'

  return (
    <div className={st.body}>
      <h1>{fullName}</h1>

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

      <div className={st.description}>
        <p> Я шукаю роботу: {lookingForAJob ? 'Yes' : 'No'}</p>
        <p> Контакти: {contacts}</p>
      </div>

      {owner ? null : (
        <Button onClick={manipulation} disabled={waitFollowed}>
          {selectTextFollow(followed)}
        </Button>
      )}
    </div>
  )
}
