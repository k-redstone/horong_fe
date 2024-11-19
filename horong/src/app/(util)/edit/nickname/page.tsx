'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EDIT_NICKNAME_CONSTANT } from '@/constants/edit/nickname/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import XmarkIcon from '@/static/svg/auth/auth-xmark-icon.svg'
function EditNickname() {
  const [nickname, setNickname] = useState('')
  const [errorText, setErrorText] = useState('')

  const lang = useLangStore((state) => state.lang)

  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: changeNicknameMutation } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('nickname', nickname)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const res = await privateAPI.put('/user/profile', formData, config)

      return res.data.result
    },
    onSuccess: () => {
      toast.success(EDIT_NICKNAME_CONSTANT[lang]['nickname-toast-success'])
      queryClient.invalidateQueries({
        queryKey: ['user-info'],
      })

      router.back()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      //status에 따라 에러 메시지 변경
      if (err.response.status === 400) {
        setErrorText(EDIT_NICKNAME_CONSTANT[lang]['nickname-toast-fail1'])
      } else {
        setErrorText(EDIT_NICKNAME_CONSTANT[lang]['nickname-toast-fail2'])
      }
    },
  })

  const changeNickname = () => {
    changeNicknameMutation()
  }
  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader
        pageName={EDIT_NICKNAME_CONSTANT[lang]['nickname-header']}
      />

      <div className="flex flex-col items-center justify-between overflow-y-scroll px-6">
        <div className="flex w-full flex-col gap-y-1 py-10">
          <h3 className="text-lg">
            {EDIT_NICKNAME_CONSTANT[lang]['nickname-title']}
          </h3>
          <span className="text-sm">
            {EDIT_NICKNAME_CONSTANT[lang]['nickname-sub-title']}
          </span>
        </div>

        {/* 닉네임 변경 컨테이너 */}
        <div className="mb-[20rem] flex w-full flex-col gap-y-2 py-3">
          <label
            className="text-high text-xs-bold"
            htmlFor="edit-nickname"
          >
            NICKNAME
          </label>
          <div className="flex w-full items-center justify-between rounded-xl border border-grey-60 bg-transparent py-3 pl-6 pr-4 text-sm text-text-high focus-within:border-primary">
            <input
              id="edit-nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder:text-text-disabled"
              placeholder={EDIT_NICKNAME_CONSTANT[lang]['nickname-placeholder']}
            />
            <div className="flex items-center gap-x-2">
              {nickname && (
                <button
                  className="focus-visible:outline-primary"
                  onClick={() => setNickname('')}
                >
                  <XmarkIcon />
                </button>
              )}
            </div>
          </div>
          {errorText && (
            <p className="ml-2 w-full text-xs text-warning">{errorText}</p>
          )}
        </div>

        <button
          disabled={nickname.length <= 0}
          onClick={changeNickname}
          className={`${nickname.length <= 0 && '!bg-grey-50 text-text-disabled'} flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100`}
        >
          {EDIT_NICKNAME_CONSTANT[lang]['nickname-btn']}
        </button>
      </div>
    </div>
  )
}

export default EditNickname
