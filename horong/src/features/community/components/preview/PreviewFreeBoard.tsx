// todo : API연결/각 게시글별 컴포넌트 / 더보기 /

function PreviewFreeBoard() {
  return (
    <div className="flex flex-col gap-y-4">
      {/* title */}
      <div className="flex justify-between">
        <h1 className="font-bold">자유 게시판</h1>
        <p className="flex items-end">
          <span className="text-2xs opacity-60">더보기+</span>
        </p>
      </div>

      {/* box */}
      <div className="flex flex-col gap-y-3 rounded-xl border border-grey-60 p-3 text-2xs">
        {/* 단일 게시글 컴포넌트*/}
        <p className="flex gap-x-1">
          <span className="truncate">
            아란 사냥터 추천 리스트 (아케인 리버)
          </span>
          <span className="text-primary">[12]</span>
          <span className="text-warning">new</span>
        </p>
        <p className="flex gap-x-1">
          <span className="truncate">
            아란 사냥터 추천 리스트 (아케인 리버)
          </span>
          <span className="text-primary">[12]</span>
          <span className="text-warning">new</span>
        </p>
        <p className="flex gap-x-1">
          <span className="truncate">
            시드링은 선택이 아닌 필수! 그럼 어떤 시드링을 사용해야 할까?
          </span>
          <span className="text-primary">[12]</span>
          <span className="text-warning">new</span>
        </p>
        <p className="flex gap-x-1">
          <span className="truncate">
            無理無理無理無理無理無理無理無理無理無理無理無理無理
          </span>
          <span className="text-primary">[12]</span>
          <span className="text-warning">new</span>
        </p>
      </div>
    </div>
  )
}

export default PreviewFreeBoard
