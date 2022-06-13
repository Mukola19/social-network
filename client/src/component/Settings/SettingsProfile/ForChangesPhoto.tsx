import React, { useState } from 'react'
import { useSelectFile } from '../../../hooks/useSelectFile'
import st from './SettingsProfile.module.scss'
import { Avatar, Button } from '@mui/material'
import { ChangePhotoModal } from '../../../commons/Settings/ChangePhotoModal'

type ForChangesPhotoProps = {
  photoUrl: string
  selectPhoto(file: File| null): void
  photoFile: File | null
}

export const ForChangesPhoto: React.FC<ForChangesPhotoProps> = ({
  photoUrl,
  selectPhoto,
  photoFile,
}) => {
  const [open, setOpen] = useState(false)

  const photoFileUrl = photoFile ? URL.createObjectURL(photoFile) : ''

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className={st.settingsProfilePhoto}>
      <div className={st.selectPhotoImg}>
        <Avatar className={st.img} src={photoFileUrl || photoUrl} />
      </div>
      <div className={st.formInput}>
        <Button className={st.buttonLabel} onClick={handleClickOpen}>
          Вибрати
        </Button>
      </div>
      <ChangePhotoModal
        saveChange={selectPhoto}
        photoUrl={photoUrl}
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}
