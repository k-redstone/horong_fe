import publicAPI from '@/api/publicAPI/index.ts'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'

export async function fetchExchange(): Promise<ExchangePromise[]> {
  const res = await publicAPI.get('/currency')
  return res.data.result
}
