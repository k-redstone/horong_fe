// todo : API연결/각 게시글별 컴포넌트 / 더보기 /

function PreviewRegionBoard() {
  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">지역별 게시판</h1>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 서울 */}
        <p className="flex gap-x-1">
          <span className="w-[3.75rem] shrink-0 font-bold">서울특별시</span>
          <span className="truncate">little by little</span>
          <span className="text-warning">new</span>
        </p>
        {/* 경기도 */}
        <p className="flex gap-x-1">
          <span className="w-[3.75rem] shrink-0 font-bold">경기도</span>
          <span className="truncate">
            gave you everything you have dreamed of efefasdf
          </span>
          <span className="text-warning">new</span>
        </p>
        {/* 인천광역시 */}
        <p className="flex gap-x-1">
          <span className="w-[3.75rem] shrink-0 font-bold">인천광역시</span>
          <span className="truncate">
            [게시판 사용규칙] 인천광역시 지역 게시판입니다.
          </span>
        </p>
        {/* 부산광역시 */}
        <p className="flex gap-x-1">
          <span className="w-[3.75rem] shrink-0 font-bold">부산광역시</span>
          <span className="truncate">마 이승주 자신있나</span>
        </p>
        <br />
        <p className="text-center">
          다른 지역의 게시판은 다음 업데이트시 추가 예정입니다.
        </p>
      </div>
    </div>
  )
}

export default PreviewRegionBoard
