'use client'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

import { EXCHANGE_CONSTANT } from '@/constants/exchange/index.ts'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
interface ExchangeCardProps {
  data: ExchangePromise
}

export default function ExchangeCard({ data }: ExchangeCardProps) {
  const map = useMap()
  const geometry = useMapsLibrary('geometry')
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="relative flex items-center justify-between rounded-[1.25rem] border border-white">
      <div className="flex flex-col gap-y-1 px-5 py-3 text-2xs text-white">
        <p className="text-xs-bold">{data.name}</p>
        <p>₩ {data.exchangeRates[0].amount}</p>
        <p>{decodeHtmlEntities(data.address)}</p>
        <p>{data.businessHours}</p>
      </div>
      <div className="flex flex-col items-center px-5">
        <p className="text-xs-bold">
          {EXCHANGE_CONSTANT[lang]['exchange-distance-txt']}
        </p>
        <p className="text-2xs">
          {geometry &&
            map &&
            `${Math.round(
              geometry.spherical.computeDistanceBetween(
                map.getCenter() as google.maps.LatLng,
                {
                  lat: data.latitude,
                  lng: data.longitude,
                },
              ),
            )}M`}
        </p>
      </div>
    </div>
  )
}
