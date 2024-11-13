'use client'

import { useQuery } from '@tanstack/react-query'

import privateAPI from '@/api/privateAPI/index.ts'
import RecordDetailCollapseBtn from '@/features/learn/components/recordDetail/index.tsx'
interface RecordType {
  id: number
  text: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  audio: string
}

function RecordHistoryDetail({ params }: { params: { wordId: string } }) {
  const { data: detailRecordList } = useQuery({
    queryKey: ['record-detail', params.wordId],
    queryFn: async () => {
      const res = await privateAPI.get('/education/record/' + params.wordId)

      return res.data.result
    },
  })
  return (
    <div className="flex grow flex-col gap-y-3 overflow-y-scroll px-5 py-8">
      {/* <p className="text-sm font-bold text-text-high">{}</p> */}

      <div className="flex flex-col gap-y-1 px-1">
        {detailRecordList &&
          detailRecordList.map((record: RecordType) => (
            <RecordDetailCollapseBtn
              key={record.id}
              record={record}
            />
          ))}
      </div>
    </div>
  )
}

export default RecordHistoryDetail
