import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'

interface ExchangeCardProps {
  data: ExchangePromise
}

export default function ExchangeCard({ data }: ExchangeCardProps) {
  return (
    <div className="flex flex-col gap-y-1 rounded-[1.25rem] border border-white px-5 py-3 text-2xs text-white">
      <p className="text-xs-bold">{data.name}</p>
      <p>₩ {data.exchangeRates[0].amount}원</p>
      <p>{decodeHtmlEntities(data.address)}</p>
      <p>{data.businessHours}</p>
    </div>
  )
}
