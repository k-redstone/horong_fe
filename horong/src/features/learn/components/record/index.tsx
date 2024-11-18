'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useRecordVoice } from '@/hooks/useRecordVoice.ts'
import MicIcon from '@/static/svg/learn/learn-mic-icon.svg'
import StopIcon from '@/static/svg/learn/learn-stop-icon.svg'

interface ResponseType {
  audio: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  id: number
  text: string
}
function VoiceRecordBox({
  word,
  setResult,
}: {
  word: string
  setResult: React.Dispatch<React.SetStateAction<ResponseType | undefined>>
}) {
  const [isRecording, setIsRecording] = useState(false)
  const { startRecording, stopRecording, response } = useRecordVoice({ word })
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

  useEffect(() => {
    if (response) {
      setResult(response)
    }
  }, [response, setResult])
  return (
    <>
      {!isRecording ? (
        <button onClick={startRecord}>
          <MicIcon className="h-6 w-6" />
        </button>
      ) : (
        <button
          onClick={stopRecord}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-text-high p-1"
        >
          <StopIcon className="h-2 w-2 animate-pulse bg-text-high" />
        </button>
      )}
    </>
  )
}

export default VoiceRecordBox
