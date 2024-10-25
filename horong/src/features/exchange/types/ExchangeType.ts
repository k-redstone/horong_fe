export type ExchangeType = {
  id: number
  address: string
  name: string
  businessHours: string
  description: string
  phone: string
  latitude: number
  longitude: number
}
export type exchangeRateType = {
  id: number
  currency: 'CNY' | 'JPY'
  exchangeType: 'BUY' | 'SELL'
  amount: number
  updatedAt: string
}
export type ExchangePromise = {
  id: number
  address: string
  name: string
  businessHours: string
  description: string
  phone: string
  latitude: number
  longitude: number
  exchangeRates: exchangeRateType[]
}
