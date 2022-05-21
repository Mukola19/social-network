import React from 'react'
import Stack from '@mui/material/Stack'
import cl from 'classnames'
import st from './AppButton.module.scss'

type AppButtonProps = {
  edge?: string
  variant?: string
  children?: React.ReactNode
  style?: React.CSSProperties; 
  disabled?: boolean
  className?:string
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

export const AppButton: React.FC<AppButtonProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <Stack spacing={2} direction="row">
      <button
        {...props}
        className={cl(st.appButton, className, { [st.disabled]: disabled })}
        disabled={disabled}
      />
    </Stack>
  )
}
