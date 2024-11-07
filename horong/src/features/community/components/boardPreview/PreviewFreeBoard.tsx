'use client'

import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { PostPromise } from '@/features/community/types/post/index.ts'
import { isPostNew } from '@/features/community/utils/datetime/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface PreviewFreeBoardProps {
  data: PostPromise[] | undefined
}

function PreviewFreeBoard(props: PreviewFreeBoardProps) {
  const { data } = props

  const lang = useLangStore((state) => state.lang)

  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">{`${COMMUNITY_CONSTANT[lang]['free-header']}`}</h1>
        <Link
          href={`/community/free`}
          className="flex items-end"
        >
          <span className="text-2xs opacity-60">
            {`${COMMUNITY_CONSTANT[lang]['more']}`}+
          </span>
        </Link>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 단일 게시글 컴포넌트*/}

        {data ? (
          data.length === 0 ? (
            <p>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.map((item) => (
              <Link
                href={`/community/free/${item.postId}`}
                key={item.postId}
                className="flex gap-x-1"
              >
                <span className="truncate">{item.title}</span>
                <span className="text-primary">[{item.comments.length}]</span>
                <span className="text-warning">
                  {isPostNew(item.createdAt) &&
                    `${COMMUNITY_CONSTANT[lang]['new-text']}`}
                </span>
              </Link>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}

        {/* <p className="flex gap-x-1">
          <span className="truncate">
            無理無理無理無理無理無理無理無理無理無理無理無理無理
          </span>
          <span className="text-primary">[12]</span>
          <span className="text-warning">new</span>
        </p> */}
      </div>
    </div>
  )
}

export default PreviewFreeBoard
