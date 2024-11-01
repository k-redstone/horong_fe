// todo : API연결/각 게시글별 컴포넌트 / 더보기 /

function PreviewNoticeBoard() {
  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">외교부 공지사항</h1>
        <p className="flex items-end">
          <span className="text-2xs opacity-60">더보기+</span>
        </p>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 단일 텍스트 */}
        <p className="flex gap-x-3">
          <span className="text-warning">2024.09.24</span>
          <span className="truncate">
            2024년 국민 외교 아카데미 청년 국제 관계 실무 기본과정 하반기 참가자
            모집
          </span>
        </p>
        <p className="flex gap-x-3">
          <span className="text-warning">2024.09.24</span>
          <span className="truncate">
            2024년 국민 외교 아카데미 청년 국제 관계 실무 기본과정 하반기 참가자
            모집
          </span>
        </p>
        <p className="flex gap-x-3">
          <span className="text-warning">2024.09.24</span>
          <span className="truncate">
            2024년 국민 외교 아카데미 청년 국제 관계 실무 기본과정 하반기 참가자
            모집
          </span>
        </p>
      </div>
    </div>
  )
}

export default PreviewNoticeBoard
