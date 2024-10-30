import {
  ExchangePromise,
  exchangeRateType,
} from '@/features/exchange/types/ExchangeType.ts'

interface FilterInterface {
  currency: 'CNY' | 'JPY' | 'USD'
  exchangeType: 'BUY' | 'SELL'
  order: 'asc' | 'desc'
}

export function filterExchangeRates(
  data: ExchangePromise[],
  filters: FilterInterface,
) {
  const { currency, exchangeType, order } = filters
  const filteredData = data.map((item) => {
    const filteredRate = item.exchangeRates.filter((rate) => {
      const currencyMatch = currency ? rate.currency === currency : true
      const typeMatch = exchangeType ? rate.exchangeType === exchangeType : true
      return currencyMatch && typeMatch
    })
    return {
      ...item,
      exchangeRates: filteredRate,
    }
  })
  const returnData = sortExchangeRates(filteredData, 'amount', order)
  return returnData
}

export function sortExchangeRates(
  exchanges: ExchangePromise[],
  nestedKey: keyof exchangeRateType,
  order: 'asc' | 'desc' = 'asc',
): ExchangePromise[] {
  const validItems = exchanges.filter((exchange) =>
    exchange.exchangeRates.some((rate) => rate[nestedKey] !== 0),
  )
  const zeroAmountItems = exchanges.filter((exchange) =>
    exchange.exchangeRates.every((rate) => rate[nestedKey] === 0),
  )

  const sortedItems = validItems.sort((a, b) => {
    const valueA = a.exchangeRates[0][nestedKey]
    const valueB = b.exchangeRates[0][nestedKey]

    if (valueA < valueB) return order === 'asc' ? -1 : 1
    if (valueA > valueB) return order === 'asc' ? 1 : -1
    return 0
  })

  return [...sortedItems, ...zeroAmountItems]
}
