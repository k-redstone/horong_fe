import axios from 'axios'

// import privateAPI from '@/api/privateAPI/index.ts'

async function sendFCMPush(
  userId: number,
  type: 'COMMENT' | 'MESSAGE',
  contentId?: number,
  boardType?: string,
) {
  try {
    await axios.post(
      '/api/fcm',
      {
        type,
        userId,
        contentId,
        boardType,
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

export { sendFCMPush }
