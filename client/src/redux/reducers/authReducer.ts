import { ApiAuth } from '../../API/authApi'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import { AuthType, FormAuth } from '../../types/authTypes'


const initialState = {
  id: null as number | null,
  email: '' as string,
  fullName: '' as string,
  photoUrl: '' as string,
  isAuth: false as boolean,
  initialized: false as boolean,
  isLosding: false as boolean,
}


const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setAuth: (state, { payload }: PayloadAction<AuthType>) => {
      state.id = payload.id
      state.email = payload.email
      state.fullName = payload.fullName
      state.photoUrl = payload.photoUrl
      state.isAuth = true
    },
    clearAuth: (state) => {
      state.id = null
      state.email = ''
      state.fullName = ''
      state.photoUrl = ''
      state.isAuth = false
    },
    initial: (state) => {
      state.initialized = true
    },
    setPhotoAuth: (state, { payload }: PayloadAction<string>) => {
      state.photoUrl = payload
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLosding = payload
    },
  },
})

const { actions, reducer } = authReducer

export const { setAuth, clearAuth, initial, setLoading,setPhotoAuth } = actions

///////////////////////////////////////////////////
export default reducer



export const registration = (formData: FormAuth): AppThunk => async dispatch => {
    try {
      const user = await ApiAuth.register(formData)
      dispatch(setAuth(user))
    } catch (e) {
      console.log(e)
    }
  }

export const login = (formData: FormAuth): AppThunk => async dispatch => {
    try {
      const user = await ApiAuth.login(formData)
      dispatch(setAuth(user))
    } catch (e) {
      console.log(e)
    }
  }

export const logout = (): AppThunk => async dispatch => {
  try {
    await ApiAuth.logout()
    dispatch(clearAuth())
  } catch (e) {
    console.log(e)
  }
}

export const initApp = (): AppThunk => async dispatch => {
  try {
    const user = await ApiAuth.initApp()
    dispatch(setAuth(user))
    dispatch(initial())
  } catch (e) {
    console.log(e)
  }
}

