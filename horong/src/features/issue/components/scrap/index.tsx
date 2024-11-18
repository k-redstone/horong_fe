import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import { ISSUE_CONSTANTS } from '@/constants/issue/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface ShortFormGridType {
  id: number
  content: string
  image: string
  audio: string
  is_saved: boolean
  preference: number
}
function IssueScrap() {
  const { data: shorformLike, isLoading } = useQuery({
    queryKey: ['short-form-grid-scrap'],
    queryFn: async () => {
      const res = await privateAPI.get('/shortForm/liked')
      return res.data.result
    },
  })
  const lang = useLangStore((state) => state.lang)
  if (isLoading)
    return (
      <div className="flex w-full grow items-center justify-center py-10">
        <LoaderIcon />
      </div>
    )
  if (shorformLike.length) {
    return (
      <div className="grid grow grid-cols-3 place-content-start place-items-center gap-y-4 overflow-y-scroll px-2">
        {/* post card */}
        {shorformLike.map((item: ShortFormGridType) => (
          <Link
            key={'short-form-grid-' + item.id}
            href={`/issue/${item.id}`}
            className="relative flex min-h-[10.75rem] items-center justify-center"
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
  return (
    <div className="flex w-full grow flex-col items-center justify-center gap-y-1 overflow-y-scroll text-text-high">
      {/* post card */}

      {/* 아이템이 없다는걸 가정 */}
      <h3 className="text-lg">{ISSUE_CONSTANTS[lang]['scrap-title']}</h3>
      <p className="text-xs">{ISSUE_CONSTANTS[lang]['scrap-content']}</p>
    </div>
  )
}

export default IssueScrap
