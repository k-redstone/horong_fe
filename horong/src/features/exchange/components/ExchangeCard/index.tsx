import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'

interface ExchangeCardProps {
  data: ExchangePromise
}

export default function ExchangeCard({ data }: ExchangeCardProps) {
  return (
    <div className="flex">
      <p>{data.name}</p>
      <p>{data.exchangeRates[0].currency}</p>
      <p>{data.exchangeRates[0].exchangeType}</p>
      <p>{data.exchangeRates[0].amount}</p>
    </div>
  )
}
