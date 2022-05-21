import { RootState } from "../store"

export const getAuth = (state: RootState) => state.auth
export const getIsAuth = (state: RootState) => state.auth.isAuth
