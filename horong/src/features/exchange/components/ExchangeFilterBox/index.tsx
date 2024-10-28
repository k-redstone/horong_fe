import { useState } from 'react'

import ExchangeCard from '@/features/exchange/components/ExchangeCard/index.tsx'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { filterExchangeRates } from '@/features/exchange/utils/filterExchange/index.ts'
interface ExchangeFilterBoxProps {
  data: ExchangePromise[]
}

export default function ExchangeFilterBox({ data }: ExchangeFilterBoxProps) {
  const [currency, setCurrency] = useState<'CNY' | 'JPY'>('CNY')
  const [exchangeType, setExchangeType] = useState<'BUY' | 'SELL'>('BUY')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => setCurrency('CNY')}
        >
          중국
        </button>
        <button
          type="button"
          onClick={() => setCurrency('JPY')}
        >
          일본
        </button>
        <button
          type="button"
          onClick={() => setExchangeType('BUY')}
        >
          BUY
        </button>
        <button
          type="button"
          onClick={() => setExchangeType('SELL')}
        >
          SELL
        </button>
        <button
          type="button"
          onClick={() => setOrder('asc')}
        >
          SELL
        </button>
        <button
          type="button"
          onClick={() => setOrder('desc')}
        >
          SELL
        </button>
      </div>
      <div className="flex flex-col gap-y-3">
        {filterExchangeRates(data, { currency, exchangeType, order }).map(
          (filteredItem) => (
            <ExchangeCard
              key={filteredItem.id}
              data={filteredItem}
            />
          ),
        )}
      </div>
    </div>
  )
}
