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

    //mypage
    'mypage-header': string
    'mypage-nickname-edit': string
    'mypage-lang-txt': string
    'mypage-alarm-txt': string
    'mypage-pw-txt': string
    'mypage-delete-txt': string
    'mypage-alarm-error-txt': string
    'mypage-alarm-permission-txt': string

    // 'mypage-change-profile-btn': string
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

    'mypage-header': '마이페이지',
    'mypage-nickname-edit': '닉네임 변경하기 >',
    'mypage-lang-txt': '사용 언어 변경',
    'mypage-alarm-txt': '커뮤니티 알림 받기',
    'mypage-pw-txt': '비밀번호 재설정',
    'mypage-delete-txt': '회원 탈퇴',
    'mypage-alarm-error-txt': '푸시 알람 설정 중 오류가 발생했습니다.',
    'mypage-alarm-permission-txt':
      '알림 권한이 차단되어 있습니다. 허용으로 변경 후 다시 시도하세요.',
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

    'mypage-header': 'My Page',
    'mypage-nickname-edit': 'Change Nickname >',
    'mypage-lang-txt': 'Change Language',
    'mypage-alarm-txt': 'Receive Community Notifications',
    'mypage-pw-txt': 'Reset Password',
    'mypage-delete-txt': 'Withdrawal',
    'mypage-alarm-error-txt':
      'An error occurred while setting up push notifications.',
    'mypage-alarm-permission-txt':
      'Notification permissions are blocked. Please change to allow and try again.',
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

    'mypage-header': 'マイページ',
    'mypage-nickname-edit': 'ニックネーム変更 >',
    'mypage-lang-txt': '言語変更',
    'mypage-alarm-txt': 'コミュニティ通知を受け取る',
    'mypage-pw-txt': 'パスワード再設定',
    'mypage-delete-txt': '会員退会',
    'mypage-alarm-error-txt': 'プッシュ通知の設定中にエラーが発生しました。',
    'mypage-alarm-permission-txt':
      '通知の権限がブロックされています。許可に変更してから、もう一度お試しください。',
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

    'mypage-header': '我的页面',
    'mypage-nickname-edit': '更改昵称 >',
    'mypage-lang-txt': '更改语言',
    'mypage-alarm-txt': '接收社区通知',
    'mypage-pw-txt': '重设密码',
    'mypage-delete-txt': '会员退会',
    'mypage-alarm-error-txt': '设置推送通知时发生错误。',
    'mypage-alarm-permission-txt': '通知权限已被阻止。请更改为允许后重试。',
  },
}
