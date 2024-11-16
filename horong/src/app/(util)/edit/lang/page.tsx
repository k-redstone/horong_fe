'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EDIT_LANG_CONSTANT } from '@/constants/edit/lang/index.ts'
import LanguageRadioBtn from '@/features/signup/components/language/radio/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import RadioCheckedIcon from '@/static/svg/auth/auth-checked-radio-icon.svg'
import RadioUnCheckdIcon from '@/static/svg/auth/auth-unchecked-radio-icon.svg'

function EditLang() {
  const lang = useLangStore((state) => state.lang)
  const setLang = useLangStore((state) => state.setLang)

  const router = useRouter()
  const { mutate: changeNicknameMutation } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.patch(`/user/language?language=${lang}`)

      return res.data.result
    },
    onSuccess: () => {
      toast.success(EDIT_LANG_CONSTANT[lang]['lang-toast-success'])

      //로컬스토리지 변경 + langstore 변경
      localStorage.setItem('langState', lang)
      setLang(lang)
      router.back()
    },
  })

  const changeNickname = () => {
    changeNicknameMutation()
  }
  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader pageName={EDIT_LANG_CONSTANT[lang]['lang-header']} />

      <div className="flex w-full flex-col items-center justify-between overflow-y-scroll px-5">
        <div className="flex w-full flex-col gap-y-1 py-10">
          <h3 className="text-lg">{EDIT_LANG_CONSTANT[lang]['lang-title']}</h3>
          <span className="text-sm">
            {EDIT_LANG_CONSTANT[lang]['lang-sub-title']}
          </span>
        </div>

        <div className="mb-10 flex w-full flex-col justify-center gap-y-4 py-3">
          <LanguageRadioBtn
            className={`${lang === 'ENGLISH' && 'border-primary'}`}
            language="ENGLISH"
          >
            {lang === 'ENGLISH' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
            ENGLISH
          </LanguageRadioBtn>
          <LanguageRadioBtn
            className={`${lang === 'KOREAN' && 'border-primary'}`}
            language="KOREAN"
          >
            {lang === 'KOREAN' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
            한국어
          </LanguageRadioBtn>
          <LanguageRadioBtn
            className={`${lang === 'CHINESE' && 'border-primary'}`}
            language="CHINESE"
          >
            {lang === 'CHINESE' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
            中文
          </LanguageRadioBtn>
          <LanguageRadioBtn
            className={`${lang === 'JAPANESE' && 'border-primary'}`}
            language="JAPANESE"
          >
            {lang === 'JAPANESE' ? <RadioCheckedIcon /> : <RadioUnCheckdIcon />}
            日本語
          </LanguageRadioBtn>
        </div>
        <button
          onClick={changeNickname}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100"
        >
          {EDIT_LANG_CONSTANT[lang]['lang-btn']}
        </button>
      </div>
    </div>
  )
}

export default EditLang
