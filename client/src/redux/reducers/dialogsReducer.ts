import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDialogData {
  id: number
  name: string
  img: string
}

interface IMessage {
  id: number
  message: []
}

interface Messages {
  dialogsData: IDialogData[]
  messages: {
    messagePerson: IMessage[]
    urlId: number
  }
}

const initialState: Messages = {
  dialogsData: [
    {
      id: 3,
      name: 'Mykola',
      img: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
    },
    {
      id: 2,
      name: 'Adelina',
      img: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
    },
    {
      id: 3,
      name: 'Vika',
      img: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
    },
    {
      id: 4,
      name: 'Petro',
      img: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
    },
    {
      id: 5,
      name: 'Dima',
      img: 'https://www.signivis.com/img/custom/avatars/member-avatar-01.png',
    },
  ],
  messages: {
    messagePerson: [
      {
        id: 0,
        message: [],
      },
      {
        id: 1,
        message: [],
      },
      {
        id: 2,
        message: [],
      },
      {
        id: 3,
        message: [],
      },
      {
        id: 4,
        message: [],
      },
      {
        id: 5,
        message: [],
      },
    ],

    urlId: 1,
  },
}

const dialogsReleases = createSlice({
  name: 'dialogsReleases',
  initialState,
  reducers: {
    deleteMesage: (state, { payload }) => {
      state.messages.messagePerson.forEach((p) => {
        if (p.id == payload.id) {
          p.message.pop()
        }
      })
    },
  },
})

const { actions, reducer } = dialogsReleases

export const { deleteMesage } = actions

export default reducer
