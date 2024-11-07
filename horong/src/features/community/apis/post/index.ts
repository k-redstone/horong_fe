import privateAPI from '@/api/privateAPI/index.ts'
import {
  BaordListPromise,
  BaordPreviewPromise,
  CommentCreatePayload,
  CommentPromise,
  CommentUpdatePayload,
  PostCreatePayload,
  PostOriginalPromise,
  PostPromise,
  PostUpdatePayload,
} from '@/features/community/types/post/index.ts'

async function createPost(payload: PostCreatePayload) {
  await privateAPI.post('/community', payload)
}

async function deletePost(postId: number) {
  await privateAPI.delete(`/community/${postId}`)
}

async function updatePost(postId: number, payload: PostUpdatePayload) {
  await privateAPI.patch(`/community/${postId}`, payload)
}

async function fetchOriginalPost(postId: number): Promise<PostOriginalPromise> {
  const res = await privateAPI.get(`/community/original/post/${postId}`)
  return res.data.result
}

async function createComment(payload: CommentCreatePayload) {
  await privateAPI.post(`/community/${payload.postId}/comments`, payload)
}

async function deleteComment(postId: number, commentId: number) {
  await privateAPI.delete(`/community/${postId}/comments/${commentId}`)
}

async function updateComment(postId: number, payload: CommentUpdatePayload) {
  await privateAPI.patch(
    `/community/${postId}/comments/${payload.commentId}`,
    payload,
  )
}

async function fetchOriginalComment(
  commentId: number,
): Promise<CommentPromise> {
  const res = await privateAPI.get(`/community/original/comment/${commentId}`)
  return res.data.result
}

async function fetchPost(postId: number): Promise<PostPromise> {
  const res = await privateAPI.get(`/community/${postId}`)
  return res.data.result
}

async function fetchBoard(
  boardType: string,
  params: { page: number },
): Promise<BaordListPromise> {
  const res = await privateAPI.get(`/community/posts/${boardType}`, { params })
  return res.data.result
}

async function fetchPreviewBoard(): Promise<BaordPreviewPromise> {
  const res = await privateAPI.get(`/community/main`)
  return res.data.result
}

export {
  createPost,
  deletePost,
  updatePost,
  fetchOriginalPost,
  fetchPost,
  fetchBoard,
  fetchPreviewBoard,
  createComment,
  updateComment,
  deleteComment,
  fetchOriginalComment,
}
