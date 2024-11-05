'use client'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface BoardTitleProps {
  boardType: CommunityPathType
}

function BoardTitle({ boardType }: BoardTitleProps) {
  const lang = useLangStore((state) => state.lang)

  switch (boardType) {
    case 'notice':
      return (
        <div className="flex flex-col gap-y-2 px-3 pb-1 pt-4">
          <h1 className="font-bold">
            {COMMUNITY_CONSTANT[lang]['notice-header']}
          </h1>
          <span className="text-2xs">
            {COMMUNITY_CONSTANT[lang]['notice-des']}
          </span>
        </div>
      )
    case 'free':
      return (
        <div className="flex flex-col gap-y-2 px-3 pb-1 pt-4">
          <h1 className="font-bold">
            {COMMUNITY_CONSTANT[lang]['free-header']}
          </h1>
          <span className="text-2xs">
            {COMMUNITY_CONSTANT[lang]['free-des']}
          </span>
        </div>
      )
    case 'seoul':
      return (
        <div className="flex flex-col gap-y-2 px-3 pb-1 pt-4">
          <h1 className="font-bold">
            {COMMUNITY_CONSTANT[lang]['region-subheader-seoul']}
          </h1>
          <span className="text-2xs">
            {COMMUNITY_CONSTANT[lang]['region-des-seoul']}
          </span>
        </div>
      )
  }
  // return (
  //   <div className="flex flex-col gap-y-2 px-3 pb-1 pt-4">
  //     <h1 className="font-bold">외교부 공지사항</h1>
  //     <span className="text-2xs">
  //       대한민국 외교부의 공지사항들이 올라오는 게시판입니다.
  //     </span>
  //   </div>
  // )
}

export default BoardTitle
