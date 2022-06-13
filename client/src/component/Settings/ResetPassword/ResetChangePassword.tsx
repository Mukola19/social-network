import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch } from '../../../hooks/typingHooks'
import { resetPassword } from '../../../redux/reducers/authReducer'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { TextField, Container, Typography, Box, CssBaseline, Button, Avatar } from '@mui/material'
import st from './ResetPassword.module.scss'

const schema = yup
  .object({
    key: yup.string().min(6).max(6),
    newPassword: yup.string().required().max(16).min(4),
    repeatNewPassword: yup.string().required().max(16).min(4),
  })
  .required()

export const ResetChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid, errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const submit: SubmitHandler<any> = (data) => {
    data.key = Number(data.key)
    dispatch(resetPassword(data))
    navigate('/auth')
    reset()
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
            className={st.textField}
            error={!!errors?.key?.message}
            label='Ключ'
            {...register('key')}
            autoComplete='key'
          />

          <TextField
            className={st.textField}
            error={!!errors?.newPassword?.message}
            label='Новий пароль'
            {...register('newPassword')}
            type={'password'}
          />

          <TextField
            className={st.textField}
            error={!!errors?.repeatNewPassword?.message}
            label='Підтвердьте новий пароль'
            {...register('repeatNewPassword')}
            type={'password'}
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
