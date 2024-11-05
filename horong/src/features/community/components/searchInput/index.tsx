'use client'

import { useState } from 'react'

import SearchIcon from '@/static/svg/community/community-search-icon.svg'

interface SearchInputProps {
  boardType: string
}

function SearchInput({ boardType }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  console.log(boardType)
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = () => {
    setIsFocused(false)
  }
  return (
    <div className="flex justify-end px-4">
      <div
        className={`flex items-center justify-end gap-x-1 rounded-full border border-grey-60 py-1 pl-3 pr-2 transition-all duration-300 ease-linear ${isFocused && 'grow'}`}
      >
        <input
          type="text"
          className={`w-full bg-grey-80 text-xs focus:outline-none`}
          placeholder="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SearchIcon />
      </div>
    </div>
  )
}

export default SearchInput
