import { useEffect, useRef, useState } from 'react'

export const useRecordVoice = () => {
  //미디어 레코더 인스턴스
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)

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

    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev?.data)
    }

    // Event handler when recording stops
    mediaRecorder.onstop = () => {
      // Creating a blob from accumulated audio chunks with WAV format
      const audioBlob = new Blob(chunks.current, { type: 'audio/wav' })
      console.log(audioBlob, 'audioBlob')

      // 저장하기
      const audioURL = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioURL)
      audio.play()
      console.log(chunks, 'audioURL')
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
