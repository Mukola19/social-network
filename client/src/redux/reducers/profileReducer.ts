import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { boolean } from 'yup'
import { ProfileApi } from '../../API/profileApi'
import { UsersApi } from '../../API/usersApi'
import { IProfileApi, ProfileFormValue } from '../../types/profileTypes'
import { AppThunk } from '../store'
import { setAuth, setPhotoAuth } from './authReducer'

const initialState = {
  id: null as number | null,
  lookingForAJob: false as boolean,
  aboutMe: '' as string,
  email: '' as string,
  followedByIs: false as boolean,
  followerIs: false as boolean,
  fullName: '' as string,
  photoUrl: '' as string,
  isAuthCurrent: false as boolean,
  isLoading: false as boolean,
  readrsCount: 0 as number,
  toFollowCount: 0 as number,
  waitFollowed: false as boolean,
  owner: false as boolean,
}

export type ProfileStateType = typeof initialState

const profileReleases = createSlice({
  name: 'profileReleases',
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<IProfileApi>) => {
      state = Object.assign(state, payload)
    },
    clearProfile: (state) => {
      state = Object.assign(initialState)
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setWaitFollowed: (state, { payload }: PayloadAction<boolean>) => {
      state.waitFollowed = payload
    },
    setProfileManipulation: (state, { payload }: PayloadAction<boolean>) => {
      state.followedByIs = !payload
    },
    setPhotUrl: (state, { payload }: PayloadAction<string>) => {
      state.photoUrl = payload
    },
  },
})

const { actions, reducer } = profileReleases

export const {
  setPhotUrl,
  setProfile,
  setLoading,
  clearProfile,
  setWaitFollowed,
  setProfileManipulation,
} = actions
export default reducer

//Отримуємо профіль користувача
export const requestProfile =
  (userId: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const result = await ProfileApi.requestUsers(userId)
      dispatch(setProfile(result.data))
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoading(false))
  }

export const upadeteProfile =
  (data: ProfileFormValue): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const result = await ProfileApi.upadeteProfile(data)
      const { id, email, photoUrl, fullName } = result.data

      dispatch(setProfile(result.data))
      dispatch(setPhotoAuth(photoUrl))
    } catch (e) {
      console.log(e)
    }
    dispatch(setLoading(false))
  }

export const profileManipulation =
  (id: number, followed: boolean): AppThunk =>
  async (dispatch) => {
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

export const actionWithUser = async (followed: boolean, id: number ): Promise<boolean> => {
  let result = false as boolean
  try {
    if (followed) {
      await UsersApi.unfollow(id)
      result = true
    } else {
      await UsersApi.follow(id)
      result = true
    }
  } catch (e: any) {
    window.enqueueSnackbar(e?.message, { variant: 'error' })
  } 

  return result
}

export const updateFoto =
  (photoData: File | undefined): AppThunk =>
  async (dispatch) => {
    try {
      const photoUrl = await (
        await ProfileApi.updateFoto(photoData)
      ).data.photoUrl

      dispatch(setPhotUrl(photoUrl))
      dispatch(setPhotoAuth(photoUrl))
    } catch (e) {
      console.log(e)
    }
  }
