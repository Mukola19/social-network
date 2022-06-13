import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button } from '@mui/material'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../hooks/typingHooks'
import { changePassword } from '../../../redux/reducers/authReducer'
import { getAuth } from '../../../redux/selectors/authSelector'
import { FormChangePassType } from '../../../types/authTypes'
import st from './ChangePassword.module.scss'
import { NavLink } from 'react-router-dom'

const schema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    repeatNewPassword: yup.string().required(),
  })
  .required()

export const ChangePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormChangePassType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })
  const { id, photoUrl, fullName } = useAppSelector(getAuth)
  const dispatch = useAppDispatch()

  const submit: SubmitHandler<FormChangePassType> = (data) => {
    dispatch(changePassword(data))
    reset()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={st.title}>
        <div className={st.photoUser}>
          <Avatar className={st.img} src={photoUrl} />
        </div>
        <h1 className={st.nameUser}>{fullName}</h1>
      </div>

      <div className={st.formControll}>
        <label htmlFor="oldPassword" className={st.formLabel}>
          Старий пароль
        </label>
        <div className={st.formInput}>
          <input
            id="oldPassword"
            {...register('oldPassword')}
            type={'password'}
          />
        </div>
      </div>

      <div className={st.formControll}>
        <label htmlFor="newPassword" className={st.formLabel}>
          Новий пароль
        </label>
        <div className={st.formInput}>
          <input
            id="newPassword"
            {...register('newPassword')}
            type={'password'}
          />
        </div>
      </div>

      <div className={st.formControll}>
        <label htmlFor="repeatNewPassword" className={st.formLabel}>
          Підтвердьте новий пароль
        </label>
        <div className={st.formInput}>
          <input
            id="repeatNewPassword"
            {...register('repeatNewPassword')}
            type={'password'}
          />
        </div>
      </div>

      <div className={st.formControll}>
        <div className={st.formLabel}></div>
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          variant={'contained'}
        >
          Надіслати
        </Button>

        <NavLink to={'/settings/password/reset/key'}>Забули пароль?</NavLink>
      </div>
    </form>
  )
}
