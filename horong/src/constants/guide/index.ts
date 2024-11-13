interface GuideConstantType {
  [key: string]: {
    'guide-header': string
  }
}

export const GUIDE_CONSTANT: GuideConstantType = {
  KOREAN: {
    'guide-header': '가이드',
  },

  ENGLISH: {
    'guide-header': 'Guide',
  },

  CHINESE: {
    'guide-header': '指南',
  },

  JAPANESE: {
    'guide-header': 'ガイド',
  },
}
