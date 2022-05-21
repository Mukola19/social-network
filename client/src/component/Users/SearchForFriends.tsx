import React, { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import transformer from '../../utils/transformer'
import st from './Users.module.scss'

type SearchForProps = {
  doSearch: (data: string) => void
  friend: string
}

export const SearchForFriends: React.FC<SearchForProps> = ({
  doSearch,
  friend,
}) => {
  const [value, setValue] = useState<any>('null')

  useEffect(() => {
    setValue(friend)
  }, [friend])

  const onchange = (e: SelectChangeEvent<string>) => {
    const data = e.target.value
    setValue(data)
    doSearch(data)
  }

  return (
    <Select
      value={friend || value}
      className={st.selectSearch}
      color="secondary"
      onChange={onchange}
    >
      <MenuItem value={'null'}>Всі</MenuItem>
      <MenuItem value={'true'}>Друзі</MenuItem>
      <MenuItem value={'false'}>Не друзі</MenuItem>
    </Select>
  )
}
