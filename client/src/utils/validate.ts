import * as Yup from 'yup'

export const requiredEmail = (value: string) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Ведіть електрону пошту'
  }
  return undefined
}

export const required = (value: string) => {
  if (!value) return `Поле обов'язкове`
  return undefined
}

export const incorrectQuantity = (num: number) => {
  return (value: string) => {
    if (value.length > num) return `Перевищення кількості символів`
    return undefined
  }
}
