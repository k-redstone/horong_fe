interface GuideHolidayConstantType {
  [key: string]: {
    'guide-holiday': string
    'guide-holiday-detail': string
  }
}

export const GUIDE_HOLIDAY_CONSTANT: GuideHolidayConstantType = {
  KOREAN: {
    'guide-holiday': '공휴일',
    'guide-holiday-detail':
      '한국의 공휴일은 다양한 문화와 전통을 반영하여 국가적으로 지정된날들입니다.주요 공휴일에는 설날, 추석, 어린이날 등이 있으며, 각공휴일은 지역과 전통에 따라 다양한 행사가 열립니다.',
  },

  ENGLISH: {
    'guide-holiday': 'Holiday',
    'guide-holiday-detail':
      "Korean holidays are nationally designated days reflecting various cultures and traditions. Major holidays include Lunar New Year, Chuseok, and Children's Day, and each holiday features various events according to region and tradition.",
  },

  CHINESE: {
    'guide-holiday': '公休日',
    'guide-holiday-detail':
      '韩国的公休日反映了多种文化和传统，是国家指定的日子。主要公休日有春节、中秋、儿童节等,各公休日根据地区和传统举行多种活动。',
  },

  JAPANESE: {
    'guide-holiday': '祝日',
    'guide-holiday-detail':
      '韓国の祝日は多様な文化と伝統を反映して国家的に指定された日です。主な祝日には旧正月、秋夕、子どもの日などがあり、各祝日は地域や伝統によってさまざまな行事が行われます。',
  },
}
