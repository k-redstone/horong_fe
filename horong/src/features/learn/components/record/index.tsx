'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useRecordVoice } from '@/hooks/useRecordVoice.ts'
import MicSVG from '@/static/svg/learn/learn-mic-icon.svg'
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
          className="bg-theme rounded-full p-4 drop-shadow-lg"
        >
          <MicSVG className="h-10 w-10" />
        </button>
      ) : (
        <button
          onClick={stopRecord}
          className="animate-pulse rounded-full bg-red-200 p-4 drop-shadow-lg"
        >
          <StopSVG className="h-10 w-10" />
        </button>
      )}
    </div>
  )
}

export default VoiceRecordBox
