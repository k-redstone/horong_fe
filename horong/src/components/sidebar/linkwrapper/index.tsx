import Link from 'next/link'

function LinkWrapperBtn({
  children,
  className,
  href,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`${className} flex items-center gap-x-3 bg-inherit px-3 py-2 text-text-high`}
    >
      {children}
    </Link>
  )
}

export default LinkWrapperBtn
