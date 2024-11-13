import axios from 'axios'

import privateAPI from '@/api/privateAPI/index.ts'

async function sendPush() {
  try {
    const res = await privateAPI.get('/user/id')
    const userId = res.data?.result?.userId
    await axios.post(
      '/api/fcm',
      {
        title: 'Hello Everyone!',
        body: 'This is a notification to all users.',
        userId: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Error sending push notification:', error)
  }
}

export { sendPush }
