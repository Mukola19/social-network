import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Avatar } from '@mui/material'
import { useSelectFile } from '../../hooks/useSelectFile'
import st from './ChangePhotoModal.module.scss'

type PropsType = {
  photoUrl: string
  children?: React.ReactNode
  saveChange?: (e: File) => void
  open: boolean
  onClose: () => void
}

export const ChangePhotoModal: React.FC<PropsType> = ({
  photoUrl,
  saveChange,
  onClose,
  open,
}) => {
  const { onSelectFile, preview, selectedFile, clearSelectedFile } =
    useSelectFile()

  const cancelSelectPhoto = () => {
    clearSelectedFile()
    onClose()
    clearSelectedFile()

  }
  const saveChangeHandler = () => {                 
    if (selectedFile && saveChange) {
      saveChange(selectedFile)
      onClose()
      clearSelectedFile()
    }
  }

  return (
    <Dialog onClose={cancelSelectPhoto} open={open}>
      <DialogTitle>Ваше фото</DialogTitle>

      <DialogContent dividers>
        <Avatar
          sx={{ width: 250, height: 250, margin: 5 }}
          src={preview || photoUrl}
        />
      </DialogContent>

      <DialogActions>
        <Button className={st.controllFile}>
          <input onChange={onSelectFile} type="file" />
          Вибрати
        </Button>
        <Button onClick={cancelSelectPhoto}>Cкасувати</Button>
        {preview ? <Button onClick={saveChangeHandler}>Зберегти</Button> : null}
      </DialogActions>
    </Dialog>
  )
}
