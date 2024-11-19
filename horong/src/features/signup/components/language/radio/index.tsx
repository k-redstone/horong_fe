import useLangStore from '@/hooks/useLangStore.ts'
import useSignupStore from '@/hooks/useSignupStore.ts'

interface LanguageRadioBtnProps {
  className?: string
  children: React.ReactNode
  language: string
}

function LanguageRadioBtn({
  className,
  children,
  language,
}: LanguageRadioBtnProps) {
  const setLanguage = useSignupStore((state) => state.setLanguage)
  const setLang = useLangStore((state) => state.setLang)
  const changeLanguage = () => {
    setLanguage(language)
    setLang(language)
  }
  return (
    <button
      onClick={changeLanguage}
      className={`${className} flex items-center gap-x-3 rounded-xl border border-grey-60 py-3 pl-6 pr-4 text-text-high`}
    >
      {children}
    </button>
  )
}

export default LanguageRadioBtn
