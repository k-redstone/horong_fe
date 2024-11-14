interface GuideConstantType {
  [key: string]: {
    'guide-header': string
    //탭
    'guide-tab-doc': string
    'guide-tab-culture': string
    'guide-tab-living': string
    //각각버튼-링크
    'guide-link-visa': string
    'guide-link-residence': string
    'guide-link-holiday': string
    'guide-link-hospital': string
  }
}

export const GUIDE_CONSTANT: GuideConstantType = {
  KOREAN: {
    'guide-header': '가이드',
    'guide-tab-doc': '서류・비자',
    'guide-tab-culture': '문화',
    'guide-tab-living': '생활',
    'guide-link-visa': '비자',
    'guide-link-residence': '외국인 등록증',
    'guide-link-holiday': '공휴일',
    'guide-link-hospital': '국제 병원',
  },

  ENGLISH: {
    'guide-header': 'Guide',
    'guide-tab-doc': 'Documents',
    'guide-tab-culture': 'Culture',
    'guide-tab-living': 'Living',
    'guide-link-visa': 'VISA',
    'guide-link-residence': 'Residence Card',
    'guide-link-holiday': 'Holiday',
    'guide-link-hospital': 'International Hospital',
  },

  CHINESE: {
    'guide-header': '指南',
    'guide-tab-doc': '文件・签证',
    'guide-tab-culture': '文化',
    'guide-tab-living': '生活',
    'guide-link-visa': '签证',
    'guide-link-residence': '外国人登录证',
    'guide-link-holiday': '公休日',
    'guide-link-hospital': '国际医院',
  },

  JAPANESE: {
    'guide-header': 'ガイド',
    'guide-tab-doc': '書類・VISA',
    'guide-tab-culture': '文化',
    'guide-tab-living': '生活',
    'guide-link-visa': 'VISA',
    'guide-link-residence': '外国人登録証',
    'guide-link-holiday': '祝日',
    'guide-link-hospital': '国際病院',
  },
}
