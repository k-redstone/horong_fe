// todo : API연결/각 게시글별 컴포넌트 / 더보기 /
'use client'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { PostPromise } from '@/features/community/types/post/index.ts'
import { transFullDate } from '@/features/community/utils/datetime/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface PreviewNoticeBoardProps {
  data: PostPromise[] | undefined
}

function PreviewNoticeBoard(props: PreviewNoticeBoardProps) {
  const { data } = props
  const lang = useLangStore((state) => state.lang)

  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">{`${COMMUNITY_CONSTANT[lang]['notice-header']}`}</h1>
        <Link
          href={`/community/notice`}
          className="flex items-end"
        >
          <span className="text-2xs opacity-60">
            {`${COMMUNITY_CONSTANT[lang]['more']}`}+
          </span>
        </Link>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 단일 텍스트 */}
        {data ? (
          data.length === 0 ? (
            <p>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.map((item) => (
              <Link
                href={`/community/notice/${item.postId}`}
                key={item.postId}
                className="flex gap-x-3"
              >
                <span className="text-warning">
                  {transFullDate(item.createdAt)}
                </span>
                <span className="truncate">{item.title}</span>
              </Link>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}

        {/* <p className="flex gap-x-3">
          <span className="text-warning">
            {transFullDate('2024-09-07T09:35:30.278573')}
          </span>
          <span className="truncate">
            2024년 국민 외교 아카데미 청년 국제 관계 실무 기본과정 하반기 참가자
            모집
          </span>
        </p> */}
      </div>
    </div>
  )
}

export default PreviewNoticeBoard
