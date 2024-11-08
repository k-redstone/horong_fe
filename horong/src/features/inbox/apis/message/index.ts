import privateAPI from '@/api/privateAPI/index.ts'
import {
  MessageAllPromise,
  MessagePromise,
} from '@/features/inbox/types/message/index.ts'

async function fetchAllMessage(): Promise<MessageAllPromise[]> {
  const res = await privateAPI.get('/community/messages')
  return res.data.result
}

async function fetchMessage(senderId: number): Promise<MessagePromise[]> {
  const res = await privateAPI.get(`/community/messages/${senderId}`)
  return res.data.result
}

export { fetchAllMessage, fetchMessage }
