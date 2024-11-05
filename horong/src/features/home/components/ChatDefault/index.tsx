import { HOME_CONSTANT } from '@/constants/home'
import useLangStore from '@/hooks/useLangStore'
import HorongSVG from '@/static/svg/common/common-horong.svg'

export default function ChatDefault() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="h-20 w-20 animate-pulse">
        <HorongSVG />
      </div>
      <div className="flex flex-col items-center">
        <p className="animate-slide-up">{HOME_CONSTANT[lang]['home-txt1']}</p>
        <p className="animate-slide-up">{HOME_CONSTANT[lang]['home-txt2']}</p>
      </div>
    </div>
  )
}
