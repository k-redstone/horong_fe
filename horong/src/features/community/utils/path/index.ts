const allowedPaths = [
  'notice',
  'free',
  'seoul',
  'gyeonggi',
  'incheon',
  'busan',
] as const
type CommunityPathType = (typeof allowedPaths)[number]

export { allowedPaths }
export type { CommunityPathType }
