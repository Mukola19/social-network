import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/typingHooks'
import { initApp } from './redux/reducers/authReducer'
import { getIsAuth } from './redux/selectors/authSelector'
import { Navbar } from './component/Navbar/Navbar'
import { AppRouters } from './component/AppRouters'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Toolbar } from '@mui/material'
import st from './App.module.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getIsAuth)
  const initialized = useAppSelector((state) => state.auth.initialized)


  useEffect(() => dispatch(initApp()), [])

  if (!initialized) return <>Loading</>

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuth && <Navbar />}
      <Toolbar />
      <Box className={st.main} component="main">
        <Container maxWidth="lg" className={st.container}>
          <AppRouters isAuth={isAuth} />
        </Container>
      </Box>
    </Box>
  )
}

export default App
