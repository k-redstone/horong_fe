interface EditProfileConstantType {
  [key: string]: {
    'profile-header': string
    'profile-lock-txt': string
    'profile-btn': string

    'profile-toast-success': string
  }
}

export const EDIT_PROFILE_CONSTANT: EditProfileConstantType = {
  KOREAN: {
    'profile-header': '프로필 사진 변경',
    'profile-lock-txt': '미획득',
    'profile-btn': '프로필 사진 변경하기',

    'profile-toast-success': '변경이 완료되었습니다',
  },

  ENGLISH: {
    'profile-header': 'Change Profile Picture',
    'profile-lock-txt': 'Not Acquired',
    'profile-btn': 'Change Profile Picture',

    'profile-toast-success': 'Profile picture changed',
  },

  CHINESE: {
    'profile-header': '更改个人资料照片',
    'profile-lock-txt': '未获得',
    'profile-btn': '更改个人资料照片',

    'profile-toast-success': '更改成功',
  },

  JAPANESE: {
    'profile-header': 'プロフィール写真を変更',
    'profile-lock-txt': '未取得',
    'profile-btn': 'プロフィール写真を変更する',

    'profile-toast-success': '変更が完了しました',
  },
}
