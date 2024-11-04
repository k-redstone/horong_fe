interface MainConstantType {
  [key: string]: {
    'logo-txt': string
    'login-btn': string
    'signup-btn': string

    //404
    '404-title': string
    '404-btn': string
  }
}

export const MAIN_CONSTANT: MainConstantType = {
  KOREAN: {
    'logo-txt': '당신을 위한 한국 생활 길잡이',
    'login-btn': '로그인',
    'signup-btn': '회원가입',
    //404
    '404-title': '잘못된 페이지 접근입니다.',
    '404-btn': '뒤로 돌아가기',
  },

  ENGLISH: {
    'logo-txt': 'Guide for you living in Korea',
    'login-btn': 'Login',
    'signup-btn': 'Sign up',

    '404-title': 'Page not found',
    '404-btn': 'Go back',
  },
  CHINESE: {
    'logo-txt': '为您提供在韩国生活的指南',
    'login-btn': '登录',
    'signup-btn': '注册',

    '404-title': '页面未找到',
    '404-btn': '返回',
  },

  JAPANESE: {
    'logo-txt': '韓国での生活のためのガイド',
    'login-btn': 'ログイン',
    'signup-btn': 'サインアップ',

    '404-title': 'ページが見つかりません',
    '404-btn': '戻る',
  },
}
