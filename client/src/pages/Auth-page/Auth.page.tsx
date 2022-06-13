import React, { InputHTMLAttributes, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import { login, registration } from '../../redux/reducers/authReducer'
import { useAppDispatch } from '../../hooks/typingHooks'
import { FormAuthType } from '../../types/authTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { styled, createTheme, ThemeProvider } from '@mui/system'
import { refType } from '@mui/utils'
import { NavLink } from 'react-router-dom'
import st from './Auth.page.module.scss'

const schema = yup
  .object({
    fullName: yup.string(),
    email: yup.string().required().email(),
    password: yup.string().required().max(16).min(4),
  })
  .required()

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<FormAuthType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const dispatch = useAppDispatch()

  const submit: SubmitHandler<FormAuthType> = (data) => {
    if (isRegister) return dispatch(registration(data))
    dispatch(login(data))
  }

  const changeMode = (): void => {
    setIsRegister((prew) => !prew)
    reset()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={st.box}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Зареєструватись' : 'Війти'}
        </Typography>
        <Box
          component="form"
          className={st.form}
          onSubmit={handleSubmit(submit)}
        >
          {isRegister && (
            <TextField
              error={!!errors?.fullName?.message}
              label="Ім'я"
              {...register('fullName', { required: true })}
              autoComplete="off"
              autoFocus
              className={st.textField}
            />
          )}

          <TextField
            error={!!errors?.email?.message}
            label="Електрона адреса"
            {...register('email')}
            type={'email'}
            autoComplete="email"
            autoFocus
            className={st.textField}
          />
          <TextField
            error={!!errors?.password?.message}
            label="Пароль"
            {...register('password')}
            autoComplete="current-password"
            type="password"
            className={st.textField}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid}
            className={st.buttonSubmit}
          >
            {isRegister ? 'Зареєструватись' : 'Війти'}
          </Button>
          <Container className={st.footBar}>
            <NavLink to="#" onClick={changeMode}>
              {isRegister
                ? 'Є акаунт? Війти'
                : 'Немає акаунта? Зареєструватись'}
            </NavLink>

            <NavLink to="/settings/password/reset/key">Забули пароль?</NavLink>
          </Container>
        </Box>
      </Box>
    </Container>
  )
}
