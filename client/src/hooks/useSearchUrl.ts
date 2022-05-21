import React from 'react'
import { useSearchParams } from 'react-router-dom'
import transformer from '../utils/transformer'

export const useSearchUrl = (options:any, conversion:any) => {
  let [searchParams] = useSearchParams()

  const params = {}

  options.forEach((item:any) => {
    // if (conversion === item) {
    //   //конвертування з рядка в логіку
    //   params[item] = transformer(searchParams.get(item))
    // } else {
    //   params[item] = searchParams.get(item)
    // }
  })

  return params
}
