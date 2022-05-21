import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import authReducer from './reducers/authReducer'
import dialogsReducer from './reducers/dialogsReducer'
import profileReducer from './reducers/profileReducer'
import usersReducer from './reducers/usersReducer'
import newsReducer from './reducers/newsReducer'

declare var process : {
  env: {
    NODE_ENV: string
  }
}

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
})

const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    profile: profileReducer,
    usersState: usersReducer,
    auth: authReducer,
    news: newsReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>






