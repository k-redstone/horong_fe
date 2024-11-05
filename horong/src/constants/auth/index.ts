interface AuthConstantType {
  [key: string]: {
    //login
    'id-label': string
    'id-placeholder': string
    'pw-label': string
    'pw-placeholder': string
    'login-inform-check': string

    'login-btn': string
    'signup-btn': string

    'success-toast': string

    //signup
    'signup-header': string

    //language process
    'signup-lang-txt1': string
    'signup-lang-txt2': string
    'signup-lang-radio1': string
    'signup-lang-radio2': string
    'signup-lang-radio3': string
    'signup-lang-radio4': string
    'signup-lang-btn': string

    //term  process
    'signup-term-txt1': string
    'signup-term-radio1': string
    'signup-term-radio2': string
    'signup-term-radio3': string
    'signup-term-radio4': string
    'signup-term-required': string
    'signup-term-optional': string

    //id process
    'signup-id-txt1': string

    //password process
    'signup-pw-txt1': string
    'signup-pw-error1': string
    'signup-pw-error2': string
    'signup-pwconfirm-placeholder': string
    'signup-pw-inform1': string
    'signup-pw-inform2': string

    //profile process
    'signup-profile-txt1': string
    'signup-nickname-placeholder': string
    'signup-profile-click-toast': string
    'signup-nickname-success': string

    'signup-complete-btn': string
    'signup-complete-toast-load': string
    'signup-complete-toast-success': string
    'signup-complete-toast-fail': string

    //complete page
    'complete-header': string
    'complete-txt1': string
    'complete-btn': string
  }
}

export const AUTH_CONSTANT: AuthConstantType = {
  KOREAN: {
    'id-label': 'ID',
    'id-placeholder': '아이디를 입력해주세요',
    'pw-label': 'PASSWORD',
    'pw-placeholder': '비밀번호를 입력해주세요',
    'login-inform-check': '로그인 정보 저장',
    'login-btn': '로그인',
    'signup-btn': '아직 회원이 아니시라면? 회원가입',
    'success-toast': '로그인 성공',

    'signup-header': '회원가입',
    'signup-lang-txt1': '안녕하세요, 호롱입니다!',
    'signup-lang-txt2': '서비스 내에서 사용할 언어를 선택해주세요.',
    'signup-lang-radio1': 'ENGLISH',
    'signup-lang-radio2': '한국어',
    'signup-lang-radio3': '中文',
    'signup-lang-radio4': '日本語',
    'signup-lang-btn': '다음으로',

    'signup-term-txt1': '서비스 이용약관에 동의해주세요.',
    'signup-term-radio1': '약관 전체동의',
    'signup-term-radio2': '서비스 이용약관 동의',
    'signup-term-radio3': '개인정보 수집 및 이용 동의',
    'signup-term-radio4': '위치 정보 이용 동의',
    'signup-term-required': '(필수)',
    'signup-term-optional': '(선택)',

    'signup-id-txt1': 'ID를 설정해주세요.',

    'signup-pw-txt1': '비밀번호를 설정해주세요.',
    'signup-pw-error1': '· 비밀번호 조건을 확인해주세요.',
    'signup-pw-error2': '· 비밀번호가 일치하지 않습니다.',
    'signup-pwconfirm-placeholder': '비밀번호를 다시 입력해주세요',
    'signup-pw-inform1': '· 8자 이상 20자 이하여야합니다.',
    'signup-pw-inform2':
      '· 비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',

    'signup-profile-txt1': '프로필을 설정해주세요.',
    'signup-nickname-placeholder': '닉네임을 입력해주세요',
    'signup-profile-click-toast': '죄송합니다, 아직 준비중인 기능입니다.',
    'signup-nickname-success': '사용 가능한 닉네임입니다.',

    'signup-complete-btn': '가입하기',
    'signup-complete-toast-load': '회원가입 중...',
    'signup-complete-toast-success': '회원가입이 완료되었습니다.',
    'signup-complete-toast-fail': '회원가입에 실패했습니다.',

    'complete-header': '회원가입',
    'complete-txt1': '가입을 환영합니다!',
    'complete-btn': '호롱 시작하기',
  },
  ENGLISH: {
    'id-label': 'ID',
    'id-placeholder': 'Please enter your ID',
    'pw-label': 'PASSWORD',
    'pw-placeholder': 'Please enter your password',
    'login-inform-check': 'Remember me',
    'login-btn': 'Login',
    'signup-btn': "Don't have an account? Sign up",
    'success-toast': 'Login success',

    'signup-header': 'Sign up',
    'signup-lang-txt1': 'Hello, I am Horong!',
    'signup-lang-txt2':
      'Please select the language you will use within the service.',
    'signup-lang-radio1': 'ENGLISH',
    'signup-lang-radio2': '한국어',
    'signup-lang-radio3': '中文',
    'signup-lang-radio4': '日本語',
    'signup-lang-btn': 'Next',

    'signup-term-txt1': 'Please agree to the terms of service.',
    'signup-term-radio1': 'Agree to all terms',
    'signup-term-radio2': 'Terms of service',
    'signup-term-radio3': 'Use of personal information',
    'signup-term-radio4': 'Use of location information',
    'signup-term-required': '(Required)',
    'signup-term-optional': '(Optional)',

    'signup-id-txt1': 'Please set your ID.',

    'signup-pw-txt1': 'Please set your password.',
    'signup-pw-error1': '· Please check the password conditions.',
    'signup-pw-error2': '· Passwords do not match.',
    'signup-pwconfirm-placeholder': 'Please enter your password again',
    'signup-pw-inform1': '· Must be 8 to 20 characters long.',
    'signup-pw-inform2':
      '· Passwords must include English, numbers, and special characters.',

    'signup-profile-txt1': 'Please set your profile.',
    'signup-nickname-placeholder': 'Please enter your nickname',
    'signup-profile-click-toast':
      'Sorry, this feature is still under development.',
    'signup-nickname-success': 'This nickname is available.',

    'signup-complete-btn': 'Sign up',
    'signup-complete-toast-load': 'Signing up...',
    'signup-complete-toast-success': 'Sign up success.',
    'signup-complete-toast-fail': 'Sign up failed.',

    'complete-header': 'Sign up',
    'complete-txt1': 'Welcome to Horong!',
    'complete-btn': 'Start Horong',
  },
  CHINESE: {
    'id-label': 'ID',
    'id-placeholder': '请输入您的ID',
    'pw-label': 'PASSWORD',
    'pw-placeholder': '请输入您的密码',
    'login-inform-check': '记住我',
    'login-btn': '登录',
    'signup-btn': '还没有帐户？注册',
    'success-toast': '登录成功',

    'signup-header': '注册',
    'signup-lang-txt1': '你好，我是Horong！',
    'signup-lang-txt2': '请选择您将在服务中使用的语言。',
    'signup-lang-radio1': 'ENGLISH',
    'signup-lang-radio2': '한국어',
    'signup-lang-radio3': '中文',
    'signup-lang-radio4': '日本語',
    'signup-lang-btn': '下一个',

    'signup-term-txt1': '请同意服务条款。',
    'signup-term-radio1': '同意所有条款',
    'signup-term-radio2': '同意服务条款',
    'signup-term-radio3': '同意收集和使用个人信息',
    'signup-term-radio4': '同意使用位置信息',
    'signup-term-required': '(必需的)',
    'signup-term-optional': '(可选的)',

    'signup-id-txt1': '请设置您的ID。',

    'signup-pw-txt1': '请设置您的密码。',
    'signup-pw-error1': '· 请检查密码条件。',
    'signup-pw-error2': '· 密码不匹配。',
    'signup-pwconfirm-placeholder': '请再次输入密码',
    'signup-pw-inform1': '· 必须为8到20个字符。',
    'signup-pw-inform2': '· 密码必须包含英文，数字和特殊字符。',

    'signup-profile-txt1': '请设置您的个人资料。',
    'signup-nickname-placeholder': '请输入您的昵称',
    'signup-profile-click-toast': '抱歉，此功能仍在开发中。',
    'signup-nickname-success': '此昵称可用。',

    'signup-complete-btn': '注册',
    'signup-complete-toast-load': '注册中...',
    'signup-complete-toast-success': '注册成功。',
    'signup-complete-toast-fail': '注册失败。',

    'complete-header': '注册',
    'complete-txt1': '欢迎来到Horong！',
    'complete-btn': '开始Horong',
  },
  JAPANESE: {
    'id-label': 'ID',
    'id-placeholder': 'IDを入力してください',
    'pw-label': 'PASSWORD',
    'pw-placeholder': 'パスワードを入力してください',
    'login-inform-check': '私を覚えてます',
    'login-btn': 'ログイン',
    'signup-btn': 'アカウントを持っていませんか？サインアップ',
    'success-toast': 'ログイン成功',

    'signup-header': 'サインアップ',
    'signup-lang-txt1': 'こんにちは、私はHorongです！',
    'signup-lang-txt2': 'サービス内で使用する言語を選択してください。',
    'signup-lang-radio1': 'ENGLISH',
    'signup-lang-radio2': '한국어',
    'signup-lang-radio3': '中文',
    'signup-lang-radio4': '日本語',
    'signup-lang-btn': '次',

    'signup-term-txt1': '利用規約に同意してください。',
    'signup-term-radio1': 'すべての条件に同意する',
    'signup-term-radio2': 'サービス利用規約に同意する',
    'signup-term-radio3': '個人情報の収集と利用に同意する',
    'signup-term-radio4': '位置情報の使用に同意する',
    'signup-term-required': '(必須)',
    'signup-term-optional': '(オプション)',

    'signup-id-txt1': 'IDを設定してください。',

    'signup-pw-txt1': 'パスワードを設定してください。',
    'signup-pw-error1': '· パスワード条件を確認してください。',
    'signup-pw-error2': '· パスワードが一致しません。',
    'signup-pwconfirm-placeholder': 'パスワードをもう一度入力してください',
    'signup-pw-inform1': '· 8〜20文字である必要があります。',
    'signup-pw-inform2':
      '· パスワードには英語、数字、特殊文字が含まれている必要があります。',

    'signup-profile-txt1': 'プロフィールを設定してください。',
    'signup-nickname-placeholder': 'ニックネームを入力してください',
    'signup-profile-click-toast':
      '申し訳ありませんが、この機能はまだ開発中です。',
    'signup-nickname-success': 'このニックネームは利用可能です。',

    'signup-complete-btn': 'サインアップ',
    'signup-complete-toast-load': 'サインアップ中...',
    'signup-complete-toast-success': 'サインアップ成功。',
    'signup-complete-toast-fail': 'サインアップに失敗しました。',

    'complete-header': 'サインアップ',
    'complete-txt1': 'Horongへようこそ！',
    'complete-btn': 'Horongを開始',
  },
}
