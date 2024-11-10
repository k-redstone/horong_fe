import Image from 'next/image'
import Link from 'next/link'

import DummyPost from '@/static/imgs/dummy-post.png'
function IssueGrid() {
  return (
    <div className="grid grow grid-cols-3 place-items-center gap-y-4 overflow-y-scroll px-2">
      {/* post card */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
        <Link
          key={i}
          href={`/issue/${i}`}
          className="relative items-center justify-center"
        >
          <Image
            src={DummyPost}
            alt="dummy post"
          />
        </Link>
      ))}
    </div>
  )
}

export default IssueGrid
