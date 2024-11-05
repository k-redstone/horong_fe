interface HomeConstantType {
  [key: string]: {
    'home-header': string
    'home-chat-placeholder': string
    'home-txt1': string
    'home-txt2': string
  }
}

export const HOME_CONSTANT: HomeConstantType = {
  KOREAN: {
    'home-header': '호롱챗',
    'home-chat-placeholder': '메시지를 입력해주세요',
    'home-txt1': '안녕하세요, 호롱입니다 :D',
    'home-txt2': '궁금하신게 있으시면 편하게 말씀해주세요 ❤',
  },

  ENGLISH: {
    'home-header': 'HorongChat',
    'home-chat-placeholder': 'Please enter a message',
    'home-txt1': 'Hello, I am Horong :D',
    'home-txt2': 'If you have any questions, feel free to ask ❤',
  },

  CHINESE: {
    'home-header': 'HorongChat',
    'home-chat-placeholder': '请输入消息',
    'home-txt1': '你好，我是Horong :D',
    'home-txt2': '如果您有任何问题，请随时问 ❤',
  },

  JAPANESE: {
    'home-header': 'HorongChat',
    'home-chat-placeholder': 'メッセージを入力してください',
    'home-txt1': 'こんにちは、私はHorongです :D',
    'home-txt2': '質問がある場合は、お気軽にお尋ねください ❤',
  },
}
