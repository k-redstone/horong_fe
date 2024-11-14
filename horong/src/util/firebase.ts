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
      throw new Error('User ID is not available in the response.')
    }

    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPI,
    })
    if (!currentToken) {
      throw new Error(
        'No registration token available. Request permission to generate one.',
      )
    }

    await axios.post(
      '/api/fcm/token',
      { userId, token: currentToken },
      { headers: { 'Content-Type': 'application/json' } },
    )
  } catch {
    throw new Error('An error occurred while handling the push')
  }
}

async function deleteTokenHandler(userId: number) {
  await axios
    .delete('/api/fcm/token', {
      data: { userId },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(() => {
      throw new Error('An error occurred while handling the push')
    })
}

async function checkTokenHandler(userId: number): Promise<boolean> {
  const res = await axios.get(`/api/fcm/token?userId=${userId}`, {
    headers: { 'Content-Type': 'application/json' },
  })

  return res.data.result
}

export { setTokenHandler, checkTokenHandler, deleteTokenHandler }
