interface ExchangeConstantType {
  [key: string]: {
    'exchange-header': string
    'exchange-sub-header': string
    'exchange-buy-txt': string
    'exchange-sell-txt': string
    'exchange-all-txt': string
    'exchange-distance-txt': string
    'exchage-search-txt': string
  }
}

export const EXCHANGE_CONSTANT: ExchangeConstantType = {
  KOREAN: {
    'exchange-header': '사설 환전소',
    'exchange-sub-header': '근처 사설 환전소',
    'exchange-buy-txt': '살 때',
    'exchange-sell-txt': '팔 때',
    'exchange-all-txt': '전체',
    'exchange-distance-txt': '거리',
    'exchage-search-txt': 'Search here',
  },

  ENGLISH: {
    'exchange-header': 'Private Exchange',
    'exchange-sub-header': 'Nearby Private Exchanges',
    'exchange-buy-txt': 'Buying',
    'exchange-sell-txt': 'Selling',
    'exchange-all-txt': 'All',
    'exchange-distance-txt': 'Distance',
    'exchage-search-txt': 'Search here',
  },

  CHINESE: {
    'exchange-header': '私人兑换所',
    'exchange-sub-header': '附近的私人兑换所',
    'exchange-buy-txt': '买入价',
    'exchange-sell-txt': '卖出价',
    'exchange-all-txt': '全部',
    'exchange-distance-txt': '距离',
    'exchage-search-txt': '在这里搜索',
  },

  JAPANESE: {
    'exchange-header': '個人両替所',
    'exchange-sub-header': '近くの個人両替所',
    'exchange-buy-txt': '購入時',
    'exchange-sell-txt': '販売時',
    'exchange-all-txt': 'すべて',
    'exchange-distance-txt': '距離',
    'exchage-search-txt': 'ここで検索',
  },
}
