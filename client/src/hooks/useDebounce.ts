import { useCallback, useRef } from 'react'

type UseType = (a: Function, b: number) => (...args: any[]) => void

export const useDebounce: UseType = (callback, delay) => {
  const timer: { current: NodeJS.Timeout | null } = useRef(null)

  const debouncedCallback = (...args:any) => {
    timer.current && clearTimeout(timer.current)

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedCallback
}
