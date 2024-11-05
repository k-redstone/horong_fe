import HorongSVG from '@/static/svg/common/common-horong.svg'
import MenuIcon from '@/static/svg/community/community-menu-icon.svg'

interface PostContentProps {
  data: string
}

function PostContent({ data }: PostContentProps) {
  console.log(data)

  const isCreate = true
  return (
    <div className="flex flex-col gap-y-4">
      {/* user info */}
      <div className="flex gap-x-2 py-1">
        {/* todo: profile image `*/}
        <div className="h-[2.875rem] w-[2.875rem] shrink-0">
          <HorongSVG className="h-full w-full" />
        </div>
        <div className="flex grow flex-col gap-y-1 px-2">
          <span className="font-bold">호롱</span>

          <span className="text-xs opacity-60">2024/10/31 12:02</span>
        </div>
        <div className="flex shrink-0 items-center">
          {isCreate ? (
            <button>
              <MenuIcon />
            </button>
          ) : (
            <button className="rounded-2xl border border-text-disabled px-2 py-1 text-2xs text-text-disabled">
              DM전송
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-sm font-bold">
        애매하기만 하다, 아예 선을 그어주던가.애매하기만 하다, 아예 선을
        그어주던가.애매하기만 하다, 아예 선을 그어주던가.애매하기만 하다, 아예
        선을 그어주던가.
      </h2>
      <p className="text-xs">
        <span>
          다른 유니콘들이 멸망을 향해갈 때, 홀로 봉인되어 있었던 유니. 시간이
          지나 그녀는 어느 날 지구에서 눈을 뜨게 된다. 이후 보호를 위해
          스텔라이브에 합류하여 인간 문화에 녹아든다. 타락할지, 순수함을
          전해갈지는 유니의 선택에 맡겨졌다. 유니의 가장 큰 특징은 특유의 미숙한
          한국어 발음과 문법에서 나오는 독특한 말투다. 이는 시청자들 사이에
          유니의 대표적인 개성으로 받아들여져, 유니가 한국 인터넷 방송에 빠르게
          정착할 수 있었던 주된 요인으로 작용했다. 어눌하지만 중독적인 말투로
          인해 방송 초기부터 수많은 밈들이 생겨났는데, 그 중에도 [유니 비질게]
          는 트위치 전반으로 퍼졌을 만큼 유명해졌다. 웃기게도 게임 도중 억까를
          당할 때 종종 들을 수 있는, 유니의 시원한 욕 한 사발만큼은 발음이 아주
          정확하다.
        </span>
      </p>
    </div>
  )
}

export default PostContent
