interface GuideResidenceConstantType {
  [key: string]: {
    'guide-residence': string
    'guide-residence-detail': string
  }
}

export const GUIDE_RESIDENCE_CONSTANT: GuideResidenceConstantType = {
  KOREAN: {
    'guide-residence': '공휴일',
    'guide-residence-detail': '내용',
  },

  ENGLISH: {
    'guide-residence': 'residence',
    'guide-residence-detail': 'content',
  },

  CHINESE: {
    'guide-residence': '公休日',
    'guide-residence-detail': 'content',
  },

  JAPANESE: {
    'guide-residence': '祝日',
    'guide-residence-detail': '内容',
  },
}
