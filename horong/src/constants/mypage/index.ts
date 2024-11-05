interface MyPageType {
  [key: string]: {
    //sidebar
    'sidebar-mypage-btn': string
    'sidebar-home-txt': string
    'sidebar-last-txt': string
    'sidebar-mic-txt': string
    'sidebar-issue-txt': string
    'sidebar-community-txt': string
    'sidebar-exchange-txt': string
    'sidebar-guide-txt': string
    'sidebar-logout-txt': string
  }
}
export const MYPAGE_CONSTANT: MyPageType = {
  KOREAN: {
    'sidebar-mypage-btn': '마이 페이지',
    'sidebar-home-txt': '홈 / 호롱챗',
    'sidebar-last-txt': '지난 호롱챗 다시보기',
    'sidebar-mic-txt': '한국어 학습',
    'sidebar-issue-txt': '한국 트렌드 / 이슈 숏폼',
    'sidebar-community-txt': '커뮤니티',
    'sidebar-exchange-txt': '사설 환전소',
    'sidebar-guide-txt': '한국 가이드',
    'sidebar-logout-txt': '로그아웃',
  },

  ENGLISH: {
    'sidebar-mypage-btn': 'My Page',
    'sidebar-home-txt': 'Home / HorongChat',
    'sidebar-last-txt': 'Last HorongChat',
    'sidebar-mic-txt': 'Korean Learning',
    'sidebar-issue-txt': 'Korean Trend / Issue Short Form',
    'sidebar-community-txt': 'Community',
    'sidebar-exchange-txt': 'Private Exchange',
    'sidebar-guide-txt': 'Korean Guide',
    'sidebar-logout-txt': 'Logout',
  },

  JAPANESE: {
    'sidebar-mypage-btn': 'マイページ',
    'sidebar-home-txt': 'ホーム / ホロンチャット',
    'sidebar-last-txt': '過去のホロンチャット',
    'sidebar-mic-txt': '韓国語学習',
    'sidebar-issue-txt': '韓国トレンド / イシューショートフォーム',
    'sidebar-community-txt': 'コミュニティ',
    'sidebar-exchange-txt': 'プライベート交換所',
    'sidebar-guide-txt': '韓国ガイド',
    'sidebar-logout-txt': 'ログアウト',
  },

  CHINESE: {
    'sidebar-mypage-btn': '我的页面',
    'sidebar-home-txt': '主页 / HorongChat',
    'sidebar-last-txt': '最后的HorongChat',
    'sidebar-mic-txt': '韩语学习',
    'sidebar-issue-txt': '韩国趋势 / 问题短片',
    'sidebar-community-txt': '社区',
    'sidebar-exchange-txt': '私人交换',
    'sidebar-guide-txt': '韩国指南',
    'sidebar-logout-txt': '登出',
  },
}
