'use client'
import { useState } from 'react'

import IssueGrid from '@/features/issue/components/grid/index.tsx'
import IssueLike from '@/features/issue/components/like/index.tsx'
import IssueScrap from '@/features/issue/components/scrap/index.tsx'
import GridIcon from '@/static/svg/issue/issue-grid-icon.svg'
import SelectedGridIcon from '@/static/svg/issue/issue-grid-selected-icon.svg'
import LikeIcon from '@/static/svg/issue/issue-like-icon.svg'
import SelectedLikeIcon from '@/static/svg/issue/issue-like-selected-icon.svg'
import ScrapIcon from '@/static/svg/issue/issue-scrap-icon.svg'
import SelectedScrapIcon from '@/static/svg/issue/issue-scrap-selected-icon.svg'

function IssuePage() {
  const [tab, setTab] = useState(0)
  return (
    <>
      {/* tab */}
      <div className="grid w-full grid-cols-3 place-items-center px-2 py-2">
        <button
          onClick={() => setTab(0)}
          className={`${tab === 0 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          {tab === 0 ? (
            <SelectedGridIcon className="h-6 w-6" />
          ) : (
            <GridIcon className="h-6 w-6" />
          )}
        </button>

        <button
          onClick={() => setTab(1)}
          className={`${tab === 1 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          {tab === 1 ? (
            <SelectedLikeIcon className="h-6 w-6" />
          ) : (
            <LikeIcon className="h-6 w-6" />
          )}
        </button>

        <button
          onClick={() => setTab(2)}
          className={`${tab === 2 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          {tab === 2 ? (
            <SelectedScrapIcon className="h-6 w-6" />
          ) : (
            <ScrapIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {tab === 0 && <IssueGrid />}
      {tab === 1 && <IssueLike />}
      {tab === 2 && <IssueScrap />}
    </>
  )
}

export default IssuePage
