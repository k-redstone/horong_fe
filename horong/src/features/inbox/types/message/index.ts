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
  type: 'MESSAGE' | 'COMMENT'
  message: string
  postContent: {
    type: string
    postId: number
    title: string
  } | null
  messageContent: {
    messageId: number
    message: string
    type: string
    roomId: number
  } | null
  senderId: 3
  senderName: string
  createdAt: string
}

export type {
  MessagePromise,
  MessageAllPromise,
  MessageListPromise,
  NotifyPromise,
}
