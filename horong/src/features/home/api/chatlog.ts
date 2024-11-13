import privateAPI from '@/api/privateAPI/index.ts'
import {
  AllChatLogPromise,
  SaveChatLogPayload,
} from '@/features/home/types/chatlogType.ts'

async function fetchAllChatLog(): Promise<AllChatLogPromise[]> {
  const res = await privateAPI.get('/chat')

  return res.data.result.chatList
}

async function fetchChatLog(roomId: number): Promise<AllChatLogPromise | null> {
  try {
    const allChatRes = await fetchAllChatLog()
    // console.log(allChatRes)
    if (!allChatRes.some((item) => item.roomId === roomId)) {
      throw new Error('Chat room not found')
    }
    const res = await privateAPI.get(`/chat/${roomId}`)
    // const res = await privateAPI.get(`/chat/9067348062333586300`)

    return res.data.result
  } catch {
    return null
  }
}

async function saveChatLog(payload: SaveChatLogPayload) {
  await privateAPI.post('/chat', payload)
}

export { fetchAllChatLog, saveChatLog, fetchChatLog }
