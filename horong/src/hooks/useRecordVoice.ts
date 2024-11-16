import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import privateAPI from '@/api/privateAPI/index.ts'

interface ResponseType {
  audio: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  id: number
  text: string
}
export const useRecordVoice = ({ word }: { word: string }) => {
  //미디어 레코더 인스턴스
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)
  const [response, setResponse] = useState<ResponseType>()

  const queryClient = useQueryClient()
  const { mutate: postAudio } = useMutation({
    mutationFn: async ({ audio, word }: { audio: Blob; word: string }) => {
      const formData = new FormData()
      if (!audio) return
      formData.append('audio', audio, 'audio.mp3')
      formData.append('word', word)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const res = await privateAPI.post('/education/record', formData, config)
      // eslint-disable-next-line no-console
      console.log(res.data)
      return res.data
    },

    onSuccess: (data) => {
      setResponse(data.result)
      queryClient.invalidateQueries({
        queryKey: ['today-learn'],
      })
      queryClient.invalidateQueries({
        queryKey: ['stamp'],
      })
      queryClient.invalidateQueries({
        queryKey: ['record-list'],
      })

      toast.success('audio sent successfully')
    },

    onError: (error) => {
      toast.error('Failed to send audio')
      // eslint-disable-next-line no-console
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
      const blob = new Blob(chunks.current, { type: 'audio/mp3' })
      postAudio({ audio: blob, word })
    }

    setMediaRecorder(mediaRecorder)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { recording, startRecording, stopRecording, response }
}
