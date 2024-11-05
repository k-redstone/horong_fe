const allowedPaths = ['notice', 'free', 'seoul'] as const
type CommunityPathType = (typeof allowedPaths)[number]

export { allowedPaths }
export type { CommunityPathType }
