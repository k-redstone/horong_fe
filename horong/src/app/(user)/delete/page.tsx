'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { WITHDRAW_CONSTANT } from '@/constants/widthdraw/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import CheckedIcon from '@/static/svg/withdraw/withdraw-checked-icon.svg'
import UnCheckedIcon from '@/static/svg/withdraw/withdraw-unchecked-icon.svg'
function WithDraw() {
  const [reason, setReason] = useState(0)
  const lang = useLangStore((state) => state.lang)
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')

      return res.data.result
    },
  })
  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader pageName={WITHDRAW_CONSTANT[lang]['withdraw-header']} />

      <div className="flex flex-col items-center justify-between overflow-y-scroll px-6">
        <div className="flex w-full flex-col gap-y-3 py-10">
          <h3 className="whitespace-pre-line text-lg">
            <span className="font-bold">{user?.nickname}</span>
            {WITHDRAW_CONSTANT[lang]['withdraw-title']}
          </h3>
          <div className="text-text-high">
            <p className="text-sm">
              {WITHDRAW_CONSTANT[lang]['withdraw-sub-title1']}
            </p>{' '}
            <p className="text-sm">
              {WITHDRAW_CONSTANT[lang]['withdraw-sub-title2']}
            </p>
          </div>
        </div>

        <div className="mb-20 flex w-full flex-col gap-y-2 py-3 text-sm">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button
              key={'withdraw-radio' + i}
              onClick={() => setReason(i)}
              className="flex items-center gap-x-3 py-3 text-text-high"
            >
              {reason === i ? (
                <CheckedIcon className="h-6 w-6" />
              ) : (
                <UnCheckedIcon className="h-6 w-6" />
              )}
              {WITHDRAW_CONSTANT[lang]['withdraw-radio' + i.toString()]}
            </button>
          ))}
        </div>

        <button
          disabled={!reason}
          onClick={() => router.push('/delete/confirm')}
          className={`${!reason && '!bg-grey-50 text-text-disabled'} flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100`}
        >
          {WITHDRAW_CONSTANT[lang]['withdraw-btn']}
        </button>
      </div>
    </div>
  )
}

export default WithDraw
