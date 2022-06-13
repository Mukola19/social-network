import React from 'react'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/typingHooks'
import { requestProfile, upadeteProfile } from '../../../redux/reducers/profileReducer'
import { getUserProfile } from '../../../redux/selectors/profileSelector'
import { ForChangesPhoto } from './ForChangesPhoto'
import { ProfileFormValue } from '../../../types/profileTypes'
import * as yup from 'yup'
import st from './SettingsProfile.module.scss'
import { getAuthId } from '../../../redux/selectors/authSelector'


const schema = yup
  .object({
    fullName: yup.string().required(),
    email: yup.string().required().email(),
    lookingForAJob: yup.boolean(),
  })
  .required()

type TypeProps = {
}

export const SettingsProfile: React.FC<TypeProps> = () => {
  const userId = useAppSelector(getAuthId)

  const dispatch = useAppDispatch()
  const profile = useAppSelector(getUserProfile)
  const { email, fullName, aboutMe , lookingForAJob } = profile
  const { register, handleSubmit, reset,  control, formState: { errors, isDirty, isValid } } = useForm<ProfileFormValue>({ resolver: yupResolver(schema) })


  useEffect(() => {
    reset({ email, fullName, aboutMe , lookingForAJob})
  }, [profile])

  useEffect(() => {
    if (userId) dispatch(requestProfile(userId))
  }, [])

  const submit: SubmitHandler<ProfileFormValue> = (data) => {
    dispatch(upadeteProfile(data))
  }

  return (
    <form className={st.form} onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name='photo'
        render={({ field: { onChange, value } }) => (
          <ForChangesPhoto
            selectPhoto={onChange}
            photoUrl={profile.photoUrl}
            photoFile={value}
          />
        )}
      />

      <div className={st.formControll}>
        <label htmlFor='pepName' className={st.formLabel}>
          Ім'я
        </label>
        <p className={st.formError}>{errors.fullName?.message}</p>
        <div className={st.formInput}>
          <input id='pepName' placeholder="Ім'я" {...register('fullName')} />
        </div>
      </div>

      <div className={st.formControll}>
        <label htmlFor='pepEmail' className={st.formLabel}>
          Електронна пошта
        </label>
        <div className={st.ada5V}>
          <div className={st.formInput}>
            {errors.email && (
              <p className={st.formError}>{errors.email?.message}</p>
            )}

            <input
              id='pepEmail'
              placeholder='Електронна пошта'
              {...register('email')}
            />
          </div>
        </div>
      </div>

      <div className={st.formControll}>
        <label htmlFor='pepBio' className={st.formLabel}>
          Біографія
        </label>
        <textarea
          className={st.formArea}
          id='pepBio'
          {...register('aboutMe')}
        />
      </div>

      <div className={st.formControll}>
        <label htmlFor='lookingForAJob' className={st.formLabel}>
          Шукаю роботу
        </label>
        <div className={st.ada5V}>
          <div className={st.formInput}>
            <input
              type={'checkbox'}
              id='lookingForAJob'
              {...register('lookingForAJob')}
              // checked={lookingForAJob}
            />
          </div>
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
      </div>
    </form>
  )
}
