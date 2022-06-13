import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsersApi } from '../../API/usersApi'
import { IUserApi, UsersParamsType, IUsersApi } from '../../types/usersType'
import { AppThunk } from '../store'
import { actionWithUser } from './profileReducer'

type UserManipulType = {
  userId: number
  followedByIs: boolean
}

type FollowStateType = {
  userId: number
  logical: boolean
}

type SetUsersTypes = {
  totalCount: number
  items: IUserApi[]
  page: number
  filter?: {
    term: string
    friend: boolean | null
  }
}

type SetFilterTypes = {
  term: string
  friend: string
}


const initialState = {
  users: [] as IUserApi[],
  count: 15 as number,
  totalCount: 10 as number,
  page: 1 as number,
  processes: [] as number[],
  filter: {
    term: '' as string,
    friend: 'null' as string,
  },
  isLoading: false as boolean,
}

export type UsersStateType = typeof initialState
 

const userReleases = createSlice({
  name: 'userReleases',
  initialState,
  reducers: {
     setUsers: (state, { payload }: PayloadAction<SetUsersTypes>) => {
      const { totalCount, items, page, filter } = payload
      state.users = state.users.concat(items)
      state.totalCount = totalCount
      state.page = page
    },
    cleaningUsers: (state) => {
      state.users = []
      state.totalCount = 0
      state.filter.friend = 'null'
      state.filter.term = ''
    },
    userManipulationRed: (
      state,
      { payload }: PayloadAction<UserManipulType>
    ) => {
      state.users.forEach((u) => {
        if (u.id == payload.userId) {
          u.followedByIs = !payload.followedByIs
        }
      })
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    followedState: (state, { payload }: PayloadAction<FollowStateType>) => {
      if (payload.logical) {
        state.processes.push(payload.userId)
      } else {
        let i = state.processes.indexOf(payload.userId)
        if (i >= 0) {
          state.processes.splice(i, 1)
        }
      }
    },
    setFilter: (state, { payload }: PayloadAction<SetFilterTypes>) => {
      state.filter.term = payload.term
      state.filter.friend = payload.friend
    },
  },
})

const { actions, reducer } = userReleases

export const {
  setUsers,
  setLoading,
  followedState,
  userManipulationRed,
  cleaningUsers,
  setFilter,
} = actions

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default reducer

type ParamsTypes =  {
  page: number
  filter: {
    term: string
    friend: string
  }
}


export const requestUsers = (params: ParamsTypes): AppThunk => async (dispatch, getState) => {
    const { count } = getState().usersState
    try {
      dispatch(setLoading(true))
      dispatch(cleaningUsers())
      dispatch(setFilter(params.filter))
      const result = await UsersApi.requestUsers({ count, ...params })
      dispatch(setUsers({ page: params.page, ...result.data }))
    } catch (e:any) {
      window.enqueueSnackbar(e?.message, { variant: 'error' })
      dispatch(cleaningUsers())
    }
    dispatch(setLoading(false))
  }

export const userManipulation = (userId: number, followedByIs: boolean): AppThunk =>  async (dispatch) => {
    dispatch(followedState({ logical: true, userId }))
    if (await actionWithUser(followedByIs, userId)) {
      dispatch(userManipulationRed({ userId, followedByIs }))
    }
    dispatch(followedState({ logical: false, userId }))
  }

// дії з користувачем по відписці і підписці
