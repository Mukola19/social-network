import React, { useState } from 'react'
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
import {  useForm } from 'react-hook-form'
import { login, registration } from '../../redux/reducers/authReducer'
import { useAppDispatch } from '../../hooks/typingHooks'


interface IValueAuth {
  fullName?: string
  email: string
  password: string
}

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const { register, handleSubmit, reset } = useForm<IValueAuth>({
    defaultValues: { fullName: '', email: '', password: '' },
  })
  const dispatch = useAppDispatch()

  const submit = (data: IValueAuth): void => {
    if (isRegister) return dispatch(registration(data))
    dispatch(login(data))
  }

  const changeMode = (): void => {
    setIsRegister((prew) => !prew)
    reset()
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {isRegister ? 'Зареєструватись' : 'Війти'}
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(submit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {isRegister && (
            <TextField
              margin='normal'
              required
              fullWidth
              // error={true}
              label="Ім'я"
              {...register('fullName')}
              autoComplete='off'
              autoFocus
            />
          )}

          <TextField
            margin='normal'
            required
            fullWidth
            // error={true}
            label='Електрона адреса'
            {...register('email')}
            autoComplete='email'
            type={'email'}
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            {...register('password')}
            label='Пароль'
            type='password'
            autoComplete='current-password'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {isRegister ? 'Зареєструватись' : 'Війти'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2' onClick={changeMode}>
                {isRegister
                  ? 'Є акаунт? Війти'
                  : 'Немає акаунта? Зареєструватись'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
