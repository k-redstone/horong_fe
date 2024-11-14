interface GuideHospitalConstantType {
  [key: string]: {
    'guide-hospital': string
    'guide-hospital-detail': string
  }
}

export const GUIDE_HOSPITAL_CONSTANT: GuideHospitalConstantType = {
  KOREAN: {
    'guide-hospital': '공휴일',
    'guide-hospital-detail': '내용',
  },

  ENGLISH: {
    'guide-hospital': 'hospital',
    'guide-hospital-detail': 'content',
  },

  CHINESE: {
    'guide-hospital': '公休日',
    'guide-hospital-detail': 'content',
  },

  JAPANESE: {
    'guide-hospital': '祝日',
    'guide-hospital-detail': '内容',
  },
}
