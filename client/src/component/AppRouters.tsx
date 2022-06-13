import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from '../pages/Auth-page/Auth.page'
import { ChatPage } from '../pages/Chat-page/Chat.page'
import { DoesNotExistPage } from "../pages/Doesn'tExist-page/Doesn'tExist.page"
import { MusicPage } from '../pages/Music-page/Music.page'
import { NewsPage } from '../pages/News-page/News.page'
import { ProfilePage } from '../pages/Profile-page/Profile.page'
import { SettingsPage } from '../pages/Settings-page/Settings.page'
import { UsersPage } from '../pages/Users-page/Users.page'
import { ChangePassword } from './Settings/ChangePassword/ChangePassword'
import { ResetChangePassword } from './Settings/ResetPassword/ResetChangePassword'
import { ResetPasswordKey } from './Settings/ResetPassword/ResetPasswordKey'
import { SettingsProfile } from './Settings/SettingsProfile/SettingsProfile'

type AppRoutersProps = {
  isAuth: boolean
}

export const AppRouters: React.FC<AppRoutersProps> = ({ isAuth }) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path={'auth'} element={<AuthPage />} />
        <Route
          path={'settings/password/reset'}
          element={<ResetChangePassword />}
        />
        <Route
          path={'settings/password/reset/key'}
          element={<ResetPasswordKey />}
        />

        <Route path={'*'} element={<Navigate to={'/auth'} />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path={'users'} element={<UsersPage />} />
      <Route path={'music'} element={<MusicPage />} />
      <Route path={'news'} element={<NewsPage />} />
      <Route path={'chat'} element={<ChatPage />} />
      <Route path={'profile/:userId'} element={<ProfilePage />} />
      <Route path={'settings'} element={<SettingsPage />}>
        <Route path={'profile'} element={<SettingsProfile />} />
        <Route path={'password/change'} element={<ChangePassword />} />
      </Route>
      <Route
        path={'settings/password/reset'}
        element={<ResetChangePassword />}
      />
      <Route
        path={'settings/password/reset/key'}
        element={<ResetPasswordKey />}
      />
      <Route path={'*'} element={<Navigate to={'/users'} />} />
    </Routes>
  )
}
