interface IssueConstantsType {
  [key: string]: {
    'issue-header': string
    'like-title': string
    'like-content': string

    'recommend-title': string

    'scrap-title': string
    'scrap-content': string

    'detail-like-text': string
    'detail-unlike-text': string
    'detail-scrap-text': string
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

    'detail-like-text': '좋아요',
    'detail-unlike-text': '싫어요',
    'detail-scrap-text': '북마크',
  },

  ENGLISH: {
    'issue-header': 'Issue · Trend',
    'like-title': 'No news has been liked yet.',
    'like-content': 'If you like the news, it will be displayed here.',

    'recommend-title': 'Recommended news for you',

    'scrap-title': 'No saved items.',
    'scrap-content': 'Try saving news you like.',

    'detail-like-text': 'Like',
    'detail-unlike-text': 'Unlike',
    'detail-scrap-text': 'Bookmark',
  },

  CHINESE: {
    'issue-header': '问题 · 趋势',
    'like-title': '尚未点赞任何消息。',
    'like-content': '如果您喜欢这条消息，它将显示在这里。',

    'recommend-title': '为您推荐的消息',

    'scrap-title': '没有保存的项目。',
    'scrap-content': '尝试保存您喜欢的消息。',

    'detail-like-text': '喜欢',
    'detail-unlike-text': '不喜欢',
    'detail-scrap-text': '书签',
  },

  JAPANESE: {
    'issue-header': '問題 · トレンド',
    'like-title': 'まだいいねしたニュースはありません。',
    'like-content': 'ニュースを気に入った場合、ここに表示されます。',

    'recommend-title': 'あなたにおすすめのニュース',

    'scrap-title': '保存されたアイテムはありません。',
    'scrap-content': '気に入ったニュースを保存してみてください。',

    'detail-like-text': 'いいね',
    'detail-unlike-text': 'いいね解除',
    'detail-scrap-text': 'ブックマーク',
  },
}
