interface GuideHospitalConstantType {
  [key: string]: {
    'guide-hospital': string
    'guide-hospital-detail': string
  }
}

export const GUIDE_HOSPITAL_CONSTANT: GuideHospitalConstantType = {
  KOREAN: {
    'guide-hospital': '국제 병원',
    'guide-hospital-detail': '내용',
  },

  ENGLISH: {
    'guide-hospital': 'International Hospital',
    'guide-hospital-detail': 'content',
  },

  CHINESE: {
    'guide-hospital': '国际医院',
    'guide-hospital-detail': 'content',
  },

  JAPANESE: {
    'guide-hospital': '国際病院',
    'guide-hospital-detail': '内容',
  },
}
