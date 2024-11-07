interface EditNicknameConstantType {
  [key: string]: {
    'nickname-header': string
    'nickname-title': string
    'nickname-sub-title': string
    'nickname-placeholder': string
    'nickname-btn': string

    'nickname-toast-success': string
    'nickname-toast-fail1': string
    'nickname-toast-fail2': string
  }
}

export const EDIT_NICKNAME_CONSTANT: EditNicknameConstantType = {
  KOREAN: {
    'nickname-header': '닉네임 변경',
    'nickname-title': '닉네임 변경',
    'nickname-sub-title': '변경할 닉네임을 입력해주세요.',
    'nickname-placeholder': '닉네임을 입력해주세요.',
    'nickname-btn': '닉네임 변경',

    'nickname-toast-success': '닉네임이 변경되었습니다.',
    'nickname-toast-fail1': '이미 사용중인 닉네임입니다.',
    'nickname-toast-fail2': '닉네임 변경에 실패했습니다.',
  },

  ENGLISH: {
    'nickname-header': 'Change Nickname',
    'nickname-title': 'Change Nickname',
    'nickname-sub-title': 'Please enter the nickname you want to change.',
    'nickname-placeholder': 'Please enter your nickname.',
    'nickname-btn': 'Change Nickname',

    'nickname-toast-success': 'Nickname has been changed.',
    'nickname-toast-fail1': 'Nickname is already in use.',
    'nickname-toast-fail2': 'Failed to change nickname.',
  },

  JAPANESE: {
    'nickname-header': 'ニックネーム変更',
    'nickname-title': 'ニックネーム変更',
    'nickname-sub-title': '変更したいニックネームを入力してください。',
    'nickname-placeholder': 'ニックネームを入力してください。',
    'nickname-btn': 'ニックネーム変更',

    'nickname-toast-success': 'ニックネームが変更されました。',
    'nickname-toast-fail1': 'すでに使用されているニックネームです。',
    'nickname-toast-fail2': 'ニックネームの変更に失敗しました。',
  },

  CHINESE: {
    'nickname-header': '昵称更改',
    'nickname-title': '昵称更改',
    'nickname-sub-title': '请输入要更改的昵称。',
    'nickname-placeholder': '请输入昵称。',
    'nickname-btn': '昵称更改',

    'nickname-toast-success': '昵称已更改。',
    'nickname-toast-fail1': '昵称已被使用。',
    'nickname-toast-fail2': '更改昵称失败。',
  },
}
