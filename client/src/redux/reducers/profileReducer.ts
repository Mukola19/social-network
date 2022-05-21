import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileApi } from '../../API/profileApi'
import { UsersApi } from '../../API/usersApi'
import { IContact, IProfile } from '../../types/profileTypes'
import { AppThunk } from '../store'
import { setPhotoAuth } from './authReducer'

const initialState = {
  id: null as number | null,
  lookingForAJob: '' as string,
  aboutMe: '' as string,
  fullName: '' as string,
  contacts: [] as IContact[],
  photoUrl: '' as string,
  isAuthCurrent: false as boolean,
  isLoading: false as boolean,
  followed: false as boolean,
  readrsCount: 0 as number,
  toFollowCount: 0 as number,
  waitFollowed: false as boolean,
  owner: false as boolean,
}


export type ProfileStateTypes = typeof initialState

const profileReleases = createSlice({
  name: 'profileReleases',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IProfile>) => {
      state.id = payload.id
      state.aboutMe = payload.aboutMe
      state.contacts = payload.contacts
      state.lookingForAJob = payload.lookingForAJob
      state.photoUrl = payload.photoUrl
      state.fullName = payload.fullName
      state.followed = payload.followed
      state.readrsCount = payload.readrsCount
      state.toFollowCount = payload.toFollowCount
      state.owner = payload.owner
    },
    clearUser: (state) => {
      state.id = null
      state.aboutMe = ''
      state.contacts = []
      state.lookingForAJob = ''
      state.photoUrl = ''
      state.fullName = ''
      state.followed = false
      state.readrsCount = 0
      state.toFollowCount = 0
      state.owner = false
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setWaitFollowed: (state, { payload }: PayloadAction<boolean>) => {
      state.waitFollowed = payload
    },
    setProfileManipulation: (state, { payload }: PayloadAction<boolean>) => {
      state.followed = !payload
    },
    setPhotUrl: (state, { payload }: PayloadAction<string>) => {
      state.photoUrl = payload
    },
  },
})

const { actions, reducer } = profileReleases

export const {
  setPhotUrl,
  setUser,
  setLoading,
  clearUser,
  setWaitFollowed,
  setProfileManipulation,
} = actions
export default reducer

//Отримуємо профіль користувача
export const getUser = (userId: number): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const user = await ProfileApi.requestUsers(userId)
    dispatch(setUser(user))
  } catch (e) {
    console.log(e)
  }
  dispatch(setLoading(false))
}



export const profileManipulation = (id: number, followed: boolean): AppThunk => async (dispatch) => {
  try {
    dispatch(setWaitFollowed(true))
    if (await actionWithUser(followed, id)) {
      dispatch(setProfileManipulation(followed))
    }
  } catch (e) {
    console.log(e)
  }

  dispatch(setWaitFollowed(false))
}

export const actionWithUser = async (followed: boolean, id: number): Promise<boolean>  => {
  let result = null as boolean | null
  if (followed) {
    result = await UsersApi.unfollow(id)
  } else {
    result = await UsersApi.follow(id)
  }
  return result
}


export const updateFoto = (photoData: File | undefined): AppThunk=> async (dispatch) => {
  try {
    const photoUrl = await ProfileApi.updateFoto(photoData)
    dispatch(setPhotUrl(photoUrl))
    dispatch(setPhotoAuth(photoUrl))
  } catch (e) {
    console.log(e)
  }
}
