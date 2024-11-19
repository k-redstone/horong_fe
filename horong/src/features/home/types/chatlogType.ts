import { ReactElement } from 'react'

type DefaultChatType = {
  content: string | ReactElement
  authorType: 'USER' | 'BOT'
}

type FetchChatType = {
  createdAt: string
  roomId?: number
} & DefaultChatType

type AllChatLogPromise = {
  roomId: number
  chatContentList: FetchChatType[]
}

type SaveChatLogPayload = {
  chatContents: DefaultChatType[]
}

type GroupedData = {
  today: FetchChatType[]
  yesterday: FetchChatType[]
  week: FetchChatType[]
  older: FetchChatType[]
}

export type {
  AllChatLogPromise,
  SaveChatLogPayload,
  GroupedData,
  FetchChatType,
}
