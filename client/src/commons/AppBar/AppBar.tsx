import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'




type AppBarProps = {
  open: boolean

}


export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop ) => prop !== 'open',
})<AppBarProps>(({ theme, open }: any) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 185,

    width: `calc(100% - ${185}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
