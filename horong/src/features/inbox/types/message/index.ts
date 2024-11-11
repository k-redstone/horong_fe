type MessagePromise = {
  content: string
  senderNickname: string
  senderId: number
  createdAt: string
  profileImage: string
  userMessageType: 'USER' | 'OPPONENT'
}

type MessageListPromise = {
  postId: number
  messageList: MessagePromise[]
}

type MessageAllPromise = {
  messageCount: number
  roomId: number
} & MessagePromise

type NotifyPromise = {
  id: number
  chatRoomId: number | null
  postId: number | null
  type: 'MESSAGE' | 'COMMENT'
  senderName: string
  senderId: number
  message: string
  createdAt: string
}

export type {
  MessagePromise,
  MessageAllPromise,
  MessageListPromise,
  NotifyPromise,
}
