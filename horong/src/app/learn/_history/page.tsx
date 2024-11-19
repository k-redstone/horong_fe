import React from 'react'

function LearnHistoryPage() {
  const title = '안녕하세요'
  const title2 = '안녕하세요'
  const tar = [0, 1, 4]

  const title3 = '반가워요'
  const title4 = '반가워요'

  const tar2 = [1, 4]

  const title5 = '잘가요'
  const title6 = '잘가요'

  const tar3 = [0, 1, 2]
  return (
    <div className="flex w-full snap-x overflow-scroll scroll-smooth">
      <div className="flex w-full shrink-0 snap-center snap-always flex-col items-center justify-between gap-y-10 px-4 pt-20">
        <div className="flex w-full flex-col items-center justify-center gap-y-4 px-8">
          <div className="flex w-full flex-wrap items-center justify-center text-3xl font-bold">
            {title}
          </div>
          <p className="text-xs">단어의 뜻 입니다.</p>
          <div className="bg-grey-70 flex w-full flex-col items-start justify-center gap-y-4 rounded-md p-4 text-xs">
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
          </div>
        </div>

        {/* 분석결과 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-8 px-8">
          <h3 className="text-sm">
            발음이 <b className="font-bold underline">일치하는 문자</b>를
            표시해드려요 👀
          </h3>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>정답</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title.split('').map((char, index) => (
                <span
                  className={`${tar.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>최홍석 님</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title2.split('').map((char, index) => (
                <span
                  className={`${tar.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          {/* <button
          onClick={changeIndex}
          className="rounded-md border px-12 py-3 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          {change ? '다시하기' : '제출'}
        </button> */}
        </div>
      </div>
      <div className="flex w-full shrink-0 snap-center snap-always flex-col items-center justify-between gap-y-10 px-4 pt-20">
        <div className="flex w-full flex-col items-center justify-center gap-y-4 px-8">
          <div className="flex w-full flex-wrap items-center justify-center text-3xl font-bold">
            {title3}
          </div>
          <p className="text-xs">단어의 뜻 입니다.</p>
          <div className="bg-grey-70 flex w-full flex-col items-start justify-center gap-y-4 rounded-md p-4 text-xs">
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
          </div>
        </div>

        {/* 분석결과 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-8 px-8">
          <h3 className="text-sm">
            발음이 <b className="font-bold underline">일치하는 문자</b>를
            표시해드려요 👀
          </h3>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>정답</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title3.split('').map((char, index) => (
                <span
                  className={`${tar2.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>윤경서 님</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title4.split('').map((char, index) => (
                <span
                  className={`${tar2.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          {/* <button
          onClick={changeIndex}
          className="rounded-md border px-12 py-3 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          {change ? '다시하기' : '제출'}
        </button> */}
        </div>
      </div>
      <div className="flex w-full shrink-0 snap-center snap-always flex-col items-center justify-between gap-y-10 px-4 pt-20">
        <div className="flex w-full flex-col items-center justify-center gap-y-4 px-8">
          <div className="flex w-full flex-wrap items-center justify-center text-3xl font-bold">
            {title5}
          </div>
          <p className="text-xs">단어의 뜻 입니다.</p>
          <div className="bg-grey-70 flex w-full flex-col items-start justify-center gap-y-4 rounded-md p-4 text-xs">
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
            <p>👨‍🏫 예문입니다.</p>
          </div>
        </div>

        {/* 분석결과 */}
        <div className="flex w-full flex-col items-center justify-center gap-y-8 px-8">
          <h3 className="text-sm">
            발음이 <b className="font-bold underline">일치하는 문자</b>를
            표시해드려요 👀
          </h3>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>정답</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title5.split('').map((char, index) => (
                <span
                  className={`${tar3.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-2">
            <span>최성철 님</span>
            <div className="flex h-full w-full flex-wrap items-center justify-center text-3xl font-bold">
              {title6.split('').map((char, index) => (
                <span
                  className={`${tar3.includes(index) && 'bg-blue-500'} transition-colors duration-500 ease-in-out`}
                  key={char + '__lecture__' + index}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-y-4">
          {/* <button
          onClick={changeIndex}
          className="rounded-md border px-12 py-3 transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          {change ? '다시하기' : '제출'}
        </button> */}
        </div>
      </div>
    </div>
  )
}

export default LearnHistoryPage
