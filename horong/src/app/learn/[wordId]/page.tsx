'use client'

import { useQuery } from '@tanstack/react-query'

import privateAPI from '@/api/privateAPI/index.ts'
import RecordDetailCollapseBtn from '@/features/learn/components/recordDetail/index.tsx'
// interface RecordType {
//   word: string
//   wordId: number
//   pronunciation: string
//   definition: string
//   educationRecordList: EducationRecordType[]
// }

interface EducationRecordType {
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

      <div className="flex w-full flex-col items-center justify-center gap-y-3 rounded-xl bg-grey-70 p-6 text-text-high">
        <div className="flex flex-col items-center justify-center gap-y-1">
          <h3 className="text-xl">
            {detailRecordList && detailRecordList.word}
          </h3>
          <p className="text-2xs">
            {detailRecordList && detailRecordList.pronunciation}
          </p>
        </div>
        <div className="whitespace-pre-line text-sm">
          {detailRecordList && detailRecordList.definition}
        </div>
      </div>

      <div className="flex flex-col gap-y-1 px-1">
        {detailRecordList &&
          detailRecordList.educationRecordList.map(
            (record: EducationRecordType, index: number) => (
              <RecordDetailCollapseBtn
                key={record.id}
                index={index}
                record={record}
              />
            ),
          )}
      </div>
    </div>
  )
}

export default RecordHistoryDetail
