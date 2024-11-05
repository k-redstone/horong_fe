// 공용
type BoardType =
  | 'CHUNGBUG'
  | 'CHUNGNAM'
  | 'FREE'
  | 'GANGWON'
  | 'GYEONGBUK'
  | 'GYEONGGI'
  | 'GYEONGNAM'
  | 'JEJU'
  | 'JEONBUK'
  | 'JEONNAM'
  | 'NOTICE'
  | 'SEOUL'
type language = 'KOREAN' | 'ENGLISH' | 'CHINESE' | 'JAPANESE'

type PagenationType = {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

// 게시물
type ContentImageRequest = {
  imageUrl: string
}

type ContentItem = {
  title: string
  content: string
  isOriginal: boolean
  language?: language
}

type PostCreatePayload = {
  content: ContentItem[]
  boardType: BoardType
  contentImageRequest: ContentImageRequest[]
}

type PostUpdatePayload = {
  title: string
  content: ContentItem[]
}

type PostPromise = {
  postId: number
  title: string
  nickname: string
  contents: string
  createdAt: string
  comments: CommentPromise[]
}

type BaordListPromise = {
  content: PostPromise[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}

// 댓글
type CommentPromise = {
  id: number
  nickname: string
  contents: string
}

type CommentContentPaylaod = {
  content: string
  isOriginal: boolean
  language: language
}

type CommentUpdatePayload = {
  commentId: number
  contentByCountries: CommentContentPaylaod[]
}

type CommentCreatePayload = {
  postId: number
  content: string
  contentByCountries: CommentContentPaylaod[]
}

export type {
  PostCreatePayload,
  PostUpdatePayload,
  PostPromise,
  CommentCreatePayload,
  CommentUpdatePayload,
  ContentItem,
  BoardType,
  BaordListPromise,
}
