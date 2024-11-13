// 공용
type BoardType =
  | 'BUSAN'
  | 'CHUNGBUG'
  | 'CHUNGNAM'
  | 'FREE'
  | 'GANGWON'
  | 'GYEONGBUK'
  | 'GYEONGGI'
  | 'GYEONGNAM'
  | 'INCHEON'
  | 'JEJU'
  | 'JEONBUK'
  | 'JEONNAM'
  | 'NOTICE'
  | 'SEOUL'

// ('BUSAN','CHUNGBUG','CHUNGNAM','FREE','GANGWON','GYEONGBUK','GYEONGGI','GYEONGNAM','INCHEON','JEJU','JEONBUK','JEONNAM','NOTICE','SEOUL')

type language = 'KOREAN' | 'ENGLISH' | 'CHINESE' | 'JAPANESE'

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
  contentImageRequest: ContentImageRequest[]
  content: ContentItem[]
}

type PostPromise = {
  postId: number
  title: string
  userId: number
  nickname: string
  contents: string
  createdAt: string
  comments: CommentPromise[]
  profileImage: string
}

type PostOriginalPromise = {
  post: PostPromise
  images: string[]
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

type BaordPreviewPromise = {
  GYEONGGI: PostPromise[]
  NOTICE: PostPromise[]
  FREE: PostPromise[]
  INCHEON: PostPromise[]
  BUSAN: PostPromise[]
  SEOUL: PostPromise[]
}

// 댓글
type CommentPromise = {
  id: number
  nickname: string
  contents: string
  userId: number
  createdDate: string
  profileImage: string
}

type CommentContentPaylaod = {
  content: string
  isOriginal: boolean
  language?: language
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

// 채팅

type MessageSendPayload = {
  chatRoomId: number
  contentsByLanguages?: CommentContentPaylaod[]
  contentImageRequest: ContentImageRequest[]
}

export type {
  PostCreatePayload,
  PostUpdatePayload,
  PostPromise,
  PostOriginalPromise,
  CommentCreatePayload,
  CommentUpdatePayload,
  ContentItem,
  BoardType,
  BaordListPromise,
  BaordPreviewPromise,
  CommentPromise,
  CommentContentPaylaod,
  MessageSendPayload,
}
