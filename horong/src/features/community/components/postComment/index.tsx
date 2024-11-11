'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { deleteComment } from '@/features/community/apis/post/index.ts'
import ConfirmModal from '@/features/community/components/confirmModal/index.tsx'
import OptionModal from '@/features/community/components/optionModal/index.tsx'
import useModal from '@/features/community/hooks/useModal/index.tsx'
import CommentUpdatePage from '@/features/community/pages/commentUpdatePage/index.tsx'
import { CommentPromise } from '@/features/community/types/post/index.ts'
import { transFullDateTime } from '@/features/community/utils/datetime/index.ts'
import SendDMBtn from '@/features/inbox/components/sendDMBtn/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
import useUserId from '@/hooks/useUserId.ts'
import MenuIcon from '@/static/svg/community/community-menu-icon.svg'
interface PostCommentProps {
  data: CommentPromise
  postId: number
}

function PostComment(props: PostCommentProps) {
  const params = useParams()
  const lang = useLangStore((state) => state.lang)
  const { loginUserId } = useUserId()
  const queryClient = useQueryClient()
  const { nickname, contents, createdDate, id: commentId, userId } = props.data

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)
  const [isCommentUpdate, setIsCommentUpdate] = useState<boolean>(false)

  const { mutateAsync: commentDeleteMutation } = useMutation({
    mutationFn: () => deleteComment(props.postId, commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', props.postId],
      })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: params.boardType }],
      })
      queryClient.invalidateQueries({
        queryKey: ['boardList', { type: 'preview' }],
      })
    },
  })

  const handleCloseConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(false)
  }
  const handleOpenConfirmModal = () => {
    handleModalClose()
    setIsOpenConfirmModal(true)
  }
  const handleDeleteComment = async () => {
    handleModalClose()
    setIsOpenConfirmModal(false)
    await commentDeleteMutation()
  }

  const handleUpdateOpen = () => {
    setIsCommentUpdate(true)
  }

  const handleUpdateClose = () => {
    setIsCommentUpdate(false)
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
            />,
            portalElement,
          )
        : null}
      {isOpenConfirmModal && portalElement
        ? createPortal(
            <ConfirmModal
              handleModalClose={handleCloseConfirmModal}
              handleDelete={handleDeleteComment}
            />,
            portalElement,
          )
        : null}
      {isCommentUpdate && (
        <CommentUpdatePage
          postId={props.postId}
          data={props.data}
          handleUpdateClose={handleUpdateClose}
        />
      )}
      <div className="py-2">
        <div className="flex gap-x-2">
          {/* 프로필 이미지 */}
          <div className="h-[2rem] w-[2rem] shrink-0">
            <Image
              src={props.data.profileImage}
              alt={'profile'}
              width={32}
              height={32}
            />
          </div>

          <div className="flex grow flex-col gap-y-2">
            <div className="flex gap-x-2">
              {/* 작성자 및 작성 시간 */}
              <div className="flex grow flex-col gap-y-1">
                <span className="text-xs">
                  {userId
                    ? nickname
                    : COMMUNITY_CONSTANT[lang]['comment-deleted-text1']}
                </span>
                <span className="text-2xs opacity-60">
                  {userId && transFullDateTime(createdDate)}
                </span>
              </div>
              {/* dm 전송 버튼 */}
              <div>
                {loginUserId === userId ? (
                  <button
                    type="button"
                    onClick={() => handleModalOpen()}
                  >
                    <MenuIcon />
                  </button>
                ) : (
                  userId && (
                    <SendDMBtn
                      userId={userId}
                      postId={props.postId}
                    />
                  )
                )}
              </div>
            </div>

            {/* 실제 댓글 */}
            <p className="text-xs opacity-60">
              {userId
                ? contents
                : COMMUNITY_CONSTANT[lang]['comment-deleted-text2']}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostComment
