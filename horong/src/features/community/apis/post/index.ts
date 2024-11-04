import privateAPI from '@/api/privateAPI/index.ts'
import {
  PostCreatePayload,
  PostPromise,
} from '@/features/community/types/post/index.ts'

async function createPost(payload: PostCreatePayload) {
  console.log(payload)
  await privateAPI.post('/community', payload)
}
async function fetchPost(postId: number): Promise<PostPromise> {
  const res = await privateAPI.get(`/community/${postId}`)
  return res.data
}

export { createPost, fetchPost }
