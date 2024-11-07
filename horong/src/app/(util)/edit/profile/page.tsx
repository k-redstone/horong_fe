'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EDIT_PROFILE_CONSTANT } from '@/constants/edit/profile/index.ts'
import ProfileBtn from '@/features/mypage/components/profileBtn/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import DefaultProfile from '@/static/imgs/profile/profile-basic-blue.png'
import BasicGreenProfile from '@/static/imgs/profile/profile-basic-green.png'
import BasicRedProfile from '@/static/imgs/profile/profile-basic-red.png'
import BasicSpecialProfile from '@/static/imgs/profile/profile-basic-special.png'
import BasicYellowProfile from '@/static/imgs/profile/profile-basic-yellow.png'
import ColorBlueProfile from '@/static/imgs/profile/profile-color-blue.png'
import ColorGreenProfile from '@/static/imgs/profile/profile-color-green.png'
import ColorPinkProfile from '@/static/imgs/profile/profile-color-pink.png'
import ColorPurpleProfile from '@/static/imgs/profile/profile-color-purple.png'
import ColorSpecialProfile from '@/static/imgs/profile/profile-color-special.png'
import FacialAngryProfile from '@/static/imgs/profile/profile-facial-angry.png'
import FacialConfuseProfile from '@/static/imgs/profile/profile-facial-confuse.png'
import FacialCryProfile from '@/static/imgs/profile/profile-facial-cry.png'
import FacialLaughProfile from '@/static/imgs/profile/profile-facial-laugh.png'
import FacialNormalProfile from '@/static/imgs/profile/profile-facial-normal.png'
import FacialSpecialProfile from '@/static/imgs/profile/profile-facial-special.png'

function EditProfile() {
  const [profileImg, setProfileImg] = useState(DefaultProfile)
  const lang = useLangStore((state) => state.lang)

  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader pageName={EDIT_PROFILE_CONSTANT[lang]['profile-header']} />

      <div className="flex flex-col items-center justify-center px-5">
        {/* 현재 사진으로 시작, 누르면 사진 변경 */}
        <div className="flex items-center justify-start py-5">
          <Image
            src={profileImg}
            alt="default-unlocked-profile"
            className="h-28 w-28 rounded-full"
          />
        </div>

        <div className="mb-48 flex w-full flex-col items-center justify-center gap-y-3 border-t border-primary border-opacity-30 py-6">
          <div className="flex w-full items-center justify-between gap-x-1 px-2 py-2">
            <ProfileBtn
              isLock={false}
              targetImg={DefaultProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={false}
              targetImg={BasicRedProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={false}
              targetImg={BasicYellowProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={false}
              targetImg={BasicGreenProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-x-1 px-2 py-2">
            <ProfileBtn
              isLock={false}
              targetImg={BasicSpecialProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={false}
              targetImg={ColorPinkProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={false}
              targetImg={ColorPurpleProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={false}
              targetImg={ColorBlueProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-x-1 px-2 py-2">
            <ProfileBtn
              isLock={false}
              targetImg={ColorGreenProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={true}
              targetImg={ColorSpecialProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={true}
              targetImg={FacialLaughProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={true}
              targetImg={FacialCryProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-x-1 px-2 py-2">
            <ProfileBtn
              isLock={true}
              targetImg={FacialAngryProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={true}
              targetImg={FacialNormalProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />

            <ProfileBtn
              isLock={true}
              targetImg={FacialConfuseProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
            <ProfileBtn
              isLock={true}
              targetImg={FacialSpecialProfile}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
            />
          </div>
          <div></div>
        </div>

        <Link
          href="/mypage"
          className="flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100"
        >
          {EDIT_PROFILE_CONSTANT[lang]['profile-btn']}
        </Link>
      </div>
    </div>
  )
}

export default EditProfile
