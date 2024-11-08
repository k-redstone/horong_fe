'use client'

import { useState } from 'react'

import SearchIcon from '@/static/svg/community/community-search-icon.svg'

interface SearchInputProps {
  boardType: string
  setIsSearchTriggered: (arg: boolean) => void
  setSearchTxt: (arg: string) => void
}

function SearchInput({
  boardType,
  setIsSearchTriggered,
  setSearchTxt,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputVale] = useState<string>('')
  console.log(boardType)

  const handleSearch = () => {
    console.log(inputValue)
    setSearchTxt(inputValue)
    setIsSearchTriggered(true)
    setInputVale('')
  }

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
          value={inputValue}
          onChange={(e) => setInputVale(e.currentTarget.value)}
        />
        <button
          type="button"
          onClick={() => handleSearch()}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}

export default SearchInput
