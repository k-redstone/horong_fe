'use client'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
interface ConfirmModalProps {
  handleModalClose: () => void
  handleDelete: () => void
}

function ConfirmModal(props: ConfirmModalProps) {
  const lang = useLangStore((state) => state.lang)
  const { handleModalClose, handleDelete } = props

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={() => handleModalClose()}
    >
      <div
        className="flex w-[13.5rem] flex-col items-center gap-y-4 rounded bg-grey-80 px-4 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="py-2">{COMMUNITY_CONSTANT[lang]['modal-confirm-text']}</p>
        <div className="flex w-full gap-x-4">
          <button
            type="button"
            className="grow rounded bg-grey-70 py-2"
            onClick={() => handleModalClose()}
          >
            <span>{COMMUNITY_CONSTANT[lang]['modal-confirm-no']}</span>
          </button>
          <button
            type="button"
            className="grow rounded bg-primary py-2 text-black"
            onClick={() => handleDelete()}
          >
            <span>{COMMUNITY_CONSTANT[lang]['modal-confirm-yes']}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
