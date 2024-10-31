'use client'

import { useQuery } from '@tanstack/react-query'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { useState } from 'react'

import { fetchExchange } from '@/features/exchange/api/searchExchange.ts'
import ExchangeModal from '@/features/exchange/components/ExchangeModal/index.tsx'
import MapMarker from '@/features/exchange/components/MapMarker/index.tsx'
import MapSearchBox from '@/features/exchange/components/MapSearchBox/index.tsx'
import MoveCurrentPosBtn from '@/features/exchange/components/MoveCurrentPosBtn/index.tsx'
import { InfowindowProvider } from '@/features/exchange/contexts/infowindowProvider/index.tsx'
export default function GoogleMap() {
  const [zoom, setZoom] = useState<number>(0)
  const [isModal, setIsModal] = useState<boolean>(false)
  const { data, isSuccess } = useQuery({
    queryKey: ['exchange'],
    queryFn: () => fetchExchange(),
  })

  if (!isSuccess) {
    return (
      <div>
        <p>map loading</p>
      </div>
    )
  }

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
          console.log(
            'camera changed:',
            event.detail.center,
            'zoom:',
            event.detail.zoom,
          )
        }}
      >
        <InfowindowProvider>
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
          <div className="absolute bottom-0 w-full">
            <ExchangeModal
              isModal={isModal}
              setIsModal={setIsModal}
              data={data}
            />
          </div>
        </InfowindowProvider>
      </Map>
    </APIProvider>
  )
}
