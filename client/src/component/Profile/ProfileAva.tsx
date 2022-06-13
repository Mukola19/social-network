import React, { useState } from 'react'
import { Avatar, Button, InputLabel } from '@mui/material'
import { useSelectFile } from '../../hooks/useSelectFile'
import { useDispatch } from 'react-redux'
import { updateFoto } from '../../redux/reducers/profileReducer'
import { useAppDispatch } from '../../hooks/typingHooks'
import { ProfileAvaModal } from './ProfileModal'
import st from './Profile.module.scss'
import { ChangePhotoModal } from '../../commons/Settings/ChangePhotoModal'

type PropsType = {
  photoUrl: string
  owner: boolean
}

export const ProfileAva: React.FC<PropsType> = ({ photoUrl, owner }) => {
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  const updateFotoHandler = (file: File ) => {
    dispatch(updateFoto(file))
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <div className={st.profileAvatar}>
      <Avatar
        className={st.avatarWrapper}
        src={photoUrl}
        onClick={owner ? handleClickOpen : () => {}}
      />
    

      <ChangePhotoModal
        saveChange={updateFotoHandler}
        open={open}
        onClose={handleClose}
        photoUrl={photoUrl}
      />
    </div>
  )
}
