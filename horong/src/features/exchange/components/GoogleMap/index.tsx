'use client'

import { APIProvider, Map } from '@vis.gl/react-google-maps'
// import { useState } from 'react'

export default function GoogleMap() {
  // const [zoom, setZoom] = useState<number>(0)
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
          // setZoom(event.detail.zoom)
          console.log(
            'camera changed:',
            event.detail.center,
            'zoom:',
            event.detail.zoom,
          )
        }}
      >
        {/* {zoom >= 13 &&
          data.map((item) => (
            <MapMarker
              key={item.id}
              latitude={item.latitude}
              longitude={item.longitude}
            />
          ))} */}
      </Map>
    </APIProvider>
  )
}
