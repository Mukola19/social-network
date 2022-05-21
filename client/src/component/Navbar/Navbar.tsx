import React from 'react'
import { AppMenu } from './AppMenu/AppMenu'
import { Header } from './Header/Header'

export const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const toggleDrawer = (): void => setOpen((prew) => !prew)

  return (
    <>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <AppMenu open={open} toggleDrawer={toggleDrawer} />
    </>
  )
}
