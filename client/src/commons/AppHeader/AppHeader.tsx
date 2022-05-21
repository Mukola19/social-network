import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"


type AppHeaderProps = {
  children: React.ReactNode
}


export const  AppHeader: React.FC<AppHeaderProps>  = ({ children }) =>  {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
