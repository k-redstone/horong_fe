'use client'

function PostPreview() {
  return (
    <div className="flex flex-col gap-y-1 rounded-xl border border-grey-60 p-3">
      <div className="flex">
        <span className="truncate text-xs">
          괴물들이 나올거야 귀의 뒷편 저 세상이 춤춰 귀신이 나온다! 그치만
          생각보다 무섭지않아. 귀신들이 당신을 데리고 보이지 않는 세계에서 놀아.
          하지만 살아있는 사람보다 무섭지 않아.
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-2xs opacity-60">큰형님</span>
        <p className="flex grow items-center justify-end gap-x-3">
          <span className="text-2xs opacity-60">0</span>
          <span className="text-2xs opacity-60">10:54</span>
        </p>
      </div>
    </div>
  )
}

export default PostPreview
