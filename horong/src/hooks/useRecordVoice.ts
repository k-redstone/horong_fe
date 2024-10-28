import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import publicAPI from '@/api/publicAPI/index.ts'

export const useRecordVoice = () => {
  //미디어 레코더 인스턴스
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: postAudio } = useMutation({
    mutationFn: async (audio: Blob) => {
      const formData = new FormData()
      if (!audio) return
      formData.append('mp3', audio, 'audio.mp3')
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const res = await publicAPI.post('/health/audio', formData, config)
      return res.data
    },

    onSuccess: () => {
      toast.success('오디오가 성공적으로 전송되었습니다.')
    },

    onError: (error) => {
      toast.error('오디오 전송에 실패했습니다.')
      console.error(error)
    },
  })
  //저장을 위한 오디오 청크
  const chunks = useRef<Blob[]>([])

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start()
      setRecording(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setRecording(false)
    }
  }

  //미디어 레코더 초기화
  const initialMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.onstart = () => {
      chunks.current = []
    }

    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev?.data)
    }

    mediaRecorder.onstop = () => {
      // const audioBlob = new Blob(chunks.current, { type: 'audio/mpeg' })

      // 백엔드로 오디오 전송
      // postAudio(audioBlob)
      toast.success('오디오가 성공적으로 전송되었습니다.')
    }

    setMediaRecorder(mediaRecorder)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder)
    }
  }, [])

  return { recording, startRecording, stopRecording }
}
