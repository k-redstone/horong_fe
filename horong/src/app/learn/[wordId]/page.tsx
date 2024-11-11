'use client'

import RecordDetailCollapseBtn from '@/features/learn/components/recordDetail/index.tsx'
interface RecordType {
  id: number
  word: string
  cer: number
  gtIdx: number[]
  hypIdx: number[]
  date: string
  audio: string
}
const DUMMY_DATA = {
  word: '안녕하세요',
  educationRecordList: [
    {
      id: 1,
      word: '안녕하세요',
      cer: 42,
      gtIdx: [0, 2, 3, 4],
      hypIdx: [0, 1, 2, 3, 4],
      date: '2024-11-11',
      audio:
        'https://horong-service.s3.ap-northeast-2.amazonaws.com/education/%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94/1/73a5fb22-a508-423c-8825-e18f297e98cb.mp3',
    },
    {
      id: 2,
      word: '안녕하세요',
      cer: 87,
      gtIdx: [0, 1, 2, 4],
      hypIdx: [0, 1, 2, 3, 4],
      date: '2024-11-11',
      audio:
        'https://horong-service.s3.ap-northeast-2.amazonaws.com/education/%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94/1/1ddf46ed-ca56-4e4b-a199-14e8e2f405ac.mp3',
    },
  ],
}

function RecordHistoryDetail() {
  return (
    <div className="flex grow flex-col gap-y-3 overflow-y-scroll px-5 py-8">
      <p className="text-sm font-bold text-text-high">2022/11/04</p>

      <div className="flex flex-col gap-y-1 px-1">
        {DUMMY_DATA.educationRecordList.map((record: RecordType) => (
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
