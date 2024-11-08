type MessagePromise = {
  content: string
  senderNickname: string
  senderId: number
  createdAt: string
}

type MessageAllPromise = { messageCount: number } & MessagePromise

export type { MessagePromise, MessageAllPromise }
