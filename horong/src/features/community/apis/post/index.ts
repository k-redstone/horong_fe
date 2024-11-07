import privateAPI from '@/api/privateAPI/index.ts'
import {
  BaordListPromise,
  CommentCreatePayload,
  CommentUpdatePayload,
  PostCreatePayload,
  PostPromise,
} from '@/features/community/types/post/index.ts'

async function createPost(payload: PostCreatePayload) {
  await privateAPI.post('/community', payload)
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

export {
  createPost,
  fetchPost,
  fetchBoard,
  createComment,
  updateComment,
  deleteComment,
}
