'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useRecordVoice } from '@/hooks/useRecordVoice.ts'
import StartSVG from '@/static/svg/learn/learn-start-icon.svg'
import StopSVG from '@/static/svg/learn/learn-stop-icon.svg'

function VoiceRecordBox() {
  const [isRecording, setIsRecording] = useState(false)
  const { startRecording, stopRecording } = useRecordVoice()
  useEffect(() => {
    const checkAudioPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error('마이크 권한 허용이 필요합니다.')
      }
    }

    checkAudioPermission()
  }, [])

  const startRecord = () => {
    setIsRecording(true)
    startRecording()
  }
  const stopRecord = () => {
    setIsRecording(false)
    stopRecording()
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 py-40">
      {!isRecording ? (
        <button
          onClick={startRecord}
          className="rounded-full bg-white p-4 drop-shadow-lg"
        >
          <StartSVG className="h-12 w-12" />
        </button>
      ) : (
        <button
          onClick={stopRecord}
          className="animate-pulse rounded-full bg-black bg-opacity-20 p-4 drop-shadow-lg"
        >
          <StopSVG className="h-12 w-12" />
        </button>
      )}
    </div>
  )
}

export default VoiceRecordBox
