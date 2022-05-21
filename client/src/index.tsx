import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
// import { createTheme } from '@mui/system'
import App from './App'
import store from './redux/store'
import './index.scss'

import { createTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(58, 92, 112)',
    },
    // secondary: {
    //   main: "#222",
    // },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
         <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
