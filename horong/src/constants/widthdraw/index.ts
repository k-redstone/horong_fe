interface WithdrawConstantType {
  [key: string]: {
    'withdraw-header': string
    'withdraw-title': string
    'withdraw-sub-title1': string
    'withdraw-sub-title2': string

    //radio index signature
    [key: string]: string

    'withdraw-radio1': string
    'withdraw-radio2': string
    'withdraw-radio3': string
    'withdraw-radio4': string
    'withdraw-radio5': string
    'withdraw-radio6': string

    'withdraw-btn': string

    //tab2
    'delete-title': string
    'delete-sub-title1': string
    'delete-sub-title2': string

    'delete-text1': string
    'delete-text2': string

    'delete-checkbox': string
    'delete-btn': string

    'delete-toast-success': string
  }
}

export const WITHDRAW_CONSTANT: WithdrawConstantType = {
  KOREAN: {
    'withdraw-header': '회원탈퇴',
    'withdraw-title': '님,\n정말 호롱을 떠나시는 건가요?',
    'withdraw-sub-title1': '계정을 삭제하시려는 이유를 말씀해주세요.',
    'withdraw-sub-title2': '더 좋은 서비스가 되기 위해 노력하겠습니다.',

    'withdraw-radio1': '탈퇴 후 재가입',
    'withdraw-radio2': '이용이 불편하고 장애가 많음',
    'withdraw-radio3': '다른 서비스 이용',
    'withdraw-radio4': '사용 빈도가 낮음',
    'withdraw-radio5': '컨텐츠가 부족함',
    'withdraw-radio6': '기타',

    'withdraw-btn': '다음으로',

    //tab2
    'delete-title': '님,\n탈퇴 전 확인해주세요!',
    'delete-sub-title1': '탈퇴시 삭제/유지되는 정보를 확인해주세요.',
    'delete-sub-title2': '한 번 삭제된 정보는 복구가 불가능합니다.',

    'delete-text1':
      '작성한 글과 댓글은 자동으로 삭제되지 않습니다.\n민감한 정보가 포함된 글이 있다면, 탈퇴 전 삭제해주세요.',
    'delete-text2':
      '탈퇴하시면 서비스 내에서 진행된 학습 기록과 획득하신 프로필이 사라지게 됩니다.',

    'delete-checkbox': '유의사항을 모두 확인하였으며, 이에 동의합니다.',
    'delete-btn': '호롱 회원 탈퇴',

    'delete-toast-success': '탈퇴 완료.',
  },

  ENGLISH: {
    'withdraw-header': 'Withdraw',
    'withdraw-title': ',\nAre you really leaving Horong?',
    'withdraw-sub-title1':
      'Please tell us why you want to delete your account.',
    'withdraw-sub-title2': 'We will do our best to provide better service.',

    'withdraw-radio1': 'Rejoin after withdrawal',
    'withdraw-radio2': 'Inconvenient and many obstacles',
    'withdraw-radio3': 'Use another service',
    'withdraw-radio4': 'Low frequency of use',
    'withdraw-radio5': 'Lack of content',
    'withdraw-radio6': 'Other',

    'withdraw-btn': 'Next',

    //tab2
    'delete-title': ',\nPlease check before withdrawing!',
    'delete-sub-title1':
      'Check the information that is deleted/maintained when withdrawing.',
    'delete-sub-title2': 'Once deleted information cannot be restored.',

    'delete-text1':
      'Written posts and comments are not automatically deleted.\nIf there are posts with sensitive information, please delete them before withdrawing.',
    'delete-text2':
      'If you withdraw, your learning history and profile will disappear from the service.',

    'delete-checkbox': 'I have read and agree to all the precautions.',
    'delete-btn': 'Withdraw from Horong',

    'delete-toast-success': 'Withdrawal complete.',
  },

  CHINESE: {
    'withdraw-header': '退出会员',
    'withdraw-title': ',\n真的要离开Horong吗？',
    'withdraw-sub-title1': '请告诉我们您要删除帐户的原因。',
    'withdraw-sub-title2': '我们将尽力提供更好的服务。',

    'withdraw-radio1': '退出后重新加入',
    'withdraw-radio2': '不方便且有许多障碍',
    'withdraw-radio3': '使用其他服务',
    'withdraw-radio4': '使用频率较低',
    'withdraw-radio5': '内容不足',
    'withdraw-radio6': '其他',

    'withdraw-btn': '下一个',

    //tab2
    'delete-title': ',\n在退出之前，请检查！',
    'delete-sub-title1': '检查退出时删除/保留的信息。',
    'delete-sub-title2': '一旦删除的信息将无法恢复。',

    'delete-text1':
      '写的帖子和评论不会自动删除。\n如果有包含敏感信息的帖子，请在退出之前删除。',
    'delete-text2': '如果您退出，您的学习历史和个人资料将从服务中消失。',

    'delete-checkbox': '我已阅读并同意所有注意事项。',
    'delete-btn': '退出Horong',

    'delete-toast-success': '退出完成。',
  },

  JAPANESE: {
    'withdraw-header': '会員退会',
    'withdraw-title': ',\nHorongを本当に去るつもりですか？',
    'withdraw-sub-title1': 'アカウントを削除する理由を教えてください。',
    'withdraw-sub-title2': 'より良いサービスを提供するために最善を尽くします。',

    'withdraw-radio1': '退会後再加入',
    'withdraw-radio2': '不便で多くの障害',
    'withdraw-radio3': '他のサービスを利用する',
    'withdraw-radio4': '使用頻度が低い',
    'withdraw-radio5': 'コンテンツが不足している',
    'withdraw-radio6': 'その他',

    'withdraw-btn': '次',

    //tab2
    'delete-title': ',\n退会前に確認してください！',
    'delete-sub-title1': '退会時に削除/保持される情報を確認してください。',
    'delete-sub-title2': '一度削除された情報は復元できません。',

    'delete-text1':
      '書かれた投稿やコメントは自動的に削除されません。\n機密情報が含まれる投稿がある場合は、退会前に削除してください。',
    'delete-text2':
      '退会すると、サービスから学習履歴とプロフィールが消えます。',

    'delete-checkbox': 'すべての注意事項を読んで同意しました。',
    'delete-btn': 'Horongから退会',

    'delete-toast-success': '退会完了。',
  },
}
