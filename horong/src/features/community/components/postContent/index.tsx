import { useMutation, useQueryClient } from '@tanstack/react-query'
import dompurify from 'dompurify'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { deletePost } from '@/features/community/apis/post/index.ts'
import ConfirmModal from '@/features/community/components/confirmModal/index.tsx'
import OptionModal from '@/features/community/components/optionModal/index.tsx'
import useModal from '@/features/community/hooks/useModal/index.tsx'
import PostUpdatePage from '@/features/community/pages/postUpdatePage/index.tsx'
import { PostPromise } from '@/features/community/types/post/index.ts'
import { transFullDateTime } from '@/features/community/utils/datetime/index.ts'
import SendDMBtn from '@/features/inbox/components/sendDMBtn/index.tsx'
import useUserId from '@/hooks/useUserId.ts'
import MenuIcon from '@/static/svg/community/community-menu-icon.svg'

interface PostContentProps {
  data: PostPromise
}

function PostContent({ data }: PostContentProps) {
  const router = useRouter()
  const params = useParams()
  const { loginUserId } = useUserId()
  const queryClient = useQueryClient()
  const sanitizer = dompurify.sanitize
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [isPostUpdate, setIsPostUpdate] = useState<boolean>(false)

  const { mutateAsync: postDeleteMutation } = useMutation({
    mutationFn: () => deletePost(data.postId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: params.boardType }],
      })
      queryClient.removeQueries({ queryKey: ['postDetail', data.postId] })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: 'preview' }],
      })
      router.push(`/community/${params.boardType}`)
    },
  })

  const handleDeletePost = async () => {
    handleModalClose()
    setIsOpenConfirmModal(false)
    await postDeleteMutation()
  }

  const handleCloseConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(false)
  }
  const handleOpenConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(true)
  }
  const handleUpdateOpen = () => {
    setIsPostUpdate(true)
  }
  const handleUpdateClose = () => {
    setIsPostUpdate(false)
    handleModalClose()
  }

  const { isModalOpen, portalElement, handleModalClose, handleModalOpen } =
    useModal()

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <OptionModal
              handleModalClose={handleModalClose}
              handleConfirmModal={handleOpenConfirmModal}
              handleUpdateOpen={handleUpdateOpen}
              // todo
            />,
            portalElement,
          )
        : null}
      {isOpenConfirmModal && portalElement
        ? createPortal(
            <ConfirmModal
              handleModalClose={handleCloseConfirmModal}
              handleDelete={handleDeletePost}
            />,
            portalElement,
          )
        : null}
      {isPostUpdate && (
        <PostUpdatePage
          postId={data.postId}
          handleUpdateClose={handleUpdateClose}
        />
      )}
      <div className="flex flex-col gap-y-4">
        {/* user info */}
        <div className="flex gap-x-2 py-1">
          <div className="h-[2.875rem] w-[2.875rem] shrink-0">
            <Image
              src={data.profileImage}
              alt={'profile'}
              width={46}
              height={46}
            />
          </div>
          <div className="flex grow flex-col gap-y-1 px-2">
            <span className="font-bold">{data.nickname}</span>

            <span className="text-xs opacity-60">
              {transFullDateTime(data.createdAt)}
            </span>
          </div>
          <div className="flex shrink-0 items-center">
            {loginUserId === data.userId ? (
              <button
                type="button"
                onClick={() => handleModalOpen()}
              >
                <MenuIcon />
              </button>
            ) : (
              <SendDMBtn
                userId={data.userId}
                postId={data.postId}
              />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-sm font-bold">{data.title}</h2>
        <p className="text-xs">
          {
            <span
              dangerouslySetInnerHTML={{
                __html: sanitizer(`${data.contents}`),
              }}
            />
          }
        </p>
      </div>
    </>
  )
}

export default PostContent
