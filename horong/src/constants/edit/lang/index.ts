interface EditLangType {
  [key: string]: {
    'lang-header': string
    'lang-title': string
    'lang-sub-title': string
    'lang-btn': string

    'lang-toast-success': string
  }
}

export const EDIT_LANG_CONSTANT: EditLangType = {
  KOREAN: {
    'lang-header': '언어 설정',
    'lang-title': '사용 언어 변경',
    'lang-sub-title': '서비스 내에서 사용할 언어를 선택해주세요.',
    'lang-btn': '사용 언어 변경',

    'lang-toast-success': '변경 성공',
  },

  ENGLISH: {
    'lang-header': 'Language Setting',
    'lang-title': 'Change Language',
    'lang-sub-title':
      'Please select the language you want to use in the service.',
    'lang-btn': 'Change Language',

    'lang-toast-success': 'Change Success',
  },

  CHINESE: {
    'lang-header': '语言设置',
    'lang-title': '更改语言',
    'lang-sub-title': '请选择您要在服务中使用的语言。',
    'lang-btn': '更改语言',

    'lang-toast-success': '更改成功',
  },

  JAPANESE: {
    'lang-header': '言語設定',
    'lang-title': '言語を変更する',
    'lang-sub-title': 'サービスで使用する言語を選択してください。',
    'lang-btn': '言語を変更',

    'lang-toast-success': '変更成功',
  },
}
