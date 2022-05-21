import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface INewsData {
  id: number
  inscription: string
  photo: string
  countLike: number
  comment: [] 
  title: string
  avatar: string
  name: string
  myLike: boolean
}


interface INews {
  newsDate: INewsData[]
}

const initialState:INews = {
  newsDate: [
    {
      id: 1,
      inscription: 'gggggggggggggggggggggg',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      countLike: 313,
      comment: [],
      title: 'News',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      name: 'Miller',
      myLike: false,
    },
    {
      id: 2,
      inscription: 'gggggggggggggggggggggg',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      countLike: 213,
      comment: [],
      title: 'News',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      name: 'Miller',
      myLike: false,
    },
    {
      id: 3,
      inscription: 'gggggggggggggggggggggg',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      countLike: 313,
      comment: [],
      title: 'News',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      name: 'Miller',
      myLike: false,
    },
    {
      id: 4,
      inscription: 'gggggggggggggggggggggg',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      countLike: 1,
      comment: [],
      title: 'News',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schooner_Linden.jpg/250px-Schooner_Linden.jpg',
      name: 'Miller',
      myLike: false,
    },
  ],
}

const newsReleases = createSlice({
  name: 'newsReleases',
  initialState,
  reducers: {
    addingLikes: (state, { payload }: PayloadAction<number>) => {
      state.newsDate.filter((e) => {
        if (e.id == payload) {
          if (!e.myLike) {
            e.countLike += 1
            e.myLike = true
          } else {
            e.countLike -= 1
            e.myLike = false
          }
        }
      })
    },
    changeComment: (state, { payload }:PayloadAction<{id: number, text: string}>) => {
      state.newsDate.filter((e) => {
        if (e.id == payload.id) {
          // e.comment.push(payload.text)
        }
      })
    },
  },
})

const { actions, reducer } = newsReleases

export const { addingLikes, changeComment } = actions

export default reducer
