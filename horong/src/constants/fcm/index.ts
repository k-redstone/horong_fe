interface FcmConstantType {
  [key: string]: {
    'fcm-push-title-comment-txt': string
    'fcm-push-title-message-txt': string
    'fcm-push-body-txt': string
  }
}

export const FCM_CONSTANT: FcmConstantType = {
  KOREAN: {
    'fcm-push-title-comment-txt': '새로운 댓글이 달렸습니다.',
    'fcm-push-title-message-txt': '새로운 쪽지가 왔습니다.',
    'fcm-push-body-txt': '지금 눌러서 확인하기',
  },

  ENGLISH: {
    'fcm-push-title-comment-txt': 'A new comment has been posted.',
    'fcm-push-title-message-txt': 'You have a new message.',
    'fcm-push-body-txt': 'Tap now to check.',
  },

  CHINESE: {
    'fcm-push-title-comment-txt': '有新的评论。',
    'fcm-push-title-message-txt': '您有一条新消息。',
    'fcm-push-body-txt': '点击查看。',
  },

  JAPANESE: {
    'fcm-push-title-comment-txt': '新しいコメントが投稿されました。',
    'fcm-push-title-message-txt': '新しいメッセージが届きました。',
    'fcm-push-body-txt': '今すぐ押して確認してください。',
  },
}
