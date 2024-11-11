'use client'

import { notFound, useParams } from 'next/navigation'

import {
  allowedPaths,
  CommunityPathType,
} from '@/features/community/utils/path/index.ts'

interface ParamsProps {
  boardType: CommunityPathType
}

export default function CommunityBaordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const params = useParams() as Partial<ParamsProps>
  if (params.boardType && !allowedPaths.includes(params.boardType)) {
    notFound()
  }
  return <>{children}</>
}
