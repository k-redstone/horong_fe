import { useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'

import ExchangeCard from '@/features/exchange/components/ExchangeCard/index.tsx'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { filterExchangeRates } from '@/features/exchange/utils/filterExchange/index.ts'

interface ExchangeFilterBoxProps {
  data: ExchangePromise[]
}

export default function ExchangeFilterBox({ data }: ExchangeFilterBoxProps) {
  const map = useMap()
  const [currency, setCurrency] = useState<'USD' | 'CNY' | 'JPY'>('USD')
  const [exchangeType, setExchangeType] = useState<'BUY' | 'SELL'>('BUY')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const handleExchangeClick = (item: ExchangePromise) => {
    map?.setCenter({ lat: item.latitude, lng: item.longitude })
    map?.setZoom(16)

    // todo: 이동 후 infoWindow 어떻게 보여줄지
    // const infoWindow = new google.maps.InfoWindow()
    // infoWindow.setPosition({ lat: item.latitude, lng: item.longitude })
    // infoWindow.setHeaderContent(place.name)
    // infoWindow.setContent(place.formatted_address)
    // infoWindow.open(map)
  }
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
            <div
              key={filteredItem.id}
              onClick={() => handleExchangeClick(filteredItem)}
            >
              <ExchangeCard data={filteredItem} />
            </div>
          ),
        )}
      </div>
    </div>
  )
}
