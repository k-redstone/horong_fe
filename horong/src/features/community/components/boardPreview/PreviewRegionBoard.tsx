// todo : API연결/각 게시글별 컴포넌트 / 더보기 /
'use client'
import Link from 'next/link'
import { LoaderIcon } from 'react-hot-toast'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { BaordPreviewPromise } from '@/features/community/types/post/index.ts'
import { isPostNew } from '@/features/community/utils/datetime/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface PreviewRegionBoardProps {
  data: BaordPreviewPromise | undefined
}

function PreviewRegionBoard(props: PreviewRegionBoardProps) {
  const { data } = props
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">
          {COMMUNITY_CONSTANT[lang]['region-header']}
        </h1>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 서울 */}
        {data?.SEOUL ? (
          data.SEOUL.length === 0 ? (
            <p className="flex gap-x-1">
              <Link
                href={`/community/seoul`}
                className="w-[3.75rem] shrink-0 font-bold"
              >
                {COMMUNITY_CONSTANT[lang]['region-text-seoul']}
              </Link>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.SEOUL.map((item) => (
              <p
                key={item.postId}
                className="flex gap-x-1"
              >
                <Link
                  href={`/community/seoul`}
                  className="w-[3.75rem] shrink-0 font-bold"
                >
                  {COMMUNITY_CONSTANT[lang]['region-text-seoul']}
                </Link>
                <Link
                  href={`/community/seoul/${item.postId}`}
                  className="truncate"
                >
                  {item.title}
                </Link>
                <span className="text-warning">
                  {isPostNew(item.createdAt) &&
                    `${COMMUNITY_CONSTANT[lang]['new-text']}`}
                </span>
              </p>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}

        {/* 경기도 */}
        {data?.GYEONGGI ? (
          data.GYEONGGI.length === 0 ? (
            <p className="flex gap-x-1">
              <Link
                href={`/community/gyeonggi`}
                className="w-[3.75rem] shrink-0 font-bold"
              >
                {COMMUNITY_CONSTANT[lang]['region-text-gyeonggi']}
              </Link>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.GYEONGGI.map((item) => (
              <p
                key={item.postId}
                className="flex gap-x-1"
              >
                <Link
                  href={`/community/gyeonggi`}
                  className="w-[3.75rem] shrink-0 font-bold"
                >
                  {COMMUNITY_CONSTANT[lang]['region-text-gyeonggi']}
                </Link>
                <Link
                  href={`/community/gyeonggi/${item.postId}`}
                  className="truncate"
                >
                  {item.title}
                </Link>
                <span className="text-warning">
                  {isPostNew(item.createdAt) &&
                    `${COMMUNITY_CONSTANT[lang]['new-text']}`}
                </span>
              </p>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}

        {/* 인천광역시 */}
        {data?.INCHEON ? (
          data.INCHEON.length === 0 ? (
            <p className="flex gap-x-1">
              <Link
                href={`/community/incheon`}
                className="w-[3.75rem] shrink-0 font-bold"
              >
                {COMMUNITY_CONSTANT[lang]['region-text-incheon']}
              </Link>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.INCHEON.map((item) => (
              <p
                key={item.postId}
                className="flex gap-x-1"
              >
                <Link
                  href={`/community/incheon`}
                  className="w-[3.75rem] shrink-0 font-bold"
                >
                  {COMMUNITY_CONSTANT[lang]['region-text-incheon']}
                </Link>
                <Link
                  href={`/community/incheon/${item.postId}`}
                  className="truncate"
                >
                  {item.title}
                </Link>
                <span className="text-warning">
                  {isPostNew(item.createdAt) &&
                    `${COMMUNITY_CONSTANT[lang]['new-text']}`}
                </span>
              </p>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}

        {/* 부산광역시 */}
        {data?.BUSAN ? (
          data.BUSAN.length === 0 ? (
            <p className="flex gap-x-1">
              <Link
                href={`/community/busan`}
                className="w-[3.75rem] shrink-0 font-bold"
              >
                {COMMUNITY_CONSTANT[lang]['region-text-busan']}
              </Link>
              <span>{COMMUNITY_CONSTANT[lang]['post-none-text']}</span>
            </p>
          ) : (
            data.BUSAN.map((item) => (
              <p
                key={item.postId}
                className="flex gap-x-1"
              >
                <Link
                  href={`/community/busan`}
                  className="w-[3.75rem] shrink-0 font-bold"
                >
                  {COMMUNITY_CONSTANT[lang]['region-text-busan']}
                </Link>
                <Link
                  href={`/community/busan/${item.postId}`}
                  className="truncate"
                >
                  {item.title}
                </Link>
                <span className="text-warning">
                  {isPostNew(item.createdAt) &&
                    `${COMMUNITY_CONSTANT[lang]['new-text']}`}
                </span>
              </p>
            ))
          )
        ) : (
          <div className="flex justify-center">
            <LoaderIcon />
          </div>
        )}
        {/* <p className="flex gap-x-1">
          <span className="w-[3.75rem] shrink-0 font-bold">부산광역시</span>
          <span className="truncate">마 이승주 자신있나</span>
        </p> */}

        <br />
        <p className="text-center">
          {COMMUNITY_CONSTANT[lang]['region-update-notice']}
        </p>
      </div>
    </div>
  )
}

export default PreviewRegionBoard
