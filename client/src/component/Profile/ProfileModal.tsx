import React from 'react'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import st from './Profile.module.scss'

const emails = ['username@gmail.com', 'user02@gmail.com']

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProfileAvaModal: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, onSelectFile } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Змінити аватар</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem button className={st.controllFile} >
          <input onChange={onSelectFile} type='file' />
          <ListItemText primary='Завантажити фото' />
        </ListItem>

        <ListItem button>
          <ListItemText primary='Видалити фото' />
        </ListItem>
      </List>
    </Dialog>
  )
}
