interface GuideVisaConstantType {
  [key: string]: {
    'guide-visa': string
    'guide-visa-detail': string
  }
}

export const GUIDE_VISA_CONSTANT: GuideVisaConstantType = {
  KOREAN: {
    'guide-visa': '공휴일',
    'guide-visa-detail': '내용',
  },

  ENGLISH: {
    'guide-visa': 'visa',
    'guide-visa-detail': 'content',
  },

  CHINESE: {
    'guide-visa': '公休日',
    'guide-visa-detail': 'content',
  },

  JAPANESE: {
    'guide-visa': '祝日',
    'guide-visa-detail': '内容',
  },
}
