import privateAPI from '@/api/privateAPI/index.ts'
import {
  CommentContentPaylaod,
  MessageSendPayload,
} from '@/features/community/types/post/index.ts'
import {
  MessageAllPromise,
  MessagePromise,
} from '@/features/inbox/types/message/index.ts'

async function fetchAllMessage(): Promise<MessageAllPromise[]> {
  const res = await privateAPI.get('/community/messages')
  return res.data.result
}

async function fetchMessage(
  chatroomId: number,
): Promise<MessagePromise[] | null> {
  const fetchAllRes = await fetchAllMessage()
  console.log(fetchAllRes, typeof chatroomId)
  if (!fetchAllRes.some((item) => item.roomId === chatroomId)) {
    return null
  }
  const res = await privateAPI.get(`/community/messages/${chatroomId}`)
  return res.data.result
}

async function fetchNotifyStream() {
  const res = await privateAPI.get(`/nocifications/notifications/stream`)
  console.log('stream', res)
  return res.data.result
}

async function createChatroom(payload: { userId: number; postId: number }) {
  const res = await privateAPI.post(`/community/chatroom`, null, {
    params: payload,
  })
  console.log('chat', res)
  return res.data.result
}

async function sendFirstMessage(data: {
  userId: number
  postId: number
  contentsByLanguages: CommentContentPaylaod[]
}) {
  try {
    // 첫 번째 요청

    const chatroomId = await createChatroom({
      userId: data.userId,
      postId: data.postId,
    })

    // 두 번째 요청
    const sendChatPayload = {
      chatRoomId: chatroomId,
      contentsByLanguages: data.contentsByLanguages,
      contentImageRequest: [],
    }
    await sendMessage(sendChatPayload)
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

async function sendMessage(payload: MessageSendPayload) {
  await privateAPI.post(`/community/messages`, payload)
}

export {
  fetchAllMessage,
  fetchMessage,
  fetchNotifyStream,
  createChatroom,
  sendFirstMessage,
  sendMessage,
}
