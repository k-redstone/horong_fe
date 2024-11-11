'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { WITHDRAW_CONSTANT } from '@/constants/widthdraw/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import CheckedIcon from '@/static/svg/withdraw/delete-checked-icon.svg'
import UnCheckedIcon from '@/static/svg/withdraw/delete-unchecked-icon.svg'

function DeleteUser() {
  const [checkbox, setCheckbox] = useState(false)
  const lang = useLangStore((state) => state.lang)
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')

      return res.data.result
    },
  })

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.patch('/user')

      return res.data.result
    },
    onSuccess: () => {
      toast.success(WITHDRAW_CONSTANT[lang]['delete-toast-success'])
      router.push('/login')
      localStorage.clear()
      sessionStorage.clear()
    },
  })
  const deleteUser = () => {
    deleteUserMutation()
  }
  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader pageName={WITHDRAW_CONSTANT[lang]['withdraw-header']} />

      <div className="flex flex-col items-center justify-between overflow-y-scroll px-6">
        <div className="flex w-full flex-col gap-y-3 py-10">
          <h3 className="whitespace-pre-line text-lg">
            <span className="font-bold">{user?.nickname}</span>
            {WITHDRAW_CONSTANT[lang]['delete-title']}
          </h3>
          <div className="text-text-high">
            <p className="text-sm">
              {WITHDRAW_CONSTANT[lang]['delete-sub-title1']}
            </p>{' '}
            <p className="text-sm">
              {WITHDRAW_CONSTANT[lang]['delete-sub-title2']}
            </p>
          </div>
        </div>

        <ul className="mb-20 flex w-full list-outside list-disc flex-col gap-y-2 px-5 py-3 text-xs text-text-high">
          <li className="py-3">{WITHDRAW_CONSTANT[lang]['delete-text1']}</li>
          <li className="py-3">{WITHDRAW_CONSTANT[lang]['delete-text2']}</li>
        </ul>

        <button
          onClick={() => setCheckbox(!checkbox)}
          className="flex w-full items-center gap-x-3 text-xs text-text-high"
        >
          {checkbox ? (
            <CheckedIcon className="h-6 w-6" />
          ) : (
            <UnCheckedIcon className="h-6 w-6" />
          )}
          {WITHDRAW_CONSTANT[lang]['delete-checkbox']}
        </button>
        <button
          disabled={!checkbox}
          onClick={deleteUser}
          className={`${!checkbox && '!bg-grey-50 text-text-disabled'} my-6 flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100`}
        >
          {WITHDRAW_CONSTANT[lang]['delete-btn']}
        </button>
      </div>
    </div>
  )
}

export default DeleteUser
