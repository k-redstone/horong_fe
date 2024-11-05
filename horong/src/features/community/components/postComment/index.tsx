'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPortal } from 'react-dom'

import { deleteComment } from '@/features/community/apis/post/index.ts'
import ConfirmModal from '@/features/community/components/confirmModal/index.tsx'
import OptionModal from '@/features/community/components/optionModal/index.tsx'
import useModal from '@/features/community/hooks/useModal/index.tsx'
import { CommentPromise } from '@/features/community/types/post/index.ts'
import HorongSVG from '@/static/svg/common/common-horong.svg'
import MenuIcon from '@/static/svg/community/community-menu-icon.svg'

interface PostCommentProps {
  data: CommentPromise
  postId: number
}

function PostComment(props: PostCommentProps) {
  const isCreate = true
  const queryClient = useQueryClient()
  const { nickname, contents, createdDate, id: commentId } = props.data

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

  const { mutateAsync: commentDeleteMutation } = useMutation({
    mutationFn: () => deleteComment(props.postId, commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['postDetail', props.postId],
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

  const { isModalOpen, portalElement, handleModalClose, handleModalOpen } =
    useModal()

  return (
    <>
      {isModalOpen && portalElement
        ? createPortal(
            <OptionModal
              handleModalClose={handleModalClose}
              handleConfirmModal={handleOpenConfirmModal}
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
      <div className="py-2">
        <div className="flex gap-x-2">
          {/* 프로필 이미지 */}
          <div className="h-[2.875rem] w-[2.875rem] shrink-0">
            <HorongSVG className="h-full w-full" />
          </div>

          <div className="flex grow flex-col gap-y-2">
            <div className="flex gap-x-2">
              {/* 작성자 및 작성 시간 */}
              <div className="flex grow flex-col gap-y-1">
                <span className="text-xs">{nickname}</span>
                <span className="text-2xs opacity-60">{createdDate}</span>
              </div>
              {/* dm 전송 버튼 */}
              <div>
                {isCreate ? (
                  <button
                    type="button"
                    onClick={() => handleModalOpen()}
                  >
                    <MenuIcon />
                  </button>
                ) : (
                  <button className="rounded-2xl border border-text-disabled px-2 py-1 text-2xs text-text-disabled">
                    DM전송
                  </button>
                )}
              </div>
            </div>

            {/* 실제 댓글 */}
            <p className="text-xs opacity-60">{contents}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostComment
