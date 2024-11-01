import GlobalHeader from '@/components/globalHeader/index.tsx'
import {
  PreviewFreeBoard,
  PreviewNoticeBoard,
  PreviewRegionBoard,
} from '@/features/community/components/boardPreview/index.tsx'

function CommunityMainPage() {
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="커뮤니티" />
      <div className="flex grow flex-col gap-y-4 bg-grey-80 px-6 py-8">
        <PreviewNoticeBoard />
        <PreviewFreeBoard />
        <PreviewRegionBoard />
      </div>
    </div>
  )
}

export default CommunityMainPage
