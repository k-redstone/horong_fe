interface CommunityConstantType {
  [key: string]: {
    // header & des
    'page-header': string
    'notice-header': string
    'free-header': string
    'region-header': string
    'notice-des': string
    'free-des': string
    'region-des-seoul': string
    'region-subheader-seoul': string
    'region-des-gyeonggi': string
    'region-subheader-gyeonggi': string
    'region-des-incheon': string
    'region-subheader-incheon': string
    'region-des-busan': string
    'region-subheader-busan': string
    'region-text-seoul': string
    'region-text-gyeonggi': string
    'region-text-incheon': string
    'region-text-busan': string

    'region-update-notice': string

    // post
    'post-submit-text': string
    'post-submit-toast-success': string
    'post-submit-toast-loading': string
    'post-submit-toast-fail': string
    'post-submit-is-blank': string
    'post-none-text': string

    // comment
    'comment-edit-header': string
    'comment-none-text1': string
    'comment-none-text2': string
    'comment-submit-toast-success': string
    'comment-submit-toast-loading': string
    'comment-submit-toast-fail': string

    // modal
    'modal-delete-text': string
    'modal-edit-text': string
    'modal-confirm-text': string
    'modal-confirm-yes': string
    'modal-confirm-no': string

    // common text
    'search-text': string
    'cancel-text': string
    'submit-dm-text': string
    'new-text': string
    'post-text': string
    more: string
  }
}

const COMMUNITY_CONSTANT: CommunityConstantType = {
  KOREAN: {
    // header & des
    'page-header': '커뮤니티',
    'notice-header': '외교부 공지사항',
    'region-header': '지역별 게시판',
    'free-header': '자유게시판',
    'notice-des': '대한민국 외교부의 공지사항들이 올라오는 게시판입니다.',
    'free-des': '모두가 자유롭게 이용하는 게시판입니다.',
    'region-subheader-seoul': '지역별게시판 | 서울특별시',
    'region-des-seoul': '서울시에 사는 친구들 모여라 👀',
    'region-subheader-gyeonggi': '지역별게시판 | 경기도',
    'region-des-gyeonggi': '경기도에 사는 친구들 모여라 👀',
    'region-subheader-incheon': '지역별게시판 | 인천',
    'region-des-incheon': '서울시에 사는 친구들 모여라 👀',
    'region-subheader-busan': '지역별게시판 | 부산',
    'region-des-busan': '부산에 사는 친구들 모여라 👀',
    'region-text-seoul': '서울특별시',
    'region-text-gyeonggi': '경기도',
    'region-text-incheon': '인천광역시',
    'region-text-busan': '부산광역시',

    'region-update-notice':
      '다른 지역의 게시판은 다음 업데이트시 추가 예정입니다.',

    // post
    'post-submit-text': '등록',
    'post-submit-toast-success': '게시글이 성공적으로 작성되었습니다.',
    'post-submit-toast-loading': '게시글을 작성 중 입니다.',
    'post-submit-toast-fail': '게시글 작성 중 오류가 발생했습니다.',
    'post-submit-is-blank': '빈칸이 있습니다!',
    'post-none-text': '아직 게시물이 존재하지 않습니다.',

    // comment
    'comment-submit-toast-success': '댓글을 성공적으로 작성했습니다.',
    'comment-submit-toast-loading': '댓글을 작성 중 입니다.',
    'comment-submit-toast-fail': '댓글 작성 중 오류가 발생했습니다.',
    'comment-edit-header': '댓글 수정',
    'comment-none-text1': '작성된 댓글이 없습니다.',
    'comment-none-text2': '첫 번째 댓글을 남겨보세요',

    // modal
    'modal-delete-text': '삭제',
    'modal-edit-text': '수정',
    'modal-confirm-text': '정말 삭제하시겠습니까?',
    'modal-confirm-yes': '네',
    'modal-confirm-no': '아니오',

    // common text
    'search-text': 'search',
    'cancel-text': '취소',
    'submit-dm-text': 'DM전송',
    'new-text': 'new',
    'post-text': '게시글',

    more: '더보기',
  },
  ENGLISH: {
    // header & description
    'page-header': 'Community',
    'notice-header': 'Ministry of Foreign Affairs Notices',
    'region-header': 'Regional Boards',
    'free-header': 'Free Board',
    'notice-des':
      'A board where announcements from the Ministry of Foreign Affairs of Korea are posted.',
    'free-des': 'A board for everyone to use freely.',
    'region-subheader-seoul': 'Regional Board | Seoul',
    'region-des-seoul': 'Friends living in Seoul, gather here 👀',
    'region-subheader-gyeonggi': 'Regional Board | Gyeonggi',
    'region-des-gyeonggi': 'Friends living in Gyeonggi, gather here 👀',
    'region-subheader-incheon': 'Regional Board | Incheon',
    'region-des-incheon': 'Friends living in Incheon, gather here 👀',
    'region-subheader-busan': 'Regional Board | Busan',
    'region-des-busan': 'Friends living in Busan, gather here 👀',
    'region-text-seoul': 'Seoul',
    'region-text-gyeonggi': 'Gyeonggi',
    'region-text-incheon': 'Incheon',
    'region-text-busan': 'Busan',

    'region-update-notice':
      'Boards for other regions will be added in the next update.',

    // post
    'post-submit-text': 'post',
    'post-submit-toast-success': 'The post has been successfully created.',
    'post-submit-toast-loading': 'Creating a post...',
    'post-submit-toast-fail': 'An error occurred while creating the post.',
    'post-submit-is-blank': 'There are empty fields!',
    'post-none-text': 'No posts are currently available.',

    // comment
    'comment-submit-toast-success': 'Comment submitted successfully.',
    'comment-submit-toast-loading': 'Submitting comment...',
    'comment-submit-toast-fail':
      'An error occurred while submitting the comment.',
    'comment-edit-header': 'Edit Comment',
    'comment-none-text1': 'No comments posted yet.',
    'comment-none-text2': 'Be the first to leave a comment.',

    // modal
    'modal-delete-text': 'Delete',
    'modal-edit-text': 'Edit',
    'modal-confirm-text': 'Are you sure you want to delete?',
    'modal-confirm-yes': 'Yes',
    'modal-confirm-no': 'No',

    // common text
    'search-text': 'Search',
    'cancel-text': 'Cancel',
    'submit-dm-text': 'Send DM',
    'new-text': 'New',
    'post-text': 'Post',

    more: 'See more',
  },
  CHINESE: {
    // header & description
    'page-header': '社区',
    'notice-header': '外交部公告',
    'region-header': '地区论坛',
    'free-header': '自由论坛',
    'notice-des': '这是韩国外交部公告的发布板块。',
    'free-des': '大家可以自由使用的论坛。',
    'region-subheader-seoul': '地区论坛 | 首尔',
    'region-des-seoul': '住在首尔的朋友们，快来集合 👀',
    'region-subheader-gyeonggi': '地区论坛 | 京畿道',
    'region-des-gyeonggi': '住在京畿道的朋友们，快来集合 👀',
    'region-subheader-incheon': '地区论坛 | 仁川',
    'region-des-incheon': '住在仁川的朋友们，快来集合 👀',
    'region-subheader-busan': '地区论坛 | 釜山',
    'region-des-busan': '住在釜山的朋友们，快来集合 👀',
    'region-text-seoul': '首尔',
    'region-text-gyeonggi': '京畿道',
    'region-text-incheon': '仁川',
    'region-text-busan': '釜山',

    'region-update-notice': '其他地区的论坛将在下一次更新中添加。',

    // post
    'post-submit-text': '提交',
    'post-submit-toast-success': '帖子成功创建。',
    'post-submit-toast-loading': '正在创建帖子…',
    'post-submit-toast-fail': '创建帖子时发生错误。',
    'post-submit-is-blank': '有空字段！',
    'post-none-text': '目前没有帖子。',

    // comment
    'comment-edit-header': '编辑评论',
    'comment-none-text1': '尚未有评论。',
    'comment-none-text2': '留下第一条评论吧',
    'comment-submit-toast-success': '评论已成功提交。',
    'comment-submit-toast-loading': '正在提交评论…',
    'comment-submit-toast-fail': '提交评论时发生错误。',

    // modal
    'modal-delete-text': '删除',
    'modal-edit-text': '编辑',
    'modal-confirm-text': '确定要删除吗？',
    'modal-confirm-yes': '是',
    'modal-confirm-no': '否',

    // common text
    'search-text': '搜索',
    'cancel-text': '取消',
    'submit-dm-text': '发送私信',
    'new-text': '新',
    'post-text': '帖子',

    more: '查看更多',
  },
  JAPANESE: {
    // header & des
    'page-header': 'コミュニティ',
    'notice-header': '外交部のお知らせ',
    'region-header': '地域別掲示板',
    'free-header': '自由掲示板',
    'notice-des': '大韓民国外交部のお知らせがアップされる掲示板です',
    'free-des': 'みんなが自由に利用する掲示板です',
    'region-subheader-seoul': '地域別掲示板｜ソウル特別市',
    'region-des-seoul': 'ソウル市に住む友達集まれ👀',
    'region-subheader-gyeonggi': '地域別掲示板｜京畿道',
    'region-des-gyeonggi': '京畿道に住む友達集まれ👀',
    'region-subheader-incheon': '地域別掲示板｜仁川',
    'region-des-incheon': 'ソウル市に住む友達集まれ👀',
    'region-subheader-busan': '地域別掲示板｜釜山',
    'region-des-busan': '釜山に住む友達集まれ👀',
    'region-text-seoul': '首尔',
    'region-text-gyeonggi': '京畿道',
    'region-text-incheon': '仁川',
    'region-text-busan': '釜山',

    'region-update-notice': '他の地域の掲示板は次回更新時に追加予定です',

    // post
    'post-submit-text': '登録',
    'post-submit-toast-success': '投稿が成功裏に作成されました。',
    'post-submit-toast-loading': '投稿を作成中です…',
    'post-submit-toast-fail': '投稿の作成中にエラーが発生しました。',
    'post-submit-is-blank': '空のフィールドがあります！',
    'post-none-text': 'まだ投稿がありません。',

    // comment
    'comment-edit-header': 'コメント編集',
    'comment-none-text1': '作成されたコメントがありません',
    'comment-none-text2': '最初のコメントを残してください',
    'comment-submit-toast-success': 'コメントを正常に投稿しました。',
    'comment-submit-toast-loading': 'コメントを投稿中です…',
    'comment-submit-toast-fail': 'コメントの投稿中にエラーが発生しました。',

    // modal
    'modal-delete-text': '削除',
    'modal-edit-text': '修正',
    'modal-confirm-text': '本当に削除しますか',
    'modal-confirm-yes': 'はい',
    'modal-confirm-no': 'いいえ',

    // common text
    'search-text': 'search',
    'cancel-text': 'キャンセル',
    'submit-dm-text': 'DM送信',
    'new-text': 'new',
    'post-text': '投稿',

    more: 'もっと見る',
  },
}

export { COMMUNITY_CONSTANT }
