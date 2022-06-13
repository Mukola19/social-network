import { ApiAuth } from '../../API/authApi'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../store'
import {
  IAuthApi,
  FormAuthType,
  FormChangePassType,
  FormResetPassType,
  FormKeyResetPassType,
} from '../../types/authTypes'
import axios, { AxiosError } from 'axios'

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
    setAuth: (state, { payload }: PayloadAction<IAuthApi>) => {
      state = Object.assign(state, payload)
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

export const { setAuth, clearAuth, initial, setLoading, setPhotoAuth } = actions

///////////////////////////////////////////////////
export default reducer

export const registration =
  (formData: FormAuthType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await ApiAuth.register(formData)
      dispatch(setAuth(result.data))
    } catch (e: any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })
      console.log(e)
    }
  }

export const login =
  (formData: FormAuthType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await ApiAuth.login(formData)
      dispatch(setAuth(result.data))
    } catch (e: any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })
      console.log(e)
    }
  }

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await ApiAuth.logout()
    dispatch(clearAuth())
  } catch (e: any) {
    window.enqueueSnackbar(e?.message, { variant: 'error' })
    console.log(e)
  }
}

export const initApp = (): AppThunk => async (dispatch) => {
  try {
    const result = await ApiAuth.initApp()
    dispatch(setAuth(result.data))
  } catch (e: any) {
    console.log(e)
  }
  dispatch(initial())
}

export const changePassword =
  (formData: FormChangePassType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await ApiAuth.changePassword(formData)
      window.enqueueSnackbar(result.message, { variant: 'success' })
    } catch (e: any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })
    }
  }

export const getKeyResetPassword =
  (formData: FormKeyResetPassType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await ApiAuth.getKeyResetPassword(formData)
      window.enqueueSnackbar(result.message, { variant: 'success' })
    } catch (e: any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })    }
  }

export const resetPassword =
  (formData: FormResetPassType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await ApiAuth.resetPassword(formData)
      window.enqueueSnackbar(result.message, { variant: 'success' })
    } catch (e: any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })    }
  }
