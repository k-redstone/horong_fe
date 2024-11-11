interface InboxConstantType {
  [key: string]: {
    // 공통
    'inbox-header': string
    'meesage-header': string
    'notify-header': string

    // 쪽지
    'message-submit-toast-loading': string
    'message-submit-toast-success': string
    'message-submit-toast-fail': string
    'message-submit-is-blank': string
    'message-fetch-error': string
    'message-send-txt': string
    'message-no-item-txt': string

    // 알림
    'notify-no-item-txt': string
  }
}

export const INBOX_CONSTANT: InboxConstantType = {
  KOREAN: {
    // 공통
    'inbox-header': '알림 및 쪽지',
    'meesage-header': '쪽지',
    'notify-header': '알림',

    // 쪽지
    'message-submit-is-blank': '빈칸이 있습니다.',
    'message-submit-toast-loading': '쪽지를 보내고 있습니다.',
    'message-submit-toast-success': '쪽지를 성공적으로 보냈습니다.',
    'message-submit-toast-fail': '쪽지를 보내는 중 오류가 발생했습니다.',
    'message-fetch-error': '쪽지를 불러오던 중 오류가 발생했어요.',
    'message-send-txt': '쪽지 보내기',
    'message-no-item-txt': '새로운 쪽지가 없습니다.',

    // 알림
    'notify-no-item-txt': '새로운 알림이 없습니다.',
  },

  ENGLISH: {
    // Common
    'inbox-header': 'Notifications and Messages',
    'meesage-header': 'Messages',
    'notify-header': 'Notifications',

    // Messages
    'message-submit-is-blank': 'There are blank fields.',
    'message-submit-toast-loading': 'Sending message...',
    'message-submit-toast-success': 'Message sent successfully.',
    'message-submit-toast-fail': 'An error occurred while sending the message.',
    'message-fetch-error': 'An error occurred while fetching messages.',
    'message-send-txt': 'Send Message',
    'message-no-item-txt': 'No new messages.',

    // Notifications
    'notify-no-item-txt': 'No new notifications.',
  },

  CHINESE: {
    // Common
    'inbox-header': '通知和消息',
    'meesage-header': '消息',
    'notify-header': '通知',

    // Messages
    'message-submit-is-blank': '存在空白字段。',
    'message-submit-toast-loading': '正在发送消息...',
    'message-submit-toast-success': '消息发送成功。',
    'message-submit-toast-fail': '发送消息时出错。',
    'message-fetch-error': '获取消息时出错。',
    'message-send-txt': '发送消息',
    'message-no-item-txt': '没有新消息。',

    // Notifications
    'notify-no-item-txt': '没有新通知。',
  },

  JAPANESE: {
    // Common
    'inbox-header': '通知とメッセージ',
    'meesage-header': 'メッセージ',
    'notify-header': '通知',

    // Messages
    'message-submit-is-blank': '空欄があります。',
    'message-submit-toast-loading': 'メッセージを送信しています...',
    'message-submit-toast-success': 'メッセージが正常に送信されました。',
    'message-submit-toast-fail': 'メッセージ送信中にエラーが発生しました。',
    'message-fetch-error': 'メッセージの取得中にエラーが発生しました。',
    'message-send-txt': 'メッセージを送信',
    'message-no-item-txt': '新しいメッセージはありません。',

    // Notifications
    'notify-no-item-txt': '新しい通知はありません。',
  },
}
