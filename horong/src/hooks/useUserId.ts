import { useQuery } from '@tanstack/react-query'

import privateAPI from '@/api/privateAPI/index.ts'

const useUserId = () => {
  // const queryClient = useQueryClient()

  const { data: loginUserId } = useQuery<number, Error>({
    queryKey: ['loginUserId'],
    queryFn: async () => {
      const res = await privateAPI.get('/user/id')
      return res.data.result.userId
    },
  })

  return { loginUserId }
}

export default useUserId
