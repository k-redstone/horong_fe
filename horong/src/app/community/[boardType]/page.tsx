import GlobalHeader from '@/components/globalHeader/index.tsx'
import BoardTitle from '@/features/community/components/boardTitle/index.tsx'
import PostPreview from '@/features/community/components/postPreview/index.tsx'
import SearchInput from '@/features/community/components/searchInput/index.tsx'

function CommunityBoardPage() {
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="커뮤니티" />
      <div className="flex grow flex-col gap-y-3 bg-grey-80 py-4">
        <BoardTitle />
        <SearchInput boardType="notice" />
        <div className="flex flex-col gap-y-3 px-3">
          <PostPreview />
          <PostPreview />
          <PostPreview />
          <PostPreview />
        </div>
      </div>
    </div>
  )
}

export default CommunityBoardPage
