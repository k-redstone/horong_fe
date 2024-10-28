export default function HomePage() {
  return (
    <div className="h-[50rem] max-w-[22.5rem] bg-[#1B1D24]">
      {/* ~~챗 */}
      <div className="w-full bg-black px-5 py-4 text-center">
        <span className="font-bold text-white">호롱챗</span>
      </div>
      {/* 채팅 영역 */}
      <div className="flex flex-col gap-y-4 px-3 py-8">
        {/* 시스템 채팅 box */}
        <div className="flex gap-x-2">
          {/* 로고영역 */}
          <div>
            <div className="h-10 w-10 bg-white"></div>
          </div>
          {/* 텍스트 영역 */}
          <div className="flex flex-col pr-2.5 text-xs text-white">
            {/* 호롱이름 */}
            <p className="font-bold">
              <span>호롱</span>
            </p>
            {/* 내용 */}
            <p>
              안녕하세요, 호롱입니다 :D
              <br />
              궁금하신게 있으시면 편하게 말씀해주세요 ❤
            </p>
          </div>
        </div>
        {/* 유저 채팅 box */}
        <div className="flex w-full justify-end">
          <div className="w-fit max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tl-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
            <p className="flex w-fit rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[#1B1D24] px-2.5 py-1">
              <span className="text-xs text-white">
                한국에서 집 구할때 월세 전세가 뭐야?
              </span>
            </p>
          </div>
        </div>
        {/* 시스템 채팅 box */}
        <div className="flex gap-x-2">
          {/* 로고영역 */}
          <div>
            <div className="h-10 w-10 bg-white"></div>
          </div>
          {/* 텍스트 영역 */}
          <div className="flex flex-col pr-2.5 text-xs text-white">
            {/* 호롱이름 */}
            <p className="font-bold">
              <span>호롱</span>
            </p>
            {/* 내용 */}
            <p>
              한국의 전세 제도, 월세 제도에 대해 알려드릴게요! 전세란,
              어쩌구저쩌구이구요 월세란, 어쩌구저쩌구입니다. 한국은 일본과
              다르게 시키킹, 레이킹이 없는 대신, 부동산 중계비가 있어요!
            </p>
          </div>
        </div>
        {/* 유저 채팅 box */}
        <div className="flex w-full justify-end">
          <div className="w-fit max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tl-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
            <p className="flex w-fit rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[#1B1D24] px-2.5 py-1">
              <span className="text-xs text-white">
                Please translate the following sentence into Korean. hi, my name
                is Samanda. Nice to meet you
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* chat input */}
      <div className="flex gap-x-2.5 p-2.5">
        <div className="grow rounded-[.625rem] bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
          <div className="flex h-full items-center rounded-[.625rem] bg-[#1B1D24] px-3 py-1 text-xs">
            <textarea
              className="h-ful w-full resize-none overflow-hidden bg-[#1B1D24] text-white focus:outline-none"
              placeholder="메세지를 입력해주세요."
              rows={1}
            />
          </div>
        </div>
        {/* 보내기 버튼 */}
        <div>
          <div className="h-8 w-8 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  )
}
