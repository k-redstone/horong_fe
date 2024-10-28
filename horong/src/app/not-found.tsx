import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-3xl font-bold">
      <p>404!</p>
      <p className="text-xs font-normal">잘못된 페이지 접근입니다.</p>

      <Link
        href={'/'}
        className="text-xs-bold my-12 rounded-md border border-white px-12 py-4 transition duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        메인으로 돌아가기
      </Link>
    </div>
  )
}
