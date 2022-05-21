import { AuthPage } from '../pages/Auth-page/Auth.page'
import { MusicPage } from '../pages/Music-page/Music.page'
import { NewsPage } from '../pages/News-page/News.page'
import { ProfilePage } from '../pages/Profile-page/Profile.page'
import { SettingsPage } from '../pages/Settings-page/Settings.page'
import { UsersPage } from '../pages/Users-page/Users.page'
import { DialogsPage } from '../pages/Dialogs-page/Dialogs.page'
import { ChatPage } from '../pages/Chat-page/Chat.page'
import { ReactElement } from 'react'

export type RouteType = {
  path: string
  exact: boolean
  element: ReactElement
}

export const publicRoutes: RouteType[] = [
  { path: '/auth', exact: false, element: <AuthPage /> },
]

export const privateRoutes: RouteType[] = [
  { path: '/users', exact: false, element: <UsersPage /> },
  { path: '/music', exact: false, element: <MusicPage /> },
  { path: '/news', exact: false, element: <NewsPage /> },
  { path: '/profile/:userId', exact: false, element: <ProfilePage /> },
  { path: '/settings', exact: false, element: <SettingsPage /> },
  { path: '/chat', exact: false, element: <ChatPage /> },
]
