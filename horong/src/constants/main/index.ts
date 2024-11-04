interface MainConstantType {
  [key: string]: {
    'logo-txt': string
    'login-btn': string
    'signup-btn': string
  }
}

export const MAIN_CONSTANT: MainConstantType = {
  ENGLISH: {
    'logo-txt': 'Guide for you living in Korea',
    'login-btn': 'Login',
    'signup-btn': 'Sign up',
  },

  KOREAN: {
    'logo-txt': '당신을 위한 한국 생활 길잡이',
    'login-btn': '로그인',
    'signup-btn': '회원가입',
  },

  CHINESE: {
    'logo-txt': '为您提供在韩国生活的指南',
    'login-btn': '登录',
    'signup-btn': '注册',
  },

  JAPANESE: {
    'logo-txt': '韓国での生活のためのガイド',
    'login-btn': 'ログイン',
    'signup-btn': 'サインアップ',
  },
}
