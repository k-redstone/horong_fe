type MessagePromise = {
  content: string
  senderNickname: string
  senderId: number
  createdAt: string
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

export type { MessagePromise, MessageAllPromise, MessageListPromise }
