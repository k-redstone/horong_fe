import { useQuery } from '@tanstack/react-query'

import { fetchAllMessage } from '@/features/inbox/apis/message/index.ts'

function NotifyListBox() {
  const { data, isSuccess } = useQuery({
    queryKey: ['message', { type: 'all' }],
    queryFn: fetchAllMessage,
  })

  return
}

export default NotifyListBox
