'use client'
import Link from 'next/link'
import { useState } from 'react'

import GlobalFooterNav from '@/components/globalFooterNav/index.tsx'
import { GUIDE_CONSTANT } from '@/constants/guide/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

function GuidePage() {
  const [tab, setTab] = useState(0)
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="mx-auto flex w-full grow flex-col">
      <div className="grid w-full grid-cols-3 place-items-center px-2 py-2 text-sm">
        <button
          onClick={() => setTab(0)}
          className={`${tab === 0 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 0 ? 'text-primary' : 'text-text-high'}`}>
            {GUIDE_CONSTANT[lang]['guide-tab-doc']}
          </span>
        </button>
        <button
          onClick={() => setTab(1)}
          className={`${tab === 1 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 1 ? 'text-primary' : 'text-text-high'}`}>
            {GUIDE_CONSTANT[lang]['guide-tab-culture']}
          </span>
        </button>
        <button
          onClick={() => setTab(2)}
          className={`${tab === 2 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 2 ? 'text-primary' : 'text-text-high'}`}>
            {GUIDE_CONSTANT[lang]['guide-tab-living']}
          </span>
        </button>
      </div>
      <div className="grow space-y-6 p-6">
        {tab === 0 && (
          <div className="space-y-4">
            <Link href="/guide/visa">
              <div className="mb-6 flex items-center justify-between rounded-xl border border-grey-60 px-8 py-5">
                <span className="text-text-high">
                  {' '}
                  {GUIDE_CONSTANT[lang]['guide-link-visa']}
                </span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
            <Link href="/guide/residence">
              <div className="mb-6 flex items-center justify-between rounded-xl border border-grey-60 px-8 py-5">
                <span className="text-text-high">
                  {' '}
                  {GUIDE_CONSTANT[lang]['guide-link-residence']}
                </span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
        {tab === 1 && (
          <div className="space-y-4">
            <Link href="/guide/holiday">
              <div className="mb-6 flex items-center justify-between rounded-xl border border-grey-60 px-8 py-5">
                <span className="text-text-high">
                  {' '}
                  {GUIDE_CONSTANT[lang]['guide-link-holiday']}
                </span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
        {tab === 2 && (
          <div className="space-y-4">
            <Link href="/guide/hospital">
              <div className="mb-6 flex items-center justify-between rounded-xl border border-grey-60 px-8 py-5">
                <span className="text-text-high">
                  {GUIDE_CONSTANT[lang]['guide-link-hospital']}
                </span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <GlobalFooterNav />
    </div>
  )
}

export default GuidePage
