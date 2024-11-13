'use client'
import Link from 'next/link'
import { useState } from 'react'

function GuidePage() {
  const [tab, setTab] = useState(0)
  return (
    <div className="mx-auto w-full max-w-md grow">
      {' '}
      <div className="grid w-full grid-cols-3 place-items-center bg-gray-900 px-2 py-2">
        {' '}
        {/* 배경색 설정 */}
        <button
          onClick={() => setTab(0)}
          className={`${tab === 0 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 0 ? 'text-primary' : 'text-gray-500'}`}>
            서류 · 비자
          </span>
        </button>
        <button
          onClick={() => setTab(1)}
          className={`${tab === 1 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 1 ? 'text-primary' : 'text-gray-500'}`}>
            문화
          </span>
        </button>
        <button
          onClick={() => setTab(2)}
          className={`${tab === 2 && '!border-primary'} flex w-full items-center justify-center border-b border-transparent px-3 pb-4 pt-3`}
        >
          <span className={`${tab === 2 ? 'text-primary' : 'text-gray-500'}`}>
            생활
          </span>
        </button>
      </div>
      <div className="space-y-4 p-4">
        {' '}
        {/* 여백 및 간격 설정 */}
        {tab === 0 && (
          <div className="space-y-4">
            <Link href="/guide/visa">
              <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-800 p-4">
                <span className="text-white">비자</span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
            <Link href="/guide/residence">
              <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-800 p-4">
                <span className="text-white">외국인 등록증</span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
        {tab === 1 && (
          <div className="space-y-4">
            <Link href="/guide/holiday">
              <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-800 p-4">
                <span className="text-white">휴일</span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
        {tab === 2 && (
          <div className="space-y-4">
            <Link href="/guide/hospital">
              <div className="flex items-center justify-between rounded-lg border border-gray-300 bg-gray-800 p-4">
                <span className="text-white">병원</span>
                <span className="text-primary">▶</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuidePage
