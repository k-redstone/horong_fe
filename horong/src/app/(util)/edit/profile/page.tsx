'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EDIT_PROFILE_CONSTANT } from '@/constants/edit/profile/index.ts'
import ProfileBtn from '@/features/mypage/components/profileBtn/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import DefaultProfile from '@/static/imgs/profile/profile-basic-blue.png'

type ProfileType = {
  isUnlocked: boolean
  imageUrl: StaticImageData
  ImageNumber: number
}
function EditProfile() {
  const [profileImg, setProfileImg] = useState(DefaultProfile)
  const [profileIdx, setProfileIdx] = useState(0)
  const lang = useLangStore((state) => state.lang)

  const { data: user } = useQuery({
    queryKey: ['user-profile-info'],
    queryFn: async () => {
      const res = await privateAPI.get('/user')

      if (res.status === 200) {
        setProfileImg(res.data.result.profilePreSignedUrl)
      }
      return res.data.result
    },
  })

  const { data: profileImgList } = useQuery({
    queryKey: ['user-profile-list'],
    queryFn: async () => {
      const res = await privateAPI.get('/user/profile/unlocked')
      return res.data.result
    },
  })

  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate: patchProfileImage } = useMutation({
    mutationFn: async () => {
      const res = await privateAPI.patch(
        `/user/profile/image?profileImage=${profileIdx + 1}`,
      )
      // console.log(res)
      return res.data.result
    },

    onSuccess: () => {
      toast.success(EDIT_PROFILE_CONSTANT[lang]['profile-toast-success'])
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
      queryClient.invalidateQueries({ queryKey: ['user-profile-info'] })
      router.back()
    },
  })

  const changeProfile = () => {
    patchProfileImage()
  }

  return (
    <div className="flex h-full w-full flex-col justify-start gap-y-6 bg-grey-80">
      <GlobalHeader pageName={EDIT_PROFILE_CONSTANT[lang]['profile-header']} />

      <div className="flex flex-col items-center justify-center overflow-y-scroll px-5">
        {/* 현재 사진으로 시작, 누르면 사진 변경 */}
        <div className="flex items-center justify-start py-5">
          {user && (
            // <div className="relative px-36">
            <Image
              src={user.profilePreSignedUrl}
              alt="profile"
              width={112}
              height={112}
              // layout="responsive"
              className="rounded-full"
              priority
            />
          )}
        </div>

        <div className="mb-48 flex w-full items-center justify-center gap-y-3 border-t border-primary border-opacity-30 py-6">
          <div className="flex w-full flex-wrap items-center justify-between gap-y-3 px-2 py-2">
            {profileImgList &&
              profileImgList.map((item: ProfileType, idx: number) => (
                <ProfileBtn
                  key={'profile_' + idx}
                  isLock={!item.isUnlocked}
                  targetImg={item.imageUrl}
                  profileImg={profileImg}
                  setProfileImg={setProfileImg}
                  setProfileIdx={setProfileIdx}
                  profileIdx={idx}
                />
              ))}
          </div>
          <div></div>
        </div>

        <button
          onClick={changeProfile}
          className="flex w-full items-center justify-center rounded-xl bg-primary px-24 py-3 text-sm text-grey-100"
        >
          {EDIT_PROFILE_CONSTANT[lang]['profile-btn']}
        </button>
      </div>
    </div>
  )
}

export default EditProfile
