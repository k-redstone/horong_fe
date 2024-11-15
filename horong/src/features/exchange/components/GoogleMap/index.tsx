'use client'

import { useQuery } from '@tanstack/react-query'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { useState } from 'react'

import { fetchExchange } from '@/features/exchange/api/searchExchange.ts'
import DefaultInfoWindow from '@/features/exchange/components/DefaultInfoWindow/index.tsx'
import ExchangeModal from '@/features/exchange/components/ExchangeModal/index.tsx'
import MapMarker from '@/features/exchange/components/MapMarker/index.tsx'
import MapSearchBox from '@/features/exchange/components/MapSearchBox/index.tsx'
import MoveCurrentPosBtn from '@/features/exchange/components/MoveCurrentPosBtn/index.tsx'

export default function GoogleMap() {
  const [zoom, setZoom] = useState<number>(0)
  const [isModal, setIsModal] = useState<boolean>(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['exchange'],
    queryFn: () => fetchExchange(),
  })

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
      region="KR"
    >
      <Map
        colorScheme={'DARK'}
        mapId={'baae3adccbf5d8d'}
        defaultZoom={15}
        disableDefaultUI={true}
        defaultCenter={{ lat: 37.558005440695396, lng: 127.00869391175185 }}
        onCameraChanged={(event) => {
          setZoom(event.detail.zoom)
        }}
      >
        {isSuccess && (
          <>
            {zoom >= 13 &&
              data.map((item) => (
                <MapMarker
                  key={item.id}
                  data={item}
                />
              ))}
            <div className="absolute top-4 z-10 flex w-full justify-center">
              <MapSearchBox />
            </div>
            <div className="absolute bottom-[6.125rem] right-4">
              <MoveCurrentPosBtn />
            </div>
            <div className="absolute bottom-0 z-30 w-full">
              <ExchangeModal
                isModal={isModal}
                setIsModal={setIsModal}
                data={data}
              />
            </div>
            <DefaultInfoWindow />
          </>
        )}
      </Map>
    </APIProvider>
  )
}
