import axios from 'axios'

import privateAPI from '@/api/privateAPI/index.ts'

async function sendFCMPush(
  userId: number,
  type: 'COMMENT' | 'MESSAGE',
  contentId?: number,
  boardType?: string,
) {
  try {
    const lang = await privateAPI.get(`/notifications/language/${userId}`)
    const userLang = lang.data.result
    await axios.post(
      '/api/fcm',
      {
        userId,
        type,
        lang: userLang,
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
