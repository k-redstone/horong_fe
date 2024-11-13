import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'

import privateAPI from '@/api/privateAPI/index.ts'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const setTokenHandler = async () => {
  try {
    const messaging = getMessaging(firebaseApp)

    // 사용자 ID 요청
    const res = await privateAPI.get('/user/id')
    const userId = res.data?.result?.userId

    if (!userId) {
      console.error('User ID is not available in the response.')
      return
    }

    // FCM 토큰 발급
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPI,
    })
    console.log('asdfasdfasdfasdfasdf', currentToken)
    if (!currentToken) {
      console.error(
        'No registration token available. Request permission to generate one.',
      )
      return
    }

    // 토큰과 사용자 ID를 백엔드로 전송
    await axios.post(
      '/api/fcm/savetoken',
      { userId, token: currentToken },
      { headers: { 'Content-Type': 'application/json' } },
    )

    console.log('Token successfully saved to server.')
  } catch (error) {
    console.error('An error occurred while handling the token:', error)
    throw new Error('An error occurred while handling the token:')
  }
}

export { setTokenHandler }
