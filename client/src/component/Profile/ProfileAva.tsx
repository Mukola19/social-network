import React, { useEffect } from 'react'
import cl from 'classnames'
import { Avatar, Button, InputLabel } from '@mui/material'
import st from './Profile.module.scss'
import { useSelectFile } from '../../hooks/useSelectFile'
import { useDispatch } from 'react-redux'
import { updateFoto } from '../../redux/reducers/profileReducer'
import { useAppDispatch } from '../../hooks/typingHooks'

type ProfileAvaProps = {
  photoUrl: string
  owner: boolean
}

export const ProfileAva: React.FC<ProfileAvaProps> = ({ photoUrl, owner }) => {
  const { onSelectFile, preview, selectedFile, clearSelectedFile } =
    useSelectFile()
  const dispatch = useAppDispatch()

  const updateFotoHandler = () => {
    dispatch(updateFoto(selectedFile))
    clearSelectedFile()
  }

  const selectPhoto = selectedFile ? (
    <Button onClick={updateFotoHandler}>Save</Button>
  ) : (
    <div className={st.controllFile}>
      <input onChange={onSelectFile} type="file" />
        <Button className={st.buttonLabel}>
          Вибрати
        </Button>
        {/* <div >Вибрати</div> */}
    </div>
  )

  return (
    <div className={st.profileAvatar}>
      <Avatar className={st.avatarWrapper} src={preview || photoUrl} />

      {owner ? selectPhoto : null}
    </div>
  )
}
