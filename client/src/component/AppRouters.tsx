import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../routes/routes'



type AppRoutersProps = {
  isAuth: boolean
}



export const AppRouters:React.FC<AppRoutersProps> = ({ isAuth }) => {
  if (isAuth) {
    return (
      <Routes>
        {privateRoutes.map((item) => (
          <Route {...item} key={item.path} />
        ))}
        <Route path={'*'} element={<Navigate to={'/users'} />} />
      </Routes>
    )
  }
  return (
    <Routes>
      {publicRoutes.map((item) => (
        <Route {...item} key={item.path} />
      ))}
      <Route path={'*'} element={<Navigate replace to={'/auth'} />} />
    </Routes>
  )
}
