import LogoIcon from '@/static/svg/logo-icon.svg'

interface MobileIndexModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
  isModal: boolean
}
function MobileIndexModal(props: MobileIndexModalProps) {
  const { setIsModal, isModal } = props
  const closeModal = () => {
    setIsModal(!isModal)

    sessionStorage.setItem('checkedMobileModal', 'true')
  }
  return (
    <div
      className={`${isModal ? 'bottom-0' : 'bottom-[-20rem]'} absolute flex w-[32.5rem] flex-col items-center justify-center gap-y-3 rounded-md rounded-t-[2.5rem] bg-grey-80 px-8 py-6 transition-all duration-500 ease-in-out`}
    >
      <LogoIcon className="h-[6.25rem] w-[6.25rem]" />
      <div className="text-high flex flex-col items-center justify-center gap-y-2 text-lg">
        <p>‘호롱’ 서비스는 모바일 뷰에 최적화되어있어요!</p>
        <p>
          크롬 <i className="underline">F12 모바일 디바이스 설정</i>을 통해
          화면을 확인해주세요 :D
        </p>
      </div>
      <button
        onClick={closeModal}
        className="flex items-center justify-center rounded-xl bg-[#ACBEFF] px-32 py-4 text-md text-grey-100"
      >
        확인했어요!
      </button>
    </div>
  )
}

export default MobileIndexModal
