import privateAPI from '@/api/privateAPI/index.ts'
import {
  BaordListPromise,
  PostCreatePayload,
  PostPromise,
} from '@/features/community/types/post/index.ts'

async function createPost(payload: PostCreatePayload) {
  console.log('asdfasdfasfasd', payload)
  await privateAPI.post('/community', payload)
}
async function fetchPost(postId: number): Promise<PostPromise> {
  const res = await privateAPI.get(`/community/${postId}`)
  return res.data
}
async function fetchBoard(
  boardType: string,
  params: { page: number },
): Promise<BaordListPromise> {
  const res = await privateAPI.get(`/community/posts/${boardType}`, { params })
  return res.data.result
}

export { createPost, fetchPost, fetchBoard }
