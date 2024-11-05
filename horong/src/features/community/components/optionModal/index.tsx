'use client'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'

interface optionModalProps {
  handleModalClose: () => void
  handleConfirmModal: () => void
}

function OptionModal(props: optionModalProps) {
  const { handleModalClose, handleConfirmModal } = props
  const lang = useLangStore((state) => state.lang)

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
        onClick={() => handleModalClose()}
      >
        <div
          className="flex w-[16.25rem] flex-col gap-y-2 rounded-lg bg-grey-80 px-4 py-3"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="py-2">
            <span>{COMMUNITY_CONSTANT[lang]['modal-delete-text']}</span>
          </button>
          <button
            className="py-2"
            onClick={() => handleConfirmModal()}
          >
            <span>{COMMUNITY_CONSTANT[lang]['modal-edit-text']}</span>
          </button>
          <button
            className="py-2"
            onClick={() => handleModalClose()}
          >
            <span>{COMMUNITY_CONSTANT[lang]['cancel-text']}</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default OptionModal
