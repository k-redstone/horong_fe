'use client'

import Image, { StaticImageData } from 'next/image'

import EditIcon from '@/static/svg/edit/edit-profile-lock-icon.svg'
interface ProfileBtnProps {
  className?: string
  isLock: boolean
  targetImg: StaticImageData
  profileImg: StaticImageData
  setProfileImg: React.Dispatch<React.SetStateAction<StaticImageData>>

  profileIdx: number
  setProfileIdx: React.Dispatch<React.SetStateAction<number>>
}

function ProfileBtn(props: ProfileBtnProps) {
  const {
    targetImg,
    profileIdx,
    setProfileIdx,
    isLock,
    profileImg,
    setProfileImg,
  } = props

  const handleImgClick = () => {
    setProfileImg(targetImg)
    setProfileIdx(profileIdx)
  }
  return (
    <button
      disabled={isLock}
      onClick={handleImgClick}
      className="flex w-1/4 shrink-0 items-center justify-center"
    >
      {isLock && (
        <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-grey-100 bg-opacity-30">
          <EditIcon className="h-6 w-6" />
        </div>
      )}
      <Image
        src={targetImg}
        alt="unlocked-profile"
        width={60}
        height={60}
        className={`${profileImg === targetImg && 'border-4 border-primary'} h-14 w-14 rounded-full`}
      />
    </button>
  )
}

export default ProfileBtn
