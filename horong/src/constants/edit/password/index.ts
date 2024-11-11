interface EditPasswordConstantType {
  [key: string]: {
    'password-header': string

    'password-title': string
    'password-sub-title': string

    'password-current-placeholder': string
    'password-new-placeholder': string
    'password-confirm-placeholder': string

    // 조건에 맞는 비밀번호
    'password-error1': string
    // 일치하지 않는 비밀번호
    'password-error2': string
    'password-inform1': string
    'password-inform2': string

    'password-btn': string
    'password-toast': string
  }
}
export const EDIT_PASSWORD_CONSTANT: EditPasswordConstantType = {
  KOREAN: {
    'password-header': '비밀번호 재설정',
    'password-title': '비밀번호 재설정',
    'password-sub-title': '현재 사용중인 비밀번호를 입력해주세요.',

    'password-current-placeholder': '현재 사용중인 비밀번호를 입력해주세요.',
    'password-new-placeholder': '새로운 비밀번호를 입력해주세요.',
    'password-confirm-placeholder': '비밀번호를 다시 입력해주세요.',

    'password-error1': '비밀번호 조건을 확인해주세요.',
    'password-error2': '비밀번호가 일치하지 않습니다.',

    'password-inform1': '· 8자 이상 20자 이하여야합니다.',
    'password-inform2':
      '· 비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',

    'password-btn': '비밀번호 재설정',
    'password-toast': '비밀번호가 변경되었습니다.',
  },

  ENGLISH: {
    'password-header': 'Change Password',
    'password-title': 'Change Password',
    'password-sub-title': 'Please enter your current password.',

    'password-current-placeholder': 'Enter your current password.',
    'password-new-placeholder': 'Enter your new password.',
    'password-confirm-placeholder': 'Re-enter your new password.',

    'password-error1': 'Please check the password conditions.',
    'password-error2': 'Passwords do not match.',
    'password-inform1': '· Must be 8 to 20 characters long.',
    'password-inform2':
      '· Must contain English, numbers, and special characters.',

    'password-btn': 'Change Password',
    'password-toast': 'Password has been changed.',
  },

  CHINESE: {
    'password-header': '更改密码',
    'password-title': '更改密码',
    'password-sub-title': '请输入您的当前密码。',

    'password-current-placeholder': '输入您的当前密码。',
    'password-new-placeholder': '输入您的新密码。',
    'password-confirm-placeholder': '重新输入您的新密码。',

    'password-error1': '请检查密码条件。',
    'password-error2': '密码不匹配。',
    'password-inform1': '· 必须为8到20个字符。',
    'password-inform2': '· 必须包含英文，数字和特殊字符。',

    'password-btn': '更改密码',
    'password-toast': '密码已更改。',
  },

  JAPANESE: {
    'password-header': 'パスワードを変更',
    'password-title': 'パスワードを変更',
    'password-sub-title': '現在のパスワードを入力してください。',

    'password-current-placeholder': '現在のパスワードを入力してください。',
    'password-new-placeholder': '新しいパスワードを入力してください。',
    'password-confirm-placeholder': '新しいパスワードを再入力してください。',

    'password-error1': 'パスワードの条件を確認してください。',
    'password-error2': 'パスワードが一致しません。',
    'password-inform1': '· 8〜20文字である必要があります。',
    'password-inform2':
      '· パスワードには英語、数字、特殊文字が含まれている必要があります。',

    'password-btn': 'パスワードを変更',
    'password-toast': 'パスワードが変更されました。',
  },
}
