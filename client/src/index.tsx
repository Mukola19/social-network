import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import App from './App'
import store from './redux/store'
import './index.scss'
import { createTheme } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(58, 92, 112)',
    },
  },
 
  
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
