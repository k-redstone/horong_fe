'use client'

import Image, { StaticImageData } from 'next/image'

import EditIcon from '@/static/svg/edit/edit-profile-lock-icon.svg'
interface ProfileBtnProps {
  className?: string
  isLock: boolean
  targetImg: StaticImageData
  profileImg: StaticImageData
  setProfileImg: React.Dispatch<React.SetStateAction<StaticImageData>>
}

function ProfileBtn(props: ProfileBtnProps) {
  const { targetImg, isLock, profileImg, setProfileImg } = props
  return (
    <button
      disabled={isLock}
      onClick={() => setProfileImg(targetImg)}
      className="flex flex-1 items-center justify-center"
    >
      {isLock && (
        <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-grey-100 bg-opacity-30">
          <EditIcon className="h-6 w-6" />
        </div>
      )}
      <Image
        src={targetImg}
        alt="unlocked-profile"
        className={`${profileImg === targetImg && 'border-4 border-primary'} h-14 w-14 rounded-full`}
      />
    </button>
  )
}

export default ProfileBtn
