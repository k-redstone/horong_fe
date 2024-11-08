interface IssueConstantsType {
  [key: string]: {
    'issue-header': string
    'like-title': string
    'like-content': string

    'recommend-title': string

    'scrap-title': string
    'scrap-content': string
  }
}

export const ISSUE_CONSTANTS: IssueConstantsType = {
  KOREAN: {
    'issue-header': '이슈 · 트렌드',
    'like-title': '아직 좋아요를 누른 소식이 없습니다.',
    'like-content': '소식에 좋아요를 남기면 여기에 표시됩니다.',

    'recommend-title': '회원님을 위한 맞춤 소식',

    'scrap-title': '저장한 항목이 없습니다.',
    'scrap-content': '마음에 드는 소식을 저장해보세요.',
  },

  ENGLISH: {
    'issue-header': 'Issue · Trend',
    'like-title': 'No news has been liked yet.',
    'like-content': 'If you like the news, it will be displayed here.',

    'recommend-title': 'Recommended news for you',

    'scrap-title': 'No saved items.',
    'scrap-content': 'Try saving news you like.',
  },
}
