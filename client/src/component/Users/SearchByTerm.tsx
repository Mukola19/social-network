import React, { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchIcon from '@mui/icons-material/Search'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../../commons/SearchForm/SearchForm'
import { useDebounce } from '../../hooks/useDebounce'

type SearchProps = {
  doSearch: (data: string) => void
  term: string
}

type ValueSearchTypes = {
  term: string
}

export const SearchByTerm: React.FC<SearchProps> = memo(
  ({ doSearch, term }) => {
    const { handleSubmit, setValue, register } = useForm<ValueSearchTypes>()

    //Робимо затримку
    const submitHandler = useDebounce((data: ValueSearchTypes) => {
      doSearch(data.term)
    }, 1000)

    useEffect(() => {
      setValue('term', term)
    }, [term])

    return (
      <form onKeyUp={handleSubmit(submitHandler)}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            {...register('term')}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </form>
    )
  }
)
