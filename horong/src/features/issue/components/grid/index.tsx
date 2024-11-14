'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'

interface ShortFormGridType {
  id: number
  content: string
  image: string
  audio: string
  is_saved: boolean
  preference: number
}

function IssueGrid() {
  const { data: shorformGrid, isLoading } = useQuery({
    queryKey: ['short-form-grid'],
    queryFn: async () => {
      const res = await privateAPI.get('/shortForm')
      return res.data.result
    },
  })

  if (isLoading)
    return (
      <div className="flex w-full grow items-center justify-center py-10">
        <LoaderIcon />
      </div>
    )
  return (
    <div className="grid grow grid-cols-3 place-content-start place-items-center gap-y-4 overflow-y-scroll px-2">
      {/* post card */}
      {shorformGrid &&
        shorformGrid.map((item: ShortFormGridType) => (
          <Link
            key={'short-form-grid-' + item.id}
            href={`/issue/${item.id}`}
            className="relative items-center justify-center"
          >
            <Image
              width={100}
              height={172}
              src={item.image}
              alt="grid item object-cover"
            />
          </Link>
        ))}
    </div>
  )
}

export default IssueGrid
