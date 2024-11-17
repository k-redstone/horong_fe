'use client'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface ImageModalProps {
  handleModalClose: () => void
  image: string
}

function ImageModal(props: ImageModalProps) {
  const { handleModalClose } = props
  const [scale, setScale] = useState(1) // 이미지 확대 비율
  const [translate, setTranslate] = useState({ x: 0, y: 0 }) // 이미지 이동 좌표
  const lastTouchDistance = useRef(0) // 이전 터치 거리 저장

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 두 손가락 간 거리 계산
      const distance = calculateDistance(e.touches)
      lastTouchDistance.current = distance
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // 현재 두 손가락 간 거리 계산
      const distance = calculateDistance(e.touches)
      const delta = distance - lastTouchDistance.current

      // 확대 비율 조정
      setScale((prevScale) => Math.max(1, prevScale + delta * 0.01)) // 최소 1배로 제한
      lastTouchDistance.current = distance
    } else if (e.touches.length === 1) {
      // 드래그(한 손가락으로 이동)
      const touch = e.touches[0]
      setTranslate((prev) => ({
        x: prev.x + touch.clientX - e.touches[0].clientX,
        y: prev.y + touch.clientY - e.touches[0].clientY,
      }))
    }
  }

  const handleTouchEnd = () => {
    lastTouchDistance.current = 0 // 터치가 끝나면 거리 초기화
  }

  const calculateDistance = (touches: React.TouchList) => {
    const [touch1, touch2] = [touches[0], touches[1]]
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2),
    )
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={() => handleModalClose()}
    >
      <div
        className="relative flex h-[90dvh] w-[90dvw] flex-col items-center gap-y-4 rounded px-4 py-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
            transformOrigin: 'center center',
          }}
          className="h-full w-full"
        >
          <Image
            className="object-contain"
            src={props.image}
            alt={'chat image'}
            fill={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageModal
