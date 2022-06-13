import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextField, Container, Typography, Box, CssBaseline, Button, Avatar } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from '../../../hooks/typingHooks'
import { FormKeyResetPassType } from '../../../types/authTypes'
import { getKeyResetPassword } from '../../../redux/reducers/authReducer'
import st from './ResetPassword.module.scss'

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required()

export const ResetPasswordKey: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<FormKeyResetPassType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const submit: SubmitHandler<FormKeyResetPassType> = (data) => {
    dispatch(getKeyResetPassword(data))
    reset()
    navigate('/settings/password/reset')
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={st.box}>
        <Avatar className={st.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Проблеми із входом?
        </Typography>
        <Box
          component='form'
          className={st.form}
          onSubmit={handleSubmit(submit)}
        >
          <TextField
            error={!!errors?.email?.message}
            label='Електрона адреса'
            {...register('email')}
            autoComplete='email'
            type={'email'}
            autoFocus
            className={st.textField}
          />

          <Button
            type='submit'
            variant='contained'
            disabled={!isDirty || !isValid}
            className={st.buttonSubmit}
          >
            Надіслати посилання для входу
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
