import { createSelector } from 'reselect'
import { RootState } from '../store'

export const getUsersState = (state: RootState) => state.usersState

export const getUsersFilter = (state: RootState) => state.usersState.filter
